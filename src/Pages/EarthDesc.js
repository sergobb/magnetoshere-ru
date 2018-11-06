/*jshint esversion: 6 */
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../App.css";
import { I18nProvider } from "@lingui/react";
import catalogRu from "../locales/ru/messages.js";
import catalogEn from "../locales/en/messages.js";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SideMenu from "./Components/SideMenu";
import ghost from "../lib/ghost";
import GhostStory from "./Components/GhostStory";

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
                            md={{ size: 4 }}
                            lg={{ size: 3 }}
                            xl={{ size: 3 }}
                            className="d-none d-md-block"
                        >
                            <SideMenu
                                lang={this.state.lang}
                                context="menuEarth"
                            />
                        </Col>
                        <Col
                            sm={{ size: 12 }}
                            md={{ size: 8 }}
                            lg={{ size: 6 }}
                            xl={{ size: 6 }}
                        >
                            <GhostStory 
                                ghostText = {ghost.getText("earthModelDesc",this.state.lang)}
                            />
                        </Col>
                        <Col
                            lg={{ size: 3 }}
                            xl={{ size: 3 }}
                            className="d-none d-lg-block"
                        />
                    </Row>
                </Container>
                <Footer />
            </I18nProvider>
        );
    }
}

export default App;
