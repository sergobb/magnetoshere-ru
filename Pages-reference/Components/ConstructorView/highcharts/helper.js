/*jslint browser: true*/
/*jslint nomen: true */
/*global exports, console, require, describe, it, Promise*/
/*jslint node: true */

(function(root, factory) {
    "use strict";
    if (typeof window.define === "function" && window.define.amd) {
        window.define(factory);
    } else if (typeof exports === "object") {
        module.exports = factory();
    } else {
        root.HCHelper = factory();
    }
})(this, function() {
    // var helper = require('../plotViewComponent').helper,
    var moment = require("moment"),
        isExporting = false,
        setExporting = function() {
            isExporting = true;
        },
        unsetExporting = function() {
            isExporting = false;
        },
        isExportingSet = function() {
            return isExporting;
        },
        formatFloat = function(value) {
            var sign = 1,
                power = 0,
                number = "";

            if (
                value === null ||
                value === undefined ||
                isNaN(value) ||
                typeof value !== "number"
            ) {
                return "";
            } else {
                if (Math.abs(value) < 1e-6 || Math.abs(value) > 1000) {
                    sign = value / Math.abs(value);
                    value = Math.abs(value);
                    if (value > 1) {
                        while (value > 1) {
                            value = value / 10;
                            power += 1;
                        }
                    } else if (value < 1e-18) {
                        value = 0;
                        power = 0;
                    } else if (value < 1) {
                        while (value < 1) {
                            value = value * 10;
                            power -= 1;
                        }
                    }

                    // console.log(value + ':' + power);
                    if (value === 0) {
                        number = "0";
                    } else if (power === 0) {
                        number = (sign * Math.round(value * 10000)) / 10000;
                    } else if (value !== 1) {
                        if (power !== 1) {
                            number =
                                (sign * Math.round(value * 10000)) / 10000 +
                                "&middot;10<sup>" +
                                power +
                                "</sup>";
                        } else {
                            number =
                                "" + (sign * Math.round(value * 10000)) / 1000;
                        }
                    } else {
                        if (power !== 1) {
                            number = "10<sup>" + power + "</sup>";
                        } else {
                            number = "10";
                        }
                    }
                } else {
                    number = value.toFixed(7);
                    if (number.match(/\./)) {
                        number = number.replace(/\.?0+$/, "");
                    }
                }
                return number;
            }
        },
        HCHelper = {
            setExporting: function() {
                isExporting = true;
            },

            unsetExporting: function() {
                isExporting = false;
            },

            isExportingSet: function() {
                return isExporting;
            },
            formatLogLabels: function() {
                var value = this.value;

                if (isExportingSet()) {
                    return this.axis.defaultLabelFormatter.call(this);
                } else {
                    return formatFloat(value);
                }
            },
            formatTooltips: function() {
                var value = 0,
                    number = 0,
                    micro,
                    dt,
                    formatString = "MMMM Do YYYY, HH:mm:ss",
                    offSet = moment().utcOffset() * 60 * 1000,
                    text = "";

                if (this.points !== undefined) {
                    dt = this.points[0].x;
                    micro = Math.trunc((dt - Math.trunc(dt)) * 1000);
                    offSet = moment(this.points[0].x).utcOffset() * 60 * 1000;

                    if (dt % 1000 > 0) {
                        formatString = "MMMM Do YYYY, HH:mm:ss.SSS";
                    } else {
                        formatString = "MMMM Do YYYY, HH:mm:ss";
                    }
                    text =
                        moment.unix((dt - offSet) / 1000).format(formatString) +
                        (micro > 0 ? micro.toString() : "") +
                        "</br>";

                    this.points.map(function(point) {
                        value = point.y;
                        number = formatFloat(value);
                        text +=
                            '<span style="color:' +
                            point.color +
                            '"">●</span> ' +
                            point.series.name +
                            ": <b>" +
                            number +
                            "</b><br/>";
                    });
                } else {
                    text =
                        moment
                            .unix((this.point.x - offSet) / 1000)
                            .format("MMMM Do YYYY, HH:mm:ss") + "</br>";
                    value = this.point.value;
                    number = formatFloat(value);
                    text +=
                        '<span style="color:' +
                        this.point.color +
                        '"">●</span> ' +
                        this.point.series.name +
                        ": <b>" +
                        number +
                        "</b><br/>";
                }

                return text;
            }
        };

    return HCHelper;
});
