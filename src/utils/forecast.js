const request = require('request')

// const forecast = (latitude,longitude,callback) => {
//     const url = 'https://api.darksky.net/forecast/ef81f78bb4997342a4a91b49f6724d47/'+latitude+','+longitude
//     request({url : url, json : true}, function (error,response) {
//           if(error){
//               callback('Unable to connect to weather service',undefined)
//           }else if(response.body.error){
//               callback('Unable to find location',undefined)
//           }else{
//               callback(undefined,{
//                   temperature : response.body.currently.temperature,
//                   precipProbability : response.body.currently.precipProbability
//             })
//         }
//     })
// }

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/ef81f78bb4997342a4a91b49f6724d47/' + latitude + ',' + longitude
    request({url : url, json : true}, (error,{body}) => {
          if(error){
              callback('Unable to connect to weather service',undefined)
          }else if(body.error){
              callback('Unable to find location',undefined)
          }else{ 
              callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 'degrees out. There is a ')
        }
    })
}

module.exports = {
    forecast
}