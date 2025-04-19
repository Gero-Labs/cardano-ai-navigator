
import { ArrowDown, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Token } from "@/hooks/useTrading";

interface TradingFormProps {
  sellToken: string;
  buyToken: string;
  sellAmount: string;
  buyAmount: string;
  slippage: string;
  orderType: string;
  agentPreferences: string;
  isSubmitting: boolean;
  tokens: Token[];
  adaUsdPrice: number;
  onSellTokenChange: (value: string) => void;
  onBuyTokenChange: (value: string) => void;
  onSellAmountChange: (value: string) => void;
  onBuyAmountChange: (value: string) => void;
  onSlippageChange: (value: string) => void;
  onOrderTypeChange: (value: string) => void;
  onAgentPreferencesChange: (value: string) => void;
  onSwapTokens: () => void;
  onSubmit: () => void;
}

export const TradingForm = ({
  sellToken,
  buyToken,
  sellAmount,
  buyAmount,
  slippage,
  orderType,
  agentPreferences,
  isSubmitting,
  tokens,
  adaUsdPrice,
  onSellTokenChange,
  onBuyTokenChange,
  onSellAmountChange,
  onBuyAmountChange,
  onSlippageChange,
  onOrderTypeChange,
  onAgentPreferencesChange,
  onSwapTokens,
  onSubmit,
}: TradingFormProps) => {
  return (
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
                onChange={(e) => onSellAmountChange(e.target.value)}
                placeholder="0.0"
                className="text-lg"
              />
            </div>
            <Select value={sellToken} onValueChange={onSellTokenChange}>
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
            onClick={onSwapTokens}
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
                onChange={(e) => onBuyAmountChange(e.target.value)}
                placeholder="0.0"
                className="text-lg"
              />
            </div>
            <Select value={buyToken} onValueChange={onBuyTokenChange}>
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
            <Select value={orderType} onValueChange={onOrderTypeChange}>
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
            <Select value={slippage} onValueChange={onSlippageChange}>
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
            onChange={(e) => onAgentPreferencesChange(e.target.value)}
            className="resize-none h-20"
          />
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={onSubmit}
        disabled={isSubmitting || !sellAmount || !buyAmount}
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
    </>
  );
};
