"use client";

import { Line, LineChart } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Card, CardContent } from "@/components/ui/card";

const chartData = [
  { attribute: "Success Rate", score: 186 },
  { attribute: "Code Quality", score: 305 },
  { attribute: "Productivity", score: 237 },
  { attribute: "Creativity", score: 73 },
  { attribute: "Ethics", score: 209 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(270, 70%, 50%)", // Purple for Web3 aesthetic
  },
};

function Linechart() {
  return (
    <Card className='bg-transparent border-0 shadow-none h-[100px] sm:h-[80px] w-[160px] sm:w-[200px] p-0'>
      <CardContent className='p-0'>
        <ChartContainer
          config={chartConfig}
          className='h-[80px] sm:h-[80px] w-full'>
          <LineChart
            accessibilityLayer
            data={chartData}
            width={160} // Explicit width
            height={10} // Explicit height
            margin={{ right: 5, left: 5, bottom: 5 }}>
            <Line
              type='natural'
              dataKey='score'
              stroke='var(--color-desktop)'
              strokeWidth={2}
              dot={true}
              activeDot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default Linechart;
