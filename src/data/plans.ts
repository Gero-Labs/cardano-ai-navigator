
import type { Plan } from '../types/trading';

export const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: 10,
    features: ["Automated Rebalancing", "Basic Analytics", "Weekly Reports"],
  },
  {
    id: "pro",
    name: "Pro",
    price: 20,
    features: ["Smart Trading", "Advanced Analytics", "Daily Reports", "Priority Support"],
  },
  {
    id: "premium",
    name: "Premium",
    price: 30,
    features: ["Yield Farming", "Custom Strategies", "Real-time Reports", "24/7 Support", "Early Access"],
  },
];
