const request = require('request');

const geocode = (address, cb) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/` + encodeURIComponent(address) + `.json?access_token=pk.eyJ1Ijoia2pkbmtqIiwiYSI6ImNsNjYzbWN1aDBidmgzY21wM3Nva2s3cmcifQ.BIkogZm7ZZi_cfr_ZkPnDA&limit=1`;

    request({url, json: true}, (error, { body } ) => {
        if(error){
            cb('unable to connect to location services', undefined);
        }
        else if(body.features.length === 0){
            cb('Unable to find location', undefined);
        }
        else{
            
            cb(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
            
        }
    })
}

module.exports = geocode;