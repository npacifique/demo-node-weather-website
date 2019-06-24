const request = require('request')

const getWeather  = (cordiante, callBack )=>{
    
    const url = 'https://api.darksky.net/forecast/49fcbee01b822c27f2df61e783fb3820/'+cordiante.center[1]+','+cordiante.center[0]+'?lang=en'
    
    request({url, json:true}, (error, response)=>{
        if(!error){
             callBack(response.body)
        }
        else
        {
            callBack(error)
        }




    } )
}
    

module.exports = {
    getWeather : getWeather
}