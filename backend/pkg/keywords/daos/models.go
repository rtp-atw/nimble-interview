package daos

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

const tableKeyword = "keywords"
const tableUserKeyword = "keyword_users"

type CreateKeywordPayload struct {
	UUID    uuid.UUID `json:"uuid"`
	Keyword string    `json:"keyword"`
}

type CreateUserKeywordPayload struct {
	UserUUID    string `json:"user_uuid"`
	KeywordUUID string `json:"keyword_uuid"`
}

type Keyword struct {
	gorm.Model

	UUID      uuid.UUID `gorm:"columns:uuid, unique"`
	Keyword   string    `gorm:"columns:keyword, unique"`
	IsDeleted bool      `gorm:"columns:is_deleted"`
}

type UserKeyword struct {
	gorm.Model

	// UUID        uuid.UUID `gorm:"columns:uuid, unique"`
	UserUUID    string `gorm:"columns:user_uuid"`
	KeywordUUID string `gorm:"columns:keyword_uuid"`

	Keyword string `gorm:"->"`

	IsDeleted bool `gorm:"columns:is_deleted"`
}
