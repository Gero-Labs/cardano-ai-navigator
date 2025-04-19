import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppContextProvider } from "./contexts/AppContext";
import ConnectWallet from "./pages/ConnectWallet";
import OnboardingFlow from "./pages/OnboardingFlow";
import DeployAgents from "./pages/DeployAgents";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import AgentTrading from "./pages/AgentTrading";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ConnectWallet />} />
            <Route path="/onboarding" element={<OnboardingFlow />} />
            <Route path="/deploy" element={<DeployAgents />} />
            <Route path="/trading" element={<AgentTrading />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppContextProvider>
  </QueryClientProvider>
);

export default App;
