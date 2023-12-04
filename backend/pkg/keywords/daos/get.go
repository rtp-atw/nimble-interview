package daos

func (s *KeywordRepository) GetKeyword(id int32, uuid string) (keyword Keyword, err error) {

	tx := s.repositoryORM.Table(tableName).
		Where(`
			(id = ? OR uuid like '?')
			AND is_deleted = FALSE
		`, id, uuid).
		Scan(&keyword)

	if tx.Error != nil {
		return Keyword{}, err
	}

	return keyword, nil
}

func (s *KeywordRepository) GetKeywords() (keyword []Keyword, err error) {

	tx := s.repositoryORM.Table(tableName).Where("is_deleted = FALSE").Scan(&keyword)
	if tx.Error != nil {
		return []Keyword{}, err
	}

	return keyword, nil
}
