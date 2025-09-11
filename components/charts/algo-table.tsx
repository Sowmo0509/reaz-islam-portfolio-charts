"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AlgoTableProps {
  data: any[];
  loading?: boolean;
}

export function AlgoTable({ data, loading = false }: AlgoTableProps) {
  if (loading) {
    return (
      <Card className="bg-transparent border-[#9568ff] py-2 rounded-md">
        <CardContent>
          <div className="flex items-center justify-center h-[19rem]">
            <div className="text-white/70">Loading metrics...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-transparent border-[#9568ff] py-2 rounded-md">
      <CardContent className="px-2">
        <div className="overflow-auto max-h-[19rem] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#362465] hover:scrollbar-thumb-[#2a1a4a]">
          <table className="w-full text-xs sm:text-sm font-medium min-w-[280px]">
            <thead>
              <tr className="border-b border-[#fff]/10 uppercase text-[#6bc5ff] font-bold">
                <th className="text-left py-2 px-1 sm:px-2">Statistic</th>
                <th className="text-right py-2 px-1 sm:px-2">Account</th>
                <th className="text-right py-2 px-1 sm:px-2">SPY</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.id || index} className="border-b border-[#fff]/10">
                  <td className="text-white/90 py-2 px-1 sm:px-2 text-xs sm:text-sm">{item.id}</td>
                  <td className="text-right py-2 px-1 sm:px-2">
                    <span className={`text-xs sm:text-sm ${parseFloat(item.ac) >= 0 ? "text-[#00e396]" : "text-red-400"}`}>{item.ac}</span>
                  </td>
                  <td className="text-right py-2 px-1 sm:px-2">
                    <span className={`text-xs sm:text-sm ${item.bm === "-" ? "text-white/50" : parseFloat(item.bm) >= 0 ? "text-[#9568ff]" : "text-red-400"}`}>{item.bm}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
