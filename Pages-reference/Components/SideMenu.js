/*jshint esversion: 6 */
import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardHeader, Navbar } from "reactstrap";
// import { Trans } from "@lingui/macro";
import { menu } from "./menuItems";
import { makeSideMenu, makeIcon } from "./menuFuncs";
import Sticky from "react-stickynode";

class SideMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang: props.lang === "ru" ? "ru" : "en",
            context: props.context
        };
    }

    render() {
        let SideMenu =
                this.props.context !== undefined &&
                menu[0][this.props.context] !== undefined &&
                menu[0][this.props.context].menu !== undefined
                    ? menu[0][this.props.context].menu
                    : null,
            lang = this.state.lang;

        if (SideMenu !== null) {
            let Icon = menu[0][this.props.context].icon !== undefined ? makeIcon({
                                src: menu[0][this.props.context].icon,
                                height: menu[0][this.props.context].iconSize,
                                style: {
                                    marginRight: '10px'    
                                }
                            }) : null;
            return (
                <Sticky innerZ={98} top={80}>
                    <Card body className="ParamsCard">
                        <CardHeader>
                            <CardTitle>
                                {/*menu[0][this.props.context].icon !== undefined ? menu[0][this.props.context].icon : null*/}
                                {Icon}
                                {menu[0][this.props.context].item}
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Navbar light>
                                {makeSideMenu(SideMenu, lang, "SideMenu", this.props.match.path)}
                            </Navbar>
                        </CardBody>
                    </Card>
                </Sticky>
            );
        } else {
            return null;
        }
    }
}

export default SideMenu;
