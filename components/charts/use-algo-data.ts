"use client";

import * as React from "react";
import axios from "axios";

interface UseAlgoDataProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  timeRange: string;
}

export function useAlgoData({ startDate, endDate, timeRange }: UseAlgoDataProps) {
  const [chartData, setChartData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  // Fetch data from API
  const fetchChartData = React.useCallback(async () => {
    try {
      setLoading(true);
      const startDateStr = startDate?.toISOString().split("T")[0] || "2020-03-31";
      const endDateStr = endDate?.toISOString().split("T")[0] || "2025-09-12";

      const response = await axios.get(`/api/data/charts/algo-main?startDate=${startDateStr}&endDate=${endDateStr}&timeRange=${timeRange === "actual" ? "--" : timeRange === "custom" ? "---" : timeRange}`);

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
  }, [startDate, endDate, timeRange]);

  // Remove automatic fetching - only fetch when explicitly called

  return {
    chartData,
    loading,
    fetchChartData,
  };
}
