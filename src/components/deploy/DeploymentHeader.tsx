
import { Shield } from "lucide-react";

export const DeploymentHeader = () => {
  return (
    <div className="text-center mb-8">
      <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex mb-4">
        <Shield className="h-8 w-8 text-white" />
      </div>
      <h1 className="text-3xl font-bold mb-2">Deploy Your AI Agents</h1>
      <p className="text-muted-foreground">
        Your agents are ready to be deployed to your wallet
      </p>
    </div>
  );
};
