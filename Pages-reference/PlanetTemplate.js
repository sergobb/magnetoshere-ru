/*jshint esversion: 6 */
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Card, CardTitle, CardBody, CardHeader } from "reactstrap";
import DatePicker from "./Components/DatePicker";
import * as moment from "moment";
import paramodData from "../lib/paramodData";
import { I18nProvider } from "@lingui/react";
import catalogRu from "../locales/ru/messages.js";
import catalogEn from "../locales/en/messages.js";
import { Trans } from "@lingui/macro";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SideMenu from "./Components/SideMenu";
import Loading from "./Components/LoadingModal";
import Sticky from "react-stickynode";

class App extends Component {
    constructor(props) {
        var now = moment(),
            duration = moment.duration(now.utcOffset(), "minutes"),
            uts =
                props.match.params.uts !== undefined
                    ? props.match.params.uts
                    : null;

        now = now.subtract(duration);
        if (uts !== null) {
            now = moment(parseFloat(uts));
        }

        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.getData = this.getData.bind(this);
        this.setParamsView = this.setParamsView.bind(this);

        this.measurements = {
            dt: <span>UT</span>,
            dst: (
                <span>
                    D<sub>st</sub>
                </span>
            ),
            density: (
                <span>
                    &rho;
                    <sub>sw</sub>
                </span>
            ),
            speed: (
                <span>
                    V<sub>sw</sub>
                </span>
            ),
            bx: (
                <span>
                    B<sub>x</sub>
                </span>
            ),
            by: (
                <span>
                    B<sub>y</sub>
                </span>
            ),
            bz: (
                <span>
                    B<sub>z</sub>
                </span>
            )
        };

        this.parameters = {
            psi: <span>&Psi;</span>,
            b0: (
                <span>
                    B<sub>0</sub>
                </span>
            ),
            bdc: (
                <span>
                    B<sub>DC</sub>
                </span>
            ),
            flux: (
                <span>
                    &Phi;
                    <sub>&infin;</sub>
                </span>
            ),
            bt: (
                <span>
                    BT
                </span>
            ),
            br: (
                <span>
                    b<sub>r</sub>
                </span>
            ),
            bfac: (
                <span>
                    B<sub>fac</sub>
                </span>
            ),
            rd1: (
                <span>
                    R
                    <sub>D1</sub>
                </span>
            ),
            rd2: (
                <span>
                    R
                    <sub>D2</sub>
                </span>
            ),
            r1: (
                <span>
                    R<sub>1</sub>
                </span>
            ),
            rss: (
                <span>
                    R<sub>SS</sub>
                </span>
            ),
            r2: (
                <span>
                    R<sub>2</sub>
                </span>
            ),
            pbx: (
                <span>
                    B<sub>x</sub>
                </span>
            ),
            pby: (
                <span>
                    B<sub>y</sub>
                </span>
            ),
            pbz: (
                <span>
                    B<sub>z</sub>
                </span>
            )
        };

        this.units = {
            dst: "nT",
            bx: "nT",
            by: "nT",
            bz: "nT",
            bdc: "nT",
            bt: "nT",
            density: (
                <span>
                    cm
                    <sup>-3</sup>
                </span>
            ),
            speed: "km/s",
            psi: <span>&deg;</span>,
            b0: "nT",
            flux: "MWb",
            br: "nT",
            bfac: "nT",
            r1:
                props.version === "saturn2d" ? (
                    <span>
                        R<sub>S</sub>
                    </span>
                ) : (
                    <span>
                        R<sub>e</sub>
                    </span>
                ),
            rss:
                props.version === "saturn2d" ? (
                    <span>
                        R<sub>S</sub>
                    </span>
                ) : (
                    <span>
                        R<sub>e</sub>
                    </span>
                ),
            r2:
                props.version === "saturn2d" ? (
                    <span>
                        R<sub>S</sub>
                    </span>
                ) : (
                    <span>
                        R<sub>e</sub>
                    </span>
                ),
            rd1:
                props.version === "saturn2d" ? (
                    <span>
                        R<sub>S</sub>
                    </span>
                ) : (
                    <span>
                        R<sub>J</sub>
                    </span>
                ),
            rd2:
                props.version === "saturn2d" ? (
                    <span>
                        R<sub>S</sub>
                    </span>
                ) : (
                    <span>
                        R<sub>J</sub>
                    </span>
                ),
            pbx: "nT",
            pby: "nT",
            pbz: "nT"
        };

        this.state = {
            datetime: now,
            data: null,
            params: null,
            version: props.version,
            lang: props.match.params.lang === "ru" ? "ru" : "en",
            showModal: false
        };
    }

