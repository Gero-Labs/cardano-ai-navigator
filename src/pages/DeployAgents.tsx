
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Shield } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { DeploymentProgress } from "@/components/deploy/DeploymentProgress";
import { DeploymentSummary } from "@/components/deploy/DeploymentSummary";
import { DeploymentComplete } from "@/components/deploy/DeploymentComplete";

const DeployAgents = () => {
  const { selectedPlan, selectedRiskLevel, deployAgents } = useAppContext();
  const navigate = useNavigate();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [isDeploymentComplete, setIsDeploymentComplete] = useState(false);

  if (!selectedPlan) {
    navigate("/onboarding");
    return null;
  }

  const handleDeploy = async () => {
    setIsDeploying(true);
    
    // Step 1: Initializing
    setDeploymentStep(1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Step 2: Signing transaction
    setDeploymentStep(2);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Step 3: Deploying agents
    setDeploymentStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Step 4: Complete
    const success = await deployAgents();
    setDeploymentStep(4);
    setIsDeploymentComplete(true);
    setIsDeploying(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        {isDeploymentComplete ? (
          <DeploymentComplete onContinue={() => navigate("/dashboard")} />
        ) : (
          <>
            <div className="text-center mb-8">
              <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Deploy Your AI Agents</h1>
              <p className="text-muted-foreground">
                Your agents are ready to be deployed to your wallet
              </p>
            </div>

            <DeploymentSummary 
              selectedPlan={selectedPlan}
              selectedRiskLevel={selectedRiskLevel}
              isDeploying={isDeploying}
              onDeploy={handleDeploy}
            />

            {isDeploying && (
              <Card>
                <CardContent className="pt-6">
                  <DeploymentProgress deploymentStep={deploymentStep} />
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeployAgents;
