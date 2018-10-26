/*jshint esversion: 6 */
import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Trans } from '@lingui/macro';
import {menu, makeLinkItem} from './Components/menuItems';

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
        var lang = this.props.match.params.lang,
            menuEarth = menu.menuEarth.menu,
            menuRu = menu.menuLangRu,
            menuEn = menu.menuLangEn;

        menuRu.href = this.props.match.path.replace(':lang/', '');
        menuEn.href = this.props.match.path.replace(':lang/', '');
        
        return (
            <Navbar className="MenuBar" sticky-top='true' light expand="lg">
                <NavbarBrand href="/">PSWS</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-left" navbar>
                        <NavItem>
                            {makeLinkItem(menu.menuAbout, lang)}
                        </NavItem>
                        <NavItem>
                            {makeLinkItem(menu.menuMercury, lang)}
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                <Trans id='menuEarth'>Earth</Trans>
                            </DropdownToggle>
                            <DropdownMenu left='true'>
                                <DropdownItem>
                                    {makeLinkItem(menuEarth.menuEarthDescription, lang)}
                                </DropdownItem>
                                <DropdownItem>
                                    {makeLinkItem(menuEarth.menuEarth2D, lang)}
                                </DropdownItem>
                                <DropdownItem>
                                    {makeLinkItem(menuEarth.menuEarth3D, lang)}
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <NavItem>
                            {makeLinkItem(menu.menuJupiter, lang)}
                        </NavItem>
                        <NavItem>
                            {makeLinkItem(menu.menuSaturn, lang)}
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink disabled><Trans id='menuContacts'>Contacts</Trans></NavLink>
                        </NavItem>
                        <NavItem>
                            {makeLinkItem(menuRu, 'ru')}
                        </NavItem>
                        <NavItem>
                            {makeLinkItem(menuEn, 'en')}
                        </NavItem>    
                        <NavItem>
                            {makeLinkItem(menu.menuOldSite, lang)}
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
};

export default MenuBar;
