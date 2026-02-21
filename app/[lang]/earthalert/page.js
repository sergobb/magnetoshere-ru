"use client";

import React from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideMenu from "../../../components/SideMenu";
import { Trans } from "@lingui/react";

export default function EarthAlertPage({ params }) {
  const lang = params.lang === "ru" ? "ru" : "en";

  return (
    <>
      <Header lang={lang} />
      <Container fluid={true}>
        <Row>
          <Col md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 3 }} className="d-none d-md-block">
            <SideMenu lang={lang} context="menuEarth" />
          </Col>
          <Col sm={{ size: 12 }} md={{ size: 8 }} lg={{ size: 6 }} xl={{ size: 6 }}>
            <h2>
              <Trans id="earthAlertServiceTitle">
                Solar Wind Dynamic Pressure on the Earth&apos;s Orbit and Magnetopause Standoff Distance
              </Trans>
            </h2>
            <p>This service is under development.</p>
          </Col>
          <Col lg={{ size: 3 }} xl={{ size: 3 }} className="d-none d-lg-block" />
        </Row>
      </Container>
      <Footer />
    </>
  );
}
