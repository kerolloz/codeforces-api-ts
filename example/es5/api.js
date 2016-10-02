var Codeforces = require('../../dist/codeforces');

var fs = require('fs');

var apiKey = process.env.CFK;
var apiSecret = process.env.CFS;

Codeforces.setApis(apiKey, apiSecret);

var params = {
    contestId: 566,
    from: 1,
    count: 2,
    showUnofficial:true,
    handles: 'rng_58;W4yneb0t'
};

Codeforces.contest.standings(params,function (err,result) {

    if (err) {
        return console.log(err);
    }

    console.log(result);

});


/*.on('data', function(data) {
    // decompressed data as it is received
    console.log('decoded chunk: ' + data)
})
    .on('response', function(response) {
        // unmodified http.IncomingMessage object
        response.on('data', function(data) {
            // compressed data as it is received
            console.log('received ' + data.length + ' bytes of compressed data')
        })
    }).pipe(fs.createWriteStream('./files/rate.json'));*/





