import React, { Component, createElement as Element} from "react";
import Highcharts from "./highcharts/highchartsInit";
// import Highcharts from "highcharts";
import hcHelper from "./highcharts/helper";
import downloaders from "./downloaders";
import states from "./states";
import ReactHighcharts from "react-highcharts";
// import help from './constructor/views/dataView/help';
import moment from "moment";

class Helper {
	constructor() {
        this.isExporting = false;
		this.functions = {
	        sma: function(params) {
	            var id = params.id[0],
	                r = params.params.maRadius,
	                data = downloaders.getData(id),
	                length = data.length,
	                smaData = [],
	                i,
	                j,
	                k,
	                rad,
	                value,
	                c;

	            function radius(r, i, length) {
	                var left = i,
	                    right = length - i - 1,
	                    center = r;

	                return Math.min(left, right, center);
	            }

	            for (i = 0; i < length; i += 1) {
	                rad = radius(r, i, length);
	                value = 0.0;
	                for (j = i - rad; j < i + rad; j += 1) {
	                    c = data[j][1];
	                    if (c === null) {
	                        for (k = j; k >= 0; k -= 1) {
	                            c = data[k][1];
	                            if (c !== null) {
	                                break;
	                            }
	                        }
	                    }
	                    value += c;
	                }
	                value = value / (2 * rad + 1);
	                smaData.push([data[i][0], value]);
	            }

	            return smaData;
	        },
	        sum: function(params) {
	            var ids = params.id,
	                sum = [];

	            ids.map(function(id) {
	                var data = downloaders.getData(id),
	                    length = data.length,
	                    i;

	                for (i = 0; i < length; i += 1) {
	                    if (sum.length < i + 1) {
	                        sum.push([data[i][0], data[i][1]]);
	                    } else {
	                        sum[i][1] += data[i][1];
	                    }
	                }
	            });

	            return sum;
	        }
		}
	}

	loadState(name) {
        return states.getState(name);
    }

    derivedFunctions(type, params) {
    	if (this.functions[type] !== undefined) {
            return this.functions[type](params);
        } else {
            return [];
        }
    }

    setExporting() {
        this.isExporting = true;
    }

    unsetExporting() {
        this.isExporting = false;
    }

    isExportingSet() {
        return this.isExporting;
    }
}

let helper = new Helper();

class Actions {
	 getHeatmapData(type, data, index) {
        var heatdata = [],
            i,
            p,
            period = 1000000000000000,
            lastdate = 0;

        for (i = 0; i < data.length; i += 1) {
            p = data[i][0] - lastdate;
            lastdate = data[i][0];
            if (p < period) {
                period = p;
            }
            heatdata.push([
                data[i][0],
                index,
                (type === 'logarithmic' && data[i][1] <= 0.0) ? null : data[i][1]
            ]);
        }

        return {
            data: heatdata,
            period: period
        };
    }
    /* SMA part */
    getDerivedData(type, params) {
        return helper.derivedFunctions(type,params);
    }

    getSMAData(id, r) {
        var data = downloaders.getData(id),
            length = data.length,
            smaData = [],
            i,
            j,
            k,
            rad,
            value,
            c;

        function radius(r, i, length) {
            var left = i,
                right = length - i - 1,
                center = r;

            return Math.min(left, right, center);
        }

        for (i = 0; i < length; i += 1) {
            rad = radius(r, i, length);
            value = 0.0;
            for (j = i - rad; j < i + rad; j += 1) {
                c = data[j][1];
                if (c === null) {
                    for (k = j; k >= 0; k -= 1) {
                        c = data[k][1];
                        if (c !== null) {
                            break;
                        }
                    }
                }
                value += c;
            }
            value = value / (2 * rad + 1);
            smaData.push([data[i][0], value]);
        }

        return smaData;
    }

    getData(id) {
        return downloaders.getData(id);
    }

    loadData(request) {
        // store.dispatch({
        //     type: actionTypes.QUERY_START,
        //     payload: request
        // });
        return new Promise(function(resolve, reject) {
            downloaders.loadData(request).then(function(result) {
                // if (result === true) {
                //     store.dispatch({
                //         type: actionTypes.QUERY_DONE
                //     });
                // } else {
                //     store.dispatch({
                //         type: actionTypes.DOWNLOAD_FAILED
                //     });
                // }
                resolve();
            });
        });
    }
}

let actions = new Actions();
let chartsOptions = [],renderOptions = [];
let view = function (props) {
    var elem;

    // console.log(props);
    if (props.container === undefined || props.container === null) {
        elem = Element(ReactHighcharts, props.options);
        // console.log(Highcharts);
        return elem;
    }
};

class PlotView extends Component {
	constructor(props) {
		super(props);
	}

