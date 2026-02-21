"use client";

import React, { useMemo, useState } from "react";
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader } from "reactstrap";
import moment from "moment";
import Header from "./Header";
import Footer from "./Footer";
import SideMenu from "./SideMenu";
import DatePicker from "./DatePicker";
import ParamodChart from "./ParamodChart";
import Paramod3dChart from "./Paramod3dChart";
import LoadingModal from "./LoadingModal";
import { useParamodData } from "../hooks/useParamodData";
import { Trans } from "@lingui/react";

const MEASUREMENTS = {
  dt: <span>UT</span>,
  dst: <span>D<sub>st</sub></span>,
  density: <span>&rho;<sub>sw</sub></span>,
  speed: <span>V<sub>sw</sub></span>,
  bx: <span>B<sub>x</sub></span>,
  by: <span>B<sub>y</sub></span>,
  bz: <span>B<sub>z</sub></span>,
};

function ParamsCard({ state, params, units, title }) {
  if (!state || !params) return null;
  const row = [];
  for (const key of Object.keys(params)) {
    if (!params.hasOwnProperty(key) || state[key] === undefined) continue;
    row.push(
      <Row key={"Params_" + key}>
        <Col sm={{ size: 2 }} className="ParamsCard">{params[key]}</Col>
        <Col xs={{ size: 1 }} className="ParamsCard">=</Col>
        <Col xs={{ size: 8 }} className="ParamsCard">{state[key]} {units[key]}</Col>
      </Row>
    );
  }
  if (row.length === 0) return null;
  return (
    <Card body className="ParamsCard">
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardBody>{row}</CardBody>
    </Card>
  );
}

const UNITS = {
  dt: "",
  dst: "nT", bx: "nT", by: "nT", bz: "nT", bdc: "nT", bt: "nT",
  density: <span>cm<sup>-3</sup></span>,
  speed: "km/s", psi: <span>&deg;</span>, b0: "nT", flux: "MWb", br: "nT", bfac: "nT",
  r1: <span>R<sub>e</sub></span>, rss: <span>R<sub>e</sub></span>, r2: <span>R<sub>e</sub></span>,
  rd1: <span>R<sub>J</sub></span>, rd2: <span>R<sub>J</sub></span>,
  pbx: "nT", pby: "nT", pbz: "nT",
};

const PARAMETERS = {
  psi: <span>&Psi;</span>,
  b0: <span>B<sub>0</sub></span>,
  bdc: <span>B<sub>DC</sub></span>,
  flux: <span>&Phi;<sub>&infin;</sub></span>,
  bt: <span>BT</span>,
  br: <span>b<sub>r</sub></span>,
  bfac: <span>B<sub>fac</sub></span>,
  rd1: <span>R<sub>D1</sub></span>,
  rd2: <span>R<sub>D2</sub></span>,
  r1: <span>R<sub>1</sub></span>,
  rss: <span>R<sub>SS</sub></span>,
  r2: <span>R<sub>2</sub></span>,
  pbx: <span>B<sub>x</sub></span>,
  pby: <span>B<sub>y</sub></span>,
  pbz: <span>B<sub>z</sub></span>,
};

function getUnits(version) {
  const u = { ...UNITS };
  if (version === "saturn2d") {
    u.r1 = u.rss = u.r2 = <span>R<sub>S</sub></span>;
    u.rd1 = u.rd2 = <span>R<sub>S</sub></span>;
  }
  return u;
}

export default function EarthChartPage({
  lang,
  version,
  context,
  title,
  ChartComponent,
  initialUts,
  shifts,
}) {
  const initialTsFromUrl = useMemo(
    () => (initialUts != null ? moment(parseFloat(initialUts)).valueOf() : null),
    [initialUts]
  );
  const [mountTime] = useState(() =>
    moment().subtract(moment.duration(moment().utcOffset(), "minutes")).valueOf()
  );
  const stableInitialTs = initialTsFromUrl ?? mountTime;
  const { datetime, data, params, loading, onDateChange } = useParamodData(
    stableInitialTs,
    version
  );
  const unitsForCard = getUnits(version);
  const chartUnits = version === "saturn2d" ? "R<sub>S</sub>" : undefined;
  const showParams = params != null && params.r1 !== undefined;

  return (
    <>
      <Header lang={lang} />
      <Container fluid={true}>
        <Row>
          <Col md={{ size: 3 }} lg={{ size: 3 }} xl={{ size: 3 }} className="d-none d-md-block">
            <SideMenu lang={lang} context={context} />
          </Col>
          <Col xs={{ size: 12 }} sm={{ size: 12 }} md={{ size: 9 }} lg={{ size: 6 }} xl={{ size: 6 }}>
            <div className="App">
              <h2>{title}</h2>
              <DatePicker datetime={datetime} onDateChange={onDateChange} shifts={shifts} />
              {loading ? (
                <p>Loading...</p>
              ) : (
                <ChartComponent title="" data={data} units={chartUnits} />
              )}
            </div>
          </Col>
          <Col md={{ size: 9, offset: 3 }} lg={{ size: 3, offset: 0 }} xl={{ size: 3 }}>
            <Container fluid={true}>
              <ParamsCard
                state={params}
                params={MEASUREMENTS}
                units={unitsForCard}
                title={<Trans id="measurementsTitle">Input data</Trans>}
              />
              <br />
              {showParams && (
                <ParamsCard
                  state={params}
                  params={PARAMETERS}
                  units={unitsForCard}
                  title={<Trans id="parametersTitle">Model Parameters</Trans>}
                />
              )}
            </Container>
          </Col>
        </Row>
        <LoadingModal show={loading} />
      </Container>
      <Footer />
    </>
  );
}
