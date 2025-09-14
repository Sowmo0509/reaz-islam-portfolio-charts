"use client";

import * as React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Play } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface AlgoChartControlsProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  startDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  endDate: Date | undefined;
  onEndDateChange: (date: Date | undefined) => void;
  onManualStartDateChange: (date: Date | undefined) => void;
  onManualEndDateChange: (date: Date | undefined) => void;
  loading: boolean;
  onFetchData: (selectedTimeRange?: string, selectedStartDate?: Date, selectedEndDate?: Date) => void;
  isCustomDate: boolean;
  setIsCustomDate: (value: boolean) => void;
}

export function AlgoChartControls({ timeRange, onTimeRangeChange, startDate, onStartDateChange, endDate, onEndDateChange, onManualStartDateChange, onManualEndDateChange, loading, onFetchData, isCustomDate, setIsCustomDate }: AlgoChartControlsProps) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Handle time range selection
  const handleTimeRangeChange = (value: string) => {
    onTimeRangeChange(value);

    if (value === "custom") {
      // Don't change dates for custom selection
      return;
    }

    // Reset custom date flag for all predefined ranges
    setIsCustomDate(false);

    if (value === "actual") {
      // Set default range for actual data
      const localDate = dayjs().format("YYYY-MM-DD");
      const today = dayjs.utc(localDate);
      const defaultStartDate = dayjs.utc("2020-03-31").toDate();
      const defaultEndDate = today.toDate();

      onStartDateChange(defaultStartDate);
      onEndDateChange(defaultEndDate);

      // Auto-call API for predefined time ranges with calculated dates
      setTimeout(() => onFetchData(value, defaultStartDate, defaultEndDate), 100);
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

    onStartDateChange(newStartDate);
    onEndDateChange(newEndDate);

    // Auto-call API for predefined time ranges with calculated dates
    setTimeout(() => onFetchData(value, newStartDate, newEndDate), 100);
  };

  return (
    <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 w-full">
      {/* Top row - SPY and Time Range */}
      <div className="flex flex-row items-stretch sm:items-center gap-3 flex-1">
        {/* SPY Select (disabled) */}
        <Select disabled>
          <SelectTrigger className="rounded-lg text-xs w-full sm:w-auto">
            <SelectValue placeholder="SPY" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SPY">SPY</SelectItem>
          </SelectContent>
        </Select>

        {/* Time Range Select */}
        <Select value={isCustomDate ? "custom" : timeRange} onValueChange={handleTimeRangeChange}>
          <SelectTrigger className="rounded-lg text-xs w-full sm:w-auto">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="actual" className="rounded-lg">
              Actual Dates
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
            <SelectItem value="custom" className="rounded-lg">
              Custom Dates
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* OR text */}
      <span className="text-white/70 text-sm text-center lg:text-left">OR</span>

      {/* Date Pickers */}
      <div className="flex flex-row items-center gap-2">
        <input type="date" value={startDate?.toISOString().split("T")[0] || ""} onChange={(e) => onManualStartDateChange(e.target.value ? new Date(e.target.value) : undefined)} className="rounded-lg border border-gray-600 text-white px-3 py-2 w-full sm:w-[140px] text-xs" style={{ backgroundColor: "#25164f" }} />
        <span className="text-white/70 text-xs sm:text-sm">to</span>
        <input type="date" value={endDate?.toISOString().split("T")[0] || ""} onChange={(e) => onManualEndDateChange(e.target.value ? new Date(e.target.value) : undefined)} className="rounded-lg border border-gray-600 text-white px-3 py-2 w-full sm:w-[140px] text-xs" style={{ backgroundColor: "#25164f" }} />
      </div>

      {/* GO Button */}
      <Button onClick={() => onFetchData()} disabled={loading} className="text-white px-4 py-2 rounded-lg disabled:opacity-50 cursor-pointer w-full sm:w-auto" style={{ backgroundColor: "#362465" }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a1a4a")} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#362465")}>
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : (isMobile ? "Refresh" : <Play className="h-4 w-4" />)}
      </Button>
    </div>
  );
}

