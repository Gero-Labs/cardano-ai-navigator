
import { BarChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PortfolioPerformanceProps {
  selectedTimeframe: string;
  onTimeframeChange: (value: string) => void;
}

const PortfolioPerformance = ({ selectedTimeframe, onTimeframeChange }: PortfolioPerformanceProps) => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>
              Track your portfolio's performance over time
            </CardDescription>
          </div>
          <Tabs defaultValue={selectedTimeframe} onValueChange={onTimeframeChange}>
            <TabsList>
              <TabsTrigger value="daily">1D</TabsTrigger>
              <TabsTrigger value="weekly">1W</TabsTrigger>
              <TabsTrigger value="monthly">1M</TabsTrigger>
              <TabsTrigger value="yearly">1Y</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="p-6">
          <div className="h-[300px] flex items-center justify-center">
            <div className="text-center">
              <BarChart className="h-16 w-16 mx-auto text-muted-foreground opacity-20 mb-4" />
              <p className="text-muted-foreground">
                Chart visualization would appear here with real data
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioPerformance;
