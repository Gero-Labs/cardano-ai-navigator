export enum PlanType {
  basic = "basic",
  pro = "pro",
  premium = "premium",
}

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  features: string[];
}

export enum Currency {
  USD = "USD",
  ADA = "ADA",
}
