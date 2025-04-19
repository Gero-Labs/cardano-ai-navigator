
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { CircleGauge, Loader } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RecommendedSwap {
  fromToken: string;
  toToken: string;
  reason: string;
  riskReduction: number;
}

interface PortfolioRiskReviewProps {
  currentRisk: number;
  recommendedSwaps: RecommendedSwap[];
}

export const PortfolioRiskReview = ({ currentRisk, recommendedSwaps }: PortfolioRiskReviewProps) => {
  const navigate = useNavigate();
  const [isExecuting, setIsExecuting] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [showRecommendationsOnly, setShowRecommendationsOnly] = useState(false);

  const handleProceed = async () => {
    // First set pending state to show confirmation button
    if (!isPending && !showRecommendationsOnly) {
      setIsPending(true);
      return;
    }

    // If already pending and clicked again, show recommendations only
    if (isPending && !showRecommendationsOnly) {
      setShowRecommendationsOnly(true);
      // Skip trading window and show agent loading animations
      navigate('/deploy');
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Portfolio Risk Review</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Risk Gauge */}
        <div className="text-center space-y-2">
          <div className="relative inline-block">
            <CircleGauge className="h-16 w-16 text-primary" />
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-2xl">
              {currentRisk}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Current Portfolio Risk Level</p>
        </div>

        {/* Recommended Swaps */}
        <div className="space-y-3">
          <h3 className="font-semibold">Recommended Token Swaps</h3>
          {recommendedSwaps.map((swap, index) => (
            <div 
              key={index} 
              className="p-3 rounded-lg border border-accent/50 bg-accent/10 space-y-2"
            >
              <div className="flex items-center justify-between text-sm">
                <span>{swap.fromToken} → {swap.toToken}</span>
                <span className="text-green-500">-{swap.riskReduction}% risk</span>
              </div>
              <p className="text-xs text-muted-foreground">{swap.reason}</p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <Button 
          onClick={handleProceed} 
          disabled={isExecuting}
          variant={isPending ? "destructive" : "default"}
          className="w-full"
        >
          {isExecuting ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Preparing Recommendations...
            </>
          ) : isPending ? (
            'Click again to view AI recommendations only'
          ) : (
            'Continue to Agent Recommendations'
          )}
        </Button>
        
        {isPending && !isExecuting && (
          <p className="text-sm text-center text-muted-foreground">
            We'll only show recommendations, no trades will be executed
          </p>
        )}
      </CardContent>
    </Card>
  );
};
