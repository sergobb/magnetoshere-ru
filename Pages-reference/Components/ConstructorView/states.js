(function(root, factory) {
    "use strict";
    if (typeof window.define === 'function' && window.define.amd) {
        window.define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.States = factory();
    }
}(this, function() {
    "use strict";
    var axios = require('axios'),
        config = require('./config'),
        base_url = (typeof window === 'undefined') ? 'http://localhost:8888' : config.getBaseURL(),
        api = config.getAPI(),
        states = {},
        States = {
            getState: function(name) {
                var url = base_url + api.templates.replace(':id', name);
                // console.log(config.getBaseURL());

                return new Promise(function(resolve, reject) {
                    if (states[name] !== undefined) {
                        resolve(states[name]);
                    } else {
                        axios.get(url, {
                            withCredentials: true
                        }).then(function(response) {
                            states[name] = response.data.data;
                            resolve(response.data.data);
                        });
                    }
                });
            }
        };

    return States;
}));