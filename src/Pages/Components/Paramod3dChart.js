/*jshint esversion: 6 */
import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts';
import Highcharts3d from 'highcharts/highcharts-3d';
import HighchartsBoost from 'highcharts/modules/boost';
import './css/ParamodCharts.css';
Highcharts3d(ReactHighcharts.Highcharts);
// HighchartsBoost(ReactHighcharts.Highcharts);

class App extends Component {

    render() {
        var config = (this.props.config !== undefined) ? this.props.config : {
            title: {
                text: this.props.title,
                style: {
                    fontWeight: 'bold',
                    fontSize: '14px'
                }
            },
            // boost: {
            //     enabled: true,
            //     useGPUTranslations: true,
            //     allowForce: true
            // },
            chart: {
                // width: '80%',
                height: (9 / 8 * 100) + '%',
                // plotBorderWidth: 2,
                type: 'scatter3d',
                options3d: {
                    enabled: true,
                    alpha: 10,
                    beta: -20,
                    depth: 550,
                    viewDistance: 50,
                    fitToPlot: false,
                    frame: {
                        bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },
                        front: { size: 1, color: 'rgba(0,0,0,0.04)' },
                        side: { size: 1, color: 'rgba(0,0,0,0.06)' }

                    }
                }
            },
            plotOptions: {
                lineWidth: 2,
                scatter: {
                    width: 10,
                    height: 10,
                    depth: 10
                },
                scatter3d: {
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
                    color: 'darkblue',
                    type: 'scatter3d',
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
                max: 35,
                min: -35,
                gridLineWidth: 2,
                tickAmount: 11,
                title: {
                    text: "X, R<sub>e</sub>",
                    useHTML: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }
                },
                labels: {
                    align: 'center',
                    useHTML: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '11px'
                    }
                }
            },
            zAxis: {
                max: 35,
                min: -35,
                gridLineWidth: 2,
                title: {
                    text: "Y, R<sub>e</sub>",
                    useHTML: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }
                },
                labels: {
                    align: 'center',
                    useHTML: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '11px'
                    }
                }
            },
            yAxis: {
                max: 35,
                min: -35,
                gridLineWidth: 2,
                title: {
                    text: "Z, R<sub>e</sub>",
                    useHTML: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }
                },
                labels: {
                    align: 'center',
                    useHTML: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize: '11px'
                    }
                }
            }
        };

        if (this.props.data !== null) {
            config.series = this.props.data.filter(function (d) {
                return d.length > 0;
            }).map(function (d) {
                return {
                    lineWidth: 2,
                    color: 'darkblue',
                    data: d,
                    type: 'scatter3d',
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
            <div className="Paramod3DChart">
                <ReactHighcharts config= {config} callback = {afterRender}></ReactHighcharts>
            </div>
        );
    }
}

function afterRender(chart){
    var H = ReactHighcharts.Highcharts;
    function dragStart(eStart) {
        eStart = chart.pointer.normalize(eStart);

        var posX = eStart.chartX,
            posY = eStart.chartY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            sensitivity = 5; // lower is more sensitive

        function drag(e) {
            // Get e.chartX and e.chartY
            e = chart.pointer.normalize(e);

            chart.update({
                chart: {
                    options3d: {
                        alpha: alpha + (e.chartY - posY) / sensitivity,
                        beta: beta + (posX - e.chartX) / sensitivity
                    }
                }
            }, undefined, undefined, false);
        }

        chart.unbindDragMouse = H.addEvent(document, 'mousemove', drag);
        chart.unbindDragTouch = H.addEvent(document, 'touchmove', drag);

        H.addEvent(document, 'mouseup', chart.unbindDragMouse);
        H.addEvent(document, 'touchend', chart.unbindDragTouch);
    }
    H.addEvent(chart.container, 'mousedown', dragStart);
    H.addEvent(chart.container, 'touchstart', dragStart);
}

export default App;