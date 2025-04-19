
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LoaderCircle, CircleCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { SwapRecommendation } from "./SwapRecommendation";
import { StageHeader } from "./StageHeader";
import { AgentMessages } from "./AgentMessages";
import type { OrderStage, Token } from "@/hooks/useTrading";

interface OrderStatusProps {
  orderStage: OrderStage;
  progress: number;
  agentMessages: string[];
  onApproveSwap?: () => void;
  isLoading?: boolean;
}

export const OrderStatus = ({ 
  orderStage,
  progress,
  agentMessages,
  onApproveSwap,
  isLoading = false
}: OrderStatusProps) => {
  const navigate = useNavigate();
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  const mockFromToken: Token = { symbol: "ADA", name: "Cardano", balance: 100 };
  const mockToToken: Token = { symbol: "DJED", name: "DJED Stablecoin", balance: 38 };

  if (orderStage === "success") {
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="rounded-full bg-green-100 p-3 mx-auto w-fit">
            <CircleCheck className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold">Swap Order Created Successfully</h3>
          <p className="text-sm text-muted-foreground">
            Your swap order has been created and will be executed shortly.
          </p>
          <div className="bg-accent/20 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>From:</span>
              <span className="font-medium">100 ADA</span>
            </div>
            <div className="flex justify-between">
              <span>To:</span>
              <span className="font-medium">38 DJED</span>
            </div>
            <div className="flex justify-between">
              <span>Risk Reduction:</span>
              <span className="text-green-500">-15%</span>
            </div>
          </div>
          <Button 
            className="w-full mt-4"
            onClick={() => navigate("/dashboard")}
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (orderStage === "ready") {
    return (
      <SwapRecommendation
        fromToken={mockFromToken}
        toToken={mockToToken}
        fromAmount={100}
        toAmount={38}
        riskReduction={15}
        onApprove={onApproveSwap!}
        isLoading={isLoading}
      />
    );
  }

  return (
    <div className="space-y-6 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden rounded-lg">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-gradient-to-br from-transparent via-accent/30 to-transparent animate-spin-slow opacity-30" 
          style={{ animationDuration: '30s' }} />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle,rgba(123,90,224,0.1)_0%,transparent_70%)]" />
      </div>

      <StageHeader orderStage={orderStage} />
      
      <div className="relative">
        <Progress value={progress} className="h-2 w-full" />
        <div 
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-transparent via-white to-transparent opacity-70" 
          style={{ 
            width: '30%', 
            transform: `translateX(${progress}%)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>
      
      {agentMessages.length > 0 && (
        <AgentMessages messages={agentMessages} glowIntensity={glowIntensity} />
      )}
      
      {/* This is where the type error was occurring. We need to properly check for orderStage === "ready" */}
      {onApproveSwap && (
        <Button 
          onClick={onApproveSwap}
          className="w-full animate-fade-in"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
              Processing Swap...
            </>
          ) : (
            <>
              <CircleCheck className="mr-2 h-5 w-5" />
              Approve Swap Order
            </>
          )}
        </Button>
      )}
      
      {(orderStage === "negotiating" || orderStage === "executing" || orderStage === "creating") && (
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div 
              key={idx}
              className="absolute bg-gradient-to-r from-transparent via-primary/40 to-transparent h-[1px]"
              style={{
                top: `${20 + idx * 15}%`,
                left: 0,
                width: '100%',
                transform: `translateX(${-100 + (glowIntensity + idx * 20) % 200}%)`,
                opacity: 0.6 - idx * 0.1,
                transition: 'transform 0.5s linear'
              }}
            />
          ))}
          
          {Array.from({ length: 5 }).map((_, idx) => (
            <div 
              key={`v-${idx}`}
              className="absolute bg-gradient-to-b from-transparent via-blue-400/30 to-transparent w-[1px]"
              style={{
                left: `${10 + idx * 20}%`,
                top: 0,
                height: '100%',
                transform: `translateY(${-100 + ((glowIntensity + idx * 15) % 200)}%)`,
                opacity: 0.5 - idx * 0.08,
                transition: 'transform 0.5s linear'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
