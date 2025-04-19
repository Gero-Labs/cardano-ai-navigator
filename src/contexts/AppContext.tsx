
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

interface Plan {
  id: "basic" | "pro" | "premium";
  name: string;
  price: number;
  features: string[];
}

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: (walletProvider: string) => void;
  disconnect: () => void;
}

interface AppContextType {
  wallet: WalletContextType;
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

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 10,
    features: ["Automated Rebalancing", "Basic Analytics", "Weekly Reports"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 20,
    features: ["Smart Trading", "Advanced Analytics", "Daily Reports", "Priority Support"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 30,
    features: ["Yield Farming", "Custom Strategies", "Real-time Reports", "24/7 Support", "Early Access"],
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

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<"conservative" | "balanced" | "risky">("balanced");
  const [isAgentsDeployed, setIsAgentsDeployed] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [adaUsdPrice, setAdaUsdPrice] = useState(0.45); // Mock price, would be fetched from API

  // Simulated API fetch for ADA price
  useEffect(() => {
    // In a real app, this would fetch from CoinMarketCap API
    const fetchAdaPrice = () => {
      // Mock price between 0.40 and 0.50
      const mockPrice = 0.40 + Math.random() * 0.10;
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

  const setRiskLevel = (level: "conservative" | "balanced" | "risky") => {
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

  const wallet = {
    isConnected,
    address,
    balance,
    connect,
    disconnect,
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
        toggleAgentStatus,
        selectPlan,
        setRiskLevel,
        deployAgents,
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
