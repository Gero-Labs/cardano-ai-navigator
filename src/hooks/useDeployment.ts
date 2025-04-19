import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { useToast } from "./use-toast";
import { COMPANY_ADDRESS } from "@/utils/config";

export const useDeployment = () => {
  const { deployAgents, selectedPlan, wallet } = useAppContext();
  const navigate = useNavigate();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStep, setDeploymentStep] = useState(0);
  const [isDeploymentComplete, setIsDeploymentComplete] = useState(false);
  const { toast } = useToast();

  const handleDeploy = async () => {
    setIsDeploying(true);

    setDeploymentStep(1);
    try {
      const walletAddress = (await wallet.getUsedAddresses())[0];
      const tx = await axios.post(
        "https://api-preprod.vespr.xyz/v4/wallet/txprepare",
        {
          address: walletAddress,
          destinations: [
            {
              address: COMPANY_ADDRESS.preprod,
              assets: [
                {
                  policy_id: "",
                  hex_asset_name: "416461",
                  quantity: 1 * 1_000_000,
                },
              ],
            },
          ],
        }
      );

      const unsignedTx = _.get(tx, "data.unsigned_tx");
      const signedTx = await wallet.signTx(unsignedTx);
      const txHash = await wallet.submitTx(signedTx);

      setDeploymentStep(2);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setDeploymentStep(3);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsDeploymentComplete(true);
    } catch (error) {
      toast({
        title: error.title,
        description: _.get(
          error,
          "response.data.errorMessage",
          error.message ?? error.info
        ),
        variant: "destructive",
      });

      setDeploymentStep(0);
    }

    setIsDeploying(false);
  };

  const handleContinue = () => {
    navigate("/trading");
  };

  return {
    isDeploying,
    deploymentStep,
    isDeploymentComplete,
    handleDeploy,
    handleContinue,
  };
};
