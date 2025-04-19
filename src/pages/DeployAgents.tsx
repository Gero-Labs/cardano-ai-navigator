
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { DeploymentProgress } from "@/components/deploy/DeploymentProgress";
import { DeploymentSummary } from "@/components/deploy/DeploymentSummary";
import { DeploymentComplete } from "@/components/deploy/DeploymentComplete";
import { DeploymentHeader } from "@/components/deploy/DeploymentHeader";
import { useDeployment } from "@/hooks/useDeployment";

const DeployAgents = () => {
  const { selectedPlan, selectedRiskLevel } = useAppContext();
  const navigate = useNavigate();
  const {
    isDeploying,
    deploymentStep,
    isDeploymentComplete,
    handleDeploy,
    handleContinue,
  } = useDeployment();

  if (!selectedPlan) {
    navigate("/onboarding");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        {isDeploymentComplete ? (
          <DeploymentComplete 
            onContinue={handleContinue} 
            isRecommendationOnly={true}
          />
        ) : (
          <>
            <DeploymentHeader />
            
            <DeploymentSummary 
              selectedPlan={selectedPlan}
              selectedRiskLevel={selectedRiskLevel}
              isDeploying={isDeploying}
              onDeploy={handleDeploy}
              isRecommendationOnly={true}
            />

            {isDeploying && (
              <Card>
                <CardContent className="pt-6">
                  <DeploymentProgress 
                    deploymentStep={deploymentStep} 
                    isRecommendationOnly={true}
                  />
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
