const request = require('request')

const forecast = (latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=dfdccd1a36126f08524d72152ae670bf&query=' + latitude + ',' + longitude + '&units=m'
    // request({url: url, json: true},(error, response) =>{
    request({url, json: true},(error, { body } = {}) =>{
        if(error){
            callback('Unable to connect to weather service!', undefined)
        }
        else if(body.error){
            callback('Specify a valid location!', undefined)
        }
        else{
            const curr = body.current
            callback(undefined, curr.weather_descriptions[0]+'. Current temperature out is ' + curr.temperature + ' But it feels like ' + curr.feelslike + '\nCurrently humidity is ' + curr.humidity + '%.')
                // {
                // weather_description: response.body.current.weather_descriptions[0],
                // current_temp: response.body.current.temperature,
                // feels_like: response.body.current.feelslike
            // })
        }
    })
}

module.exports = forecast