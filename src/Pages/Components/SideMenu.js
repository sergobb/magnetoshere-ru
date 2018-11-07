/*jshint esversion: 6 */
import React, { Component } from "react";
import { Card, CardTitle, CardBody, CardHeader, Navbar } from "reactstrap";
import { Trans } from "@lingui/macro";
import { menu } from "./menuItems";
import { makeSideMenu } from "./menuFuncs";
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
            return (
                <Sticky innerZ={98} top={80}>
                    <Card body>
                        <CardHeader>
                            <CardTitle>
                                <Trans id="Earth">Earth</Trans>
                            </CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Navbar light>
                                {makeSideMenu(SideMenu, lang)}
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
