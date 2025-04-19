import React, { useEffect, useState, useRef } from 'react';
import { Loader, MessageSquare, ArrowLeftRight, Check, Zap, Database, Link, LoaderCircle, CircleCheck, CircleArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { OrderStage } from "@/hooks/useTrading";

interface OrderStatusProps {
  orderStage: OrderStage;
  progress: number;
  agentMessages: string[];
}

export const OrderStatus = ({ orderStage, progress, agentMessages }: OrderStatusProps) => {
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setGlowIntensity(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(intervalId);
  }, []);

  if (orderStage === "creating") return null;

  const stages = {
    finding: {
      icon: <LoaderCircle className="h-8 w-8 animate-spin text-primary" />,
      secondaryIcon: <Database className="h-5 w-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Finding AI Agents",
      description: "Publishing order to the network..."
    },
    negotiating: {
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      secondaryIcon: <Zap className="h-5 w-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Agents Negotiating",
      description: "AI agents are communicating to match your order..."
    },
    executing: {
      icon: <ArrowLeftRight className="h-8 w-8 text-primary" />,
      secondaryIcon: <Link className="h-5 w-5 text-purple-400 absolute -top-1 -right-1 animate-pulse" />,
      title: "Executing Trade",
      description: "Finalizing the secure wallet-to-wallet transfer..."
    },
    completed: {
      icon: <CircleCheck className="h-8 w-8 text-green-500" />,
      secondaryIcon: <CircleArrowRight className="h-5 w-5 text-green-400 absolute -top-1 -right-1" />,
      title: "Trade Complete",
      description: "Your order has been successfully executed!"
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
        <h3 className="font-bold text-2xl bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent">{currentStage.title}</h3>
        <p className="text-base text-muted-foreground text-center max-w-xs">{currentStage.description}</p>
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
                  style={{ animationDelay: `${index * 0.3}s` }}
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
      
      {(orderStage === "negotiating" || orderStage === "executing") && (
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
