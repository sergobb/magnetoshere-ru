/*jshint esversion: 6 */
import React from "react";
import Earth from "./EarthTemplate";
import ParamodChart from "./Components/Paramod3dChart";
class App extends Earth {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);

        this.state = {
            datetime: this.state.datetime,
            data: null,
            view3d: true,
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
                view3d={true}
                history={this.props.history}
            />
        );
    }
}

export default App;
