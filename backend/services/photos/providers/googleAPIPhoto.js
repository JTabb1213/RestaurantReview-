
const apiKey = "AIzaSyD3AjCFux3-Q7YoYo-v1OyjcOY0tabKUVc";
async function getPhotos(photoReference) {
    try {
        return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photoReference}&key=${apiKey}`
    } catch (error) {
        console.log("error getting google photos");
        return null;
    }
}

module.exports = {
    getPhotos: getPhotos
}