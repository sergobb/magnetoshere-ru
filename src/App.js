/*jshint esversion: 6 */
import React, { Component } from 'react';
import queryString from 'query-string';
import DatePicker from './Components/DatePicker';
import * as moment from 'moment';
import * as axios from 'axios';
import ParamodChart from './Components/ParamodChart';
import Paramod3dChart from './Components/Paramod3dChart';
import './App.css';
import { I18nProvider } from '@lingui/react';
import catalogRu from './locales/ru/messages.js';
import catalogEn from './locales/en/messages.js';


function getParamodData(config) {
    var request = {
            dt: config.datetime.format('x')
        },
        program = (!config.version || config.version === undefined) ? 'paramod/' : 'paramod3d/',
        url = (process.env.REACT_APP_BACKEND_URL !== undefined) ?
        (process.env.REACT_APP_BACKEND_URL + program) : 'http://localhost:8888/api/v1/paramod/';

    return axios.post(
        url, request, {
            withCredentials: true
        });
}

class App extends Component {

    constructor(props) {
        var now = moment(),
            values = queryString.parse(props.location.search);
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.state = {
            datetime: now,
            data: null,
            version: (values.chart === '3d')
        };

    }

    componentDidMount() {
        var self = this,
            now = moment();
        if (this.state.data === null) {
            getParamodData({
                datetime: now,
                version: this.state.version
            }).then(function (response) {
                var udt = moment(response.data.dt).format('x');
                self.setState({
                    datetime: udt,
                    data: response.data.data
                });
            });
        }
    }

    onDateChange(picker) {
        var self = this;

        getParamodData({
            datetime: picker.startDate,
            version: this.state.version
        }).then(function (response) {
            var udt = moment(response.data.dt).format('x');
            self.setState({
                datetime: udt,
                data: response.data.data
            });
        });
    }

    render() {
        var values = queryString.parse(this.props.location.search),
            title = (values.view !== 'date' && values.view !== 'full') ? moment.unix(this.state.datetime / 1000).format("YYYY-MM-DD HH:00") : '',
            lang = (values.lang !== undefined) ? values.lang : 'ru',
            version = (values.chart === '3d');


        return (
            <I18nProvider language={lang} catalogs={{en:catalogEn, ru: catalogRu}}>
                <div className="App">
                    <DatePicker
                        datetime = {this.state.datetime}
                        onDateChange = {this.onDateChange.bind(this)}
                    />
                    {
                        (version) ? 
                        (
                            <Paramod3dChart
                            title = {title}
                            data = {this.state.data}
                            />
                        ) : (
                            <ParamodChart
                                title = {title}
                                data = {this.state.data}
                            />
                        )
                    }
                </div>
            </I18nProvider>

        );
    }
}

export default App;