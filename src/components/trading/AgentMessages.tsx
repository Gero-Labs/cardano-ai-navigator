
import React, { useEffect, useRef } from 'react';
import { Database } from "lucide-react";

interface AgentMessagesProps {
  messages: string[];
  glowIntensity: number;
}

export const AgentMessages: React.FC<AgentMessagesProps> = ({ messages, glowIntensity }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getAgentColor = (index: number) => {
    const colors = ["#6E59A5", "#4CC9F0", "#FF52A2", "#7E69AB", "#4361EE"];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-0 bg-accent/30 backdrop-blur-sm rounded-lg p-4 max-h-52 overflow-y-auto border border-accent/50 shadow-[0_0_15px_rgba(123,90,224,0.2)]">
      <div className="flex flex-col gap-2">
        {messages.map((message, index) => {
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
  );
};

