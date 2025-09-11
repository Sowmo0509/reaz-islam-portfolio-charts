"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const description = "An interactive area chart";

// Chart data interface
interface ChartDataPoint {
  date: string;
  benchmark: number;
  actual: number;
}

const chartConfig = {
  benchmark: {
    label: "Benchmark",
    color: "var(--chart-1)",
  },
  actual: {
    label: "Actual",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("actual");
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date("2020-03-31"));
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date("2025-09-12"));
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch data from API
  const fetchChartData = React.useCallback(async () => {
    try {
      setLoading(true);
      const startDateStr = startDate?.toISOString().split("T")[0] || "2020-03-31";
      const endDateStr = endDate?.toISOString().split("T")[0] || "2025-09-12";

      const response = await axios.get(`/api/data/charts/algo-main?startDate=${startDateStr}&endDate=${endDateStr}`);

      setChartData(response.data.data);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  // Handle time range selection
  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);

    if (value === "actual") {
      // Keep current dates for actual
      return;
    }

    const today = new Date();
    const newEndDate = new Date(today);
    let newStartDate = new Date(today);

    switch (value) {
      case "1w":
        newStartDate.setDate(today.getDate() - 7);
        break;
      case "1m":
        newStartDate.setMonth(today.getMonth() - 1);
        break;
      case "3m":
        newStartDate.setMonth(today.getMonth() - 3);
        break;
      case "6m":
        newStartDate.setMonth(today.getMonth() - 6);
        break;
      case "ytd":
        newStartDate = new Date(today.getFullYear(), 0, 1);
        break;
      case "1y":
        newStartDate.setFullYear(today.getFullYear() - 1);
        break;
      case "2y":
        newStartDate.setFullYear(today.getFullYear() - 2);
        break;
      case "5y":
        newStartDate.setFullYear(today.getFullYear() - 5);
        break;
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Fetch data on component mount and when dates change
  React.useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const filteredData = chartData;

  return (
    <Card className="p-0 bg-transparent border-none">
      <CardHeader className="flex items-center text-white gap-4 space-y-0 sm:flex-row p-0">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-2xl">Algo Main</CardTitle>
          <CardDescription className="text-[#9568ff] font-bold">Thursday, September 11, 2025 at 1:11 PM EST</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          {/* SPY Select (disabled) */}
          <Select disabled>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="SPY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SPY">SPY</SelectItem>
            </SelectContent>
          </Select>

          {/* Time Range Select */}
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="rounded-lg">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="actual" className="rounded-lg">
                Actual
              </SelectItem>
              <SelectItem value="1w" className="rounded-lg">
                1 Week
              </SelectItem>
              <SelectItem value="1m" className="rounded-lg">
                1 Month
              </SelectItem>
              <SelectItem value="3m" className="rounded-lg">
                3 Months
              </SelectItem>
              <SelectItem value="6m" className="rounded-lg">
                6 Months
              </SelectItem>
              <SelectItem value="ytd" className="rounded-lg">
                YTD
              </SelectItem>
              <SelectItem value="1y" className="rounded-lg">
                1 Year
              </SelectItem>
              <SelectItem value="2y" className="rounded-lg">
                2 Years
              </SelectItem>
              <SelectItem value="5y" className="rounded-lg">
                5 Years
              </SelectItem>
            </SelectContent>
          </Select>

          {/* OR text */}
          <span className="text-white/70 text-sm">OR</span>

          {/* Date Pickers */}
          <div className="flex items-center gap-2">
            <input type="date" value={startDate?.toISOString().split("T")[0] || ""} onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)} className="rounded-lg border border-gray-600 text-white px-3 py-2 w-[140px]" style={{ backgroundColor: "#25164f" }} />
            <span className="text-white/70">to</span>
            <input type="date" value={endDate?.toISOString().split("T")[0] || ""} onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)} className="rounded-lg border border-gray-600 text-white px-3 py-2 w-[140px]" style={{ backgroundColor: "#25164f" }} />
          </div>

          {/* GO Button */}
          <Button onClick={fetchChartData} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50">
            {loading ? "Loading..." : "GO"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-[320px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillBenchmark" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-benchmark)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-benchmark)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-actual)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-actual)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
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
            <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => value.toLocaleString()} />
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
            <Area dataKey="actual" type="natural" fill="url(#fillActual)" stroke="var(--color-actual)" stackId="a" />
            <Area dataKey="benchmark" type="natural" fill="url(#fillBenchmark)" stroke="var(--color-benchmark)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
