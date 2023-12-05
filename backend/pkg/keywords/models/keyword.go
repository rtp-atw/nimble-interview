package models

import (
	"strings"
	"sync"

	"github.com/google/uuid"
)

type Keyword struct {
	ID      int32     `json:"id" gorm:"columns:id"`
	UUID    uuid.UUID `json:"uuid" gorm:"columns:uuid"`
	Keyword string    `json:"keyword" gorm:"columns:keyword"`
}
type RequestReportKeyword struct {
	UUID     uuid.UUID `json:"uuid"`
	UserUUID string    `json:"user_uuid"`
	Keyword  []string  `json:"keyword"`
}

type ExtractedKeywords struct {
	Data []string
}

func (k *ExtractedKeywords) Dehydrate(records [][]string) {
	processChan := make(chan []string, len(records))

	var wg sync.WaitGroup

	decouplingFunc := func(data []string, ch chan []string, wg *sync.WaitGroup) {
		defer wg.Done()

		filteredData := []string{}
		for _, d := range data {
			// Filter unexpected value

			formattedStr := strings.ReplaceAll(d, " ", "")
			if strings.Contains(formattedStr, " ") {
				continue
			}
			if formattedStr == "" {
				continue
			}

			filteredData = append(filteredData, formattedStr)
		}

		ch <- filteredData
	}

	for _, r := range records {
		wg.Add(1)
		go decouplingFunc(r, processChan, &wg)
	}

	go func() {
		wg.Wait()
		close(processChan)
	}()

	for keys := range processChan {
		k.Data = append(k.Data, keys...)
	}
}
