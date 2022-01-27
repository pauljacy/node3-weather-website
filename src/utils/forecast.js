const request = require('request')

const forecast = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=93fda3fe2f1d1940c048b31afaadacfd&query=' + encodeURIComponent(longitude) + ',' + encodeURIComponent(latitude) +  '&units=f'

    request({url, json: true}, (error, {body} ) => {
        if ( error ) {
            callback('no response from the weather service!', undefined)
        }else if (error) {
            callback('Unable to find location for weather ' + response.body.error.code + ' ' + response.body.error.type + ' ' + response.body.error.info, undefined )
        }else {
            callback(undefined, body.current.weather_descriptions[0] + ' throughout the day.  It is currently ' + body.current.temperature + ' degrees outside.  There is a ' + 
            body.current.precip + '% chance of rain'  )
        }
    })
}

module.exports = forecast