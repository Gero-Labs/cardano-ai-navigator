
import { CircleCheck, LoaderCircle, MessageSquare, Database, Zap, CircleArrowRight, Check } from "lucide-react";
import { OrderStage } from "@/hooks/useTrading";

export const stageConfigs: Record<OrderStage, {
  icon: JSX.Element;
  secondaryIcon: JSX.Element;
  title: string;
  description: string;
}> = {
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

