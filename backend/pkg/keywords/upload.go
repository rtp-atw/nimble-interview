package keywords

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/adapters/rabbitmq"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/daos"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/models"
	"github.com/rtp-atw/nimble-interview/pkg/reports"
	reportModel "github.com/rtp-atw/nimble-interview/pkg/reports/models"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) Upload(c *gin.Context) {
	defer tools.GinRecovery(c)

	file, err := c.FormFile("file")
	tools.CheckError(err)

	contentType := file.Header.Get("Content-Type")
	if contentType != "text/csv" {
		c.JSON(http.StatusBadRequest, &gin.H{
			"message": "file format isn't correct",
		})
		return
	}

	filePath := filepath.Join("assets/tmp", file.Filename)
	defer func() {
		err := os.Remove(filePath)
		if err != nil {
			panic(err)
		}
	}()

	c.SaveUploadedFile(file, filePath)

	fileTmp, err := os.Open(filePath)
	if err != nil {
		fmt.Println(err)
	}

	reader := csv.NewReader(fileTmp)

	rawRecords, _ := reader.ReadAll()

	keyword := models.ExtractedKeywords{}

	keyword.Dehydrate(rawRecords)

	if len(keyword.Data) > 100 {
		c.JSON(http.StatusBadRequest, &gin.H{
			"message": "more than 100 keywords",
		})
		return
	}

	user := jwt.GetClaim(c)

	keywordUUIDs := [][]string{}

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

	generatedReport := []reportModel.Report{}

	for _, req := range keywordUUIDs {
		reportUUID := uuid.New()
		keyUUID := req[0]
		key := req[1]

		report, err := reportService.CreateReport(user.UUID.String(), reportUUID, keyUUID, key)
		if err != nil {
			continue
		}

		mqService.SendQueue("REPORT:GENERATE", map[string]interface{}{
			"uuid":      reportUUID,
			"keyword":   req,
			"user_uuid": user.UUID.String(),
		})
		generatedReport = append(generatedReport, report)
	}

	c.JSON(http.StatusOK, generatedReport)
}
