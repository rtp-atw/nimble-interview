package daos

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

const tableName = "keywords"

type CreateKeywordPayload struct {
	UUID    uuid.UUID `json:"uuid"`
	Keyword string    `json:"keyword"`
}

type Keyword struct {
	gorm.Model

	UUID      uuid.UUID `gorm:"columns:uuid, unique"`
	Keyword   string    `gorm:"columns:keyword, unique"`
	IsDeleted bool      `gorm:"columns:is_deleted"`
}

type UserKeyword struct {
	gorm.Model

	UUID      uuid.UUID `gorm:"columns:uuid, unique"`
	UserUUID  string    `gorm:"columns:user_uuid"`
	Keyword   Keyword   `gorm:"embedded;embeddedPrefix:keyword_"`
	IsDeleted bool      `gorm:"columns:is_deleted"`
}
