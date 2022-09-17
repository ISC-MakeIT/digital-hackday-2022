package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/ISC-MakeIT/digital-hackday-2022/interfaces/models"
)

type RestaurantRepository struct{}

func (repo *RestaurantRepository) Find(data *models.RequestModel) (*models.Response, error) {
	key, err := repo.FetchKey()
	if err != nil {
		return nil, err
	}
	fmt.Println(key)
	url := "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" + key + "&lat=" + data.GetLatiude() + "&lng=" + data.GetLongitude() + "&range=" + data.GetAreaRange() + "&format=json"
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	var F models.Response

	if err := json.Unmarshal(body, &F); err != nil {
		return nil, err
	}
	return &F, nil

}
