import axios from 'axios';

export const forecast = async (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=98322c52218241db84b145140242408&q=' + latitude + ',' + longitude + '&aqi=no'

    try {
        const response = await axios.get(url);
        const body = response.data;

        if (body.error) {
            callback('Specify a valid location!', undefined);
        } else {
            const curr = body.current
            callback(undefined, `${curr.condition.text}. Current temperature out is ${curr.temp_c}°C  But it feels like ${curr.feelslike_c}°C\nCurrently humidity is ${curr.humidity}%.`);
        }
    } catch (error) {
        callback('Unable to connect to weather service!', undefined);
    }
};
