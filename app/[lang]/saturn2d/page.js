"use client";

import React from "react";
import { Trans } from "@lingui/react";
import EarthChartPage from "../../../components/EarthChartPage";
import ParamodChart from "../../../components/ParamodChart";

export default function Saturn2dPage({ params }) {
  const lang = params.lang === "ru" ? "ru" : "en";
  return (
    <EarthChartPage
      lang={lang}
      version="saturn2d"
      context="menuSaturn"
      shifts={{ min: "year", max: "year5" }}
      title={
        <Trans id="saturnModelDescTitle">
          Saturn magnetosphere model
        </Trans>
      }
      ChartComponent={ParamodChart}
    />
  );
}
