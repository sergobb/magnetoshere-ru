"use client";

import React from "react";
import { Trans } from "@lingui/react";
import EarthChartPage from "../../../../components/EarthChartPage";
import Paramod3dChart from "../../../../components/Paramod3dChart";

export default function Earth3dUtsPage({ params }) {
  const lang = params.lang === "ru" ? "ru" : "en";
  return (
    <EarthChartPage
      lang={lang}
      version="3d"
      context="menuEarth"
      initialUts={params.uts}
      title={
        <Trans id="earthModelDescTitle">Earth&apos;s magnetosphere model</Trans>
      }
      ChartComponent={Paramod3dChart}
    />
  );
}
