/*jslint browser: true*/
/*jslint nomen: true */
/*global $, jQuery, alert, Highcharts, window.define, exports, module, console, require, process, __line, __dirname, Promise*/

(function (root, factory) {
    "use strict";
    if (typeof window.define === 'function' && window.define.amd) {
        window.define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.SDDSDownloaders = factory();
    }
}(this, function () {
    "use strict";

    var axios = require('axios'),
        config = require('./config'),
        base_url = (typeof window === 'undefined') ? 'http://localhost:8888' : config.getBaseURL(),
        api = config.getAPI(),
        cache = [],
        data = [],
        dataIndex = 0,
        cacheLength = 5,
        inCache = function (url) {
            var i;

            for (i = 0; i < cache.length; i += 1) {
                if (url === cache[i].url) {
                    return cache[i].data;
                }
            }

            return false;
        },
        SDDSDownloaders = {
            loadStations: function () {
                var url = base_url + api.stations,
                    data = inCache(url),
                    promise;

                return new Promise(function (resolve, reject) {
                    if (data === false) {
                        axios.get(url, {
                            withCredentials: true
                        }).then(function (response) {
                            data = response.data;
                            if (response.data.result.code === 0) {
                                cache.push({
                                    url: url,
                                    data: data
                                });
                            }
                            resolve(data);
                        }, function (error) {
                            resolve({
                                data: {
                                    result: {
                                        code: 13,
                                        message: 'Cannot connect to server'
                                    }
                                }
                            });
                        });
                    } else {
                        resolve(data);
                    }
                });
            },

            loadInstruments: function (stationID) {
                var url = base_url + api.instruments.replace(':norad_id', stationID),
                    data = inCache(url),
                    promise;

                return new Promise(function (resolve, reject) {
                    if (data === false) {
                        axios.get(url, {
                            withCredentials: true
                        }).then(function (response) {
                            data = response.data;
                            if (response.data.result.code === 0) {
                                cache.push({
                                    url: url,
                                    data: data
                                });
                            }
                            resolve(data);
                        }, function (error) {
                            resolve({
                                data: {
                                    result: {
                                        code: 13,
                                        message: 'Cannot connect to server'
                                    }
                                }
                            });
                        });
                    } else {
                        resolve(data);
                    }
                });

            },

            loadChannels: function (stationID, instrumentID) {
                var url = base_url + api.channels.replace(':norad_id', stationID).replace(':instr_id', instrumentID),
                    data = inCache(url),
                    promise;

                return new Promise(function (resolve, reject) {
                    if (data === false) {
                        axios.get(url, {
                            withCredentials: true
                        }).then(function (response) {
                            data = response.data;
                            if (response.data.result.code === 0) {
                                cache.push({
                                    url: url,
                                    data: data
                                });
                            }
                            resolve(data);
                        }, function (error) {
                            resolve({
                                data: {
                                    result: {
                                        code: 13,
                                        message: 'Cannot connect to server'
                                    }
                                }
                            });
                        });
                    } else {
                        resolve(data);
                    }
                });
            },

            loadData: function (request) {
                var url = base_url + api.query,
                    actualRequest = {
                        request: {
                            where: request.request.where,
                            select: []
                        }
                    },
                    isNew = data.length === 0 ? true : false,
                    dt = data[dataIndex],
                    where = request.request.where,
                    founded = false;

                //console.log(request);

                if (isNew === true) {
                    data[dataIndex] = {
                        min_dt: where.min_dt,
                        max_dt: where.max_dt,
                        resolution: where.resolution,
                        series: []
                    };
                } else {
                    if (data[dataIndex].min_dt !== where.min_dt || data[dataIndex].max_dt !== where.max_dt || data[dataIndex].resolution !== where.resolution) {
                        data[dataIndex] = {
                            min_dt: where.min_dt,
                            max_dt: where.max_dt,
                            resolution: where.resolution,
                            series: []
                        };
                        isNew = true;
                    }
                }

                request.request.select.map(function (select) {
                    var arr = select.split(':'),
                        id = arr[0];
                    if (isNew === false) {
                        founded = false;
                        //console.log('select: ' + id);
                        data[dataIndex].series.map(function (item) {
                            //console.log('item: ' + item.id);
                            if (item.id === id) {
                                founded = true;
                                if (item.data.length <= 2) {
                                    actualRequest.request.select.push(select);
                                }
                            }
                        });
                        if (founded === false) {
                            actualRequest.request.select.push(select);
                            data[dataIndex].series.push({
                                id: id,
                                data: []
                            });
                        }
                    } else {
                        data[dataIndex].series.push({
                            id: id,
                            data: []
                        });
                        actualRequest = request;
                    }
                });

                if (actualRequest.request.where.resolution === 'auto') {
                    delete actualRequest.request.where.resolution;
                }

                if (request.request.options !== undefined) {
                    actualRequest.request.options = request.request.options;
                }
                //console.log(actualRequest);
                //console.log(url);

                return new Promise(function (resolve, reject) {
                    if (actualRequest.request.select.length === 0) {
                        resolve(true);
                    } else {
                        axios.post(url, actualRequest, {
                            withCredentials: true
                        }).then(function (response) {
                            //console.log(response.data.data);
                            response.data.data.map(function (item) {
                                var arr = item.request.split(':'),
                                    id = arr[0];

                                data[dataIndex].series.map(function (series) {
                                    if (series.id === id) {
                                        series.data = item.response;
                                    }
                                });
                                if (item.result.code !== 0) {
                                    console.log(item.result.message);
                                }
                            });
                            resolve(true);
                        }, function (error) {
                            console.log('Cannot connect to server');
                            resolve(false);
                        });
                    }
                });
            },

            getData: function (id) {
                var i,
                    series;
                //console.log(id);
                //console.log(data[dataIndex].series);
                if (data.length === 0) {
                    return [];
                }
                for (i = 0; i < data[dataIndex].series.length; i += 1) {
                    series = data[dataIndex].series[i];
                    if (series.id === id) {
                        return series.data;
                    }
                }
                return [];
            },

            getDataCount: function () {
                return data[dataIndex].series.length;
            },

            clearData: function () {
                data = [];
            }

        };

    return SDDSDownloaders;

}));