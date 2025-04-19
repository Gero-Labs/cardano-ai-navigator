
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTrading } from "@/hooks/useTrading";
import { OrderStatus } from "@/components/trading/OrderStatus";
import { TradingForm } from "@/components/trading/TradingForm";

const AgentTrading = () => {
  const navigate = useNavigate();
  const { wallet, adaUsdPrice } = useAppContext();
  
  const {
    sellToken,
    buyToken,
    sellAmount,
    buyAmount,
    slippage,
    orderType,
    agentPreferences,
    isSubmitting,
    orderStage,
    progress,
    agentMessages,
    availableTokens,
    setSellToken,
    setBuyToken,
    setSlippage,
    setOrderType,
    setAgentPreferences,
    handleSellAmountChange,
    handleBuyAmountChange,
    handleSwapTokens,
    handleSubmitOrder,
  } = useTrading(wallet.balance || 0);

  if (!wallet.isConnected) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-md w-full mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="rounded-full bg-gradient-to-br from-purple-500 to-blue-600 p-3 inline-flex mx-auto mb-4">
              <ArrowLeftRight className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">AI Trade Agent</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {orderStage === "creating" ? (
              <TradingForm
                sellToken={sellToken}
                buyToken={buyToken}
                sellAmount={sellAmount}
                buyAmount={buyAmount}
                slippage={slippage}
                orderType={orderType}
                agentPreferences={agentPreferences}
                isSubmitting={isSubmitting}
                tokens={availableTokens}
                adaUsdPrice={adaUsdPrice}
                onSellTokenChange={setSellToken}
                onBuyTokenChange={setBuyToken}
                onSellAmountChange={handleSellAmountChange}
                onBuyAmountChange={handleBuyAmountChange}
                onSlippageChange={setSlippage}
                onOrderTypeChange={setOrderType}
                onAgentPreferencesChange={setAgentPreferences}
                onSwapTokens={handleSwapTokens}
                onSubmit={handleSubmitOrder}
              />
            ) : (
              <OrderStatus
                orderStage={orderStage}
                progress={progress}
                agentMessages={agentMessages}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentTrading;
