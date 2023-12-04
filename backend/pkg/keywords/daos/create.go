package daos

func (s *KeywordRepository) InsertKeyword(payload CreateKeywordPayload) (keyword Keyword) {

	newKeyword := Keyword{
		UUID:    payload.UUID,
		Keyword: payload.Keyword,
	}

	tx := s.repositoryORM.
		Table(tableName).
		Where("keyword = ?", payload.Keyword).
		FirstOrCreate(&newKeyword).Scan(&keyword)

	if tx.Error != nil {
		panic(tx.Error.Error())
	}

	return keyword
}
