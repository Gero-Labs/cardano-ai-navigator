
import { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { RefreshCw } from "lucide-react";
import AgentCard from "@/components/AgentCard";
import { AgentActivity } from "@/components/agents/AgentActivity";
import DashboardStats from "@/components/dashboard/DashboardStats";
import PortfolioPerformance from "@/components/dashboard/PortfolioPerformance";
import type { PortfolioStats } from "@/types/dashboard";

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

      <DashboardStats 
        stats={stats}
        adaUsdPrice={adaUsdPrice}
        selectedRiskLevel={selectedRiskLevel}
        agentsCount={{
          active: agents.filter(agent => agent.status === "running").length,
          total: agents.length
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PortfolioPerformance
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
        />
        <AgentActivity />
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
