
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wallet, ArrowRight, ArrowLeftRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AgentTrading = () => {
  const navigate = useNavigate();
  const { wallet } = useAppContext();
  const { toast } = useToast();
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [isDeploying, setIsDeploying] = useState(false);

  if (!wallet.isConnected) {
    navigate("/");
    return null;
  }

  const handleDeploy = async () => {
    if (!destinationAddress || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsDeploying(true);
    
    // Simulate deployment delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Agent Deployed Successfully",
      description: "Your trading agent has been deployed and will execute the swap",
    });
    
    setIsDeploying(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        <Card>
          <CardHeader className="text-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex mx-auto mb-4">
              <ArrowLeftRight className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Deploy Trading Agent</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">From Wallet</label>
                  <Input 
                    value={wallet.address || ""} 
                    disabled 
                    className="bg-muted"
                  />
                </div>
                <ArrowRight className="h-6 w-6 mt-8 text-muted-foreground" />
                <div className="flex-1">
                  <label className="text-sm font-medium mb-2 block">To Wallet</label>
                  <Input
                    placeholder="Enter destination address"
                    value={destinationAddress}
                    onChange={(e) => setDestinationAddress(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Amount (ADA)</label>
                <Input
                  type="number"
                  placeholder="Enter amount to swap"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

            <Button 
              className="w-full"
              onClick={handleDeploy}
              disabled={isDeploying || !destinationAddress || !amount}
            >
              {isDeploying ? (
                "Deploying Agent..."
              ) : (
                <>
                  <Wallet className="mr-2" />
                  Deploy Trading Agent
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentTrading;
