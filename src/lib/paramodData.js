import * as moment from 'moment';
import * as axios from 'axios';

class ParamodData {

    constructor() {
        this.get = this.get.bind(this);
    }

    get(config) {
        var request = {
                dt: config.datetime.format('x')
            },
            program = (!config.view3d || config.view3d === undefined) ? 'paramod/' : 'paramod3d/',
            url = (process.env.REACT_APP_BACKEND_URL !== undefined) ?
            (process.env.REACT_APP_BACKEND_URL + program) : 'http://localhost:8888/api/v1/paramod/';

        return new Promise(function (resolve, reject) {
            var dt = config.datetime.format('x'),
                dd = (config.view3d) ? '3d' : '2d',
                cache = JSON.parse(localStorage.getItem("www.magnetospehe.ru/ParamodData")),
                cached = false;

            dt = Math.floor(dt/3600/1000)*3600*1000;
            // console.log(dt);
            if (cache !== null) {
                cache[dd].data.forEach(function (d) {
                	if (d.dt === dt.toString()) {
                        cached = true;
                        resolve(d.response);
                    }
                });
            }
            if (!cached) {
                axios.post(
                    url, request, {
                        withCredentials: true
                    }).then(function (response) {
                    if (cache === null) {
                        cache = {
                            '2d': {
                                index: 0,
                                data: []
                            },
                            '3d': {
                                index: 0,
                                data: []
                            }
                        };
                    }

                    if (cache[dd].data.length < 10) {
                        cache[dd].data.push({
                            dt: moment(response.data.dt).format('x'),
                            response: response
                        });
                        cache[dd].index = (cache[dd].index + 1) % 10;
                    } else {
                        cache[dd].data[cache[dd].index] = {
                            dt: moment(response.data.dt).format('x'),
                            response: response
                        }
                        cache[dd].index = (cache[dd].index + 1) % 10;
                    }
                    localStorage.setItem("www.magnetospehe.ru/ParamodData", JSON.stringify(cache));
                    resolve(response);
                }, function () {
                    reject();
                });
            }
        });
    }
}

var paramodData = new ParamodData();

export default paramodData;