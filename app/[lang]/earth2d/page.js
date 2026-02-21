"use client";

import React from "react";
import { Trans } from "@lingui/react";
import EarthChartPage from "../../../components/EarthChartPage";
import ParamodChart from "../../../components/ParamodChart";

export default function Earth2dPage({ params }) {
  const lang = params.lang === "ru" ? "ru" : "en";
  return (
    <EarthChartPage
      lang={lang}
      version="2d"
      context="menuEarth"
      title={
        <Trans id="earthModelDescTitle">Earth&apos;s magnetosphere model</Trans>
      }
      ChartComponent={ParamodChart}
    />
  );
}
