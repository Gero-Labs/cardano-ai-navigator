
import React from 'react';
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Token } from "@/hooks/useTrading";

interface SwapRecommendationProps {
  fromToken: Token;
  toToken: Token;
  fromAmount: number;
  toAmount: number;
  riskReduction: number;
  onApprove: () => void;
  isLoading?: boolean;
}

export const SwapRecommendation = ({
  fromToken,
  toToken,
  fromAmount,
  toAmount,
  riskReduction,
  onApprove,
  isLoading = false
}: SwapRecommendationProps) => {
  return (
    <Card className="p-6 space-y-6 bg-gradient-to-br from-purple-900/20 to-blue-900/10 backdrop-blur-sm border border-purple-500/20">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Apr 19, 2025</span>
        <div className="flex items-center gap-1">
          <Check className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-500">Recommended</span>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-lg font-bold">A</span>
            </div>
          </div>
          <span className="font-medium">{fromToken.symbol}</span>
        </div>

        <div className="flex flex-col items-center">
          <ArrowRight className="h-6 w-6 text-muted-foreground mb-2" />
          <span className="text-xs text-muted-foreground">Swap</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-sky-500 p-0.5">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-lg font-bold">D</span>
            </div>
          </div>
          <span className="font-medium">{toToken.symbol}</span>
        </div>
      </div>

      <div className="space-y-3 bg-accent/30 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">You send</span>
          <span className="font-medium text-destructive">- {fromAmount} {fromToken.symbol}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">You receive</span>
          <span className="font-medium text-green-500">+ {toAmount} {toToken.symbol}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Risk reduction</span>
          <span className="font-medium text-green-500">-{riskReduction}%</span>
        </div>
      </div>

      <Button 
        className="w-full"
        onClick={onApprove}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Approve Swap"}
      </Button>
    </Card>
  );
};
