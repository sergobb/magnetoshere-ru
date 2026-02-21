/*jshint esversion: 6 */
import React, { Component } from "react";
// import { Container, Row, Col, Media } from 'reactstrap';
import TopLogo from "./topLogo";
import MenuBar from "./MenuBar";
import Sticky from "react-stickynode";


class Header extends Component {
	render() {
		return (
			<div>
				<TopLogo />
				<Sticky innerZ={99}>
            		<MenuBar match={this.props.match} />
            	</Sticky>
			</div>
		);
	}
}

export default Header;
