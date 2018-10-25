/*jshint esversion: 6 */
import React, { Component } from 'react';
// import { Container, Row, Col, Media } from 'reactstrap';
import TopLogo from './topLogo';
import MenuBar from './MenuBar';

class Header extends Component {

    render() {
        return (
        	<div>
            <TopLogo/>
            <MenuBar match = {this.props.match}/>
            </div>
        );
    }
};

export default Header;