const request = require('request')

const forecast = (latitude,longitute, callback) => {
   
    const url =  'http://api.weatherstack.com/current?access_key=4aa06f6798caa8c3fa4ca8d3de0f55ab&query='+ latitude + ',' +longitute +'&units=f'

    request ({ url:url,json:true},(error,{body}) => {
       if (error) {
         callback('Unable to connect weather services... ')        
        } else if(body.error) {
            callback('Invalid address !! Unable to find location !!')
        } else {callback( undefined, {
             currentTemp:   body.current.temperature,
             feelsLikeTemp:   body.current.feelslike})
        }
    })
  
}

module.exports = forecast
