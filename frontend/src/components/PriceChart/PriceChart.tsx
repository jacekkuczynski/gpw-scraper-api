"use client";

import { createChart, ColorType } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import styles from "./PriceChart.module.css";
import { useQuery } from "react-query";
import { getChartData } from "@/fetchers/getChartData";

export const PriceChart = ({ symbol }: { symbol: string }) => {
  const backgroundColor = "white";
  const lineColor = "gray";
  const textColor = "black";
  const areaTopColor = "gray";
  const areaBottomColor = "#6D56CE";

  const { data } = useQuery(["chartData", symbol], getChartData);

  const chartContainerRef = useRef(null);

  // useEffect(() => {
  //   console.log(data), [data];
  // });

  // useEffect(() => {
  //   if (data) {
  //     if (chartContainerRef.current) {
  //       const chart = createChart(chartContainerRef.current, {
  //         layout: {
  //           background: { type: ColorType.Solid, color: backgroundColor },
  //           textColor,
  //         },
  //         width: 1200,
  //         height: 300,
  //       });
  //       chart.timeScale().fitContent();

  //       const newSeries = chart.addAreaSeries({
  //         lineColor,
  //         topColor: areaTopColor,
  //         bottomColor: areaBottomColor,
  //       });
  //       newSeries.setData(data);

  //       return () => {
  //         chart.remove();
  //       };
  //     }
  //   }
  // }, [
  //   data,
  //   backgroundColor,
  //   lineColor,
  //   textColor,
  //   areaTopColor,
  //   areaBottomColor,
  // ]);

  return <div ref={chartContainerRef} className={styles.chartContainer} />;
};
