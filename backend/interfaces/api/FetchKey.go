package api

import (
	"errors"
	"os"

	"github.com/joho/godotenv"
)

func (r *RestaurantRepository) FetchKey() (string, error) {
	err := godotenv.Load()
	if err != nil {
		return "", errors.New("read access")
	}
	key := os.Getenv("ACCESS_KEY")
	return key, nil

}
