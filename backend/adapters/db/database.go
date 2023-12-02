package db

import (
	"database/sql"
	"os"
	"time"

	_ "github.com/lib/pq"

	"github.com/rtp-atw/nimble-interview/tools"
)

var db *sql.DB
var driver = "postgres"
var dbConnection string

func NewDatabase() *sql.DB {
	dbConnection = os.Getenv("POSTGRESQL_URL")
	if dbConnection == "" {
		log.Panicln("[db][database] missing database connection")
	}

	db, err := sql.Open(driver, dbConnection)

	tools.CheckError(err)

	err = db.Ping()

	if err != nil {
		log.Panicln("[db][database] can't ping connection")
	}

	db.SetConnMaxLifetime(30 * time.Minute)
	db.SetMaxIdleConns(2)
	db.SetMaxOpenConns(3)

	log.Infoln("[db][database] database initialized")

	return db
}
