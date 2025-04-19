import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowDown, ArrowLeftRight, MessageSquare, Loader, Check } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const AgentTrading = () => {
  const navigate = useNavigate();
  const { wallet, adaUsdPrice } = useAppContext();
  const { toast } = useToast();
  
  // Form state
  const [sellToken, setSellToken] = useState("ADA");
  const [buyToken, setBuyToken] = useState("DJED");
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [orderType, setOrderType] = useState("market");
  const [agentPreferences, setAgentPreferences] = useState("");
  
  // Enhanced UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderStage, setOrderStage] = useState("creating"); // creating, finding, negotiating, executing, completed
  const [progress, setProgress] = useState(0);
  const [agentMessages, setAgentMessages] = useState<string[]>([]);

  // Token options
  const tokens = [
    { symbol: "ADA", name: "Cardano", balance: wallet.balance || 0 },
    { symbol: "DJED", name: "Djed Stablecoin", balance: 100 },
    { symbol: "SHEN", name: "Shen", balance: 50 },
    { symbol: "MIN", name: "Minswap", balance: 250 },
    { symbol: "WMT", name: "World Mobile", balance: 500 },
  ];

  if (!wallet.isConnected) {
    navigate("/");
    return null;
  }

  // Calculate equivalent value based on current rates
  const calculateEquivalent = (amount: string, fromToken: string, toToken: string) => {
    const numAmount = parseFloat(amount) || 0;
    
    // Mock exchange rates (in a real app, these would come from an oracle)
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

    const selectedToken = tokens.find(t => t.symbol === sellToken);
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
    
    // Order creation
    setOrderStage("finding");
    setProgress(25);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Finding matching agent
    setProgress(50);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setOrderStage("negotiating");
    
    // Simulate agent communication
    await simulateAgentCommunication();
    
    // Execute trade
    setProgress(75);
    setOrderStage("executing");
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Complete trade
    setProgress(100);
    setOrderStage("completed");
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Order Executed Successfully",
      description: `Swapped ${sellAmount} ${sellToken} for ${buyAmount} ${buyToken}`,
    });
    
    // Reset form
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderStage("creating");
      setProgress(0);
      setSellAmount("");
      setBuyAmount("");
      setAgentMessages([]);
    }, 2000);
  };
  
  const getOrderStatusContent = () => {
    const stages = {
      finding: {
        icon: <Loader className="h-6 w-6 animate-spin text-primary" />,
        title: "Finding AI Agents",
        description: "Publishing order to the network..."
      },
      negotiating: {
        icon: <MessageSquare className="h-6 w-6 text-primary animate-pulse" />,
        title: "Agents Negotiating",
        description: "AI agents are communicating to match your order..."
      },
      executing: {
        icon: <ArrowLeftRight className="h-6 w-6 text-primary animate-bounce" />,
        title: "Executing Trade",
        description: "Finalizing the secure wallet-to-wallet transfer..."
      },
      completed: {
        icon: <Check className="h-6 w-6 text-green-500" />,
        title: "Trade Complete",
        description: "Your order has been successfully executed!"
      }
    };

    if (orderStage === "creating") return null;

    const currentStage = stages[orderStage as keyof typeof stages];

    return (
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center py-4 space-y-2">
          <div className="rounded-full bg-accent p-3">
            {currentStage.icon}
          </div>
          <h3 className="font-semibold text-lg">{currentStage.title}</h3>
          <p className="text-sm text-muted-foreground">{currentStage.description}</p>
        </div>
        
        <Progress value={progress} className="w-full" />
        
        {agentMessages.length > 0 && (
          <div className="mt-4 space-y-2 bg-accent/50 rounded-lg p-4 max-h-40 overflow-y-auto">
            {agentMessages.map((message, index) => (
              <div 
                key={index}
                className="text-sm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {message}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex mx-auto mb-4">
              <ArrowLeftRight className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">AI Trade Agent</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {orderStage === "creating" ? (
              <>
                <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                  {/* Sell token selector */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>You Pay</Label>
                      <span className="text-sm text-muted-foreground">
                        Balance: {tokens.find(t => t.symbol === sellToken)?.balance ?? 0} {sellToken}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Input
                          type="number"
                          value={sellAmount}
                          onChange={(e) => handleSellAmountChange(e.target.value)}
                          placeholder="0.0"
                          className="text-lg"
                        />
                      </div>
                      <Select value={sellToken} onValueChange={setSellToken}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {tokens.map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              {token.symbol}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {sellAmount && (
                      <div className="text-sm text-muted-foreground">
                        ≈ ${(parseFloat(sellAmount) * (sellToken === "ADA" ? adaUsdPrice : 1)).toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  {/* Swap button */}
                  <div className="flex justify-center">
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={handleSwapTokens}
                      type="button"
                      className="rounded-full h-10 w-10 bg-background shadow-sm"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Buy token selector */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>You Receive</Label>
                      <span className="text-sm text-muted-foreground">
                        Balance: {tokens.find(t => t.symbol === buyToken)?.balance ?? 0} {buyToken}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <div className="flex-1">
                        <Input
                          type="number"
                          value={buyAmount}
                          onChange={(e) => handleBuyAmountChange(e.target.value)}
                          placeholder="0.0"
                          className="text-lg"
                        />
                      </div>
                      <Select value={buyToken} onValueChange={setBuyToken}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Select token" />
                        </SelectTrigger>
                        <SelectContent>
                          {tokens.filter(t => t.symbol !== sellToken).map((token) => (
                            <SelectItem key={token.symbol} value={token.symbol}>
                              {token.symbol}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {buyAmount && (
                      <div className="text-sm text-muted-foreground">
                        ≈ ${(parseFloat(buyAmount) * (buyToken === "ADA" ? adaUsdPrice : 1)).toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Additional trade options */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Order Type</Label>
                      <Select value={orderType} onValueChange={setOrderType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Order type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="market">Market</SelectItem>
                          <SelectItem value="limit">Limit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Slippage Tolerance</Label>
                      <Select value={slippage} onValueChange={setSlippage}>
                        <SelectTrigger>
                          <SelectValue placeholder="Slippage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.1">0.1%</SelectItem>
                          <SelectItem value="0.5">0.5%</SelectItem>
                          <SelectItem value="1.0">1.0%</SelectItem>
                          <SelectItem value="3.0">3.0%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Agent Preferences (Optional)</Label>
                    <Textarea 
                      placeholder="e.g., Prefer agents with high reliability score, or specific execution strategies..."
                      value={agentPreferences}
                      onChange={(e) => setAgentPreferences(e.target.value)}
                      className="resize-none h-20"
                    />
                  </div>
                </div>
              </>
            ) : (
              getOrderStatusContent()
            )}

            <Button 
              className="w-full"
              onClick={handleSubmitOrder}
              disabled={isSubmitting || !sellAmount || !buyAmount || orderStage !== "creating"}
            >
              {isSubmitting ? (
                "Processing..."
              ) : (
                <>
                  <Wallet className="mr-2 h-4 w-4" />
                  Create Order
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentTrading;
