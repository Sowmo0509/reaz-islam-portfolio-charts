import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";

export default function Home() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-0">
      <div className="bg-[#25164f] text-white rounded-md p-6">
        <ChartAreaInteractive />
      </div>
    </div>
  );
}
