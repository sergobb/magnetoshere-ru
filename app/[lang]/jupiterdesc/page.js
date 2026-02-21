"use client";

import React from "react";
import { Container, Row, Col } from "reactstrap";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideMenu from "../../../components/SideMenu";
import GhostStory from "../../../components/GhostStory";
import { useGhostPosts } from "../../../hooks/useGhostPosts";

export default function JupiterDescPage({ params }) {
  const lang = params.lang === "ru" ? "ru" : "en";
  const { getText, loading } = useGhostPosts();
  const ghostText = getText("jupiterModelDesc", lang);
  const ghostBaseUrl = process.env.NEXT_PUBLIC_GHOST_BASE_URL || "";

  return (
    <>
      <Header lang={lang} />
      <Container fluid={true}>
        <Row>
          <Col md={{ size: 4 }} lg={{ size: 3 }} xl={{ size: 3 }} className="d-none d-md-block">
            <SideMenu lang={lang} context="menuJupiter" />
          </Col>
          <Col sm={{ size: 12 }} md={{ size: 8 }} lg={{ size: 6 }} xl={{ size: 6 }}>
            {loading ? <p>Loading...</p> : (
              <GhostStory ghostText={ghostText} ghostBaseUrl={ghostBaseUrl} />
            )}
          </Col>
          <Col lg={{ size: 3 }} xl={{ size: 3 }} className="d-none d-lg-block" />
        </Row>
      </Container>
      <Footer />
    </>
  );
}
