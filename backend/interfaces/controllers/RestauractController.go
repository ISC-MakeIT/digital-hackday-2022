package controllers

import (
	"errors"

	"github.com/ISC-MakeIT/digital-hackday-2022/interfaces/api"
	"github.com/ISC-MakeIT/digital-hackday-2022/interfaces/models"
)

type (
	FindNearbyRestaurantRequest struct {
		Lat       float64 `json:"lat"`
		Long      float64 `json:"lng"`
		AreaRange int     `json:"area_range"`
	}
	NearbyRestaurantResponse struct {
		Message string
		ErrMeg  error
	}
)

type RestaurantController struct {
	Interactor RestaurantRepository
}

func NewRestauirantController() *RestaurantController {
	return &RestaurantController{
		Interactor: &api.RestaurantRepository{},
	}
}

func (r *RestaurantController) FindNearbyRestaurant(ctx Context) error {
	req := &FindNearbyRestaurantRequest{}

	if err := ctx.BindJSON(req); err != nil {
		response := NearbyRestaurantResponse{
			Message: "bindErr",
			ErrMeg:  err,
		}
		ctx.JSON(400, response)
		return nil
	}
	reqModel, err := toModel(req)
	if err != nil {
		return err
	}
	ResultAPI, err := r.Interactor.Find(reqModel)
	if err != nil {
		return errors.New("findErr")
	}
	ctx.JSON(200, ResultAPI)
	return nil
}

func toModel(req *FindNearbyRestaurantRequest) (*models.RequestModel, error) {
	return models.NewRequestModel(
		req.Lat,
		req.Long,
		req.AreaRange,
	)
}
