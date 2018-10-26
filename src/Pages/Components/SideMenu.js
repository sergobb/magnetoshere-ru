/*jshint esversion: 6 */
import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardBody, CardHeader, Nav, Navbar } from 'reactstrap';
import { Trans } from '@lingui/macro';
import {menu, makeLinkItem} from './menuItems';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lang: (props.lang === 'ru') ? 'ru' : 'en',
            context: props.context
        };
    }

    makeMenuList (menu, lang) {
        let m, list = [];

        for (m in menu) {
            if (menu.hasOwnProperty(m)) {
                list.push(makeLinkItem(menu[m], lang, 'SideMenu' + m));
            }
        }
        return list;
    }

    render() {
        let SideMenu = (this.props.context !== undefined && 
                menu[this.props.context] !== undefined &&  
                menu[this.props.context].menu !== undefined) ? 
                menu[this.props.context].menu : 
                null,
            lang = this.state.lang;
        
        if (SideMenu !== null) {
            return (
                <Card body>
                    <CardHeader>
                        <CardTitle><Trans id='Earth'>Earth</Trans></CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Navbar light>
                            <Nav className="ml-left" navbar>
                                {this.makeMenuList(SideMenu, lang)}
                            </Nav>
                        </Navbar>
                    </CardBody>
                </Card>
            );
        } else {
            return null;
        }
    }
}

export default SideMenu;