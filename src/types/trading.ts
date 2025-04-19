
export interface Agent {
  id: string;
  name: string;
  icon: string;
  status: "running" | "paused" | "error";
  portfolioDrift: number;
  executedTrades: number;
  apr: number;
}

export interface Plan {
  id: "basic" | "pro" | "premium";
  name: string;
  price: number;
  features: string[];
}

export interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: (walletProvider: string) => void;
  disconnect: () => void;
}
