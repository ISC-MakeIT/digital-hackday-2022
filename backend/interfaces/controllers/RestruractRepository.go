package controllers

import (
	
	"github.com/ISC-MakeIT/digital-hackday-2022/interfaces/models"
)

type RestaurantRepository interface {
	Find(data *models.RequestModel) (*models.Response, error)
}