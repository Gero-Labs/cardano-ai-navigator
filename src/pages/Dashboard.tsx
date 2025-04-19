
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  BarChart, 
  LineChart, 
  PauseCircle, 
  PlayCircle, 
  RefreshCw,
  AlertTriangle,
  MoreHorizontal,
  Info,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import AgentCard from "@/components/AgentCard";

interface PortfolioStats {
  totalValue: number;
  dailyChange: number;
  weeklyChange: number;
  monthlyChange: number;
}

const Dashboard = () => {
  const { agents, adaUsdPrice, selectedRiskLevel } = useAppContext();
  const { toast } = useToast();
  const [stats, setStats] = useState<PortfolioStats>({
    totalValue: 5000,
    dailyChange: 2.3,
    weeklyChange: -1.2,
    monthlyChange: 8.7,
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState("daily");

  // Mock portfolio stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prevStats) => {
        const randomDaily = (Math.random() * 5 - 2.5).toFixed(2);
        const randomWeekly = (Math.random() * 8 - 3).toFixed(2);
        return {
          ...prevStats,
          dailyChange: parseFloat(randomDaily),
          weeklyChange: parseFloat(randomWeekly),
        };
      });
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    toast({
      title: "Refreshing Dashboard",
      description: "Your dashboard data is being updated...",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your AI agents and portfolio performance
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

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
              {agents.filter(agent => agent.status === "running").length}/{agents.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-1">
              {agents.map((agent) => (
                <div 
                  key={agent.id}
                  className={`h-1.5 flex-1 rounded-full ${
                    agent.status === "running" ? "bg-agent-success" :
                    agent.status === "paused" ? "bg-agent-paused" :
                    "bg-agent-error"
                  }`}
                ></div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Portfolio Performance</CardTitle>
                <CardDescription>
                  Track your portfolio's performance over time
                </CardDescription>
              </div>
              <Tabs defaultValue="daily" onValueChange={setSelectedTimeframe}>
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

        <Card>
          <CardHeader>
            <CardTitle>Token Allocation</CardTitle>
            <CardDescription>
              Current distribution of your portfolio
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cardano-primary mr-2"></div>
                  <span>ADA</span>
                </div>
                <span className="font-medium">
                  {selectedRiskLevel === "conservative" ? "40%" :
                    selectedRiskLevel === "balanced" ? "50%" : "20%"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cardano-secondary mr-2"></div>
                  <span>Stablecoins</span>
                </div>
                <span className="font-medium">
                  {selectedRiskLevel === "conservative" ? "60%" :
                    selectedRiskLevel === "balanced" ? "20%" : "0%"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-cardano-light mr-2"></div>
                  <span>Mid-cap Tokens</span>
                </div>
                <span className="font-medium">
                  {selectedRiskLevel === "conservative" ? "0%" :
                    selectedRiskLevel === "balanced" ? "30%" : "20%"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
                  <span>High Volatility</span>
                </div>
                <span className="font-medium">
                  {selectedRiskLevel === "conservative" ? "0%" :
                    selectedRiskLevel === "balanced" ? "0%" : "60%"}
                </span>
              </div>

              <div className="w-full h-2 bg-secondary rounded-full mt-6 flex overflow-hidden">
                <div 
                  className="h-full bg-cardano-primary"
                  style={{ 
                    width: selectedRiskLevel === "conservative" ? "40%" : 
                      selectedRiskLevel === "balanced" ? "50%" : "20%" 
                  }}
                ></div>
                <div 
                  className="h-full bg-cardano-secondary"
                  style={{ 
                    width: selectedRiskLevel === "conservative" ? "60%" : 
                      selectedRiskLevel === "balanced" ? "20%" : "0%" 
                  }}
                ></div>
                <div 
                  className="h-full bg-cardano-light"
                  style={{ 
                    width: selectedRiskLevel === "conservative" ? "0%" : 
                      selectedRiskLevel === "balanced" ? "30%" : "20%" 
                  }}
                ></div>
                <div 
                  className="h-full bg-primary"
                  style={{ 
                    width: selectedRiskLevel === "conservative" ? "0%" : 
                      selectedRiskLevel === "balanced" ? "0%" : "60%" 
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold pt-2">Agents Running</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
