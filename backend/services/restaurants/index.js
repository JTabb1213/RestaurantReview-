const config = require('config');
let _delagate;

const PROVIDERS = {
    GOOGLEMAPAPI: 'googlemapapi'
}

const provider = config.get("providers.map");
_delagate = require('./providers/googleRestaurants');
console.log(`Using ${provider} as the map provider`);
async function getRestaurants(city, keyword, nextPageToken) {
    return _delagate.getRestaurants.apply(_delagate, arguments);
}

async function getRestaurantInfoById(id) {
    return _delagate.getRestaurantInfoById.apply(_delagate, arguments);
}
module.exports = {
    getRestaurants: getRestaurants,
    getRestaurantInfoById: getRestaurantInfoById
}
