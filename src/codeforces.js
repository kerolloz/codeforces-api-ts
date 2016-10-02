"use strict";

import * as _ from "lodash";
import moment from 'moment';
import qs from 'qs';
import randomstring from 'randomstring';
import request from 'request';
import sha512 from 'crypto-js/sha512';


/**
 * Main API class
 */
class CF {

    /**
     * Class constructor, It will Set default routes and options,
     */
    constructor () {

        //credentials for api call
        this.options = {
            API_URL: "http://codeforces.com/api",
            API_KEY: "",
            API_SECRET: "",
            DEFAULT_TIMEOUT: 60000  //1 minute
        };

        //user method
        this.user = {
            blogEntries: callApi.bind(this,"user.blogEntries"),
            friends: callApi.bind(this,"user.friends"),
            info: callApi.bind(this,"user.info"),
            ratedList: callApi.bind(this,"user.ratedList"),
            rating: callApi.bind(this,"user.rating"),
            status: callApi.bind(this,"user.status")
        };

        //contest method
        this.contest = {
            hacks: callApi.bind(this,"contest.hacks"),
            list: callApi.bind(this,"contest.list"),
            ratingChanges: callApi.bind(this,"contest.ratingChanges"),
            standings: callApi.bind(this,"contest.standings"),
            status: callApi.bind(this,"contest.status")
        };

        //all problemset method
        this.problemset = {
            problems: callApi.bind(this,"problemset.problems"),
            recentStatus: callApi.bind(this,"problemset.recentStatus")
        };

        //blog method
        this.blogEntry = {
            comments: callApi.bind(this,"blogEntry.comments"),
            view: callApi.bind(this,"blogEntry.view")
        };

        //recent news method
        this.recentActions = callApi.bind(this,"recentActions");
    }


    /**
     * Set api and api secret key for authenticate a API request.
     *
     * @param {string} API_KEY - user api key
     * @param {string} API_SECRET - user api secret
     */
    setApis (API_KEY = "", API_SECRET = "") {
        this.options.API_KEY = API_KEY;
        this.options.API_SECRET = API_SECRET;
    }
}


/**
 * Main HTTP request function.
 * About method and parameters, see official doc - http://codeforces.com/api/help/
 *
 * @param {string} method - method of API request. [see doc]
 * @param {object} params - API url parameters [see doc]
 * @param {function} cb - callback function for async request
 * @returns {*}
 */
function callApi(method, params, cb) {

    let opts = this.options;

    //validate api key
    let noApiKey = typeof opts.API_KEY !== 'string' || opts.API_KEY.length === 0 || typeof opts.API_SECRET !== 'string' || opts.API_SECRET.length === 0;
    if( noApiKey ){
        return cb(new Error("API key and API secret required.Please set before calling api."));
    }

    opts.method = method;

    //final url of API request
    let url = makeApiUrl(opts,params);


    //request config
    let requestConfig = {
        uri: url,
        json: true,
        timeout: process.env.CF_TIMEOUT || opts.DEFAULT_TIMEOUT
    };

    //return request for streaming, some data are so big
    return request(requestConfig, function (err,httpResponse,body) {
        if(err){
            return cb(err);
        }

        //API request failed
        if( body.status !== 'OK' ){
            return cb(new Error(body.comment));
        }

        return cb(null,body.result);
    });
}


/**
 * Generate API url according to CF API rules
 *
 * @param {array} options - main class options
 * @param {array} params - API url parameters [see doc]
 * @returns {string} - final url
 */
function makeApiUrl(options,params) {

    //main query to add in API url request
    let query = params;
    let curTime = moment().unix();
    let randomToken = randomstring.generate(6);

    query.time = curTime;
    query.apiKey  = options.API_KEY;

    //if any parameter given as array, make it string separated by semicolon(;)
    for(let key in params){
        if( _.isArray(params[key]) ){
            params[key] = _.join(params[key],';');
        }
    }


    //sort the parameters according to codeforces API rules
    query = _
        .chain(query)
        .map( function(val, key) {
            return { key: key, value: val }
        })
        .orderBy(['key', 'value'], ['desc', 'desc'])
        .reverse()
        .keyBy('key')
        .mapValues('value')
        .value();

    let apiSig =  randomToken + '/' + options.method + '?' + qs.stringify(query,{ encode: false }) + '#' + options.API_SECRET;
    apiSig = sha512(apiSig).toString();
    query.apiSig = randomToken + apiSig;

    let url = options.API_URL + '/' + options.method + '?' + qs.stringify(query,{ encode: false });

    return url;
}


var Codeforces = new CF();
export default Codeforces;
module.exports = Codeforces;