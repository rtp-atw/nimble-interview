package daos

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

const tableReport = "reports"

type CreateReportPayload struct {
	UUID        uuid.UUID `json:"uuid"`
	UserUUID    string    `json:"user_uuid"`
	KeywordUUID string    `json:"keyword_uuid"`
	Ads         int32     `json:"ads"`
	Links       int32     `json:"links"`
	TotalResult int32     `json:"total_result"`
	ProcessTime float32   `json:"precess_time"`
	HTML        string    `json:"html"`
}

type Report struct {
	gorm.Model

	ID          int       `gorm:"columns:id, unique"`
	UUID        uuid.UUID `gorm:"columns:uuid, unique"`
	UserUUID    string    `gorm:"columns:user_uuid"`
	KeywordUUID string    `gorm:"columns:keyword_uuid"`

	Keyword     string  `gorm:"->"`
	Ads         int32   `gorm:"columns:ads"`
	Links       int32   `gorm:"columns:links"`
	TotalResult int32   `gorm:"columns:total_result"`
	ProcessTime float32 `gorm:"columns:process_time"`
	HTML        string  `gorm:"columns:html"`

	IsDeleted   bool `gorm:"columns:is_deleted"`
	IsExtracted bool `gorm:"columns:is_extracted"`
}
