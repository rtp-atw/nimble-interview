package daos

func (s *AuthenticationRepository) CreateUser(payload CreateUserPayload) User {

	newUser := User{
		UUID:     payload.UUID,
		Email:    payload.Email,
		Password: payload.Password,
	}

	tx := s.repositoryORM.Table("user").Create(&newUser)
	if tx.Error != nil {
		panic(tx.Error.Error())
	}

	return newUser
}
