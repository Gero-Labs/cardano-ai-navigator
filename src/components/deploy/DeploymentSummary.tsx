
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Shield } from "lucide-react";

interface DeploymentSummaryProps {
  selectedPlan: { name: string; price: number };
  selectedRiskLevel: string;
  isDeploying: boolean;
  onDeploy: () => void;
  isRecommendationOnly?: boolean;
}

export const DeploymentSummary = ({
  selectedPlan,
  selectedRiskLevel,
  isDeploying,
  onDeploy,
  isRecommendationOnly = false,
}: DeploymentSummaryProps) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>
          {isRecommendationOnly ? "Portfolio Analysis" : "Deployment Summary"}
        </CardTitle>
        <CardDescription>
          {isRecommendationOnly
            ? "Review your selections before analysis"
            : "Review your selections before deploying"}
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
        <div className="pt-4">
          <Button
            className="w-full"
            onClick={onDeploy}
            disabled={isDeploying}
            size="lg"
          >
            {isDeploying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>{isRecommendationOnly ? "Analyzing..." : "Deploying..."}</span>
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                <span>{isRecommendationOnly ? "Analyze Portfolio" : "Deploy Agents"}</span>
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            {isRecommendationOnly
              ? "Our AI will analyze your portfolio and provide recommendations only"
              : "By deploying, you'll sign a transaction to mint AI agent NFTs"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
