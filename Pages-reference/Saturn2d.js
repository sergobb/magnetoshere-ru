/*jshint esversion: 6 */
import React from "react";
import Planet from "./PlanetTemplate";
import ParamodChart from "./Components/ParamodChart";
import { Trans } from "@lingui/macro";

class Saturn extends Planet {
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
            <Planet
                ParamodChart={ParamodChart}
                match={this.props.match}
                version="saturn2d"
                context="menuSaturn"
                history={this.props.history}
                shifts={{ min: "year", max: "year5" }}
                units="R<sub>S</sub>"
                title={
                    <Trans id="saturnModelDescTitle">
                        Saturn magnetosphere model
                    </Trans>
                }
            />
        );
    }
}

export default Saturn;
