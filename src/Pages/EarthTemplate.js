/*jshint esversion: 6 */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import DatePicker from './Components/DatePicker';
import * as moment from 'moment';
import paramodData from '../lib/paramodData';
import '../App.css';
import { I18nProvider } from '@lingui/react';
import catalogRu from '../locales/ru/messages.js';
import catalogEn from '../locales/en/messages.js';
import { Trans } from '@lingui/macro';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './Components/EarthSideMenu';

class App extends Component {

    constructor(props) {
        var now = moment(),
            duration = moment.duration(now.utcOffset(), 'minutes'),
            uts = (props.match.params.uts !== undefined) ? props.match.params.uts : null;

        now = now.subtract(duration);
        if (uts !== null) {
            now = moment(parseFloat(uts));
        }

        super(props);
        this.onDateChange = this.onDateChange.bind(this);


        this.state = {
            datetime: now,
            data: null,
            view3d: props.view3d,
            lang: (props.match.params.lang === 'ru') ? 'ru' : 'en'
        };

    }

    componentDidMount() {
        var self = this,
            now = new moment(),
            duration = moment.duration(now.utcOffset(), 'minutes'),
            uts = (this.props.match.params.uts !== undefined) ? this.props.match.params.uts : null;

        now = now.subtract(duration);
        if (uts !== null) {
            now = moment(parseFloat(uts));
        }

        if (this.state.data === null) {
            paramodData.get({
                datetime: now,
                view3d: this.state.view3d
            }).then(function (response) {
                var udt = moment(response.data.dt).format('x');
                console.log(response.data.dt);
                self.setState({
                    datetime: udt,
                    data: response.data.data
                });
            });
        }
    }

    onDateChange(picker) {
        var self = this;

        paramodData.get({
            datetime: picker.startDate,
            view3d: this.state.view3d
        }).then(function (response) {
            var udt = moment(response.data.dt).format('x');
            self.setState({
                datetime: udt,
                data: response.data.data
            });
        });
    }

    render() {
        return (
            <I18nProvider language={this.state.lang} catalogs={{en:catalogEn, ru: catalogRu}}>
                <Header match = {this.props.match}/>
                <Container fluid = {true}>
                    <Row>
                        <Col md = {{size: 4}} lg = {{size: 3}} xl = {{size: 3}} className='d-none d-md-block'>
                            <SideMenu lang={this.state.lang}/>
                        </Col>
                        <Col xs = {{size: 12}} sm = {{size: 12}} md = {{size: 8}} lg = {{size: 6}} xl = {{size: 6}}>
                            <div className="App">
                                <h2><Trans id='earthModelDescTitle'>Earth's magnetosphere model</Trans></h2>
                                <DatePicker
                                    datetime = {this.state.datetime}
                                    onDateChange = {this.onDateChange.bind(this)}
                                />
                                <this.props.ParamodChart
                                    title = {''}
                                    data = {this.state.data}
                                />
                            </div>
                        </Col>
                        <Col  md = {{size: 2}} lg = {{size: 2}} xl = {{size: 3}} className='d-none d-md-block'>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </I18nProvider>
        );
    }
}

export default App;