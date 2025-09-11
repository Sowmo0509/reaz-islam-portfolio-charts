import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import https from "https";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get("startDate") || "2020-03-31";
    const endDate = searchParams.get("endDate") || "2025-09-12";
    const timeRange = searchParams.get("timeRange") || "--";

    const response = await axios.get(`https://zseniainv.com:8883/analytics/dataTable/am/spy/${timeRange}/${startDate}/${endDate}`, {
      headers: {
        Authorization: "Basic cm9ib2FkdjoyMDlicm9hZHdheSQjQA==",
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error fetching table data:", error);
    return NextResponse.json({ error: "Failed to fetch table data" }, { status: 500 });
  }
}
