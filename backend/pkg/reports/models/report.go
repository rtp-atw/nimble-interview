package models

import (
	"github.com/google/uuid"
)

type Report struct {
	UUID        uuid.UUID `json:"uuid"`
	UserUUID    string    `json:"user_uuid"`
	KeywordUUID string    `json:"keyword_uuid"`
	Keyword     string    `json:"keyword"`
	Ads         int32     `json:"ads"`
	Links       int32     `json:"links"`
	TotalResult int32     `json:"total_result"`
	ProcessTime float32   `json:"precess_time"`
	HTML        string    `json:"html"`
}

type PayloadCreateReport struct {
	UUID    uuid.UUID `json:"uuid"`
	Keyword string    `json:"keyword"`
}

type RequestReportKeyword struct {
	UUID    uuid.UUID `json:"uuid"`
	Keyword string    `json:"keyword"`
}
