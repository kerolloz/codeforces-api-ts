import Codeforces from '../../dist/codeforces';
import fs from 'fs';

var apiKey = process.env.CFK;
var apiSecret = process.env.CFS;

Codeforces.setApis(apiKey, apiSecret);

var params = {
    count: 1
};

Codeforces.problemset.recentStatus(params,function (err,result) {

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
