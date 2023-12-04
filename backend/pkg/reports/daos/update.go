package daos

func (s *ReportRepository) UpdateReport(uuid string, id int32, newReport map[string]interface{}) (report Report, err error) {
	tx := s.repositoryORM.
		Table(tableReport).
		Where("(reports.uuid = ? OR reports.id = ?) AND reports.is_deleted = FALSE", uuid, id).
		// INSERT
		Updates(&newReport).
		// JOIN CUSTOM FIELDS
		Select("reports.*, keywords.keyword").
		Joins("LEFT JOIN keywords ON keywords.uuid = reports.keyword_uuid").
		Scan(&report)

	if tx.Error != nil {
		return report, tx.Error
	}

	return report, nil
}
