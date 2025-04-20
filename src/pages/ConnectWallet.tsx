import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActivitySquare, ChevronRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import _ from "lodash";
import { cn } from "@/lib/utils";
import { WalletId } from "@/types/wallet";
import { BrowserWallet } from "@meshsdk/core";

interface WalletOption {
  id: WalletId;
  name: string;
  logo: string;
  installed?: boolean;
}

const walletOptions: WalletOption[] = [
  {
    id: WalletId.gero,
    name: _.get(window, `cardano.${WalletId.gero}.name`),
    logo: _.get(window, `cardano.${WalletId.gero}.icon`),
    installed: true,
  },
  {
    id: WalletId.vespr,
    name: _.get(window, `cardano.${WalletId.vespr}.name`),
    logo: _.get(window, `cardano.${WalletId.vespr}.icon`),
    installed: true,
  },
];

const ConnectWallet = () => {
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const { setWallet } = useAppContext();
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConnect = async () => {
    if (!selectedWalletId) {
      toast({
        title: "No wallet selected",
        description: "Please select a wallet to connect",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);

    try {
      // Connect wallet using the CIP-30 API
      const connectedWallet = await BrowserWallet.enable(selectedWalletId);
      setWallet(connectedWallet);

      setIsConnecting(false);
      navigate("/onboarding");
    } catch (error) {
      setIsConnecting(false);
      toast({
        title: "Connection failed",
        description: "Failed to connect to wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex">
              <ActivitySquare className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Cardano AI Navigator</h1>
          <p className="text-muted-foreground">
            Connect your Cardano wallet to deploy AI agents for automated
            portfolio management
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>

          <div className="space-y-3 mb-6">
            {walletOptions.map((option) => (
              <div
                key={option.id}
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-colors flex items-center justify-between",
                  selectedWalletId === option.id
                    ? "border-primary bg-accent"
                    : "hover:border-primary/50",
                  !option.installed && "opacity-50"
                )}
                onClick={() =>
                  option.installed && setSelectedWalletId(option.id)
                }
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 mr-3 flex-shrink-0 bg-white rounded-full p-1 flex items-center justify-center">
                    <img
                      src={option.logo}
                      alt={`${option.name} logo`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{option.name}</p>
                    {!option.installed && (
                      <span className="text-sm text-muted-foreground">
                        Not installed
                      </span>
                    )}
                  </div>
                </div>
                {selectedWalletId === option.id && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-white"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={!selectedWalletId || isConnecting}
            onClick={handleConnect}
          >
            {isConnecting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-b-transparent mr-2"></div>
                <span>Connecting...</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Wallet className="mr-2 h-4 w-4" />
                <span>Connect Wallet</span>
              </div>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-4">
            By connecting your wallet, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>

        <div className="bg-card rounded-xl shadow-sm p-4 flex justify-between items-center">
          <div>
            <h3 className="font-medium">New to Cardano?</h3>
            <p className="text-sm text-muted-foreground">
              Learn how to create a wallet
            </p>
          </div>
          <Button variant="outline" size="sm">
            Learn More
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
