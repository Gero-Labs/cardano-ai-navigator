
import { Check } from "lucide-react";

interface DeploymentProgressProps {
  deploymentStep: number;
}

export const DeploymentProgress = ({ deploymentStep }: DeploymentProgressProps) => {
  const steps = [
    "Initializing deployment",
    "Signing transaction",
    "Deploying AI agents",
    "Finalizing setup"
  ];

  return (
    <div className="space-y-2">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {deploymentStep > index ? (
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
              <Check className="h-3 w-3 text-white" />
            </div>
          ) : deploymentStep === index ? (
            <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
              <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
            </div>
          ) : (
            <div className="h-5 w-5 rounded-full border border-muted mr-3"></div>
          )}
          <span className={deploymentStep >= index ? "text-foreground" : "text-muted-foreground"}>
            {step}
          </span>
        </div>
      ))}
    </div>
  );
};
