package rabbitmq

import (
	"errors"
	"fmt"
	"os"

	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"

	amqp "github.com/rabbitmq/amqp091-go"
)

var log *logrus.Logger

type MQService struct {
	Conn *amqp.Connection
}

func init() {
	log = logging.Initial()
	log.Infoln("[consumer] Initializing comsumers")
}

func Initial() MQService {
	rabbitmqConnection := os.Getenv("MQ_CONNECTION")
	if rabbitmqConnection == "" {
		failOnError(errors.New("missing connection string"), "Failed to connect to RabbitMQ")
	}
	conn, err := amqp.Dial(fmt.Sprintf("%s/", rabbitmqConnection))
	failOnError(err, "Failed to connect to RabbitMQ")

	return MQService{
		Conn: conn,
	}

}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}
