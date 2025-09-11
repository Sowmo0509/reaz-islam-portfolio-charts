"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
} satisfies ChartConfig;

export function AlgoChartArea({ data }: AlgoChartAreaProps) {
  // Calculate precise Y-axis domain to match actual data range
  const getYAxisDomain = () => {
    if (data.length === 0) return ["auto", "auto"];

    const allValues = data.flatMap((item) => [item.benchmark, item.actual]).filter((val) => !isNaN(val));
    if (allValues.length === 0) return ["auto", "auto"];

    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Add 35% buffer above and below
    const range = maxValue - minValue;
    const buffer = range * 0.35;

    return [minValue - buffer, maxValue + buffer];
  };

  const yAxisDomain = getYAxisDomain();

  return (
    <ChartContainer config={chartConfig} className="aspect-auto h-96 w-full">
      <AreaChart data={data} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          minTickGap={32}
          tickFormatter={(value) => {
            const date = new Date(value);
            return date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });
          }}
        />
        <YAxis domain={yAxisDomain} tickLine={false} axisLine={false} width={30} tickFormatter={(value) => value.toLocaleString()} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
              indicator="dot"
            />
          }
        />
        <Area dataKey="actual" type="natural" fill={chartConfig.actual.color} fillOpacity={0.3} stroke={chartConfig.actual.color} stackId="a" />
        <Area dataKey="benchmark" type="natural" fill={chartConfig.benchmark.color} fillOpacity={0.3} stroke={chartConfig.benchmark.color} stackId="a" />
        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  );
}
