/*jshint esversion: 6 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import Earth2dPage from "./Pages/Earth2d";
import Earth3dPage from "./Pages/Earth3d";
import EarthDesc from "./Pages/EarthDesc";
import About from "./Pages/About";
import * as serviceWorker from "./serviceWorker";
import ghost from "./lib/ghost";

ghost.init().then(function() {
	console.log("texts loaded");
	ReactDOM.render(
		<BrowserRouter>
			<Switch>
				<Redirect exact from="/" to="/en/about" />
				<Route exact path="/:lang/about" component={About} />
				<Route exact path="/:lang/earthdesc" component={EarthDesc} />
				<Route exact path="/:lang/earth2d" component={Earth2dPage} />
				<Route
					exact
					path="/:lang/earth2d/:uts/"
					component={Earth2dPage}
				/>
				<Route exact path="/:lang/earth3d" component={Earth3dPage} />
				<Route
					exact
					path="/:lang/earth3d/:uts/"
					component={Earth3dPage}
				/>
			</Switch>
		</BrowserRouter>,
		document.getElementById("paramod")
	);
});

// If you want your EarthPage to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
