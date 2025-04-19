import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Loader2, Shield, Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0">
              <img 
                src="/lovable-uploads/1460e200-7e39-4f5b-a1c9-f54d366fe342.png" 
                alt="Gradient background"
                className="w-full h-full object-cover opacity-50"
              />
            </div>
            <CardHeader className="relative z-10">
              <div className="mx-auto rounded-full bg-primary/10 p-3 backdrop-blur-sm">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-center mt-4">Deployment Complete!</CardTitle>
              <CardDescription className="text-center">
                Your AI agents have been successfully deployed
              </CardDescription>
            </CardHeader>
          </Card>
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

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Deployment Summary</CardTitle>
                <CardDescription>
                  Review your selections before deploying
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Selected Plan:</span>
                  <span className="font-medium">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b">
                  <span className="text-muted-foreground">Risk Level:</span>
                  <div className="flex items-center">
                    <div className={`h-3 w-3 rounded-full mr-2 bg-risk-${selectedRiskLevel}`}></div>
                    <span className="font-medium capitalize">{selectedRiskLevel}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Monthly Cost:</span>
                  <span className="font-medium">${selectedPlan.price.toFixed(2)}</span>
                </div>
              </CardContent>
              <div className="p-6 pt-0 space-y-4">
                <Button
                  className="w-full"
                  onClick={handleDeploy}
                  disabled={isDeploying}
                  size="lg"
                >
                  {isDeploying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Deploying...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Deploy Agents</span>
                    </>
                  )}
                </Button>
                {isDeploymentComplete && (
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/dashboard")}
                    size="lg"
                  >
                    Continue to Dashboard
                  </Button>
                )}
                <p className="text-xs text-center text-muted-foreground">
                  By deploying, you'll sign a transaction to mint AI agent NFTs
                </p>
              </div>
            </Card>

            {isDeploying && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Deployment Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      {deploymentStep > 0 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-primary mr-3"></div>
                      )}
                      <span className={deploymentStep > 0 ? "text-foreground" : "text-muted-foreground"}>
                        Initializing deployment
                      </span>
                    </div>

                    <div className="flex items-center">
                      {deploymentStep > 1 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : deploymentStep === 1 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-muted mr-3"></div>
                      )}
                      <span className={deploymentStep >= 1 ? "text-foreground" : "text-muted-foreground"}>
                        Signing transaction
                      </span>
                    </div>

                    <div className="flex items-center">
                      {deploymentStep > 2 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : deploymentStep === 2 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-muted mr-3"></div>
                      )}
                      <span className={deploymentStep >= 2 ? "text-foreground" : "text-muted-foreground"}>
                        Deploying AI agents
                      </span>
                    </div>

                    <div className="flex items-center">
                      {deploymentStep > 3 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      ) : deploymentStep === 3 ? (
                        <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center mr-3">
                          <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="h-5 w-5 rounded-full border border-muted mr-3"></div>
                      )}
                      <span className={deploymentStep >= 3 ? "text-foreground" : "text-muted-foreground"}>
                        Finalizing setup
                      </span>
                    </div>
                  </div>
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
