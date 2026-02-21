"use client";

import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Trans } from "@lingui/react";
export default function TopLogo() {
  return (
    <Container fluid={true}>
      <Row
        style={{
          backgroundImage: "url(../../images/headerbckgrnd.jpg)",
        }}
      >
        <Col
          sm={{ size: 2 }}
          className="d-none d-md-block"
          style={{ padding: "0px" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/header1.jpg"
            height="110"
            alt="Planetary Space Weather Service"
            onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.svg"; }}
          />
        </Col>
        <Col
          style={{
            textAlign: "center",
            padding: "0px",
            height: "110px",
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
                "rgb(189,238,238) 1px 1px 2px, rgb(189,238,238) -2px 1px 2px",
            }}
          >
            <Trans
              id="headerTitle"
              components={[
                <a href="http://www.sinp.msu.ru" key="sinp" />,
                <a href="http://www.msu.ru" key="msu" />,
              ]}
            />
          </span>
        </Col>
        <Col
          sm={{ size: 2 }}
          className="d-none d-md-block"
          style={{
            padding: "0px",
            textAlign: "right",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo.jpg"
            height="110"
            alt="SINP Logo"
            onError={(e) => { e.target.onerror = null; e.target.src = "/images/placeholder.svg"; }}
          />
        </Col>
      </Row>
    </Container>
  );
}
