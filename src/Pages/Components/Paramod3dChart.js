/*jshint esversion: 6 */
import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";
import Highcharts3d from "highcharts/highcharts-3d";
import HighchartsBoost from "highcharts/modules/boost";
import "./css/ParamodCharts.css";
Highcharts3d(ReactHighcharts.Highcharts);
HighchartsBoost(ReactHighcharts.Highcharts);

class App extends Component {
    constructor(props) {
        super(props);

        this.afterRender = this.afterRender.bind(this);
        this.state = {
            series: this.setSeries(props.data),
            series_l: this.setSeriesLight(props.data)
        };
    }

    setSeries(data, indexes) {
        let series = [];
        if (data !== null) {
            series = data
                .filter(function(d, i) {
                    let j;
                    if (indexes !== undefined) {
                        for (j = 0; j < indexes.length; j += 1) {
                            if (i === indexes[j]) {
                                return true;
                            }
                        }
                        return false;
                    }
                    return d.length > 0;
                })
                .map(function(d) {
                    return {
                        lineWidth: 0.5,
                        color: "darkblue",
                        data: d.map(function(line, i) {
                            return {
                                x: line[0],
                                y: line[1],
                                z: line[2],
                                color: setColor(line[3]),
                                value: line[3]
                            };
                        }),
                        type: "scatter3d",
                        name: "Magnetic field line",
                        marker: {
                            enabled: true,
                            symbol: "square",
                            radius: 0.7,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    };
                });
        } else {
            series = null;
        }
        return series;
    }

    setSeriesLight(data, indexes) {
        let series = [];
        if (data !== null) {
            series = data
                .filter(function(d, i) {
                    let j;
                    if (indexes !== undefined) {
                        for (j = 0; j < indexes.length; j += 1) {
                            if (i === indexes[j]) {
                                return true;
                            }
                        }
                        return false;
                    }
                    return d.length > 0;
                })
                .map(function(d) {
                    let even = 0,
                        d2 = d.filter(function(a) {
                            if ((even += 1) % 5 === 0) {
                                return true;
                            } else {
                                return false;
                            }
                        });
                    return {
                        lineWidth: 1,
                        color: "darkblue",
                        data: d2.map(function(line, i) {
                            return {
                                x: line[0],
                                y: line[1],
                                z: line[2],
                                color: setColor(line[3])
                            };
                        }),
                        type: "scatter3d",
                        name: "Magnetic field line",
                        marker: {
                            enabled: false,
                            symbol: "circle",
                            radius: 1.5,
                            states: {
                                hover: {
                                    enabled: true,
                                    radius: 3.5
                                }
                            }
                        }
                    };
                });
        } else {
            series = null;
        }
        return series;
    }

    componentWillReceiveProps(props) {
        // console.log(props.data);
        this.setState({
            series: this.setSeries(props.data),
            series_l: this.setSeriesLight(props.data)
        });
    }

    render() {
        // console.log("render");
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
                      boost: {
                          enabled: true,
                          useGPUTranslations: true,
                          allowForce: true,
                          seriesThreshold: 5
                      },
                      chart: {
                          // width: '80%',
                          height: (9 / 8) * 100 + "%",
                          // plotBorderWidth: 1,
                          type: "scatter3d",
                          options3d: {
                              enabled: true,
                              alpha: 10,
                              beta: -20,
                              depth: 550,
                              fitToPlot: false,
                              frame: {
                                  size: 4,
                                  bottom: {
                                      color: "rgba(0,0,0,0.03)"
                                  },
                                  front: {
                                      color: "rgba(0,0,0,0.06)"
                                  },
                                  left: {
                                      visible: true,
                                      color: "rgba(0,0,0,0.09)"
                                  },
                                  right: {
                                      visible: false
                                  }
                              }
                          }
                      },
                      plotOptions: {
                          scatter3d: {
                              boostThreshold: 1,
                              marker: {
                                  enabled: false,
                                  symbol: "circle",
                                  states: {
                                      hover: {
                                          enabled: true
                                      }
                                  }
                              }
                          },
                          series: {
                              color: "darkblue",
                              type: "scatter3d",
                              marker: {
                                  enabled: false
                              }
                          }
                      },
                      tooltip: {
                          enabled: true,
                          formatter: function() {
                              return 'Magnetic field value: ' + 
                                this.point.options.value +
                                '<br>x: ' +
                                this.point.options.x +
                                '<br>y: ' +
                                this.point.options.y +
                                '<br>z: ' +
                                this.point.options.z;
                          }
                      },
                      legend: {
                          enabled: false
                      },
                      series: [],
                      xAxis: {
                          reversed: true,
                          // max: 35,
                          // min: -35,
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
                      zAxis: {
                          // max: 35,
                          // min: -35,
                          gridLineWidth: 2,
                          title: {
                              text: "Y, R<sub>e</sub>",
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
                          // max: 35,
                          // min: -35,
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

        config.series = this.state.series;

        return (
            <div className="Paramod3DChart">
                <ReactHighcharts config={config} callback={this.afterRender} />
            </div>
        );
    }

    afterRender(chart) {
        var H = ReactHighcharts.Highcharts,
            l_series = this.state.series_l,
            b_series = this.state.series;
        function dragStart(eStart) {
            eStart = chart.pointer.normalize(eStart);

            var posX = eStart.chartX,
                posY = eStart.chartY,
                alpha = chart.options.chart.options3d.alpha,
                beta = chart.options.chart.options3d.beta,
                sensitivity = 15; // lower is more sensitive

            function drag(e) {
                // Get e.chartX and e.chartY
                e = chart.pointer.normalize(e);

                chart.update(
                    {
                        chart: {
                            options3d: {
                                alpha: alpha + (e.chartY - posY) / sensitivity,
                                beta: beta + (posX - e.chartX) / sensitivity
                            }
                        },
                        series: l_series
                    },
                    undefined,
                    true,
                    false
                );
            }

            function mouseDragStop(e) {
                if (chart.unbindDragMouse !== undefined) {
                    chart.unbindDragMouse(e);
                    chart.unbindMouseup(e);
                    chart.update(
                        {
                            series: b_series
                        },
                        undefined,
                        true,
                        false
                    );
                }
            }

            function touchDragStop(e) {
                if (chart.unbindDragTouch !== undefined) {
                    chart.unbindDragTouch(e);
                    chart.unbindTouchend(e);
                    chart.update(
                        {
                            series: b_series
                        },
                        undefined,
                        true,
                        false
                    );
                }
            }

            chart.unbindDragMouse = H.addEvent(document, "mousemove", drag);
            chart.unbindDragTouch = H.addEvent(document, "touchmove", drag);

            chart.unbindMouseup = H.addEvent(
                document,
                "mouseup",
                mouseDragStop
            ); // chart.unbindDragMouse);
            chart.unbindTouchend = H.addEvent(
                document,
                "touchend",
                touchDragStop
            ); //chart.unbindDragTouch);
        }
        H.addEvent(chart.container, "mousedown", dragStart);
        H.addEvent(chart.container, "touchstart", dragStart);
    }
}

function setColor(value) {
    let palette = [
            "#800000",
            "#810000",
            "#820000",
            "#830000",
            "#830000",
            "#840000",
            "#850000",
            "#860000",
            "#870000",
            "#880000",
            "#890000",
            "#8a0000",
            "#8a0000",
            "#8e0000",
            "#960001",
            "#9f0002",
            "#a80002",
            "#b10002",
            "#ba0002",
            "#c30002",
            "#cc0002",
            "#d50002",
            "#df0001",
            "#e80001",
            "#f20001",
            "#fb0000",
            "#ff1d00",
            "#ff3400",
            "#ff4400",
            "#ff5100",
            "#ff5c00",
            "#ff6700",
            "#ff7100",
            "#ff7a00",
            "#ff8300",
            "#ff8c00",
            "#ff9400",
            "#ff9c00",
            "#ffa400",
            "#ffac00",
            "#ffb300",
            "#ffba00",
            "#ffc100",
            "#ffc800",
            "#ffcf00",
            "#ffd600",
            "#ffde00",
            "#ffe500",
            "#ffec00",
            "#fff200",
            "#fff900",
            "#fcfe02",
            "#effb0c",
            "#e2f714",
            "#d5f319",
            "#c7ef1d",
            "#b9ec21",
            "#abe824",
            "#9ce427",
            "#8de029",
            "#7ddc2c",
            "#6cd82e",
            "#59d330",
            "#41cf31",
            "#30ca30",
            "#2dc42d",
            "#2abd29",
            "#26b726",
            "#23b122",
            "#1fab1e",
            "#1ca51b",
            "#189f17",
            "#149913",
            "#0f930e",
            "#0b8d09",
            "#058705",
            "#018101",
            "#007e00",
            "#007c00",
            "#007a00",
            "#007700",
            "#007500",
            "#007300",
            "#007100",
            "#006f00",
            "#006c00",
            "#006a00",
            "#006800",
            "#006600",
            "#066404",
            "#256023",
            "#345d37",
            "#3e594a",
            "#46545c",
            "#4b506e",
            "#4e4b81",
            "#4f4593",
            "#4e3fa6",
            "#4b37b9",
            "#442fcc",
            "#3924df",
            "#2413f3",
            "#0000fb",
            "#0000f2",
            "#0000e8",
            "#0000df",
            "#0000d5",
            "#0000cc",
            "#0000c3",
            "#0000ba",
            "#0000b1",
            "#0000a8",
            "#00009f",
            "#000096",
            "#00008e",
            "#00008a",
            "#00008a",
            "#000089",
            "#000088",
            "#000087",
            "#000086",
            "#000085",
            "#000084",
            "#000083",
            "#000083",
            "#000082",
            "#000081",
            "#000080"
        ],
        min = 0,
        max = 60000,
        d = Math.log(max - min) / 128,
        index = Math.floor(Math.log(value) / d);

    // console.log(value, d, index);
    return palette[127 - index];
}

export default App;
