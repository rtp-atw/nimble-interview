package daos

import (
	"database/sql"

	"github.com/rtp-atw/nimble-interview/pkg/keywords/models"
	"gorm.io/gorm"
)

type KeywordRepository struct {
	repository    *sql.DB
	repositoryORM *gorm.DB
}
type KeywordRepositoryInterface interface {
	InsertKeyword(payload CreateKeywordPayload)
	GetKeyword(id int32, uuid string) (models.Keyword, error)
	GetKeywords() ([]models.Keyword, error)

	// GetUserKeywords() ([]UserKeyword, error)
}

func Register(db *sql.DB, ORM *gorm.DB) KeywordRepositoryInterface {

	return &KeywordRepository{
		repository:    db,
		repositoryORM: ORM,
	}
}
