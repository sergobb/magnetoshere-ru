/*jshint esversion: 6 */
import React from "react";
import Earth from "./PlanetTemplate";
import ParamodChart from "./Components/Paramod3dChart";
import { Trans } from "@lingui/macro";

class App extends Earth {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            datetime: this.state.datetime,
            data: null,
            version: "3d",
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
                version="3d"
                context="menuEarth"
                history={this.props.history}
                title={
                    <Trans id="earthModelDescTitle">
                        Earth's magnetosphere model
                    </Trans>
                }
            />
        );
    }
}

export default App;
