package keywords

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/adapters/rabbitmq"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/daos"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/models"
	"github.com/rtp-atw/nimble-interview/pkg/reports"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) Upload(c *gin.Context) {
	defer tools.GinRecovery(c)

	file, err := c.FormFile("file")

	filePath := filepath.Join("assets/tmp", file.Filename)

	c.SaveUploadedFile(file, filePath)

	fileTmp, err := os.Open(filePath)
	if err != nil {
		fmt.Println(err)
	}

	reader := csv.NewReader(fileTmp)
	rawRecords, _ := reader.ReadAll()

	keyword := models.ExtractedKeywords{}

	keyword.Dehydrate(rawRecords)

	s.CreateKeyword(keyword.Data[0])

	user := jwt.GetClaim(c)

	keywordUUIDs := [][]string{}

	// NEED TO REFACTOR
	for _, k := range keyword.Data {

		keywordUUID := uuid.New()

		daoKeyword, err := s.repository.InsertKeyword(daos.CreateKeywordPayload{
			UUID:    keywordUUID,
			Keyword: k,
		})

		tools.CheckError(err)

		daoUserKeyword, err := s.repository.InsertUserKeyword(daos.CreateUserKeywordPayload{
			UserUUID:    user.UUID.String(),
			KeywordUUID: daoKeyword.UUID.String(),
		})
		tools.CheckError(err)

		keywordUUIDs = append(keywordUUIDs, []string{daoUserKeyword.KeywordUUID, daoUserKeyword.Keyword})

	}
	reportService := reports.Register()
	mqService := rabbitmq.Initial()
	defer mqService.Conn.Close()

	end := 5
	for i := 0; i < len(keywordUUIDs); i++ {
		if end > len(keywordUUIDs)-1 {
			end = len(keywordUUIDs)
		}
		reqKeywords := keywordUUIDs[i:end]
		fmt.Println(reqKeywords)
		for _, req := range reqKeywords {
			keyUUID := req[0]
			key := req[1]
			reportUUID := uuid.New()

			err := reportService.CreateReport(user.UUID.String(), reportUUID, keyUUID, key)
			if err != nil {
				continue
			}

			mqService.SendQueue("REPORT:GENERATE", map[string]interface{}{
				"uuid":      reportUUID,
				"keyword":   req,
				"user_uuid": user.UUID.String(),
			})
		}
		i = end - 1
		end += 5
		time.Sleep(250 * time.Microsecond)
	}

	c.JSON(http.StatusOK, &gin.H{})
}
