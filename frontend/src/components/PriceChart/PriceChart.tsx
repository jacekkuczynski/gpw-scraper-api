"use client";

import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import styles from "./PriceChart.module.css";

export const PriceChart = (props: any) => {
  const {
    data,
    colors: {
      backgroundColor = "var(--violet7)",
      lineColor = "#2962FF",
      textColor = "white",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: backgroundColor },
          textColor,
        },
        width: 1200,
        height: 300,
      });
      chart.timeScale().fitContent();

      const newSeries = chart.addAreaSeries({
        lineColor,
        topColor: areaTopColor,
        bottomColor: areaBottomColor,
      });
      newSeries.setData(data);

      return () => {
        chart.remove();
      };
    }
  }, [
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        width: "100%",
        maxWidth: "screen",
        margin: "16px",
      }}
    />
  );
};
