const request = require('request')

const geocode = (place, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(place) + '.json?access_token=pk.eyJ1IjoiZGt1bWFyMjQ3IiwiYSI6ImNrYWxkNXZiejBneGczMHM5bjN4eGZ1NjQifQ.I6ajiXIhv8RC4KI3Q0FoiA&limit=1'
    // request({url: url, json:true}, (error, response)=>{
    request({url: url, json:true}, (error, { body } = {})=>{
        if(error){
            callback('Unable to connect to geocode service!', undefined)
        }
        else if(body.features.length===0){
            callback('Not a valid place!', undefined)
        }
        else{
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode