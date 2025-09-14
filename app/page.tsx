import { AlgoSection } from "@/components/charts/algo-section";

// Centralized height configuration
const HEIGHT_CONFIG = {
  chart: "h-80 sm:h-80 lg:h-[70vh]", // Chart height classes
  table: "max-h-[63vh]", // Table max height class
} as const;

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-0">
      <div className="bg-[#25164f] text-white rounded-md p-6 mt-6">
        <AlgoSection chartHeight={HEIGHT_CONFIG.chart} tableHeight={HEIGHT_CONFIG.table} />
      </div>
    </div>
  );
}
