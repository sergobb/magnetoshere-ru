/*jshint esversion: 6 */
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import EuroPlanet from '../images/logo_europlanet.png';

class Footer extends Component {

    render() {
        return (
    	    <Container fluid = {true} className='sticky-bottom'>
                <Row>
                    <Col sm = {{size: 1}} md = {{size: 2}} lg = {{size: 3}} xl = {{size: 3}}>
                    </Col>
                    <Col sm = {{size: 10}} md = {{size: 8}} lg = {{size: 6}} xl = {{size: 6}}>
                        <center>
                            <a href='http://planetaryspaceweather-europlanet.irap.omp.eu/'><img src={EuroPlanet} alt="Europlanet logo"/></a>
                        </center>
                    </Col>
                    <Col  sm = {{size: 1}} md = {{size: 2}} lg = {{size: 3}} xl = {{size: 3}}>
                    </Col>
                </Row>
            </Container>    
        );
    }
};

export default Footer;