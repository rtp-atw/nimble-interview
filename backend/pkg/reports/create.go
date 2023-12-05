package reports

import (
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/pkg/reports/daos"
	"github.com/rtp-atw/nimble-interview/pkg/reports/models"
)

func (s *Service) CreateReport(userUUID string, reportUUID uuid.UUID, keywordUUID string, keyword string) (models.Report, error) {

	payload := daos.CreateReportPayload{
		UUID:        reportUUID,
		UserUUID:    userUUID,
		KeywordUUID: keywordUUID,
	}
	report, err := s.repository.InsertReport(payload)
	if err != nil {
		return models.Report{}, err
	}

	return models.Report{
		ID:          report.ID,
		UUID:        report.UUID,
		UserUUID:    report.UserUUID,
		KeywordUUID: report.KeywordUUID,
		Keyword:     report.Keyword,
		Ads:         report.Ads,
		Links:       report.Links,
		TotalResult: report.TotalResult,
		ProcessTime: report.ProcessTime,
		HTML:        report.HTML,
		IsExtracted: report.IsExtracted,
	}, nil
}
