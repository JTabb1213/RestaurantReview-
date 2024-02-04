const axios = require('axios');
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";
const location = require('../../location');
const { CityDoesNotExistError } = require('../../../errors');

async function getRestaurants(city, keyword = null, nextPageToken = null) {
    try {
        let coordinates;

        if (city.toLowerCase() === 'my location') {
            coordinates = await location.getMyLocation();
        } else {
            coordinates = await location.getCoordinates(city);
        }

        if (coordinates === null) {
            throw new CityDoesNotExistError(`${city}`);
        }

        let apiURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&radius=5000&type=restaurant&key=${apiKey}` + (nextPageToken ? `&pagetoken=${nextPageToken}` : '');

        if (keyword) {
            apiURL += `&keyword=${encodeURIComponent(keyword)}`;//encode url to include special chars like spaces
        }

        // console.log("Here", coordinates);
        //console.log("API URL:", apiURL);
        const response = await axios.get(apiURL);
        //console.log("res:", response.data);

        //console.log(response.data.results)
        //console.log(response.data.next_page_token)

        const places = response.data.results.map(place => ({
            name: place.name,
            address: place.vicinity,
            id: place.place_id
        }));

        const responseData = {
            restaurants: places,
            nextPageToken: response.data.next_page_token
        }


        //const nextPageToken = response.data.next_page_token;

        //if (nextPageToken) {
        //    places.push({ nextPageToken });
        //}

        return responseData;

    } catch (error) {
        console.error('Error fetching nearby places:', error);
        throw error;
    }
}

async function getRestaurantInfoById(id) {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=${apiKey}`
        const response = await axios.get(url);
        //console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error searching by id', error);
        throw error;
    }
}

module.exports = {
    getRestaurants: getRestaurants,
    getRestaurantInfoById: getRestaurantInfoById
}

///TO GET MORE RESULTS:
/*
try {
        const coordinates = await location.getCoordinates(city);
        let nextPageToken = null;
        let allPlaces = [];

        do {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.lat},${coordinates.lng}&radius=1500&type=restaurant&key=${apiKey}` +
                (nextPageToken ? `&pagetoken=${nextPageToken}` : '')
            );

            const places = response.data.results.map(place => ({
                name: place.name,
                address: place.vicinity,
                place_id: place.place_id
            }));

            allPlaces = allPlaces.concat(places);
            nextPageToken = response.data.next_page_token;

            // Wait for a few seconds before making the next request
            await new Promise(resolve => setTimeout(resolve, 2000));

        } while (nextPageToken);

        return allPlaces;
    } catch (error) {
        console.error('Error fetching nearby places:', error);
        throw error;
    }
*/