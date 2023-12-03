package scraper

import (
	"strconv"
	"strings"

	"github.com/google/uuid"
)

type ExtractData struct {
	UUID         uuid.UUID
	Keyword      string
	NumberOfAds  int32
	NumberOfLink int32
	Result       resultSearch
	HTML         string
}
type resultSearch struct {
	TotalResult int32
	ProcessTime float32
	rawText     []string
}

func (r *resultSearch) Dehydrate() {

	getTextAtIndex := func(idx int) string {

		if idx > len(r.rawText)-1 {
			return "0"
		}
		return r.rawText[idx]
	}

	fotmattedTotalSearchResult := strings.Replace(getTextAtIndex(0), ",", "", -1)

	totalSearchResult, _ := strconv.ParseInt(fotmattedTotalSearchResult, 10, 32)
	processingTime, _ := strconv.ParseFloat(getTextAtIndex(1), 32)

	r.TotalResult = int32(totalSearchResult)
	r.ProcessTime = float32(processingTime)

}
