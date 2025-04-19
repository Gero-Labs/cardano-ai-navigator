
import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, ArrowLeftRight, Check, Zap, Database, Link, LoaderCircle, CircleCheck, CircleArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SwapRecommendation } from "./SwapRecommendation";
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

  const stages = {
    analyzing: {
      icon: <LoaderCircle className="h-8 w-8 animate-spin text-primary" />,
      secondaryIcon: <Database className="h-5 w-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Analyzing Portfolio",
      description: "AI agents are analyzing your portfolio..."
    },
    recommending: {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      secondaryIcon: <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Generating Recommendations",
      description: "AI agents are preparing swap recommendations..."
    },
    ready: {
      icon: <CircleCheck className="h-8 w-8 text-green-500" />,
      secondaryIcon: <CircleArrowRight className="h-5 w-5 text-green-400 absolute -top-1 -right-1" />,
      title: "Analysis Complete",
      description: "Review and approve the recommended swap"
    },
    success: {
      icon: <CircleCheck className="h-8 w-8 text-green-500" />,
      secondaryIcon: <Check className="h-5 w-5 text-green-400 absolute -top-1 -right-1" />,
      title: "Swap Order Created",
      description: "Your swap order has been successfully created"
    },
    creating: {
      icon: <LoaderCircle className="h-8 w-8 animate-spin text-primary" />,
      secondaryIcon: <Database className="h-5 w-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Creating Order",
      description: "Creating your swap order..."
    },
    negotiating: {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      secondaryIcon: <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Negotiating Trade",
      description: "AI agents are negotiating the best trade terms..."
    },
    executing: {
      icon: <LoaderCircle className="h-8 w-8 animate-spin text-primary" />,
      secondaryIcon: <Database className="h-5 w-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Executing Trade",
      description: "Executing your trade order..."
    }
  };

  const currentStage = stages[orderStage];
  
  const getAgentColor = (index: number) => {
    const colors = ["#6E59A5", "#4CC9F0", "#FF52A2", "#7E69AB", "#4361EE"];
    return colors[index % colors.length];
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentMessages]);

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

      <div className="flex flex-col items-center justify-center py-6 space-y-3">
        <div className="rounded-full bg-accent/80 backdrop-blur-sm p-4 relative shadow-[0_0_15px_rgba(123,90,224,0.5)] animate-float">
          {currentStage.icon}
          {currentStage.secondaryIcon}
        </div>
        <h3 className="font-bold text-2xl bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">
          {currentStage.title}
        </h3>
        <p className="text-base text-muted-foreground text-center max-w-xs">
          {currentStage.description}
        </p>
      </div>
      
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
        <div className="mt-6 space-y-0 bg-accent/30 backdrop-blur-sm rounded-lg p-4 max-h-52 overflow-y-auto border border-accent/50 shadow-[0_0_15px_rgba(123,90,224,0.2)]">
          <div className="flex flex-col gap-2">
            {agentMessages.map((message, index) => {
              const isEven = index % 2 === 0;
              const agentColor = getAgentColor(index);
              
              return (
                <div 
                  key={index}
                  className={`
                    text-sm flex items-center gap-3 
                    ${isEven ? 'self-start' : 'self-end flex-row-reverse'} 
                    max-w-[85%] animate-fade-in
                  `}
                  style={{ 
                    animationDelay: `${index * 0.5}s`,
                    opacity: 0,
                    animation: 'fade-in 0.7s ease-out forwards'
                  }}
                >
                  <div 
                    className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center relative"
                    style={{ 
                      backgroundColor: `${agentColor}20`, 
                      boxShadow: `0 0 10px ${agentColor}80` 
                    }}
                  >
                    <Database className="h-4 w-4" style={{ color: agentColor }} />
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{ 
                        border: `2px solid ${agentColor}`,
                        opacity: glowIntensity / 100,
                      }}
                    />
                  </div>
                  <div 
                    className={`rounded-lg px-3 py-2 ${isEven ? 'rounded-bl-none' : 'rounded-br-none'}`}
                    style={{ 
                      background: `linear-gradient(135deg, ${agentColor}20, ${agentColor}40)`,
                      border: `1px solid ${agentColor}30`,
                      boxShadow: `0 2px 8px ${agentColor}20`
                    }}
                  >
                    {message}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      )}
      
      {orderStage === 'ready' && onApproveSwap && (
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
