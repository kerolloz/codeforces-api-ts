"use strict";

class CF {

    constructor () {
        this.options = {
            API_KEY: '',
            API_SECRET: ''
        };
    }

    add (x=0,y=0) {
        return x+y;
    }

    setApiKey (API_KEY = 'no', API_SECRET = 'yes') {
        this.options = { API_KEY, API_SECRET };
    }

    getApiKey () {
        return this.options.API_KEY;
    }

    getApiSecret () {
        return this.options.API_SECRET;
    }

}

var Codeforces = new CF();
export default Codeforces;
module.exports = Codeforces;