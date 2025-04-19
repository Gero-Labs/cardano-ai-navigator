
import { TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { PortfolioStats } from "@/types/dashboard";

interface DashboardStatsProps {
  stats: PortfolioStats;
  adaUsdPrice: number;
  selectedRiskLevel: string;
  agentsCount: {
    active: number;
    total: number;
  };
}

const DashboardStats = ({ stats, adaUsdPrice, selectedRiskLevel, agentsCount }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Portfolio Value</CardDescription>
          <CardTitle className="text-2xl">
            ${stats.totalValue.toLocaleString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium flex items-center">
            <span className={stats.dailyChange >= 0 ? "text-green-500" : "text-red-500"}>
              {stats.dailyChange >= 0 ? "+" : ""}
              {stats.dailyChange}%
            </span>
            {stats.dailyChange >= 0 ? 
              <TrendingUp className="h-4 w-4 ml-1 text-green-500" /> : 
              <TrendingDown className="h-4 w-4 ml-1 text-red-500" />
            }
            <span className="text-muted-foreground ml-2">Today</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>ADA Price</CardDescription>
          <CardTitle className="text-2xl">
            ${adaUsdPrice}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full animate-pulse-slow" 
                style={{ width: `${(adaUsdPrice / 0.50) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground ml-2">$0.50</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Risk Level</CardDescription>
          <CardTitle className="text-xl capitalize flex items-center">
            <div className={`h-3 w-3 rounded-full mr-2 bg-risk-${selectedRiskLevel}`}></div>
            {selectedRiskLevel}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={
            selectedRiskLevel === "conservative" ? 33 :
            selectedRiskLevel === "balanced" ? 66 : 100
          } className="h-1.5" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Active Agents</CardDescription>
          <CardTitle className="text-2xl">
            {agentsCount.active}/{agentsCount.total}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-1">
            {Array(agentsCount.total).fill(0).map((_, index) => (
              <div 
                key={index}
                className={`h-1.5 flex-1 rounded-full ${
                  index < agentsCount.active ? "bg-agent-success" : "bg-agent-error"
                }`}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
