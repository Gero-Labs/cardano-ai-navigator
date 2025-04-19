import { Currency } from "@/types/plans";

export const formatCurrency = (
  price: number,
  currencyType: Currency,
  adaUsdPrice: number
): string => {
  if (currencyType === Currency.USD) {
    return `$${price.toFixed(2)}`;
  } else {
    // Convert USD to ADA
    const adaAmount = price / adaUsdPrice;
    return `₳${adaAmount.toFixed(2)}`;
  }
};
