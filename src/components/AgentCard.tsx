
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { Info, TrendingUp, PauseCircle, PlayCircle, AlertTriangle, MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AgentProps {
  agent: {
    id: string;
    name: string;
    icon: string;
    status: "running" | "paused" | "error";
    portfolioDrift: number;
    executedTrades: number;
    apr: number;
  };
}

const AgentCard = ({ agent }: AgentProps) => {
  const { toggleAgentStatus } = useAppContext();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  
  const handleStatusToggle = () => {
    toggleAgentStatus(agent.id);
    toast({
      title: `Agent ${agent.status === "running" ? "Paused" : "Resumed"}`,
      description: `${agent.name} has been ${agent.status === "running" ? "paused" : "resumed"}.`,
    });
  };

  const getIconComponent = () => {
    switch (agent.icon) {
      case "balance-scale":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2C8.5 2 9 2.5 9 3L9 7L15 7L15 3C15 2.5 15.5 2 16 2C16.5 2 17 2.5 17 3L17 7L20 7L20 9L17 9L17 21C17 21.5 16.5 22 16 22C15.5 22 15 21.5 15 21L15 9L9 9L9 21C9 21.5 8.5 22 8 22C7.5 22 7 21.5 7 21L7 9L4 9L4 7L7 7L7 3C7 2.5 7.5 2 8 2Z"/>
          </svg>
        );
      case "chart-line":
        return <TrendingUp className="h-5 w-5" />;
      case "coins":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="8" r="7" />
            <circle cx="16" cy="16" r="7" />
          </svg>
        );
      default:
        return <Info className="h-5 w-5" />;
    }
  };

  return (
    <Card 
      className={`border ${
        agent.status === "running" ? "border-l-4 border-l-agent-success" :
        agent.status === "paused" ? "border-l-4 border-l-agent-paused" :
        "border-l-4 border-l-agent-error"
      } transition-shadow hover:shadow-md`}
    >
      <CardHeader className="pb-2 pt-4 px-4">
        <div className="flex justify-between items-center draggable-handle">
          <div className="flex items-center">
            <div className={`p-1.5 rounded-md mr-2 ${
              agent.status === "running" ? "bg-agent-success/10 text-agent-success" :
              agent.status === "paused" ? "bg-agent-paused/10 text-agent-paused" :
              "bg-agent-error/10 text-agent-error"
            }`}>
              {getIconComponent()}
            </div>
            <CardTitle className="text-base">{agent.name}</CardTitle>
          </div>
          
          <div className="flex items-center">
            <div className={`px-2 py-0.5 text-xs rounded-full mr-2 font-medium ${
              agent.status === "running" ? "bg-agent-success/10 text-agent-success" :
              agent.status === "paused" ? "bg-agent-paused/10 text-agent-paused" :
              "bg-agent-error/10 text-agent-error"
            }`}>
              <span className="capitalize">{agent.status}</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">Reset Agent</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-3 px-4">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Portfolio Drift</p>
            <p className="font-medium">{agent.portfolioDrift}%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Trades</p>
            <p className="font-medium">{agent.executedTrades}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">APR</p>
            <p className="font-medium">{agent.apr}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0 pb-3 px-4 justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handleStatusToggle}
        >
          {agent.status === "running" ? (
            <>
              <PauseCircle className="mr-1 h-4 w-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <PlayCircle className="mr-1 h-4 w-4" />
              <span>Resume</span>
            </>
          )}
        </Button>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>AI agent that {
              agent.name === "Portfolio Rebalancer" ? "automatically rebalances your portfolio based on set targets" :
              agent.name === "Sentiment Trader" ? "trades based on market sentiment analysis" :
              "optimizes yield farming across DeFi protocols"
            }</p>
          </TooltipContent>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default AgentCard;
