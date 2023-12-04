package reports

import (
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/adapters/db"
	"github.com/rtp-atw/nimble-interview/internal/scraper"
	"github.com/rtp-atw/nimble-interview/pkg/reports/daos"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

type Service struct {
	log        *logrus.Logger
	repository daos.ReportRepositoryInterface
}

type ServiceInterface interface {
	// Service
	CreateReport(userUUID string, reportUUID uuid.UUID, keywordUUID string, keyword string) error
	UpdateReportResult(reportUUID string, extractData scraper.ExtractData) error
}

func init() {
}

func Register() ServiceInterface {

	dbService := db.Initial()

	return &Service{
		log:        logging.Initial(),
		repository: daos.Register(dbService.DB, dbService.ORM),
	}
}
