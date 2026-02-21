/*jshint esversion: 6 */
import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import leftLogo from "../images/header1.jpg";
import rightLogo from "../images/logo.jpg";
import background from "../images/headerbckgrnd.jpg";
import { Trans } from "@lingui/macro";

class TopLogo extends Component {
	render() {
		return (
			<Container fluid={true}>
				<Row
					style={{
						backgroundImage: `url(${background})`
					}}
				>
					<Col
						sm={{ size: 2 }}
						className="d-none d-md-block"
						style={{ padding: "0px" }}
					>
						<img
							src={leftLogo}
							height="110px"
							margin="0px"
							padding="0px"
							alt="Planetary Space Weather Service"
						/>
					</Col>
					<Col
						style={{
							textAlign: "center",
							padding: "0px",
							height: "110px"
						}}
					>
						<span
							style={{
								position: "absolute",
								top: "50%",
								left: "0px",
								width: "100%",
								marginTop: "-1.3em",
								fontSize: "28px",
								color: "rgb(112,188,188)",
								textShadow:
									"rgb(189,238,238) 1px 1px 2px, rgb(189,238,238) -2px 1px 2px"
							}}
						>
							<Trans id="siteTitle">
								Planetary Magnetospheres
							</Trans>
						</span>
						<span
							style={{
								position: "absolute",
								top: "70%",
								left: "0px",
								width: "100%",
								marginTop: "-1.3em",
								fontSize: "14px",
								color: "white"//,
								// textShadow:
									// "rgb(189,238,238) 1px 1px 2px, rgb(189,238,238) -2px 1px 2px"
							}}
						>
							<Trans id="headerTitle">
								Planetary Space Weather Service at{" "}
								<a href="http://www.sinp.msu.ru">SINP</a>{" "}
								<a href="http://www.msu.ru">MSU</a>
							</Trans>
						</span>
					</Col>
					<Col
						sm={{ size: 2 }}
						className="d-none d-md-block"
						style={{
							padding: "0px",
							textAlign: "right"
						}}
					>
						<img
							src={rightLogo}
							height="110px"
							margin="0px"
							padding="0px"
							alt="SINP Logo"
						/>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default TopLogo;
