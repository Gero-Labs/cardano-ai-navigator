
import React, { createContext, useContext } from 'react';
import { WalletProvider, useWallet } from './WalletContext';
import { TradingProvider, useTrading } from './TradingContext';
import { plans } from '../data/plans';

// Create a combined AppContext type that includes both wallet and trading contexts
interface AppContextType {
  // Wallet context
  wallet: {
    isConnected: boolean;
    address: string | null;
    balance: number;
    connect: (walletProvider: string) => void;
    disconnect: () => void;
  };
  // Trading context
  agents: any[];
  selectedPlan: any | null;
  selectedRiskLevel: "conservative" | "balanced" | "risky";
  isAgentsDeployed: boolean;
  adaUsdPrice: number;
  toggleAgentStatus: (agentId: string) => void;
  selectPlan: (plan: any) => void;
  setRiskLevel: (level: "conservative" | "balanced" | "risky") => void;
  deployAgents: () => Promise<boolean>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WalletProvider>
      <TradingProvider>
        <AppContextConsumer>{children}</AppContextConsumer>
      </TradingProvider>
    </WalletProvider>
  );
};

// This component consumes both contexts and provides a combined context
const AppContextConsumer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallet = useWallet();
  const trading = useTrading();
  
  return (
    <AppContext.Provider
      value={{
        wallet,
        ...trading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Export a hook to use the combined context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

// Re-export hooks and data for easier access
export { useWallet, useTrading, plans };
export const usePlans = () => plans;
