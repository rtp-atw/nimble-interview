package daos

import (
	"database/sql"

	"gorm.io/gorm"
)

type KeywordRepository struct {
	repository    *sql.DB
	repositoryORM *gorm.DB
}
type KeywordRepositoryInterface interface {
	InsertKeyword(payload CreateKeywordPayload) Keyword
	GetKeyword(id int32, uuid string) (Keyword, error)
	GetKeywords() ([]Keyword, error)

	// GetUserKeywords() ([]UserKeyword, error)
}

func Register(db *sql.DB, ORM *gorm.DB) KeywordRepositoryInterface {

	return &KeywordRepository{
		repository:    db,
		repositoryORM: ORM,
	}
}
