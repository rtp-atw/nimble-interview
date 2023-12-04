package daos

func (s *KeywordRepository) InsertKeyword(payload CreateKeywordPayload) (keyword Keyword, err error) {

	newKeyword := Keyword{
		UUID:    payload.UUID,
		Keyword: payload.Keyword,
	}

	tx := s.repositoryORM.
		Table(tableKeyword).
		Where("keyword = ?", payload.Keyword).
		FirstOrCreate(&newKeyword).Scan(&keyword)

	if tx.Error != nil {
		return keyword, tx.Error
	}

	return keyword, nil
}

func (s *KeywordRepository) InsertUserKeyword(payload CreateUserKeywordPayload) (userKeyword UserKeyword, err error) {

	newUserKeyword := UserKeyword{
		UserUUID:    payload.UserUUID,
		KeywordUUID: payload.KeywordUUID,
	}

	tx := s.repositoryORM.
		Table(tableUserKeyword).
		Where("keyword_uuid = ? AND user_uuid = ?", payload.KeywordUUID, payload.UserUUID).
		// INSERT
		FirstOrCreate(&newUserKeyword).
		// JOIN CUSTOM FIELDS
		Select("keyword_users.*, keywords.keyword").
		Joins("LEFT JOIN keywords ON keywords.uuid = keyword_users.keyword_uuid").
		Scan(&userKeyword)

	if tx.Error != nil {
		return userKeyword, tx.Error
	}

	return userKeyword, nil
}
