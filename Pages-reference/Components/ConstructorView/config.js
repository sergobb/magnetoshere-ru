/*jslint browser: true*/
/*global $, jQuery, alert, Highcharts, define, exports, module, console*/

(function(root, factory) {
    "use strict";
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.SWXConfig = factory();
    }
}(this, function() {
    "use strict";

    var dataSources = '/plot/json/dataSources.json',
        data = '/plot/json/data.json',
        api = {
            stations: '/api/v1/downloaders',
            instruments: '/api/v1/downloaders/:norad_id/instruments',
            channels: '/api/v1/downloaders/:norad_id/instruments/:instr_id/channels',
            query: '/api/v1/query',
            templates_list: '/api/v1/templates',
            templates: '/api/v1/templates/:id'
        },
        base_url = (process.env.REACT_APP_BACKEND_URL !== undefined) 
            ? process.env.REACT_APP_BACKEND_URL
            : '/db_iface',
        //base_url = 'http://localhost:8888',
        // base_url = '/db_iface',
        debug = true,
        SWXConfig = {};

    SWXConfig.getDataSources = function() {
        return dataSources;
    };

    SWXConfig.getDataDescriptions = function() {
        return data;
    };

    SWXConfig.debug = function() {
        return debug;
    };

    SWXConfig.getAPI = function() {
        return api;
    };

    SWXConfig.getBaseURL = function() {
        return base_url;
    };

    return SWXConfig;

}));