export interface MOQTier {
  minQty: number;
  maxQty?: number;
  price: number;
  discount: number;
}

export function getMOQTiers(moq: number, priceMin: number, priceMax: number): MOQTier[] {
  const tier1Min = moq;
  const tier1Max = Math.floor(moq * 1.5);
  
  const tier2Min = tier1Max + 1;
  const tier2Max = moq * 3;
  
  const tier3Min = tier2Max + 1;
  
  // Calculate prices based on tier discounts matching mockup exactly
  const price1 = priceMax;
  const price2 = Math.round(priceMax * 0.80); // 20% off
  const price3 = Math.round(priceMax * 0.67); // 33% off
  
  // Calculate discount percentages relative to priceMax
  const discount1 = 5;
  const discount2 = 20;
  const discount3 = 33;

  return [
    { minQty: tier1Min, maxQty: tier1Max, price: price1, discount: discount1 },
    { minQty: tier2Min, maxQty: tier2Max, price: price2, discount: discount2 },
    { minQty: tier3Min, price: price3, discount: discount3 }
  ];
}

export function getPriceForQty(qty: number, tiers: MOQTier[]): number {
  for (const tier of tiers) {
    if (qty >= tier.minQty && (!tier.maxQty || qty <= tier.maxQty)) {
      return tier.price;
    }
  }
  // Fallback to lowest price if above all tiers
  return tiers[tiers.length - 1].price;
}
