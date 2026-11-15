/**
 * Une taille peut porter son propre prix : "100g=16000".
 * Sans "=prix", la taille reprend le prix de base du produit.
 * Utilisé pour le Thiouraye (prix selon le grammage).
 */
export function parseSize(raw: string, basePrice: string | number): { label: string; price: string } {
  const [label, price] = raw.split("=").map((s) => s.trim());
  const parsed = price ? Number(price.replace(/\s/g, "")) : NaN;
  return { label, price: String(Number.isFinite(parsed) && parsed > 0 ? parsed : basePrice) };
}

export function minPrice(prices: string[], fallback: string | number): string {
  const nums = prices.map(Number).filter((n) => Number.isFinite(n));
  return nums.length ? String(Math.min(...nums)) : String(fallback);
}
