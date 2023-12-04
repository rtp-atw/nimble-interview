package reports

import (
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/pkg/reports/daos"
)

func (s *Service) CreateReport(userUUID string, reportUUID uuid.UUID, keywordUUID string, keyword string) error {

	// rUUID, _ := uuid.Parse(reportUUID)

	// scraperService := scraper.New()
	// extractData := scraperService.Extract(reportUUID, keyword)

	payload := daos.CreateReportPayload{
		UUID:        reportUUID,
		UserUUID:    userUUID,
		KeywordUUID: keywordUUID,
		// Ads:         extractData.NumberOfAds,
		// Links:       extractData.NumberOfLink,
		// TotalResult: extractData.Result.TotalResult,
		// ProcessTime: extractData.Result.ProcessTime,
		// HTML:        extractData.HTML,
	}
	_, err := s.repository.InsertReport(payload)
	if err != nil {
		return err
	}

	return nil
}
