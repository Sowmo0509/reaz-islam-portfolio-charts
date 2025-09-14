"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import ApexCharts from "react-apexcharts";

// Dynamically import ApexCharts to avoid SSR issues
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface AlgoChartAreaProps {
  data: any[];
}

const chartConfig = {
  benchmark: {
    label: "SPY",
    color: "#00e396",
  },
  actual: {
    label: "Actual",
    color: "#9568ff",
  },
};

export function AlgoChartArea({ data }: AlgoChartAreaProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Calculate precise Y-axis domain to match actual data range
  const getYAxisDomain = () => {
    if (data.length === 0) return { min: "auto", max: "auto" };

    const allValues = data.flatMap((item) => [item.benchmark, item.actual]).filter((val) => !isNaN(val));
    if (allValues.length === 0) return { min: "auto", max: "auto" };

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Add 35% buffer above and below
    const range = maxValue - minValue;
    const buffer = range * 0.35;

    return { min: minValue - buffer, max: maxValue + buffer };
  };

  const yAxisDomain = getYAxisDomain();

  // Prepare data for ApexCharts
  const chartData = {
    series: [
      {
        name: chartConfig.benchmark.label,
        data: data.map((item) => item.benchmark),
      },
      {
        name: chartConfig.actual.label,
        data: data.map((item) => item.actual),
      },
    ],
    options: {
      chart: {
        type: "area" as const,
        background: "transparent",
        toolbar: {
          show: false,
        },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      colors: [chartConfig.benchmark.color, chartConfig.actual.color],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth" as const,
        width: 2,
      },
      fill: {
        type: "solid",
        opacity: 0.3,
      },
      grid: {
        show: true,
        borderColor: "#374151",
        strokeDashArray: 0,
        position: "back" as const,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        type: "datetime" as const,
        categories: data.map((item) => item.date),
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: isMobile ? "10px" : "12px",
          },
          format: isMobile ? "yyyy-MM-dd" : "dd MMM yyyy",
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        min: typeof yAxisDomain.min === "number" ? yAxisDomain.min : undefined,
        max: typeof yAxisDomain.max === "number" ? yAxisDomain.max : undefined,
        labels: {
          style: {
            colors: "#ffffff",
            fontSize: isMobile ? "10px" : "12px",
          },
          formatter: (value: number) => value.toLocaleString(),
        },
      },
      tooltip: {
        theme: "dark",
        x: {
          format: "MMM dd, yyyy",
        },
      },
      legend: {
        show: true,
        position: "bottom" as const,
        horizontalAlign: "center" as const,
        fontSize: isMobile ? "8px" : "10px",
        offsetY: 10,
        itemMargin: {
          horizontal: 5,
          vertical: 5,
        },
        labels: {
          colors: "#ffffff",
        },
      },
    },
  };

  return (
    <div className="w-full h-80 sm:h-80 lg:h-96">
      <Chart options={chartData.options} series={chartData.series} type="area" height="100%" />
    </div>
  );
}
