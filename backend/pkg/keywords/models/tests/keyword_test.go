package tests

import (
	"testing"

	"github.com/rtp-atw/nimble-interview/pkg/keywords/models"
	"github.com/stretchr/testify/assert"
)

func TestMultipleFormat(t *testing.T) {
	assert := assert.New(t)

	records := [][]string{
		{"project management tools, product management software"},
	}

	keywords := models.ExtractedKeywords{}
	keywords.Dehydrate(records)

	expected := []string{
		"project", "management", "tools", "product", "management", "software",
	}

	assert.Equal(expected, keywords.Data)
}

func TestCommaFormat(t *testing.T) {
	assert := assert.New(t)

	records := [][]string{
		{"project, management, tools, product, management, software"},
	}

	keywords := models.ExtractedKeywords{}
	keywords.Dehydrate(records)

	expected := []string{
		"project", "management", "tools", "product", "management", "software",
	}

	assert.Equal(expected, keywords.Data)
}

func TestCommaSpace(t *testing.T) {
	assert := assert.New(t)

	records := [][]string{
		{"project management tools product management software"},
	}

	keywords := models.ExtractedKeywords{}
	keywords.Dehydrate(records)

	expected := []string{
		"project", "management", "tools", "product", "management", "software",
	}

	assert.Equal(expected, keywords.Data)
}
