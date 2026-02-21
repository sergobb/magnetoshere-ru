/*jshint esversion: 6 */
import React, { Component } from "react";
import Highcharts from "./highcharts/highchartsInit";
import {helper, actions, PlotView} from "./plotViewComponent";

class ConstructorView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: props.lang === "ru" ? "ru" : "en",
            context: props.context,
            template: null
        };
        this.getData = this.getData.bind(this);
        // this.getData();
    }
    
    componentDidMount() {
        this.getData();
    }

    getData() {
        var now = Date.now(),
            startDate,
            endDate,
            div,
            resolution,
            options = this.props.options,
            self = this;

        // console.log(options);
        return new Promise(function(resolve, reject) {
            var request;
            if (options !== null && options !== undefined && options.template !== undefined) {
                Highcharts.theme.defaultZoom = (options.highcharts !== undefined && options.highcharts.defaultZoom !== undefined) ? options.highcharts.defaultZoom : false;
                helper.loadState(options.template).then(function(state) {
                    startDate = (options.startDate !== undefined) ? options.startDate : now - 7 * 24 * 60 * 60 * 1000;
                    endDate = (options.endDate !== undefined) ? options.endDate : now;
                    div = (options.container !== undefined) ? options.container : 'constructor';
                    resolution = (options.resolution !== undefined) ? options.resolution : '1h';

                    options.startDate = startDate;
                    options.endDate = endDate;
                    options.resolution = resolution;
                    
                    state.template.request.request.where.min_dt = startDate;
                    state.template.request.request.where.max_dt = endDate;
                    state.template.request.request.resolution = resolution;

                    actions.loadData(state.template.request).then(function(){
                        self.setState({
                            template: state.template
                        });
                        resolve();
                    });
                });

            } else {
                resolve();
            }
        });
    }

    render() {
        if (this.state.template !== null) {
            return (
                <PlotView 
                    chartTree = {this.state.template.chartTree}
                    charts = {this.state.template.charts}
                    columns = {this.state.template.dataAcquisition.alignment}
                />
            );
        } else {
            return null
        }
    }
}

export default ConstructorView;
