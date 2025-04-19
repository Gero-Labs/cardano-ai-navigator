
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export type Token = {
  symbol: string;
  name: string;
  balance: number;
};

export const tokens: Token[] = [
  { symbol: "ADA", name: "Cardano", balance: 0 },
  { symbol: "DJED", name: "Djed Stablecoin", balance: 100 },
  { symbol: "SHEN", name: "Shen", balance: 50 },
  { symbol: "MIN", name: "Minswap", balance: 250 },
  { symbol: "WMT", name: "World Mobile", balance: 500 },
];

export type OrderStage = "creating" | "finding" | "negotiating" | "executing" | "completed";

export const useTrading = (walletBalance: number) => {
  const { toast } = useToast();
  const [sellToken, setSellToken] = useState("ADA");
  const [buyToken, setBuyToken] = useState("DJED");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [orderType, setOrderType] = useState("market");
  const [agentPreferences, setAgentPreferences] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStage, setOrderStage] = useState<OrderStage>("creating");
  const [progress, setProgress] = useState(0);
  const [agentMessages, setAgentMessages] = useState<string[]>([]);

  // Update tokens with current wallet balance
  const availableTokens = tokens.map(token => 
    token.symbol === "ADA" ? { ...token, balance: walletBalance } : token
  );

  const calculateEquivalent = (amount: string, fromToken: string, toToken: string) => {
    const numAmount = parseFloat(amount) || 0;
    
    const rates: Record<string, Record<string, number>> = {
      "ADA": { "DJED": 0.38, "SHEN": 0.25, "MIN": 2.5, "WMT": 1.2 },
      "DJED": { "ADA": 2.63, "SHEN": 0.65, "MIN": 6.5, "WMT": 3.2 },
      "SHEN": { "ADA": 4, "DJED": 1.54, "MIN": 10, "WMT": 4.8 },
      "MIN": { "ADA": 0.4, "DJED": 0.15, "SHEN": 0.1, "WMT": 0.48 },
      "WMT": { "ADA": 0.83, "DJED": 0.31, "SHEN": 0.21, "MIN": 2.08 },
    };
    
    const rate = rates[fromToken]?.[toToken] || 1;
    return (numAmount * rate).toFixed(6);
  };

  const handleSellAmountChange = (value: string) => {
    setSellAmount(value);
    if (value) {
      setBuyAmount(calculateEquivalent(value, sellToken, buyToken));
    } else {
      setBuyAmount("");
    }
  };

  const handleBuyAmountChange = (value: string) => {
    setBuyAmount(value);
    if (value) {
      setSellAmount(calculateEquivalent(value, buyToken, sellToken));
    } else {
      setSellAmount("");
    }
  };

  const handleSwapTokens = () => {
    const tempSellToken = sellToken;
    const tempSellAmount = sellAmount;
    
    setSellToken(buyToken);
    setSellAmount(buyAmount);
    
    setBuyToken(tempSellToken);
    setBuyAmount(tempSellAmount);
  };

  const simulateAgentCommunication = async () => {
    const messages = [
      `Agent #${Math.floor(Math.random() * 1000)}: Received order for ${sellAmount} ${sellToken}`,
      `Agent #${Math.floor(Math.random() * 1000)}: Proposing exchange rate of ${calculateEquivalent(sellAmount, sellToken, buyToken)} ${buyToken}`,
      `Verifying liquidity and order conditions...`,
      `Agreement reached. Preparing transaction...`,
      `Executing secure wallet-to-wallet transfer...`
    ];

    for (const message of messages) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAgentMessages(prev => [...prev, message]);
    }
  };

  const handleSubmitOrder = async () => {
    if (!sellAmount || !buyAmount) {
      toast({
        title: "Missing Information",
        description: "Please specify amounts for both tokens",
        variant: "destructive",
      });
      return;
    }

    const sellValue = parseFloat(sellAmount);
    const buyValue = parseFloat(buyAmount);
    
    if (isNaN(sellValue) || isNaN(buyValue) || sellValue <= 0 || buyValue <= 0) {
      toast({
        title: "Invalid Amounts",
        description: "Please enter valid positive numbers",
        variant: "destructive",
      });
      return;
    }

    const selectedToken = availableTokens.find(t => t.symbol === sellToken);
    if (selectedToken && sellValue > selectedToken.balance) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${sellToken}`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setAgentMessages([]);
    
    setOrderStage("finding");
    setProgress(25);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProgress(50);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOrderStage("negotiating");
    
    await simulateAgentCommunication();
    
    setProgress(75);
    setOrderStage("executing");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProgress(100);
    setOrderStage("completed");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Order Executed Successfully",
      description: `Swapped ${sellAmount} ${sellToken} for ${buyAmount} ${buyToken}`,
    });
    
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderStage("creating");
      setProgress(0);
      setSellAmount("");
      setBuyAmount("");
      setAgentMessages([]);
    }, 2000);
  };

  return {
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    slippage,
    orderType,
    agentPreferences,
    isSubmitting,
    orderStage,
    progress,
    agentMessages,
    availableTokens,
    setSellToken,
    setBuyToken,
    setSlippage,
    setOrderType,
    setAgentPreferences,
    handleSellAmountChange,
    handleBuyAmountChange,
    handleSwapTokens,
    handleSubmitOrder,
  };
};
