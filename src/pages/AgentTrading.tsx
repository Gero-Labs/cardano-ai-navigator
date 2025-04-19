
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, ArrowLeft, CircleCheck } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderStatus } from "@/components/trading/OrderStatus";
import { PortfolioRiskReview } from "@/components/trading/PortfolioRiskReview";
import { useTrading } from "@/hooks/useTrading";

const AgentTrading = () => {
  const navigate = useNavigate();
  const { wallet } = useAppContext();
  const {
    orderStage,
    progress,
    agentMessages,
    handleApproveSwap,
  } = useTrading(wallet.balance || 0);

  const handleGoBack = () => {
    navigate("/");
  };

  if (!wallet.isConnected) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={handleGoBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex mx-auto mb-4">
              <ArrowLeftRight className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">AI Analysis</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <OrderStatus
              orderStage={orderStage}
              progress={progress}
              agentMessages={agentMessages}
              onApproveSwap={handleApproveSwap}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentTrading;
