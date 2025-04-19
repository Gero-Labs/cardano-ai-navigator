
import { Loader, MessageSquare, ArrowLeftRight, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import type { OrderStage } from "@/hooks/useTrading";

interface OrderStatusProps {
  orderStage: OrderStage;
  progress: number;
  agentMessages: string[];
}

export const OrderStatus = ({ orderStage, progress, agentMessages }: OrderStatusProps) => {
  if (orderStage === "creating") return null;

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

  const currentStage = stages[orderStage];

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
