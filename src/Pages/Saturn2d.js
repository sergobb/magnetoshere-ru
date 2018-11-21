/*jshint esversion: 6 */
import React from "react";
import Earth from "./EarthTemplate";
import ParamodChart from "./Components/ParamodChart";
import { Trans } from "@lingui/macro";

class App extends Earth {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            datetime: this.state.datetime,
            data: null,
            version: "2d",
            lang: this.state.lang
        };
    }

    onDateChange(picker) {
        super.onDateChange(picker);
    }

    render() {
        return (
            <Earth
                ParamodChart={ParamodChart}
                match={this.props.match}
                version="saturn2d"
                context="menuSaturn"
                history={this.props.history}
                title={
                    <Trans id="saturnModelDescTitle">
                        Saturn magnetosphere model
                    </Trans>
                }
            />
        );
    }
}

export default App;
