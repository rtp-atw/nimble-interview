package keywords

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/daos"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/models"
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

	keywordUUID := uuid.New()

	daoKeyword, err := s.repository.InsertKeyword(daos.CreateKeywordPayload{
		UUID:    keywordUUID,
		Keyword: keyword.Data[0],
	})
	tools.CheckError(err)

	daoUserKeyword, err := s.repository.InsertUserKeyword(daos.CreateUserKeywordPayload{
		UserUUID:    user.UUID.String(),
		KeywordUUID: daoKeyword.UUID.String(),
	})
	tools.CheckError(err)

	// scraperService := scraper.New()
	// scraperService.Extract(uuid.New(), keyword.Data[0])

	// c.JSON(http.StatusOK, &gin.H{})
	c.JSON(http.StatusOK, daoUserKeyword)
}