    onZoom(e) {
        var startDate = e.min,
            endDate = e.max,
            interval = e.max - e.min,
            offSet = moment(e.min).utcOffset() * 60 * 1000;

        if (e.trigger === 'zoom') {
            console.log(Highcharts);
            // if (Highcharts.theme.defaultZoom === false) {
            //     if (e.userMin !== undefined) {
            //         startDate = parseFloat(startDate) - offSet;
            //         endDate = parseFloat(endDate) - offSet;
            //         helper.saveInterval();
            //         actions.setInterval(startDate, endDate, offSet);
            //         actions.loadAndPlot();
            //     }
            // } else {
                Highcharts.charts.map(function (chart) {
                    if (chart !== undefined && chart !== e.target.chart) {
                        chart.xAxis[0].setExtremes(startDate, endDate);
                    }
                });
            // }
        } 
    }

	render() {
		var self = this,
			isRendered = false,
			shouldUpdate = true,
            sop = {},
            col_md,
            col_lg,
            cols = (this.props.columns !== undefined) ? parseInt(this.props.columns) : 1,
            // offSet = moment().utcOffset() * 60,
            containers = null,
            container,
            counter = 0,
            showHelp = ((this.props === undefined ||
                    this.props.options === undefined ||
                    this.props.options.plotView === undefined ||
                    this.props.options.plotView.enableHelp === undefined) ||
                this.props.options.plotView.enableHelp);

        if (this.props !== undefined && this.props.containers !== undefined) {
            containers = this.props.containers;
        }
        // console.log(isRendered);
        if (isRendered === false) {
            //console.log('render: ' + this.props.charts.isRendered);
            chartsOptions = this.props.charts.options;
            chartsOptions.map(function (chart) {
                chart.xAxis.events.afterSetExtremes = self.onZoom;
                if (chart.smart !== undefined && chart.smart.length > 0) {
                    chart.smart.map(function (ind) {
                        sop = ind;
                        sop.id = ind.id + '_sma';
                        chart.series.push(sop);
                    });
                }
            });
        }


        renderOptions = [];
        if (chartsOptions.length === 0 && showHelp) {
            return null;
            // return Element('div', {
            //     dangerouslySetInnerHTML: {
            //         __html: ' ' + help
            //     }
            // });
        } else if (chartsOptions.length === 1 && chartsOptions[0].series.length === 0) {
            return null;
            // return Element('div', {
            //     dangerouslySetInnerHTML: {
            //         __html: ' ' + help
            //     }
            // });
        } else {
            if (chartsOptions.length === 1) {
                col_md = ' col-md-12';
                col_lg = col_md;
            } else if (chartsOptions.length === 2) {
                if (cols > 1) {
                    col_md = ' col-md-6';
                    col_lg = col_md;
                } else {
                    col_md = ' col-md-12';
                    col_lg = col_md;
                }
            } else {
                if (cols === 3) {
                    col_md = ' col-md-6';
                    col_lg = ' col-lg-4';
                } else if (cols === 2) {
                    col_md = ' col-md-6';
                    col_lg = col_md;
                } else {
                    col_md = ' col-md-12';
                    col_lg = col_md;
                }
            }

            shouldUpdate = true;
            return Element('div', null,
                chartsOptions.map(function (chart) {
                    if (chart.chart.type === 'heatmap' && chart.colorAxis.type === 'logarithmic') {
                        chart.colorAxis.labels.formatter = hcHelper.formatLogLabels;
                    }
                    // chart.tooltip = {
                    //     formatter: hcHelper.formatTooltips
                    // };
                    chart.yAxis.map(function (axis) {
                        if (axis.type === 'logarithmic') {
                            axis.labels.formatter = hcHelper.formatLogLabels;
                        }
                    });
                    chart.series.map(function (series, index) {
                        var data = [],
                            heatdata = [],
                            heatmap = {};

                        data = actions.getData(series.id);
                        if (chart.chart.type !== 'heatmap') {
                            series.data = data;
                        } else {
                            heatmap = actions.getHeatmapData(chart.colorAxis.type, data, index);
                            series.data = heatmap.data;
                            series.colsize = heatmap.period;
                        }
                    });

                    chart.indicators.map(function (series, index) {
                        series.data = actions.getDerivedData(series.iType, {
                            id: series.linkedId,
                            params: series.params
                        });
                        chart.series.push(series);
                    });

                    container = (containers !== null && counter < containers.length) ? containers[counter] : null;
                    counter += 1;
                    // return <div>test</div>;
                    // return null;
                    // return (
                    // 	<div key={chart.id} className = {'col-xs-12 col-sm-12' + col_md + col_lg}>
                    // 		<view 
                    // 			options = {{config: chart}}
                    // 			container = {null}
                    // 		>
                    // 		</view>
                    // 	</div>
                    // );
                    // if (container === null) {
                        return Element('div', {
                            key: chart.id,
                            className: 'col-xs-12 col-sm-12' + col_md + col_lg
                        }, Element(view, {
                            options: {
                                config: chart,
                                callback: self.afterRender
                            },
                            container: container
                        }));
                    // } else {
                    //     renderOptions.push({
                    //         options: {
                    //             config: chart,
                    //             callback: self.afterRender
                    //         },
                    //         container: container
                    //     });
                    //     return null;
                    // }
                })
            );
		}
	}
}

export {helper, actions, PlotView};
