package main

import (
	"encoding/json"
	"time"

	"github.com/rtp-atw/nimble-interview/adapters/rabbitmq"
	"github.com/rtp-atw/nimble-interview/internal/scraper"
	"github.com/rtp-atw/nimble-interview/pkg/keywords/models"
	"github.com/rtp-atw/nimble-interview/pkg/reports"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

var log *logrus.Logger

var REPORT_QUEUE_NAME = "REPORT:GENERATE"

func init() {
	log = logging.Initial()
	log.Infoln("[consumer] Initializing comsumers")
}

func main() {
	mqService := rabbitmq.Initial()
	defer mqService.Conn.Close()

	ch, err := mqService.Conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	q, err := ch.QueueDeclare(
		REPORT_QUEUE_NAME, // name
		false,             // durable
		false,             // delete when unused
		false,             // exclusive
		false,             // no-wait
		nil,               // arguments
	)
	failOnError(err, "Failed to declare a queue")

	msgs, err := ch.Consume(
		q.Name, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	failOnError(err, "Failed to register a consumer")

	var forever chan struct{}

	scraperService := scraper.New()
	reportService := reports.Register()

	go func() {
		for d := range msgs {
			log.Printf("Received a message: %s", d.Body)

			eventData := models.RequestReportKeyword{}
			err := json.Unmarshal(d.Body, &eventData)

			if err != nil {
				d.Ack(true)
				continue
			}

			extractData := scraperService.Extract(eventData.UUID, eventData.Keyword[1])
			err = reportService.UpdateReportResult(eventData.UUID.String(), extractData)
			if err != nil {
				d.Ack(true)
				continue
			}
			time.Sleep(1 * time.Second)
		}
	}()

	log.Printf(" [*] Waiting for messages. To exit press CTRL+C")
	<-forever

}

func failOnError(err error, msg string) {
	if err != nil {
		log.Panicf("%s: %s", msg, err)
	}
}
