const request = require('request')

const forecast = (City, Country, callback) => {
    const url = 'http://api.openweathermap.org/data/2.5/weather?q='+City+','+Country+'&APPID=cf06f28816258a714d34d93340724302'
    request({url, json: true}, (error, {body}) => {
        if(error)
        {
            callback('Unable to connect to weather service!',undefined)
        }
        else if(body.timezone === 0)
        {
            callback('Unable to find the location!', undefined)
        }
        else
        {
            callback(undefined, {
                City: 'Bangalore',
                Country: 'India'
            })
        }
    })
}

module.exports = forecast