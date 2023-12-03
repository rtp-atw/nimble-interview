package daos

func (s *AuthenticationRepository) GetUser(payload GetUserPayload) (user User, err error) {

	tx := s.repositoryORM.Table("users").Where("email = ?", payload.Email).Scan(&user)
	if tx.Error != nil {
		return User{}, err
	}

	return user, nil
}
