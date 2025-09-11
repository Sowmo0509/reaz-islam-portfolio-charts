import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate") || "2020-03-31";
    const endDate = searchParams.get("endDate") || "2025-09-12";

    const response = await axios.get(`https://zseniainv.com:8883/analytics/returnChart/am/spy/--/${startDate}/${endDate}`, {
      headers: {
        Authorization: "Basic cm9ib2FkdjoyMDlicm9hZHdheSQjQA==",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    // Transform API data to chart format
    const transformedData = response.data.data.map((item: any) => ({
      date: new Date(item.dt).toISOString().split("T")[0],
      benchmark: parseFloat(item.bm) || 0,
      actual: parseFloat(item.ac) || 0,
    }));

    return NextResponse.json({ data: transformedData });
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return NextResponse.json({ error: "Failed to fetch chart data" }, { status: 500 });
  }
}
