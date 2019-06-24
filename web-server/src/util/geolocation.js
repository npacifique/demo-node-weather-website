const request = require('request')

const getLocation = (address, callBack)=>
{
    const url  = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibnBhY2lmaXF1ZSIsImEiOiJjandmN3djMXUwd3F0NDRucGN2aTR4eHZzIn0.cPYS-55XMmXJVsqQATDwzw&limit=1'

    request({url, json: true}, (error, response)=>{
        if(!error){

            callBack(response)   
        }
        else{
            callBack(error)
        }
                         
    })
}


module.exports = {
    getLocation : getLocation
}