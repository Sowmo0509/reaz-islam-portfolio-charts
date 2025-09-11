"use client";

import * as React from "react";
import axios from "axios";

interface UseAlgoTableDataProps {
  startDate?: Date;
  endDate?: Date;
  timeRange?: string;
}

export function useAlgoTableData({ startDate, endDate, timeRange }: UseAlgoTableDataProps = {}) {
  const [tableData, setTableData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchTableData = React.useCallback(async (start?: Date, end?: Date, range?: string) => {
    setLoading(true);
    try {
      const startDateStr = start?.toISOString().split("T")[0] || "2020-03-31";
      const endDateStr = end?.toISOString().split("T")[0] || "2025-09-12";
      const timeRangeParam = range || "actual";

      const response = await axios.get(`/api/data/charts/algo-table?startDate=${startDateStr}&endDate=${endDateStr}&timeRange=${timeRangeParam === "actual" ? "--" : timeRangeParam === "custom" ? "---" : timeRangeParam}`);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching table data:", error);
      // Fallback to sample data on error
      setTableData([
        {
          id: "Total Return",
          ac: "-0.201",
          bm: "2.334",
        },
        {
          id: "1-day Return",
          ac: "0.644",
          bm: "0.834",
        },
        {
          id: "Alpha",
          ac: "-63.781",
          bm: "0.000",
        },
        {
          id: "Annualized Return",
          ac: "-2.382",
          bm: "31.900",
        },
        {
          id: "Std Deviation",
          ac: "18.094",
          bm: "8.560",
        },
        {
          id: "Return/Risk",
          ac: "-0.132",
          bm: "3.727",
        },
        {
          id: "Excess Return",
          ac: "-34.282",
          bm: "0.000",
        },
        {
          id: "Batting Average",
          ac: "0.476",
          bm: "0.524",
        },
        {
          id: "Skewness",
          ac: "-0.749",
          bm: "47.372",
        },
        {
          id: "Kurtosis",
          ac: "69.406",
          bm: "-23.455",
        },
        {
          id: "Max Drawdown",
          ac: "3.986",
          bm: "1.381",
        },
        {
          id: "Best Period",
          ac: "2.676",
          bm: "1.384",
        },
        {
          id: "Worst Period",
          ac: "-2.279",
          bm: "-0.668",
        },
        {
          id: "Calmar Ratio",
          ac: "-0.610",
          bm: "9.809",
        },
        {
          id: "Correlation Coefficient",
          ac: "0.910",
          bm: "1.000",
        },
        {
          id: "Bias Ratio",
          ac: "0.541",
          bm: "0.517",
        },
        {
          id: "Down Market Return",
          ac: "-88.171",
          bm: "-60.094",
        },
        {
          id: "Up Market Return",
          ac: "564.932",
          bm: "291.063",
        },
        {
          id: "Number of Negative Period",
          ac: 11,
          bm: 10,
        },
        {
          id: "Number of Positive Period",
          ac: 10,
          bm: 11,
        },
        {
          id: "Capture Ratio Down",
          ac: "1.467",
          bm: "1.000",
        },
        {
          id: "Capture Ratio Up",
          ac: "1.941",
          bm: "1.000",
        },
        {
          id: "Sterling Ratio",
          ac: "-0.391",
          bm: "4.727",
        },
        {
          id: "Sharpe Ratio",
          ac: "-0.242",
          bm: "3.493",
        },
        {
          id: "Downside Risk",
          ac: "9.700",
          bm: "0.000",
        },
        {
          id: "Tracking Error",
          ac: "10.892",
          bm: "0.000",
        },
        {
          id: "Information Ratio",
          ac: "-3.147",
          bm: "-",
        },
        {
          id: "Sortino",
          ac: "-0.452",
          bm: "-",
        },
        {
          id: "Variance",
          ac: "1.299",
          bm: "0.291",
        },
        {
          id: "Jensen Alpha",
          ac: "-61.931",
          bm: "0.000",
        },
        {
          id: "Beta",
          ac: "1.925",
          bm: "1.000",
        },
        {
          id: "Treynor",
          ac: "-0.023",
          bm: "0.299",
        },
        {
          id: "Loss Deviation",
          ac: "0.0015",
          bm: "0.0004",
        },
        {
          id: "Gain Deviation",
          ac: "0.0013",
          bm: "0.0007",
        },
        {
          id: "Omega Ratio",
          ac: "0.9504",
          bm: "1.5002",
        },
        {
          id: "R Squared",
          ac: "0.8290",
          bm: "1.0000",
        },
        {
          id: "Dividend Yield",
          ac: "1.6295",
          bm: "1.1118",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove automatic fetching - only fetch when explicitly called

  return { tableData, loading, fetchTableData };
}
