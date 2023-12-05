package reports

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/rtp-atw/nimble-interview/pkg/authentication/jwt"
	"github.com/rtp-atw/nimble-interview/pkg/reports/models"
	"github.com/rtp-atw/nimble-interview/tools"
)

func (s *Service) GetReports(ctx *gin.Context) {
	defer tools.GinRecovery(ctx)

	user := jwt.GetClaim(ctx)

	reports := []models.Report{}
	daoReports, err := s.repository.GetReports(user.UUID.String())
	if err != nil {
		panic(err)
	}

	for _, r := range daoReports {
		reports = append(reports, models.Report{
			ID:          r.ID,
			UUID:        r.UUID,
			UserUUID:    r.UserUUID,
			KeywordUUID: r.KeywordUUID,
			Keyword:     r.Keyword,
			Ads:         r.Ads,
			Links:       r.Links,
			TotalResult: r.TotalResult,
			ProcessTime: r.ProcessTime,
			HTML:        r.HTML,
			IsExtracted: r.IsExtracted,
		})
	}

	ctx.JSON(http.StatusOK, reports)
}
