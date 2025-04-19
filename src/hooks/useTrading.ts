
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type Token = {
  symbol: string;
  name: string;
  balance: number;
};

export type OrderStage = "analyzing" | "recommending" | "ready" | "success" | "creating" | "negotiating" | "executing";

export const tokens: Token[] = [
  { symbol: "ADA", name: "Cardano", balance: 0 },
  { symbol: "DJED", name: "Djed Stablecoin", balance: 100 },
  { symbol: "SHEN", name: "Shen", balance: 50 },
  { symbol: "MIN", name: "Minswap", balance: 250 },
  { symbol: "WMT", name: "World Mobile", balance: 500 },
];

export const useTrading = (walletBalance: number) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orderStage, setOrderStage] = useState<OrderStage>("analyzing");
  const [progress, setProgress] = useState(0);
  const [agentMessages, setAgentMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const simulateAgentAnalysis = async () => {
    const messages = [
      "Analyzing current market conditions...",
      "Evaluating portfolio risk levels...",
      "Found potential optimization: Convert ADA to DJED to reduce volatility",
      "Recommended swap: 100 ADA → 38 DJED",
      "Expected risk reduction: -15%",
      "Analysis complete. Awaiting your approval."
    ];

    setOrderStage("analyzing");
    setProgress(25);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOrderStage("recommending");
    setProgress(50);
    
    for (const message of messages) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAgentMessages(prev => [...prev, message]);
      setProgress(prev => Math.min(95, prev + 10));
    }

    setOrderStage("ready");
    setProgress(100);
  };

  useEffect(() => {
    simulateAgentAnalysis();
  }, []); // Run only once when component mounts

  const handleApproveSwap = async () => {
    setIsLoading(true);
    
    // Simulate swap processing
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    setOrderStage("success");
    setIsLoading(false);
  };

  return {
    orderStage,
    progress,
    agentMessages,
    handleApproveSwap,
    isLoading,
  };
};
