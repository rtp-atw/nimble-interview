package daos

func (s *ReportRepository) InsertReport(payload CreateReportPayload) (report Report, err error) {

	newUserKeyword := Report{
		UUID:        payload.UUID,
		UserUUID:    payload.UserUUID,
		KeywordUUID: payload.KeywordUUID,
		Ads:         payload.Ads,
		Links:       payload.Links,
		TotalResult: payload.TotalResult,
		ProcessTime: payload.ProcessTime,
		HTML:        payload.HTML,
	}

	tx := s.repositoryORM.
		Table(tableReport).
		Where("reports.uuid = ?", payload.UUID).
		// INSERT
		FirstOrCreate(&newUserKeyword).
		// JOIN CUSTOM FIELDS
		Select("reports.*, keywords.keyword").
		Joins("LEFT JOIN keywords ON keywords.uuid = reports.keyword_uuid").
		Scan(&report)

	if tx.Error != nil {
		return report, tx.Error
	}

	return report, nil
}
