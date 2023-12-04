package reports

import (
	"github.com/rtp-atw/nimble-interview/internal/scraper"
)

func (s *Service) UpdateReportResult(reportUUID string, extractData scraper.ExtractData) error {

	payload := map[string]interface{}{
		"ads":          extractData.NumberOfAds,
		"links":        extractData.NumberOfLink,
		"total_result": extractData.Result.TotalResult,
		"process_time": extractData.Result.ProcessTime,
		"html":         extractData.HTML,
	}
	_, err := s.repository.UpdateReport(reportUUID, 0, payload)
	if err != nil {
		return err
	}
	return nil
}
