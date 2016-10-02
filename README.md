# NodeJS Client Library for [Codeforces API](http://codeforces.com/api/help)

[![Build Status](https://travis-ci.org/ahmed-dinar/codeforces-api-node.svg?branch=master)](https://travis-ci.org/ahmed-dinar/codeforces-api-node) 
[![Coverage Status](https://coveralls.io/repos/github/ahmed-dinar/codeforces-api-node/badge.svg?branch=master)](https://coveralls.io/github/ahmed-dinar/codeforces-api-node?branch=master)

codeforces-api-node is a simple NodeJS library for Codeforces Api with streaming support.

## Install
  ```
  $ npm install codeforces-api
  ```
  
## Usage

codeforces-api-node supports both ES5 and ES6.

#### Basic

```javascript

//ES5
var Codeforces = require('codeforces-api');

//ES2015
import Codeforces from 'codeforces-api';

//set API keys for authentication
Codeforces.setApis('your_codeforces_api_key', 'your_codeforces_api_secret');


Codeforces.method( parameters , callback );
```

#### Usage

```javascript
Codeforces.user.rating({ handle: 'user_handle' } , function (err, data) {

    if (err) {
        //handle error and return
    }

    //use data
});
```



### Methods & Parameters


| Method                   | Parameters                                                  |  Description |
| -----------------------  | ----------------------------------------------------------- |:-------------------------------------------------------------------:|
| blogEntry.comments       | blogEntryId                                                 |  [More](http://codeforces.com/api/help/methods#blogEntry.comments)  |
| blogEntry.view           | blogEntryId                                                 |  [More](http://codeforces.com/api/help/methods#blogEntry.view)  |
| contest.hacks            | contestId                                                   |  [More](http://codeforces.com/api/help/methods#contest.hacks)  |
| contest.list             | gym                                                         |  [More](http://codeforces.com/api/help/methods#contest.list)  |
| contest.ratingChanges    | contestId                                                   |  [More](http://codeforces.com/api/help/methods#contest.ratingChanges)  |
| contest.standings        | contestId , from , count , handles ,  room , showUnofficial |  [More](http://codeforces.com/api/help/methods#contest.standings)  |
| contest.status           | contestId , handle , from , count                           |  [More](http://codeforces.com/api/help/methods#contest.status)  |
| problemset.problems      | tags                                                        |  [More](http://codeforces.com/api/help/methods#problemset.problems )  |
| problemset.recentStatus  | count                                                       |  [More](http://codeforces.com/api/help/methods#problemset.recentStatus)  |
| recentActions            | maxCount                                                    |  [More](http://codeforces.com/api/help/methods#recentActions)  |
| user.blogEntries         | handle                                                      |  [More](http://codeforces.com/api/help/methods#user.blogEntries)  |
| user.friends             | onlyOnline                                                  |  [More](http://codeforces.com/api/help/methods#user.friends)  |
| user.info                | handles                                                     |  [More](http://codeforces.com/api/help/methods#user.info)  |
| user.ratedList           | activeOnly                                                  |  [More](http://codeforces.com/api/help/methods#user.ratedList)  |
| user.rating              | handle                                                      |  [More](http://codeforces.com/api/help/methods#user.rating)  |
| user.status              | handle , from , count                                       |  [More](http://codeforces.com/api/help/methods#user.status)  |


## Authorization

 To access data, API key must be needed.To generate API and SECRET KEY visit:  http://codeforces.com/settings/api
 
 
## Return Data

  All data return as JSON format.For more details about every data format visit:  http://codeforces.com/api/help/objects
 


## Streaming

>
> This feature and example from npm **request** pakages. For more have a look : https://github.com/request/request
>


You can stream responses to a file stream.When json data is huge, you may need this feature.

```javascript
Codeforces.user.ratedList( parameters, callback ).pipe( fs.createWriteStream('./rateedList.json') );
```

Also emits response events.

```javascript
Codeforces.user.ratedList( parameters, function(err, data){

    if(err){ //request error  }
    
    //data also available here

}).on('data', function(data) {
    // decompressed data as it is received
    console.log('decoded chunk: ' + data)
})
.on('response', function(response) {

    // unmodified http.IncomingMessage object
    response.on('data', function(data) {
        // compressed data as it is received
        console.log('received ' + data.length + ' bytes of compressed data')
    });
       
}).pipe( fs.createWriteStream('./ratedList.json') );
```

## License

##### MIT © [Ahmed Dinar](https://ahmeddinar.com/)
