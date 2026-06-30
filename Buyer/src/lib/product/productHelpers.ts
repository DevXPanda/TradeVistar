import { Product, MOCK_PRODUCTS } from "@/data/products";
import { MEDICAL_PRODUCTS, AUTOMOTIVE_PRODUCTS } from "@/components/sections/IndustryCollections";

export function getAllProducts(): Product[] {
  // Combine all product lists used in the store
  return [...MOCK_PRODUCTS, ...MEDICAL_PRODUCTS, ...AUTOMOTIVE_PRODUCTS];
}

export function getProductSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric characters with hyphens
    .replace(/(^-|-$)/g, "");   // trim leading/trailing hyphens
}

export function getProductBySlug(slug: string): Product | undefined {
  const all = getAllProducts();
  
  // 1. Try exact case-insensitive match on product ID (e.g. PROD-1001)
  const byId = all.find((p) => p.id.toLowerCase() === slug.toLowerCase());
  if (byId) return byId;

  // 2. Try match on slugified name
  const bySlug = all.find((p) => getProductSlug(p.name) === slug);
  if (bySlug) return bySlug;

  // 3. Fallback: try matching part of name or ID
  const partial = all.find(
    (p) =>
      p.id.toLowerCase().includes(slug.toLowerCase()) ||
      getProductSlug(p.name).includes(slug.toLowerCase())
  );
  return partial;
}
