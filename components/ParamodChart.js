"use client";

import React from "react";
import ReactHighcharts from "react-highcharts";
import "./css/ParamodCharts.css";

const DEFAULT_UNITS = "R<sub>e</sub>";

export default function ParamodChart({ data, title, config: configProp, units }) {
  const axisUnit = units ?? DEFAULT_UNITS;
  const config =
    configProp !== undefined
      ? configProp
      : {
          title: {
            text: title,
            style: { fontWeight: "bold", fontSize: "14px" },
          },
          chart: {
            height: (9 / 8) * 100 + "%",
            plotBorderWidth: 2,
            type: "scatter",
          },
          plotOptions: {
            lineWidth: 2,
            series: {
              color: "darkblue",
              marker: { enabled: false },
            },
          },
          tooltip: { enabled: true },
          legend: { enabled: false },
          series: [],
          xAxis: {
            reversed: true,
            gridLineWidth: 2,
            tickAmount: 11,
            title: {
              text: `X, ${axisUnit}`,
              useHTML: true,
              style: { fontWeight: "bold", fontSize: "12px" },
            },
            labels: {
              align: "center",
              useHTML: true,
              style: { fontWeight: "bold", fontSize: "11px" },
            },
          },
          yAxis: {
            gridLineWidth: 2,
            title: {
              text: `Z, ${axisUnit}`,
              useHTML: true,
              style: { fontWeight: "bold", fontSize: "12px" },
            },
            labels: {
              align: "center",
              useHTML: true,
              style: { fontWeight: "bold", fontSize: "11px" },
            },
          },
        };

  if (data !== null && data !== undefined) {
    config.series = data
      .filter((d) => d.length > 0)
      .map((d) => ({
        lineWidth: 2,
        data: d.map((l) => [l[0], l[1]]),
        name: "Magnetic field line",
        marker: {
          enabled: false,
          symbol: "circle",
          states: { hover: { enabled: true } },
        },
      }));
  }

  return (
    <div className="ParamodChart">
      <ReactHighcharts config={config} />
    </div>
  );
}
