# NodeJS Client Library for [Codeforces API](http://codeforces.com/api/help)

[![Build Status](https://travis-ci.org/ahmed-dinar/codeforces-api-node.svg?branch=master)](https://travis-ci.org/ahmed-dinar/codeforces-api-node)
[![Coverage Status](https://coveralls.io/repos/github/ahmed-dinar/codeforces-api-node/badge.svg?branch=master)](https://coveralls.io/github/ahmed-dinar/codeforces-api-node?branch=master)
[![npm version](https://badge.fury.io/js/codeforces-api.svg)](https://badge.fury.io/js/codeforces-api)
[![Dependency Status](https://david-dm.org/ahmed-dinar/codeforces-api-node.svg)](https://david-dm.org/ahmed-dinar/codeforces-api-node)

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

>Full description of the API can be found on : [Official API Doc](http://codeforces.com/api/help)

| Method                   | Parameters                                                   |  Description |
| -----------------------  | ------------------------------------------------------------ |:-------------------------------------------------------------------:|
| blogEntry.comments       | *blogEntryId                                                 |  [More](http://codeforces.com/api/help/methods#blogEntry.comments)  |
| blogEntry.view           | *blogEntryId                                                 |  [More](http://codeforces.com/api/help/methods#blogEntry.view)  |
| contest.hacks            | contestId                                                    |  [More](http://codeforces.com/api/help/methods#contest.hacks)  |
| contest.list             | gym                                                          |  [More](http://codeforces.com/api/help/methods#contest.list)  |
| contest.ratingChanges    | *contestId                                                   |  [More](http://codeforces.com/api/help/methods#contest.ratingChanges)  |
| contest.standings        | *contestId , from , count , handles ,  room , showUnofficial |  [More](http://codeforces.com/api/help/methods#contest.standings)  |
| contest.status           | *contestId , handle , from , count                           |  [More](http://codeforces.com/api/help/methods#contest.status)  |
| problemset.problems      | tags                                                         |  [More](http://codeforces.com/api/help/methods#problemset.problems )  |
| problemset.recentStatus  | *count                                                       |  [More](http://codeforces.com/api/help/methods#problemset.recentStatus)  |
| recentActions            | *maxCount                                                    |  [More](http://codeforces.com/api/help/methods#recentActions)  |
| user.blogEntries         | *handle                                                      |  [More](http://codeforces.com/api/help/methods#user.blogEntries)  |
| user.friends             | onlyOnline                                                   |  [More](http://codeforces.com/api/help/methods#user.friends)  |
| user.info                | *handles                                                     |  [More](http://codeforces.com/api/help/methods#user.info)  |
| user.ratedList           | activeOnly                                                   |  [More](http://codeforces.com/api/help/methods#user.ratedList)  |
| user.rating              | *handle                                                      |  [More](http://codeforces.com/api/help/methods#user.rating)  |
| user.status              | *handle , from , count                                       |  [More](http://codeforces.com/api/help/methods#user.status)  |
> *required parameters

#### Note
**handles** and **tags** can be multiple.There are two different ways to set:
  1. Semicilon-separated string:

  ```javascript
  tags: 'greedy;dp;graphs'
  ```

  2. As array:

  ```javascript
  tags: ['greedy','dp','graphs']
  ```


## Authorization

 Although most of the method of the API supports anonymously request, ```codeforces-api-node``` does not allow anonymous request yet.To access API data, must set API and SECRET key before calling methods.To generate API and SECRET KEY visit: [API Settings](http://codeforces.com/settings/api)


## Return Data

  All data return in JSON format.For full description of data format visit:  [Return Objects](http://codeforces.com/api/help/objects)



## Streaming

>
> This feature and example from npm **request** package. For more have a look : [Request Package Doc](https://github.com/request/request)
>


You can stream responses to a file stream.When json data is huge, you may need this feature.

```javascript
Codeforces.user.ratedList( parameters, callback )
               .pipe( fs.createWriteStream('./rateedList.json') );

//version >= 1.0.2 (with or without callback)
Codeforces.user.ratedList( parameters )
               .pipe( fs.createWriteStream('./ratedList.json') );
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

## Contributing
  Everyone wellcome!
  * Create an issue > [Fork](https://github.com/ahmed-dinar/codeforces-api-node/fork) > Create own branch > Commit changes > Push the branch > Creat pull request


## Test

  Before running test, must set API and SECRET key in environment variable.Keys are:
  ```javascript
 CFK = API Key
 CFS = API Secret
  ```
  After setting keys, simply run
  ```javascript
  npm test
  ```

## License

##### MIT © [Ahmed Dinar](https://ahmeddinar.com/)
