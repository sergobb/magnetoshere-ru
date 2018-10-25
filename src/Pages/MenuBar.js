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
import { Link } from 'react-router-dom';
import { Trans } from '@lingui/macro';

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
		var lang = (this.props.match.params.lang !== undefined) ? "/" + this.props.match.params.lang : "/en",
			ru_path = this.props.match.path.replace(':lang','ru'),
			en_path = this.props.match.path.replace(':lang','en');

		return (
            <Navbar className="MenuBar" sticky-top='true' light expand="lg">
            	<NavbarBrand href="/">PSWS</NavbarBrand>
            	<NavbarToggler onClick={this.toggle} />
            	<Collapse isOpen={this.state.isOpen} navbar>
            		<Nav className="ml-left" navbar>
            			<NavItem>
                			<Link to={lang + '/about/'}><NavLink><Trans id='menuAbout'>About</Trans></NavLink></Link>
              			</NavItem>
              			<NavItem>
                			<NavLink disabled><Trans id='menuMercury'>Mercury</Trans></NavLink>
              			</NavItem>
              			<UncontrolledDropdown nav inNavbar>
			                <DropdownToggle nav caret>
			                	<Trans id='menuEarth'>Earth</Trans>
			                </DropdownToggle>
			                <DropdownMenu left='true'>
			                	<DropdownItem>
				                	<Link to={lang + '/earthdesc/'}><NavLink><Trans id='menuEarthDescription'>Model description</Trans></NavLink></Link>
				                </DropdownItem>
				                <DropdownItem>
				                	<Link to={lang + '/earth2d/'}><NavLink><Trans id='menuEarth2D'>2D Magnetic Field Lines</Trans></NavLink></Link>
				                </DropdownItem>
				                <DropdownItem>
				                	<Link to={lang + '/earth3d/'}><NavLink><Trans id='menuEarth3D'>3D Magnetic Field Lines</Trans></NavLink></Link>
				                </DropdownItem>
			                </DropdownMenu>
			            </UncontrolledDropdown>
              			<NavItem>
                			<NavLink disabled><Trans id='menuJupiter'>Jupiter</Trans></NavLink>
              			</NavItem>
              			<NavItem>
                			<NavLink disabled><Trans id='menuSaturn'>Saturn</Trans></NavLink>
              			</NavItem>
              		</Nav>
              		<Nav className="ml-auto" navbar>
              			<NavItem>
                			<NavLink disabled><Trans id='menuContacts'>Contacts</Trans></NavLink>
              			</NavItem>
              			<NavItem>
                			<NavLink href={ru_path}><Trans id='menuLangRu'>Ru</Trans></NavLink>
              			</NavItem>
              			<NavItem>
                			<NavLink href={en_path}><Trans id='menuLangEn'>En</Trans></NavLink>
              			</NavItem>
              			<NavItem>
                			<NavLink href='http://www.magnetosphere.ru/old.html'>Old site</NavLink>
              			</NavItem>
            		</Nav>
            	</Collapse>
            </Navbar>
        );
    }
};

export default MenuBar;