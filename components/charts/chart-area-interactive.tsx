"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";

export const description = "An interactive area chart";

// Chart data interface
interface ChartDataPoint {
  date: string;
  benchmark: number;
  actual: number;
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

      const response = await axios.get(`/api/data/charts/algo-main?startDate=${startDateStr}&endDate=${endDateStr}&timeRange=${timeRange === "actual" ? "--" : timeRange}`);

      // Transform API data to chart format
      const transformedData = response.data.data.map((item: any) => ({
        date: new Date(item.dt).toISOString().split("T")[0],
        benchmark: parseFloat(item.bm) || 0,
        actual: parseFloat(item.ac) || 0,
      }));

      setChartData(transformedData);
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
      // Set default range for actual data
      const localDate = dayjs().format("YYYY-MM-DD");
      const today = dayjs.utc(localDate);
      const defaultStartDate = dayjs.utc("2020-03-31").toDate();
      const defaultEndDate = today.toDate();

      setStartDate(defaultStartDate);
      setEndDate(defaultEndDate);
      return;
    }

    // Use Day.js for clean date calculations - determine "today" based on local date
    const localDate = dayjs().format("YYYY-MM-DD"); // Get local date string (2025-09-12)
    const today = dayjs.utc(localDate); // Create UTC date from local date string
    const newEndDate = today.toDate();
    let newStartDate: Date;

    switch (value) {
      case "1w":
        newStartDate = today.subtract(1, "week").toDate();
        break;
      case "1m":
        newStartDate = today.subtract(1, "month").toDate();
        break;
      case "3m":
        newStartDate = today.subtract(3, "months").toDate();
        break;
      case "6m":
        newStartDate = today.subtract(6, "months").toDate();
        break;
      case "ytd":
        newStartDate = today.startOf("year").toDate();
        break;
      case "1y":
        newStartDate = today.subtract(1, "year").toDate();
        break;
      case "2y":
        newStartDate = today.subtract(2, "years").toDate();
        break;
      case "5y":
        newStartDate = today.subtract(5, "years").toDate();
        break;
      default:
        newStartDate = today.toDate();
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  // Fetch data on component mount and when dates change
  React.useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const filteredData = chartData;

  // Calculate precise Y-axis domain to match actual data range
  const getYAxisDomain = () => {
    if (filteredData.length === 0) return ["auto", "auto"];

    const allValues = filteredData.flatMap((item) => [item.benchmark, item.actual]).filter((val) => !isNaN(val));
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
    <Card className="p-0 bg-transparent border-none">
      <CardHeader className="flex items-center text-white gap-4 space-y-0 sm:flex-row p-0">
        <div className="grid flex-1 gap-1">
          <CardTitle className="text-2xl">Algo Main</CardTitle>
          <CardDescription className="text-[#9568ff] font-bold">Thursday, September 11, 2025 at 1:11 PM EST</CardDescription>
        </div>

        <div className="flex items-center gap-3">
          {/* SPY Select (disabled) */}
          <Select disabled>
            <SelectTrigger className="rounded-lg text-xs">
              <SelectValue placeholder="SPY" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SPY">SPY</SelectItem>
            </SelectContent>
          </Select>

          {/* Time Range Select */}
          <Select value={timeRange} onValueChange={handleTimeRangeChange}>
            <SelectTrigger className="rounded-lg text-xs">
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
            <input type="date" value={startDate?.toISOString().split("T")[0] || ""} onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)} className="rounded-lg border border-gray-600 text-white px-3 py-2 w-[140px] text-xs" style={{ backgroundColor: "#25164f" }} />
            <span className="text-white/70">to</span>
            <input type="date" value={endDate?.toISOString().split("T")[0] || ""} onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)} className="rounded-lg border border-gray-600 text-white px-3 py-2 w-[140px] text-xs" style={{ backgroundColor: "#25164f" }} />
          </div>

          {/* GO Button */}
          <Button onClick={fetchChartData} disabled={loading} className="text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer" style={{ backgroundColor: "#362465" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a1a4a")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#362465")}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-96 w-full">
          <AreaChart data={filteredData} margin={{ left: 20, right: 20, top: 20, bottom: 20 }}>
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
      </CardContent>
    </Card>
  );
}
