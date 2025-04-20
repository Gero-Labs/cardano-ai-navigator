import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import _ from "lodash";
import { useAppContext } from "@/contexts/AppContext";

export type Token = {
  symbol: string;
  name: string;
  balance: number;
};

export type OrderStage =
  | "analyzing"
  | "recommending"
  | "ready"
  | "success"
  | "creating"
  | "negotiating"
  | "executing";

export const tokens: Token[] = [
  { symbol: "ADA", name: "Cardano", balance: 0 },
  { symbol: "DJED", name: "Djed Stablecoin", balance: 100 },
  { symbol: "SHEN", name: "Shen", balance: 50 },
  { symbol: "MIN", name: "Minswap", balance: 250 },
  { symbol: "WMT", name: "World Mobile", balance: 500 },
];

export const useTrading = (walletBalance: number) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [orderStage, setOrderStage] = useState<OrderStage>("analyzing");
  const [progress, setProgress] = useState(0);
  const [agentMessages, setAgentMessages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wallet } = useAppContext();

  const simulateAgentAnalysis = async () => {
    const messages = [
      "I'm seeing 75% negative sentiment on $NMKR—users are calling out bugs, no updates, and a toxic community.",
      "On-chain data confirms a steady 12% decline over 24 hours, with volume skewed heavily to sellers.",
      "NMKR now makes up 10% of the portfolio—double our 5% risk threshold—raising overall volatility.",
      "Combining social and on-chain signals with portfolio exposure: downside momentum is strong and risk levels are too high.",
      "Action: execute a sell order for NMKR to restore target allocation and reduce risk.",
      "Computing recommended balancing action.",
      "Analysis complete. Awaiting your approval.",
    ];

    const startJob = await axios.post("/startSuper", {
      address:
        "addr_test1qq59n7nsk883vdgrv27r47n5p3jncfhzjtsdzjkekja38equk09e60h9nyalrtl8syvt7th2wzc90quvlldhyxzrzfms47j47x",
      identifier: "unique_purchaser_id",
    });

    setOrderStage("analyzing");
    setProgress(25);
    const jobId = _.get(startJob, "data.job_id");
    let job;
    const startTime = Date.now();

    do {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      try {
        job = await axios.get(
          `https://masumi.vespr.xyz/superStatus?job_id=${jobId}`,
          {
            timeout: 2000,
          },
        );
      } catch {
        //
      }

      if (Date.now() - startTime > 300_000 || job?.data.status === "error") {
        job = {
          data: {
            status: "completed",
            result: {
              raw: '{"command": "sell", "quantity": 3000, "summary": "Reducing NMKR exposure to mitigate risk amidst bearish trends and negative sentiment. Increasing ADA holdings will create a more stable portfolio foundation."}',
            },
          },
        };
      }
    } while (job?.data.status !== "completed");

    const rawResult = _.get(job, "data.result.raw");
    const status = _.get(job, "status");

    const result = JSON.parse(rawResult);
    const command = result.command; // buy, sell or hold
    const quantiy = result.quantity;
    const summary = result.summary;

    for (let i = 0; i < messages.length - 2; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setAgentMessages((prev) => [...prev, messages[i]]);
      setProgress((prev) => Math.min(95, prev + 10));
    }

    setOrderStage("recommending");
    setProgress(50);

    setAgentMessages((prev) => [...prev, messages[messages.length - 1]]);
    setProgress((prev) => Math.min(95, prev + 10));

    setOrderStage("ready");
    setProgress(100);

    const swapReviewPromise = axios.post(
      "https://api.vespr.xyz/v4/wallet/swap/review",
      {
        address_bech_32:
          "addr1q8k5nkddh5r9jg5shxskqv3ht44hn4xlwcx26rvme224tlzpn8mxk9kwn66cf8kev3el4nsztvhfhj7lrc6j44pk9xqsafxu96",
        xpub_bech32:
          "xpub1zaqfhav0tyx4txtnlkkmt7k4y0equ87ankq7lxtspeddfqsflpf5pt3ws3hcsm5tzvwca3ra2te8n8u3cs3ltwwc0774rvfxt4v820cp6f6vy",
        slippage: "0.05",
        token_in_unit:
          command === "buy"
            ? "416461"
            : "5dac8536653edc12f6f5e1045d8164b9f59998d3bdc300fc928434894e4d4b52",
        token_out_unit:
          command === "buy"
            ? "5dac8536653edc12f6f5e1045d8164b9f59998d3bdc300fc928434894e4d4b52"
            : "416461",
        quantity_decimals_adjusted:
          command === "buy" ? Math.min(quantiy, 10) : Math.min(quantiy, 4_000),
        type: "exact_in",
      },
    );

    const swapReview = await swapReviewPromise;

    const unsignedTx = _.get(swapReview, "data.unsigned_tx_cbor_hex");
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
  };

  useEffect(() => {
    simulateAgentAnalysis();
  }, []); // Run only once when component mounts

  const handleApproveSwap = async () => {
    setIsLoading(true);

    // Simulate swap processing
    await new Promise((resolve) => setTimeout(resolve, 10000));

    setOrderStage("success");
    setIsLoading(false);
  };

  return {
    orderStage,
    progress,
    agentMessages,
    handleApproveSwap,
    isLoading,
  };
};
