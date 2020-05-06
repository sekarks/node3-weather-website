const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2VrYXJrIiwiYSI6ImNrOW4wcGd2czAwNG8zbHFxYWE0bjV6MXgifQ.TAhgFkSMCeBi0CikGoi6VQ&limit=1'
    request ({ url:url,json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to location service ')
        } else if (body.features.length ===0) {
            callback('unable to find location ')
        } else { callback (undefined, {
          latitude: body.features[0].center[1],
          longitute: body.features[0].center[0],
          location:  body.features[0].place_name}
            )
        }
    })
  
}

module.exports = geocode
