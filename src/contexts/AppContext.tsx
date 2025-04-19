import { Currency, Plan, PlanType } from "@/types/plans";
import { RiskLevel } from "@/types/risk";
import { BrowserWallet } from "@meshsdk/core";
import React, { createContext, useContext, useState, useEffect } from "react";

interface Agent {
  id: string;
  name: string;
  icon: string;
  status: "running" | "paused" | "error";
  portfolioDrift: number;
  executedTrades: number;
  apr: number;
}

interface AppContextType {
  wallet: BrowserWallet;
  agents: Agent[];
  selectedPlan: Plan | null;
  selectedRiskLevel: RiskLevel;
  isAgentsDeployed: boolean;
  adaUsdPrice: number;
  currencyType: Currency;
  toggleAgentStatus: (agentId: string) => void;
  selectPlan: (plan: Plan) => void;
  setRiskLevel: (level: RiskLevel) => void;
  deployAgents: () => Promise<boolean>;
  setCurrencyType: (currency: Currency) => void;
  setWallet: (wallet: BrowserWallet) => void;
}

const plans: Plan[] = [
  {
    id: PlanType.basic,
    name: "Basic",
    price: 100,
    features: ["Automated Rebalancing", "Basic Analytics", "Weekly Reports"],
  },
  {
    id: PlanType.pro,
    name: "Pro",
    price: 200,
    features: [
      "Smart Trading",
      "Advanced Analytics",
      "Daily Reports",
      "Priority Support",
    ],
  },
  {
    id: PlanType.premium,
    name: "Premium",
    price: 300,
    features: [
      "Yield Farming",
      "Custom Strategies",
      "Real-time Reports",
      "24/7 Support",
      "Early Access",
    ],
  },
];

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

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<RiskLevel>(
    RiskLevel.balanced
  );
  const [isAgentsDeployed, setIsAgentsDeployed] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [adaUsdPrice, setAdaUsdPrice] = useState(0.45); // Mock price, would be fetched from API
  const [currencyType, setCurrencyType] = useState<Currency>(Currency.ADA);
  const [wallet, setWallet] = useState<BrowserWallet>(null);

  // Simulated API fetch for ADA price
  useEffect(() => {
    // In a real app, this would fetch from CoinMarketCap API
    const fetchAdaPrice = () => {
      // Mock price between 0.40 and 0.50
      const mockPrice = 0.4 + Math.random() * 0.1;
      setAdaUsdPrice(parseFloat(mockPrice.toFixed(2)));
    };

    fetchAdaPrice();
    const interval = setInterval(fetchAdaPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const connect = (walletProvider: string) => {
    // In a real app, we'd use the CIP-30 API to connect to the wallet
    console.log(`Connecting to ${walletProvider}...`);

    // Mock successful connection
    setTimeout(() => {
      setIsConnected(true);
      setAddress("addr1qxck...r8xqz");
      setBalance(1000);
    }, 500);
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
  };

  const selectPlan = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const setRiskLevel = (level: RiskLevel) => {
    setSelectedRiskLevel(level);
  };

  const deployAgents = async (): Promise<boolean> => {
    // In a real app, we'd use CIP-30 to sign a transaction
    return new Promise((resolve) => {
      // Simulate deployment
      setTimeout(() => {
        setIsAgentsDeployed(true);
        setAgents(mockAgents);
        resolve(true);
      }, 1500);
    });
  };

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

  return (
    <AppContext.Provider
      value={{
        wallet,
        agents,
        selectedPlan,
        selectedRiskLevel,
        isAgentsDeployed,
        adaUsdPrice,
        currencyType,
        toggleAgentStatus,
        selectPlan,
        setRiskLevel,
        deployAgents,
        setCurrencyType,
        setWallet,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const usePlans = () => {
  return plans;
};
