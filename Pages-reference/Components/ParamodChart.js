/*jshint esversion: 6 */
import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";
import "./css/ParamodCharts.css";

class App extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.data === this.props.data) {
            return false;
        } else {
            return true;
        }
    }
    
    render() {
        let units =
                this.props.units !== undefined
                    ? this.props.units
                    : "R<sub>e</sub>",
            config =
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
                              enabled: true,
                              positioner: undefined,
                              formatter: function(tooltip) {
                              // console.log(this);
                                  if (this.series.chart.userOptions.chart.type === 'scatter3d') {
                                      return 'Magnetic field value: ' + 
                                        this.point.options.value +
                                        ' nT <br>x: ' +
                                        this.point.options.x +
                                        ' Re<br>y: ' +
                                        this.point.options.y +
                                        ' Re<br>z: ' +
                                        this.point.options.z +
                                        ' Re';
                                  } else {
                                    return tooltip.defaultFormatter.call(this, tooltip);
                                  }
                              }
                          },
                          legend: {
                              enabled: false
                          },
                          series: [],
                          xAxis: {
                              reversed: true,
                              // max: 15,
                              // min: -35,
                              gridLineWidth: 2,
                              tickAmount: 11,
                              title: {
                                  text: "X, " + units,
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
                              // max: 30,
                              // min: -30,
                              gridLineWidth: 2,
                              title: {
                                  text: "Z, " + units,
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
                        data: d.map(function(l) {
                            return [l[0], l[1]];
                        }),
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
