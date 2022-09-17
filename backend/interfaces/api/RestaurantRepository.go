package api

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/ISC-MakeIT/digital-hackday-2022/interfaces/models"
)

type RestaurantRepository struct {}

func (repo *RestaurantRepository) Find(data *models.RequestModel) (*models.Response, error) {
	// ここにキーを貼り付けてください
	
	key := "2490fa54f7630e43"
	url := "https://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=" + key + "&lat=" + data.GetLatiude() + "&lng=" + data.GetLongitude() + "&range=" + data.GetAreaRange() + "&format=json"
	fmt.Println(url)
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
	// data := make([]Item, 0) のように要素数0の slice としても良い

	if err := json.Unmarshal(body, &F); err != nil {
		return nil, err
	}
	return &F, nil

}