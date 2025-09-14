"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlgoChartControls } from "./algo-chart-controls";
import { AlgoChartArea } from "./algo-chart-area";
import { AlgoTable } from "./algo-table";
import { useAlgoData } from "./use-algo-data";
import { useAlgoTableData } from "./use-algo-table-data";
import dayjs from "dayjs";

export const description = "An interactive area chart for algorithm performance";

interface AlgoSectionProps {
  chartHeight?: string;
  tableHeight?: string;
}

export function AlgoSection({ chartHeight = "h-80 sm:h-80 lg:h-96", tableHeight = "max-h-[19rem]" }: AlgoSectionProps) {
  const [timeRange, setTimeRange] = React.useState("actual");
  const [startDate, setStartDate] = React.useState<Date | undefined>(new Date("2020-03-31"));
  const [endDate, setEndDate] = React.useState<Date | undefined>(new Date("2025-09-12"));
  const [isCustomDate, setIsCustomDate] = React.useState(false);

  const { chartData, loading, fetchChartData, updateTime } = useAlgoData({
    startDate,
    endDate,
    timeRange,
  });

  const {
    tableData,
    loading: tableLoading,
    fetchTableData,
  } = useAlgoTableData({
    startDate,
    endDate,
    timeRange,
  });

  const handleStartDateChange = React.useCallback((date: Date | undefined) => {
    setStartDate(date);
  }, []);

  const handleEndDateChange = React.useCallback((date: Date | undefined) => {
    setEndDate(date);
  }, []);

  const handleManualStartDateChange = React.useCallback((date: Date | undefined) => {
    setStartDate(date);
    setIsCustomDate(true);
  }, []);

  const handleManualEndDateChange = React.useCallback((date: Date | undefined) => {
    setEndDate(date);
    setIsCustomDate(true);
  }, []);

  const handleFetchData = React.useCallback(
    (selectedTimeRange?: string, selectedStartDate?: Date, selectedEndDate?: Date) => {
      fetchChartData(selectedTimeRange, selectedStartDate, selectedEndDate);
      fetchTableData(selectedStartDate || startDate, selectedEndDate || endDate, selectedTimeRange || timeRange);
    },
    [fetchChartData, fetchTableData, startDate, endDate, timeRange]
  );

  // Fetch initial data on component mount
  React.useEffect(() => {
    fetchChartData();
    fetchTableData();
  }, [fetchChartData, fetchTableData]);

  // Format update time from timestamp using Day.js
  const formatUpdateTime = (timestamp: string | null) => {
    if (!timestamp) return "Loading...";
    return dayjs(parseInt(timestamp)).format("MMMM D, YYYY [at] h:mm A Z");
  };

  return (
    <Card className="p-0 bg-transparent border-none">
      <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center text-white gap-4 space-y-0 p-0 lg:p-0">
        <div className="grid flex-1 gap-1 w-full lg:w-auto">
          <CardTitle className="text-xl lg:text-2xl">Multi Strategy Investment Track Record (US Market)</CardTitle>
          <CardDescription className="text-[#9568ff] font-bold text-sm lg:text-base">{formatUpdateTime(updateTime)}</CardDescription>
        </div>

        <div className="w-full lg:w-auto">
          <AlgoChartControls timeRange={timeRange} onTimeRangeChange={setTimeRange} startDate={startDate} onStartDateChange={handleStartDateChange} endDate={endDate} onEndDateChange={handleEndDateChange} onManualStartDateChange={handleManualStartDateChange} onManualEndDateChange={handleManualEndDateChange} loading={loading} onFetchData={handleFetchData} isCustomDate={isCustomDate} setIsCustomDate={setIsCustomDate} />
        </div>
      </CardHeader>

      <CardContent className="p-0 lg:p-0">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
          {/* Chart - Full width on mobile, 8 columns on xl+ */}
          <div className="xl:col-span-8">
            <AlgoChartArea data={chartData} height={chartHeight} />
          </div>

          {/* Table - Full width on mobile, 4 columns on xl+ */}
          <div className="xl:col-span-4">
            <AlgoTable data={tableData} loading={tableLoading} height={tableHeight} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