    getData(ut) {
        let self = this;

        this.setState({
            showModal: true
        });
        paramodData
            .get({
                datetime: ut,
                version: this.state.version
            })
            .then(function(response) {
                var udt = moment(response.data.dt).format(
                    "x"
                ) /*,
                    new_path = self.props.match.path.replace(
                        ":lang",
                        self.state.lang
                    )*/;
                response.data.params.dt = response.data.dt;
                self.setState({
                    datetime: udt,
                    data: response.data.data,
                    params: response.data.params,
                    showModal: false
                });

                // new_path = new_path.replace("/:uts/", "");
                // self.props.history.push(new_path + "/" + udt);
            });
    }

    componentDidMount() {
        var now = new moment(),
            duration = moment.duration(now.utcOffset(), "minutes"),
            uts =
                this.props.match.params.uts !== undefined
                    ? this.props.match.params.uts
                    : null;
        // console.log('componentDidMount');
        now = now.subtract(duration);
        if (uts !== null) {
            now = moment(parseFloat(uts));
        }

        if (this.state.data === null) {
            this.getData(now);
        }
    }

    onDateChange(picker) {
        this.getData(picker.startDate);
    }

    setParamsView(state, params, title) {
        let param,
            row = [];

        if (state === null) {
            return null;
        }

        for (param in params) {
            // console.log(param);
            if (params.hasOwnProperty(param) && state[param] !== undefined) {
                row.push(
                    <Row key={"Params_" + param}>
                        <Col sm={{ size: 2 }} className="ParamsCard">
                            {params[param]}
                        </Col>
                        <Col xs={{ size: 1 }} className="ParamsCard">
                            =
                        </Col>
                        <Col xs={{ size: 8 }} className="ParamsCard">
                            {state[param]} {this.units[param]}
                        </Col>
                    </Row>
                );
            }
        }
        // return (<div><h3>{title}</h3>{row}</div>);
        return (
            <Card body className="ParamsCard">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardBody>{row}</CardBody>
            </Card>
        );
    }

    render() {
        return (
            <I18nProvider
                language={this.state.lang}
                catalogs={{ en: catalogEn, ru: catalogRu }}
            >
                <Header match={this.props.match} />
                <Container fluid={true}>
                    <Row>
                        <Col
                            md={{ size: 3 }}
                            lg={{ size: 3 }}
                            xl={{ size: 3 }}
                            className="d-none d-md-block"
                        >
                            <SideMenu
                                lang={this.state.lang}
                                context={this.props.context}
                                match={this.props.match}
                            />
                        </Col>
                        <Col
                            xs={{ size: 12 }}
                            sm={{ size: 12 }}
                            md={{ size: 9 }}
                            lg={{ size: 6 }}
                            xl={{ size: 6 }}
                        >
                            <div className="App">
                                <h2>{this.props.title}</h2>
                                <DatePicker
                                    datetime={this.state.datetime}
                                    onDateChange={this.onDateChange.bind(this)}
                                    shifts={this.props.shifts}
                                />
                                <this.props.ParamodChart
                                    title={""}
                                    units={this.props.units}
                                    data={this.state.data}
                                />
                            </div>
                        </Col>
                        <Col
                            md={{ size: 9, offset: 3 }}
                            lg={{ size: 3, offset: 0 }}
                            xl={{ size: 3 }}
                            // className="d-none d-md-block"
                        >
                            <Container fluid={true}>
                                {this.setParamsView(
                                    this.state.params,
                                    this.measurements,
                                    <Trans id="measurementsTitle">
                                        Input data
                                    </Trans>
                                )}
                                <br />
                                {this.state.params !== null &&
                                this.state.params.r1 !== undefined
                                    ? this.setParamsView(
                                          this.state.params,
                                          this.parameters,
                                          <Trans id="parametersTitle">
                                              MOdel Parameters
                                          </Trans>
                                      )
                                    : null}
                            </Container>
                        </Col>
                    </Row>
                    <Loading show={this.state.showModal} />
                </Container>
                <Footer />
            </I18nProvider>
        );
    }
}

export default App;
