
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const steps = [
  "Initializing agents",
  "Analyzing market conditions",
  "Evaluating portfolio risk",
  "Generating recommendations"
];

const deploymentSteps = [
  "Initializing agents",
  "Configuring parameters",
  "Generating keys",
  "Deploying to network"
];

interface DeploymentProgressProps {
  deploymentStep: number;
  isRecommendationOnly?: boolean;
}

export const DeploymentProgress = ({ 
  deploymentStep,
  isRecommendationOnly = false
}: DeploymentProgressProps) => {
  const [progress, setProgress] = useState(0);
  const currentSteps = isRecommendationOnly ? steps : deploymentSteps;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const targetProgress = (deploymentStep / currentSteps.length) * 100;
        const increment = Math.max(1, (targetProgress - prev) / 10);
        const newProgress = Math.min(targetProgress, prev + increment);
        
        if (newProgress >= targetProgress) {
          clearInterval(interval);
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [deploymentStep, currentSteps.length]);

  return (
    <div className="space-y-4">
      <div className="text-center mb-2">
        <h3 className="text-lg font-medium">{isRecommendationOnly ? "Analysis in Progress" : "Deployment in Progress"}</h3>
        <p className="text-muted-foreground text-sm">Please wait while we process your request</p>
      </div>
      
      <Progress value={progress} className="h-2" />
      
      <div className="space-y-2 pt-2">
        {currentSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center space-x-3 ${
              index > deploymentStep ? "opacity-50" : ""
            }`}
          >
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                index < deploymentStep
                  ? "bg-primary text-primary-foreground"
                  : index === deploymentStep
                  ? "border-2 border-primary text-primary animate-pulse"
                  : "border border-muted-foreground text-muted-foreground"
              }`}
            >
              {index < deploymentStep ? "✓" : index + 1}
            </div>
            <span
              className={
                index === deploymentStep ? "font-medium text-primary" : ""
              }
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
