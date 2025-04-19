
import React from 'react';
import { WalletProvider, useWallet } from './WalletContext';
import { TradingProvider, useTrading } from './TradingContext';
import { plans } from '../data/plans';

export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WalletProvider>
      <TradingProvider>
        {children}
      </TradingProvider>
    </WalletProvider>
  );
};

// Re-export hooks and data for easier access
export { useWallet, useTrading, plans };
export const usePlans = () => plans;
