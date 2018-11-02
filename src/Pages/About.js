/*jshint esversion: 6 */
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../App.css";
import { I18nProvider } from "@lingui/react";
import catalogRu from "../locales/ru/messages.js";
import catalogEn from "../locales/en/messages.js";
// import { Trans } from '@lingui/macro';
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Link } from "react-router-dom";
import SideMenu from "./Components/SideMenu";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: props.match.params.lang === "ru" ? "ru" : "en"
        };
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
                            md={{ size: 2 }}
                            lg={{ size: 3 }}
                            xl={{ size: 3 }}
                            className="d-none d-md-block"
                        >
                            <SideMenu
                                lang={this.state.lang}
                                context="menuAbout"
                            />
                        </Col>
                        <Col
                            sm={{ size: 12 }}
                            md={{ size: 8 }}
                            lg={{ size: 6 }}
                            xl={{ size: 6 }}
                        >
                            <center>
                                <h2>This page is under development</h2>
                                <p>
                                    At this moment there is only{" "}
                                    <Link
                                        to={
                                            "/" + this.state.lang + "/earthdesc"
                                        }
                                    >
                                        Earth's magnetospheric model
                                    </Link>{" "}
                                    avalable.
                                </p>
                            </center>
                        </Col>
                        <Col
                            md={{ size: 2 }}
                            lg={{ size: 3 }}
                            xl={{ size: 3 }}
                            className="d-none d-md-block"
                        />
                    </Row>
                </Container>
                <Footer match={this.props.match} />
            </I18nProvider>
        );
    }
}

export default App;
