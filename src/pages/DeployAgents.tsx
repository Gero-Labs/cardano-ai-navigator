
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { DeploymentProgress } from "@/components/deploy/DeploymentProgress";
import { DeploymentSummary } from "@/components/deploy/DeploymentSummary";
import { DeploymentComplete } from "@/components/deploy/DeploymentComplete";
import { DeploymentHeader } from "@/components/deploy/DeploymentHeader";

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
    
    setDeploymentStep(1);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setDeploymentStep(2);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setDeploymentStep(3);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
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
            <DeploymentHeader />
            
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
