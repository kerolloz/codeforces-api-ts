var fs          = require('fs');
var Codeforces  = require('../../dist/codeforces');

var apiKey = process.env.CFK;
var apiSecret = process.env.CFS;

Codeforces.setApis(apiKey, apiSecret);

var parameters = {
    handles: ['rng_58','W4yneb0t'] //or 'rng_58;W4yneb0t'
};

Codeforces.user.info(parameters, function (err,data) {
    if(err){
        return console.log(err);
    }
    console.log(data);
    console.log('huha');
});

/*
    .on('data', function(data) {
        // decompressed data as it is received
        console.log('decoded chunk: ' + data)
    })
    .on('response', function(response) {
        // unmodified http.IncomingMessage object
        response.on('data', function(data) {
            // compressed data as it is received
            console.log('received ' + data.length + ' bytes of compressed data')
        })
    }).pipe( fs.createWriteStream('./example/files/rate.json') );*/





