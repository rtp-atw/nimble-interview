package daos

import (
	"database/sql"

	"gorm.io/gorm"
)

type ReportRepository struct {
	repository    *sql.DB
	repositoryORM *gorm.DB
}
type ReportRepositoryInterface interface {
	InsertReport(payload CreateReportPayload) (Report, error)
	UpdateReport(uuid string, id int32, newReport map[string]interface{}) (Report, error)
	GetReport(id int32, uuid string) (Report, error)
	GetReports() ([]Report, error)
}

func Register(db *sql.DB, ORM *gorm.DB) ReportRepositoryInterface {

	return &ReportRepository{
		repository:    db,
		repositoryORM: ORM,
	}
}
