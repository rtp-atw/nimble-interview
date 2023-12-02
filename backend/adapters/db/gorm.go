package db

import (
	"os"

	"github.com/rtp-atw/nimble-interview/tools"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var dbORM *gorm.DB
var useExistedConnection = true

func NewGORM() *gorm.DB {

	config := gorm.Config{
		PrepareStmt: true,
	}

	if !useExistedConnection {
		dbConnection = os.Getenv("POSTGRESQL_GORM_URL")
		if dbConnection == "" {
			log.Panicln("[db][gorm] missing database connection")
		}

		conn, err := gorm.Open(postgres.New(postgres.Config{
			Conn: db,
		}), &config)

		tools.CheckError(err)

		dbORM = conn

		log.Infoln("[db][orm] ORM initialized with new connection")

	}

	if useExistedConnection {
		conn, err := gorm.Open(postgres.Open(dbConnection), &config)

		tools.CheckError(err)

		dbORM = conn

		log.Infoln("[db][orm] ORM initialized with current connection")
	}

	return dbORM

}
