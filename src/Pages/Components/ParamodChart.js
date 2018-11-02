/*jshint esversion: 6 */
import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";
import "./css/ParamodCharts.css";

class App extends Component {
    render() {
        var config =
            this.props.config !== undefined
                ? this.props.config
                : {
                      title: {
                          text: this.props.title,
                          style: {
                              fontWeight: "bold",
                              fontSize: "14px"
                          }
                      },
                      chart: {
                          height: (9 / 8) * 100 + "%",
                          plotBorderWidth: 2,
                          type: "scatter"
                      },
                      plotOptions: {
                          lineWidth: 2,
                          series: {
                              color: "darkblue",
                              marker: {
                                  enabled: false
                              }
                          }
                      },
                      tooltip: {
                          enabled: true
                      },
                      legend: {
                          enabled: false
                      },
                      series: [],
                      xAxis: {
                          reversed: true,
                          max: 15,
                          min: -35,
                          gridLineWidth: 2,
                          tickAmount: 11,
                          title: {
                              text: "X, R<sub>e</sub>",
                              useHTML: true,
                              style: {
                                  fontWeight: "bold",
                                  fontSize: "12px"
                              }
                          },
                          labels: {
                              align: "center",
                              useHTML: true,
                              style: {
                                  fontWeight: "bold",
                                  fontSize: "11px"
                              }
                          }
                      },
                      yAxis: {
                          max: 30,
                          min: -30,
                          gridLineWidth: 2,
                          title: {
                              text: "Z, R<sub>e</sub>",
                              useHTML: true,
                              style: {
                                  fontWeight: "bold",
                                  fontSize: "12px"
                              }
                          },
                          labels: {
                              align: "center",
                              useHTML: true,
                              style: {
                                  fontWeight: "bold",
                                  fontSize: "11px"
                              }
                          }
                      }
                  };

        if (this.props.data !== null) {
            config.series = this.props.data
                .filter(function(d) {
                    return d.length > 0;
                })
                .map(function(d) {
                    return {
                        lineWidth: 2,
                        data: d,
                        name: "Magnetic field line",
                        marker: {
                            enabled: false,
                            symbol: "circle",
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    };
                });
        }

        return (
            <div className="ParamodChart">
                <ReactHighcharts config={config} />
            </div>
        );
    }
}

export default App;
