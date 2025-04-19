
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Database, Activity, BarChart, MessageSquare } from "lucide-react";

interface AgentActivityProps {
  className?: string;
}

interface AgentAction {
  agentName: string;
  action: string;
  timestamp: Date;
}

const agents = [
  {
    name: "Lumen",
    role: "On-Chain Market Metrics Analyst",
    description: "Analyzes price trends and market behavior",
    icon: <BarChart className="h-5 w-5 text-purple-400" />,
    status: "active",
    currentTask: "Analyzing mempool data for potential market signals"
  },
  {
    name: "Sentra",
    role: "Portfolio Risk Optimization Engine",
    description: "Analyzes portfolio composition and risk exposure",
    icon: <Activity className="h-5 w-5 text-blue-400" />,
    status: "active",
    currentTask: "Running portfolio risk simulation scenarios"
  },
  {
    name: "Aria",
    role: "Macro & Token Intelligence Synthesizer",
    description: "Synthesizes market data and portfolio insights",
    icon: <MessageSquare className="h-5 w-5 text-pink-400" />,
    status: "active",
    currentTask: "Processing latest DAO governance proposals"
  },
  {
    name: "Bolt",
    role: "Trade Execution Strategist",
    description: "Executes optimized trading strategies",
    icon: <Database className="h-5 w-5 text-green-400" />,
    status: "standby",
    currentTask: "Monitoring for trade execution opportunities"
  }
];

export function AgentActivity({ className }: AgentActivityProps) {
  const [recentActions, setRecentActions] = useState<AgentAction[]>([]);

  useEffect(() => {
    // Simulate agent activities
    const interval = setInterval(() => {
      const randomAgent = agents[Math.floor(Math.random() * agents.length)];
      const actions = [
        "analyzing market data",
        "updating risk models",
        "processing on-chain metrics",
        "evaluating portfolio exposure",
        "monitoring price movements",
        "calculating optimal entry points"
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      
      setRecentActions(prev => {
        const newActions = [...prev, {
          agentName: randomAgent.name,
          action: randomAction,
          timestamp: new Date()
        }];
        return newActions.slice(-5); // Keep last 5 actions
      });
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AI Agent Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {agents.map((agent) => (
              <div 
                key={agent.name}
                className="flex items-start space-x-4 p-4 rounded-lg bg-card/50 border border-accent/20 backdrop-blur-sm transition-all duration-300 hover:border-accent/40"
              >
                <div className="relative">
                  <div className="p-2 rounded-full bg-background/80 border border-accent/30">
                    {agent.icon}
                  </div>
                  <div 
                    className={`absolute -top-1 -right-1 h-3 w-3 rounded-full ${
                      agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'
                    } animate-pulse`}
                  />
                </div>
                
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{agent.name}</h4>
                    <Badge 
                      variant="outline" 
                      className={`${
                        agent.status === 'active' ? 'border-green-500/50 text-green-500' : 
                        'border-yellow-500/50 text-yellow-500'
                      }`}
                    >
                      {agent.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{agent.role}</p>
                  <p className="text-xs text-accent-foreground/80 mt-2">
                    Current: {agent.currentTask}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-medium mb-3">Recent Activities</h4>
            {recentActions.map((action, index) => (
              <div 
                key={index}
                className="text-xs text-muted-foreground p-2 rounded bg-accent/5 border border-accent/10"
                style={{
                  animation: 'fade-in 0.5s ease-out forwards',
                  opacity: 0,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <span className="font-medium text-accent-foreground">{action.agentName}</span> is {action.action}
                <span className="block text-[10px] text-muted-foreground/60 mt-1">
                  {action.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
