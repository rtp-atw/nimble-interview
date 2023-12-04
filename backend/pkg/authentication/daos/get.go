package daos

func (s *AuthenticationRepository) GetUserByEmail(payload GetUserPayload) (user User, err error) {

	tx := s.repositoryORM.Table("users").Where("email = ? AND is_deleted = false", payload.Email).Scan(&user)
	if tx.Error != nil {
		return User{}, err
	}

	return user, nil
}

func (s *AuthenticationRepository) GetUser(id int32, uuid string) (user User, err error) {
	tx := s.repositoryORM.Table("users").
		Where(`
			(id = ? OR uuid like '?')
			AND is_deleted = FALSE
		`, id, uuid).Scan(&user)

	if tx.Error != nil {
		return User{}, err
	}

	return user, nil
}
