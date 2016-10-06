"use strict";

import * as _ from "lodash";
import qs from 'qs';
import randomstring from 'randomstring';
import Request from 'request/request';
import sha512 from 'crypto-js/sha512';


/**
 * Main API class
 */
class CF {

    constructor () {

        //
        // credentials for API call
        //
        this.options = {
            API_URL: "http://codeforces.com/api",
            API_KEY: "",
            API_SECRET: "",
            DEFAULT_TIMEOUT: 60000  //1 minute
        };


        //
        // user method
        //
        this.user = {
            blogEntries: callApi.bind(this,"user.blogEntries"),
            friends: callApi.bind(this,"user.friends"),
            info: callApi.bind(this,"user.info"),
            ratedList: callApi.bind(this,"user.ratedList"),
            rating: callApi.bind(this,"user.rating"),
            status: callApi.bind(this,"user.status")
        };


        //
        // contest method
        //
        this.contest = {
            hacks: callApi.bind(this,"contest.hacks"),
            list: callApi.bind(this,"contest.list"),
            ratingChanges: callApi.bind(this,"contest.ratingChanges"),
            standings: callApi.bind(this,"contest.standings"),
            status: callApi.bind(this,"contest.status")
        };


        //
        // all problemset method
        //
        this.problemset = {
            problems: callApi.bind(this,"problemset.problems"),
            recentStatus: callApi.bind(this,"problemset.recentStatus")
        };


        //
        // blog method
        //
        this.blogEntry = {
            comments: callApi.bind(this,"blogEntry.comments"),
            view: callApi.bind(this,"blogEntry.view")
        };


        //
        // recent news method
        //
        this.recentActions = callApi.bind(this,"recentActions");
    }


    /**
     * @param {string} API_KEY - user API key
     * @param {string} API_SECRET - user API secret
     */
    setApis (API_KEY = "", API_SECRET = "") {
        this.options.API_KEY = API_KEY;
        this.options.API_SECRET = API_SECRET;
    }
}



/**
 * Send request to api
 *
 * @param {string} method - method of API request.
 * @param {object} parameters - API url parameters
 * @param {function} callback
 * @returns {*}
 */
function callApi(method, parameters, callback) {

    if (typeof parameters === 'undefined') {
        throw new Error('undefined is not a valid parameters object.');
    }

    if( typeof parameters !== 'object' ){
        throw new Error('valid parameters object required.');
    }

    var opts = this.options;

    var noCallback = !callback || typeof callback !== 'function';
    let noApiKey = typeof opts.API_KEY !== 'string' || opts.API_KEY.length === 0 || typeof opts.API_SECRET !== 'string' || opts.API_SECRET.length === 0;
    if( noApiKey ){
        if( noCallback ){
            throw new Error('API key and API secret required.');
        }
        return callback(new Error("API key and API secret required."));
    }

    opts.method = method;

    //
    // final API url with hashes
    //
    let url = makeApiUrl(opts, parameters);

    let reqOptions = {
        uri: url,
        json: true,
        timeout: process.env.CF_TIMEOUT || opts.DEFAULT_TIMEOUT
    };


    //
    // callback not exists, just return the request modules Request class instance for event
    //
    if( noCallback ){
        return new Request(reqOptions);
    }

    //
    // callback exists, return Request for streaming and handle callback for error handling and custom formatted data
    //
    return callRequest(reqOptions, handleCallback.bind(null,callback) );
}


/**
 * Handle user callback
 *
 * @param callback - user callback
 * @param err - request errors
 * @param httpResponse - request HTTP response
 * @param body - request response body
 * @returns {*}
 */
function handleCallback(callback, err, httpResponse, body) {

    if(err){
        return callback(err);
    }

    //
    // API returns error
    //
    if( body.status !== 'OK' ){
        return callback(new Error(body.comment));
    }

    return callback(null, body.result);
}


/**
 * Call request modules main class instead of base function
 * @param options
 * @param callback
 * @returns {Request}
 */
function callRequest(options,callback) {
    options.callback = callback;
    return new Request(options);
}


/**
 * Generate API url according to CF API rules
 *
 * @param {array} options - main class options
 * @param {array} parameters - API url parameters [see doc]
 * @returns {string} - final url
 */
function makeApiUrl(options,parameters) {

    var query = parameters;

    //
    // If any parameter given in array, make it string separated by semicolon(;)
    //
    for(let key in query){
        if( _.isArray(query[key]) ){
            query[key] = _.join(query[key],';');
        }
    }

    let curTime = Math.floor(Date.now() / 1000);
    let randomToken = randomstring.generate(6);

    query.time = curTime;
    query.apiKey  = options.API_KEY;

    //
    // Sort parameters according to codeforces API rules
    //
    query = _
        .chain(query)
        .map( (value, key) => {
            return { key, value };
        })
        .orderBy(['key', 'value'], ['desc', 'desc'])
        .reverse()
        .keyBy('key')
        .mapValues('value')
        .value();

    let qsFy = qs.stringify(query,{ encode: false });
    let apiSig = `${randomToken}/${options.method}?${qsFy}#${options.API_SECRET}`;

    apiSig = sha512(apiSig).toString();
    query.apiSig = randomToken + apiSig;
    qsFy = qs.stringify(query,{ encode: false });

    let url = `${options.API_URL}/${options.method}?${qsFy}`;

    return url;
}


var Codeforces = new CF();
export default Codeforces;
module.exports = Codeforces;