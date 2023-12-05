package daos

import (
	"github.com/google/uuid"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"gorm.io/gorm"
)

type CreateUserPayload struct {
	UUID     uuid.UUID `json:"uuid"`
	Email    string    `json:"email"`
	Password string    `json:"password"`
}

type GetUserPayload struct {
	Email string `json:"email"`
}

type User struct {
	gorm.Model

	UUID      uuid.UUID `gorm:"columns:uuid, unique"`
	Email     string    `gorm:"columns:email"`
	Password  string    `gorm:"columns:password"`
	IsDeleted bool      `gorm:"columns:is_deleted"`
}

// GORM Hook
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.Password, err = jwt.HashPassword(u.Password)
	if err != nil {
		panic(err.Error())
	}
	return
}
