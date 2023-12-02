package db

import (
	"database/sql"

	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var log *logrus.Logger

type Service struct {
	db    *sql.DB
	dbORM *gorm.DB
}

func init() {
	log = logging.Initial()
}

func Initial() Service {
	log.Infoln("[db] initializing db adapter")
	newDatabase := NewDatabase()
	newORM := NewGORM()
	return Service{
		db:    newDatabase,
		dbORM: newORM,
	}
}
