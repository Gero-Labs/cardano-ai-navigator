
import React, { createContext, useContext, useState } from 'react';
import type { WalletContextType } from '../types/trading';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);

  const connect = (walletProvider: string) => {
    console.log(`Connecting to ${walletProvider}...`);
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

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
