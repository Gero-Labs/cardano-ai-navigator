
import React, { createContext, useContext, useState } from 'react';
import type { Agent, Plan } from '../types/trading';

interface TradingContextType {
  agents: Agent[];
  selectedPlan: Plan | null;
  selectedRiskLevel: "conservative" | "balanced" | "risky";
  isAgentsDeployed: boolean;
  adaUsdPrice: number;
  toggleAgentStatus: (agentId: string) => void;
  selectPlan: (plan: Plan) => void;
  setRiskLevel: (level: "conservative" | "balanced" | "risky") => void;
  deployAgents: () => Promise<boolean>;
}

const TradingContext = createContext<TradingContextType | undefined>(undefined);

const mockAgents: Agent[] = [
  {
    id: "rebalancer-1",
    name: "Portfolio Rebalancer",
    icon: "balance-scale",
    status: "running",
    portfolioDrift: 2.3,
    executedTrades: 14,
    apr: 8.5,
  },
  {
    id: "sentinel-1",
    name: "Sentiment Trader",
    icon: "chart-line",
    status: "running",
    portfolioDrift: 1.7,
    executedTrades: 8,
    apr: 12.3,
  },
  {
    id: "yield-1",
    name: "Yield Optimizer",
    icon: "coins",
    status: "paused",
    portfolioDrift: 0.5,
    executedTrades: 23,
    apr: 15.8,
  },
];

export const TradingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<"conservative" | "balanced" | "risky">("balanced");
  const [isAgentsDeployed, setIsAgentsDeployed] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [adaUsdPrice, setAdaUsdPrice] = useState(0.45);

  React.useEffect(() => {
    const fetchAdaPrice = () => {
      const mockPrice = 0.40 + Math.random() * 0.10;
      setAdaUsdPrice(parseFloat(mockPrice.toFixed(2)));
    };

    fetchAdaPrice();
    const interval = setInterval(fetchAdaPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleAgentStatus = (agentId: string) => {
    setAgents((currentAgents) =>
      currentAgents.map((agent) => {
        if (agent.id === agentId) {
          return {
            ...agent,
            status: agent.status === "running" ? "paused" : "running",
          };
        }
        return agent;
      })
    );
  };

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const setRiskLevel = (level: "conservative" | "balanced" | "risky") => {
    setSelectedRiskLevel(level);
  };

  const deployAgents = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsAgentsDeployed(true);
        setAgents(mockAgents);
        resolve(true);
      }, 1500);
    });
  };

  return (
    <TradingContext.Provider
      value={{
        agents,
        selectedPlan,
        selectedRiskLevel,
        isAgentsDeployed,
        adaUsdPrice,
        toggleAgentStatus,
        selectPlan,
        setRiskLevel,
        deployAgents,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

export const useTrading = () => {
  const context = useContext(TradingContext);
  if (context === undefined) {
    throw new Error("useTrading must be used within a TradingProvider");
  }
  return context;
};
