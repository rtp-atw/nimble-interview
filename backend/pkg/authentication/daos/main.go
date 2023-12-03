package daos

import (
	"database/sql"

	"gorm.io/gorm"
)

type AuthenticationRepository struct {
	repository    *sql.DB
	repositoryORM *gorm.DB
}
type AuthenticationRepositoryInterface interface {
	CreateUser(payload CreateUserPayload) User
}

func Register(db *sql.DB, ORM *gorm.DB) AuthenticationRepositoryInterface {

	return &AuthenticationRepository{
		repository:    db,
		repositoryORM: ORM,
	}
}
