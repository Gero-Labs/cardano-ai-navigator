import { Check } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DeploymentCompleteProps {
  onContinue: () => void;
}

export const DeploymentComplete = ({ onContinue }: DeploymentCompleteProps) => {
  return (
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
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={onContinue}
          size="lg"
        >
          Continue to Dashboard
        </Button>
      </CardHeader>
    </Card>
  );
};
