import axios from 'axios';

export const geocode = async (place, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(place) + '&access_token=pk.eyJ1IjoiZGt1bWFyMjQ3IiwiYSI6ImNrYWxkNXZiejBneGczMHM5bjN4eGZ1NjQifQ.I6ajiXIhv8RC4KI3Q0FoiA&limit=1'

    try {
        const response = await axios.get(url);
        const body = response.data;

        if (body.features.length === 0) {
            callback('Not a valid place!', undefined);
        } else {
            callback(undefined, {
                location: body.features[0].properties.full_address,
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude
            });
        }
    } catch (error) {
        callback('Unable to connect to geocode service!', undefined)
    }
}