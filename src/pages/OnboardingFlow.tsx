import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import { usePlans } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, ChevronRight, DollarSign } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const OnboardingFlow = () => {
  const { wallet, selectPlan, setRiskLevel, selectedPlan, selectedRiskLevel, adaUsdPrice } = useAppContext();
  const navigate = useNavigate();
  const plans = usePlans();
  const [currencyType, setCurrencyType] = useState<"USD" | "ADA">("USD");

  const handleSelectPlan = (plan: any) => {
    selectPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigate("/trading");
    }
  };

  const formatCurrency = (price: number): string => {
    if (currencyType === "USD") {
      return `$${price.toFixed(2)}`;
    } else {
      // Convert USD to ADA
      const adaAmount = price / adaUsdPrice;
      return `₳${adaAmount.toFixed(2)}`;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <div className="max-w-4xl w-full mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">
            Select a plan and risk level to deploy your AI agents
          </p>
        </div>

        <Tabs defaultValue="USD" className="mb-8">
          <div className="flex justify-center mb-4">
            <TabsList>
              <TabsTrigger value="USD" onClick={() => setCurrencyType("USD")}>USD</TabsTrigger>
              <TabsTrigger value="ADA" onClick={() => setCurrencyType("ADA")}>ADA</TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`transition-all hover:shadow-md ${
                selectedPlan?.id === plan.id 
                  ? "border-primary ring-2 ring-primary ring-opacity-50" 
                  : ""
              }`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{plan.name}</span>
                  {selectedPlan?.id === plan.id && (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  )}
                </CardTitle>
                <CardDescription>
                  <div className="text-2xl font-bold mt-2">
                    {formatCurrency(plan.price)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      /month
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-1">
                    Risk Level
                  </label>
                  <Select 
                    defaultValue="balanced" 
                    onValueChange={(value: any) => setRiskLevel(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative</SelectItem>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="risky">Risky</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full"
                  variant={selectedPlan?.id === plan.id ? "default" : "outline"}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {selectedPlan?.id === plan.id ? "Selected" : "Select Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg"
            disabled={!selectedPlan}
            onClick={handleContinue}
            className="px-8"
          >
            <span>Continue</span>
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
