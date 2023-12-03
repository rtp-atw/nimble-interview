package scraper

import (
	"github.com/go-rod/rod"
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/tools/logging"
	"github.com/sirupsen/logrus"
)

type ScraperInterface interface {
	Extract(uuid uuid.UUID, keyword string) ExtractData
}

type Service struct {
	log       *logrus.Logger
	collector *rod.Browser
}

func New() ScraperInterface {
	c := rod.New()
	return &Service{
		log:       logging.Initial(),
		collector: c,
	}
}
