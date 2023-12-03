package daos

import (
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type CreateUserPayload struct {
	UUID     uuid.UUID `json:"uuid" gorm:"columns:uuid"`
	Email    string    `json:"email" gorm:"columns:email"`
	Password string    `json:"password" gorm:"columns:password"`
}

type User struct {
	gorm.Model

	UUID     uuid.UUID `gorm:"columns:uuid, unique"`
	Email    string    `gorm:"columns:email"`
	Password string    `gorm:"columns:password"`
}

// GORM Hook
func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.HashPassword()
	return
}

func (c *User) HashPassword() (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(c.Password), 16)
	if err != nil {
		return "", err
	}

	return string(hashed), nil
}

func (u *User) comparePassword(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil
}
