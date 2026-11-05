"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from "chart.js";
import "chartjs-adapter-date-fns";
import annotationPlugin from "chartjs-plugin-annotation";
import { parse, format } from "date-fns";
import dynamic from "next/dynamic";
import useSWR from "swr";
import ChartWrapper from "./ChartWrapper";

// ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend, annotationPlugin);

// const Line = dynamic(
//     () => import('react-chartjs-2').then(mod => mod.Line),
//     { ssr: false, loading: () => <div className="h-[400px] animate-pulse bg-gray-100 rounded-lg" /> }
// );

// Define types for Event and Annotation
interface Event {
  name: string;
  startDate: string;
  color: string;
}

interface Annotation {
  [key: string]: any;
}

// Extend ChartData to include annotations
interface CustomChartData extends ChartData<"line"> {
  annotations?: Annotation;
}

// Define the shape of the CPI Data
interface CPIData {
  date: string;
  HHI: string;
  CPI: string;
}

//fetcher function to fetch the data on the server only
const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    const data: CPIData[] = await res.json();
    return data;
  });

const LineGraph: React.FC = () => {
  // const [chartData, setChartData] = useState<CustomChartData | null>(null);
  const { data: fetchedData, error } = useSWR<CPIData[]>(
    "/daily_hhi_cpi.json",
    fetcher
  );
  const [view, setView] = useState<"daily" | "movingAverage">("daily");
  const [lastUpdateDate, setLastUpdateDate] = useState<string>("");

  // Fetch and process data
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await fetch('/daily_hhi_cpi.json');
  //             const data: CPIData[] = await response.json();
  //             const formattedData = parseJSON(data);
  //             console.log("formattedData", formattedData)

  //             const lastDate = formattedData.labels[formattedData.labels.length - 1] as Date;
  //             setLastUpdateDate(lastDate ? format(lastDate, 'dd MMMM yyyy') : 'N/A');
  //             setChartData(formattedData);
  //         } catch (error) {
  //             console.error('Error fetching data:', error);
  //         }
  //     };

  //     fetchData();
  // }, [view]);

  const calculateMovingAverage = useCallback(
    (data: number[], windowSize: number) => {
      const result: number[] = [];
      for (let i = 0; i < data.length; i++) {
        const window = data.slice(Math.max(0, i - windowSize + 1), i + 1);
        const average =
          window.reduce((sum, value) => sum + value, 0) / window.length;
        result.push(average);
      }
      return result;
    },
    []
  );

  // Function to parse and process the JSON data
  const chartData = useMemo(() => {
    const labels: Date[] = [];
    const cpiData: number[] = [];
    const tokenHouseCpiData: number[] = []; // Add an array for "Token house CPI" data

    if (!fetchedData) return null;

    fetchedData.forEach((item: CPIData) => {
      // Update the format from "dd-MM-yyyy" to "MM-dd-yyyy"
      const date = parse(item.date, "MM-dd-yyyy", new Date());
      const cpi = parseFloat(item.CPI);
      const tokenHouseCpi = parseFloat(item["HHI"]); // Parse the "Token house CPI" value

      if (date && !isNaN(cpi) && !isNaN(tokenHouseCpi)) {
        labels.push(date);
        cpiData.push(cpi);
        tokenHouseCpiData.push(tokenHouseCpi); // Store "Token house CPI" data
      }
    });

    // Datasets for both "CPI" and "Token house CPI"
    const datasets = [
      {
        label: "CPI",
        data:
          view === "movingAverage"
            ? calculateMovingAverage(cpiData, 7)
            : cpiData,
        borderColor: "#FF0420",
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#FF0420",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#e4302d",
        pointHoverBorderColor: "#fff",
      },
      {
        label: "Token house CPI", // Add a label for "Token house CPI"
        data:
          view === "movingAverage"
            ? calculateMovingAverage(tokenHouseCpiData, 7)
            : tokenHouseCpiData, // Add data for "Token house CPI"
        borderColor: "#008080",
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#008080",
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#00CED1",
        pointHoverBorderColor: "#fff",
      },
    ];

    // Adding Event Annotations (as before)
    const events = [
      {
        name: "RPGF Round 2",
        startDate: "01-06-2022",
        endDate: "30-03-2023",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "RPGF Round 3",
        startDate: "14-10-2023",
        endDate: "11-01-2024",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "RPGF Round 4",
        startDate: "03-06-2024",
        endDate: "11-01-2024",
        color: "rgba(255,0,0,0.7)",
      },
      {
        name: "Season 3",
        startDate: "26-01-2023",
        endDate: "05-04-2023",
        color: "rgba(128,0,128,0.7)",
      },
      {
        name: "Season 4",
        startDate: "08-06-2023",
        endDate: "20-09-2023",
        color: "rgba(128,0,128,0.7)",
      },
      {
        name: "Season 5",
        startDate: "04-01-2024",
        endDate: "00-00-0000",
        color: "rgba(128,0,128,0.7)",
      },
      {
        name: "Season 6",
        startDate: "27-06-2024",
        endDate: "00-00-0000",
        color: "rgba(128,0,128,0.7)",
      },
    ];

    const annotations: Annotation = {};

    events.forEach((event, index) => {
      const isRPGF = event.name.includes("RPGF");
      const yPosition = isRPGF ? "8%" : "12%";
      const start = parse(event.startDate, "dd-MM-yyyy", new Date());
      annotations[`eventLine${index}`] = {
        type: "line",
        xMin: start,
        xMax: start,
        borderColor: event.color,
        borderWidth: 1,
        borderDash: [6, 6],
      };
      annotations[`eventLabel${index}`] = {
        type: "label",
        xValue: start,
        yValue: yPosition,
        content: event.name,
        font: {
          size: 12,
          weight: "bold",
        },
        color: event.color,
        textAlign: "center",
        xAdjust: isRPGF ? 55 : 40,
        yAdjust: isRPGF ? -20 : 20,
      };
    });

    const lastDate = labels[labels.length - 1] || null;
    setLastUpdateDate(lastDate ? format(lastDate, "dd MMMM yyyy") : "N/A");

    return {
      labels,
      datasets,
      annotations,
    };
  }, [fetchedData, view]);

  // Define chart options with types
  const options = useMemo<ChartOptions<"line">>(
    () => ({
      plugins: {
        legend: { display: true },
        tooltip: {
          callbacks: {
            title: (tooltipItems) => {
              const label = tooltipItems[0]?.label as string;
              return `Date - ${format(new Date(label), "yyyy-MM-dd")}`;
            },
            label: (tooltipItem) => {
              const dataset = chartData?.datasets?.[tooltipItem.datasetIndex];
              const value = (tooltipItem.raw as number).toFixed(2);
              const label = dataset?.label || "";
              return `${label} - ${value}`;
            },
          },
        },
        annotation: {
          annotations: chartData?.annotations || {},
        },
      },
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
            tooltipFormat: "yyyy-MM-dd",
            displayFormats: { day: "MMM yyyy" },
          },
          ticks: { autoSkip: true, maxTicksLimit: 10 },
        },
        y: {
          min: 0,
          max: 1000,
          ticks: { stepSize: 100 },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 2000,
        easing: "easeOutQuart",
      },
    }),
    [chartData]
  );

  if (error) return <div>Error loading data...</div>;

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-3 rounded-lg shadow-md w-full my-10 pb-10">
      {/* Header Section */}
      <h2 className="font-mori font-semibold text-white text-2.5xl md:text-5xl mb-4 text-center max-w-[80%]">
        Optimism CPI Over Time{" "}
      </h2>
      <div className="border border-gray-300 flex justify-center items-center mb-4 self-end rounded-lg">
        <label htmlFor="cpi-view-selector" className="sr-only">
          Optimism CPI Over Time
        </label>
        <select
          id="cpi-view-selector"
          className="px-2 py-2 font-mori font-normal text-sm bg-dark-gray rounded-lg"
          onChange={(e) => setView(e.target.value as "daily" | "movingAverage")}
          value={view}
          aria-label="Select CPI view"
          aria-live="polite"
        >
          <option value="daily">Daily CPI</option>
          <option value="movingAverage">7-Day Moving Average</option>
        </select>
      </div>
      {/* Chart Rendering */}
      <div className="relative w-full bg-white border border-gray-300 rounded-lg h-[600px] py-8 px-4">
        {chartData ? (
          <ChartWrapper data={chartData} type="line" options={options} />
        ) : (
          <p>Loading chart...</p>
        )}
        <div className="font-mori font-normal text-xs text-gray-500 text-end pt-4">
          Last updated on:-{" "}
          <span className="text-black ml-1">{lastUpdateDate}</span>
        </div>
      </div>

      <div className="font-mori font-normal max-w-[90%] pt-4 text-xl">
        The concentration of power within the collective has been steadily
        declining with each season and RPGF round.
      </div>
    </div>
  );
};

export default LineGraph;
