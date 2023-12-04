package keywords

import (
	"encoding/csv"
	"fmt"
	"net/http"
	"os"
	"path/filepath"

	"github.com/gin-gonic/gin"
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

	// scraperService := scraper.New()
	// scraperService.Extract(uuid.New(), keyword.Data[0])

	c.JSON(http.StatusOK, keyword.Data)
}
