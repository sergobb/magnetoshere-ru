/*jshint esversion: 6 */
import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
import { I18nProvider } from '@lingui/react';
import catalogRu from '../locales/ru/messages.js';
import catalogEn from '../locales/en/messages.js';
import { Trans } from '@lingui/macro';
import Header from './Header';
import Footer from './Footer';
import Desc from './EarthDesc/parab_mod_MSU-short.js';
import SideMenu from './Components/EarthSideMenu';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: (props.match.params.lang === 'ru') ? 'ru' : 'en'
        };
    }

    render() {
        return (
            <I18nProvider language={this.state.lang} catalogs={{en:catalogEn, ru: catalogRu}}>
                <Header match = {this.props.match}/>
                <Container fluid = {true}>
                    <Row>
                        <Col md = {{size: 4}} lg = {{size: 3}} xl = {{size: 3}} className='d-sm-none d-md-block'>
                            <SideMenu lang={this.state.lang}/>
                        </Col>
                        <Col sm = {{size: 12}} md = {{size: 8}} lg = {{size: 6}} xl = {{size: 6}}>
                            {Desc}
                        </Col>
                        <Col lg = {{size: 3}} xl = {{size: 3}} className='d-md-none d-lg-block'>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </I18nProvider>
        );
    }
}

export default App;
