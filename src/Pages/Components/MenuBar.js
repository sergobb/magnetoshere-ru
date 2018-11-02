/*jshint esversion: 6 */
import React, { Component } from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand } from "reactstrap";
import { menu } from "./menuItems";
import { makeMenuBar } from "./menuFuncs";
import "./css/MenuBar.css";

class MenuBar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        var lang = this.props.match.params.lang;

        menu[1].menuLangRu.href = this.props.match.path.replace(":lang/", "");
        menu[1].menuLangEn.href = this.props.match.path.replace(":lang/", "");

        return (
            <Navbar className="MenuBar" sticky-top="true" light expand="lg">
                <NavbarBrand href="/">PSWS</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    {makeMenuBar(menu[0], lang, "ml-left")}
                    {makeMenuBar(menu[1], lang, "ml-auto")}
                </Collapse>
            </Navbar>
        );
    }
}

export default MenuBar;
