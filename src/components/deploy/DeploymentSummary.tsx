import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Shield } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { formatCurrency } from "@/utils/currency";

interface DeploymentSummaryProps {
  selectedPlan: { name: string; price: number };
  selectedRiskLevel: string;
  isDeploying: boolean;
  onDeploy: () => void;
}

export const DeploymentSummary = ({
  selectedPlan,
  selectedRiskLevel,
  isDeploying,
  onDeploy,
}: DeploymentSummaryProps) => {
  const { currencyType, adaUsdPrice } = useAppContext();

  return (
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
            <div
              className={`h-3 w-3 rounded-full mr-2 bg-risk-${selectedRiskLevel}`}
            ></div>
            <span className="font-medium capitalize">{selectedRiskLevel}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Monthly Cost:</span>
          <span className="font-medium">
            {formatCurrency(selectedPlan.price, currencyType, adaUsdPrice)}
          </span>
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
                <span>Deploying...</span>
              </>
            ) : (
              <>
                <Shield className="mr-2 h-4 w-4" />
                <span>Deploy Agents</span>
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            By deploying, you'll sign a transaction to mint AI agent NFTs
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
