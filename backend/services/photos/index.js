const config = require('config');
let _delagate;

const PROVIDERS = {
    GOOGLEMAPAPI: 'googlemapapi'
}

const provider = config.get("providers.map");
_delagate = require('./providers/googleAPIPhoto');
console.log(`Using ${provider} as the map provider`);
async function getPhotos(reference) {
    return _delagate.getPhotos.apply(_delagate, arguments);
}

module.exports = {
    getPhotos: getPhotos
}