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
  const [updateTime, setUpdateTime] = React.useState<string | null>(null);

  // Fetch data from API
  const fetchChartData = React.useCallback(
    async (selectedTimeRange?: string, selectedStartDate?: Date, selectedEndDate?: Date) => {
      try {
        setLoading(true);
        const effectiveStartDate = selectedStartDate || startDate;
        const effectiveEndDate = selectedEndDate || endDate;
        const startDateStr = effectiveStartDate?.toISOString().split("T")[0] || "2020-03-31";
        const endDateStr = effectiveEndDate?.toISOString().split("T")[0] || "2025-09-12";

        const effectiveTimeRange = selectedTimeRange || timeRange;
        const timeRangeParam = effectiveTimeRange === "actual" ? "--" : effectiveTimeRange === "custom" ? "---" : effectiveTimeRange;
        console.log("API Call Debug:", { startDateStr, endDateStr, timeRange, effectiveTimeRange, timeRangeParam, calculatedDates: { selectedStartDate, selectedEndDate } });
        const response = await axios.get(`/api/data/charts/algo-main?startDate=${startDateStr}&endDate=${endDateStr}&timeRange=${timeRangeParam}`);

        // Set update time from API response
        if (response.data.updateTime) {
          setUpdateTime(response.data.updateTime);
        }

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
    },
    [startDate, endDate, timeRange]
  );

  // Remove automatic fetching - only fetch when explicitly called

  return {
    chartData,
    loading,
    fetchChartData,
    updateTime,
  };
}
