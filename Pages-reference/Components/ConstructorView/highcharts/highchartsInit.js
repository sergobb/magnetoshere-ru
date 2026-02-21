/*jslint browser: true*/
/*jslint nomen: true */
/*global exports, console, require, describe, it, Promise*/
/*jslint node: true */

(function (root, factory) {
    "use strict";
    if (typeof window.define === 'function' && window.define.amd) {
        window.define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.HighchartsInit = factory();
    }
}(this, function () {
    var moment = require('moment'),
        // helper = require('../plotViewComponent').helper,
        // helper = require('../../actions/helper'),
        // Highcharts = require('highcharts/highcharts.src'),
        Highcharts = require('highcharts'),
        hcHelper = require('../highcharts/helper'),
        options = {
            defaultZoom: false
        };

    require('highcharts/modules/heatmap')(Highcharts);
    require('highcharts/modules/exporting')(Highcharts);
    require('highcharts/modules/offline-exporting')(Highcharts);
    // require('highcharts/modules/boost-canvas')(Highcharts);
    // require('highcharts/modules/boost')(Highcharts);


    if (window.constructor !== undefined &&
        window.constructor.options !== undefined &&
        window.constructor.options.highcharts !== undefined) {
        options = window.constructor.options.highcharts;
    }


    Highcharts.wrap(Highcharts.Pointer.prototype, "onContainerMouseMove", function (proceed, e) {
        var self = this,
            time;

        proceed.apply(self, Array.prototype.slice.call(arguments, 1));
        time = self.chart.xAxis[0].toValue(e.chartX, false);
        Highcharts.charts.map(function (chart) {
            if (chart !== undefined) {
                if (chart.id !== self.chart.id) {
                    e.chartX = chart.xAxis[0].toPixels(time, false);
                    chart.pointer.runPointActions(e);
                } else {
                    chart.pointer.runPointActions(e);
                }
            }
        });
    });


    Highcharts.wrap(Highcharts.Pointer.prototype, "onContainerMouseLeave", function (proceed, e) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        Highcharts.charts.map(function (chart) {
            var pointer, tooltip;
            if (chart !== undefined) {
                pointer = chart.pointer;
                tooltip = chart.tooltip;
                pointer.reset();
                pointer.chartPosition = null;
                tooltip.hide();
            }
        });
    });

    Highcharts.wrap(Highcharts.Chart.prototype, "exportChartLocal", function (proceed, e) {
        hcHelper.setExporting();
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        hcHelper.unsetExporting();
    });

    Highcharts.theme = {
        colors: ['#7cb5ec', '#f7a35c', '#90ee7e', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
            '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        credits: {
            enabled: false
        },
        // boost: {
        //     useGPUTranslations: true,
        //     seriesThreshold: 20,
        //     allowForce: true
        // },
        chart: {
            type: 'line',
            backgroundColor: null,
            style: {
                fontFamily: 'Dosis, sans-serif'
            },
            borderWidth: 0,
            plotBorderWidth: 1
        },
        title: {
            useHTML: true,
            margin: 2,
            style: {
                fontSize: '15px',
                fontWeight: 'bold'
            }
        },
        tooltip: {
            borderWidth: 1,
            borderRadius: 15,
            borderColor: 'rgba(100,100,240,0.8)',
            backgroundColor: 'rgba(239,239,226,0.5)',
            shadow: false,
            useHTML: true,
            shared: true,
            positioner: function (labelWidth, labelHeight, point) {
                if (this.chart.xAxis[0].userOptions.type === "datetime") {
                    var tooltipX, tooltipY;
                    // console.log(point);
                    console.log(this);
                    // console.log(labelWidth);
                    if (point.plotX < (this.chart.plotLeft + this.chart.plotWidth) / 2) {
                        tooltipX = this.chart.plotLeft + this.chart.plotWidth - labelWidth;
                        tooltipY = this.chart.plotTop;
                    } else {
                        tooltipX = this.chart.plotLeft;
                        tooltipY = this.chart.plotTop;
                    }
                    return {
                        x: tooltipX,
                        y: tooltipY
                    };
                } else {
                    return {
                        x: point.plotX ,
                        y: point.plotY-labelHeight 
                    };
                }
            },
            formatter: hcHelper.formatTooltips
        },
        legend: {
            itemStyle: {
                fontWeight: 'bold',
                fontSize: '11px'
            },
            useHTML: true,
            align: 'left',
            verticalAlign: 'bottom'
        },
        xAxis: {
            gridLineWidth: 1,
            minPadding: 0.0,
            maxPadding: 0.0,
            title: {
                style: {
                    fontWeight: 'bold',
                    fontSize: '12px'
                }
            },
            tickPositioner: function () {
                // console.log(this.chart.xAxis[0].userOptions.type);
                if (this.chart.xAxis[0].userOptions.type === "datetime") {
                    var positions = [],
                        interval = this.dataMax - this.dataMin,
                        tickNums = this.tickPositions.length,
                        increment = interval / tickNums,
                        tick = this.dataMin,
                        increments = [
                            100,
                            1000,
                            1000 * 60,
                            1000 * 60 * 60,
                            1000 * 60 * 60 * 24,
                            1000 * 60 * 60 * 24 * 7,
                            1000 * 60 * 60 * 24 * 30
                        ],
                        i, 
                        incIndex;

                    for (i = 0; i < increments.length; i += 1) {
                        if (increment / increments[i] < 1.) {
                            incIndex = i - 1;
                            break;
                        }
                    }
                    
                    if (i === 0) {
                        return this.tickPositions;
                    }

                    increment = Math.floor(increment/increments[incIndex]) * increments[incIndex];
                    
                    tick = (Math.floor(tick / increment) + 1) * increment;

                    for (tick; tick <= this.dataMax; tick += increment) {
                        positions.push(tick);
                    }
                    
                    return positions;
                } else {
                    return this.tickPositions;
                }
            },
            labels: {
                align: 'left',
                rotation: 10,
                useHTML: true,
                style: {
                    fontWeight: 'bold',
                    fontSize: '11px'
                },
                formatter: function () {
                    // console.log(this.axis.userOptions.type);
                    if (this.axis.userOptions.type === "datetime") {
                        var offSet = moment(this.value).utcOffset() * 60 * 1000,
                            dt = Math.floor(this.value - offSet) / 1000;

                        if ((this.value/1000) % (60 * 60 * 24) === 0) {
                            return moment.unix(dt).format("YYYY-MM-DD");
                        } else if ((this.value/1000) % (60 * 60) === 0) {
                            return moment.unix(dt).format("HH:mm YYYY-MM-DD");
                        } else if ((this.value/1000) % (60) === 0) {
                            return moment.unix(dt).format("HH:mm:ss YYYY-MM-DD");
                        }
                        return moment.unix(dt).format("HH:mm:ss.SSS YYYY-MM-DD");
                    } else {
                        return this.axis.defaultLabelFormatter.call(this);
                    }
                }
            }
        },
        yAxis: {
            minorTickInterval: 'auto',
            lineWidth: 1.5,
            tickWidth: 1.5,
            minorTickWidth: 1,
            opposite: true,
            startOntTck: true,
            endOnTick: true,
            title: {
                useHTML: true,
                style: {
                    //textTransform: 'uppercase'
                    fontWeight: 'bold',
                    fontSize: '12px'
                }
            },
            labels: {
                align: 'left',
                useHTML: true,
                style: {
                    fontWeight: 'bold',
                    fontSize: '11px'
                }
            }
        },
        plotOptions: {
            candlestick: {
                lineColor: '#404048'
            },
            heatmap: {
                turboThreshold: 5000
            },
            series: {
                boostThreshold: 5000
            }
        },

        exporting: {
            allowHTML: true,
            chartOptions: {
                chart: {
                    backgroundColor: '#FFFFFF'
                }
            },
            buttons: {
                contextButton: {
                    align: 'right',
                    verticalAlign: 'bottom'
                }
            }
        },


        // General
        background2: '#F0F0EA',
        defaultZoom: options.defaultZoom

    };

    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    return Highcharts;
}));