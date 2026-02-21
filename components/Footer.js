"use client";

import React from "react";
import { Container, Row, Col } from "reactstrap";

export default function Footer() {
  return (
    <Container fluid={true} className="sticky-bottom">
      <Row>
        <Col
          sm={{ size: 1 }}
          md={{ size: 2 }}
          lg={{ size: 3 }}
          xl={{ size: 3 }}
        />
        <Col
          sm={{ size: 10 }}
          md={{ size: 8 }}
          lg={{ size: 6 }}
          xl={{ size: 6 }}
        >
          <center>
            <a href="http://planetaryspaceweather-europlanet.irap.omp.eu/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo_europlanet.png"
                alt="Europlanet logo"
                onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.svg"; }}
              />
            </a>
          </center>
        </Col>
        <Col
          sm={{ size: 1 }}
          md={{ size: 2 }}
          lg={{ size: 3 }}
          xl={{ size: 3 }}
        />
      </Row>
    </Container>
  );
}
