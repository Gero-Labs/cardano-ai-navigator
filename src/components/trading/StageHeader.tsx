
import React from 'react';
import { stageConfigs } from './config/stageConfig';
import type { OrderStage } from "@/hooks/useTrading";

interface StageHeaderProps {
  orderStage: OrderStage;
}

export const StageHeader: React.FC<StageHeaderProps> = ({ orderStage }) => {
  const currentStage = stageConfigs[orderStage];
  
  return (
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
  );
};

