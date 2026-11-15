import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { parseSize, minPrice } from "@/lib/sizes";
import { getMockProducts, mockProducts, type MockProduct } from "@/data/mockProducts";

export interface DbProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  price: number;
  currency: string;
  product_type: string;
  sizes: string[];
  images: string[];
  collections: string[];
  published: boolean;
}

export function dbProductToMock(p: DbProduct): MockProduct {
  const base = String(p.price ?? 0);
  const currencyCode = p.currency || "XOF";
  const sizes = (p.sizes?.length ? p.sizes : ["Unique"]).map((s) => parseSize(s, base));
  return {
    node: {
      id: p.id,
      title: p.title,
      description: p.description || "",
      handle: p.handle,
      productType: p.product_type,
      collections: p.collections || [],
      priceRange: { minVariantPrice: { amount: minPrice(sizes.map((s) => s.price), base), currencyCode } },
      images: {
        edges: (p.images || []).map((url) => ({ node: { url, altText: p.title } })),
      },
      variants: {
        edges: sizes.map((s, i) => ({
          node: {
            id: `${p.id}-${i}`,
            title: s.label,
            price: { amount: s.price, currencyCode },
            availableForSale: true,
            selectedOptions: [{ name: "Taille", value: s.label }],
          },
        })),
      },
      options: [{ name: "Taille", values: sizes.map((s) => s.label) }],
    },
  };
}

/**
 * Si l'admin n'a pas saisi de prix par taille (ex. "100g=16000"), on reprend ceux du
 * catalogue intégré pour le même produit (Thiouraye : prix selon le grammage).
 */
function withCatalogPrices(product: MockProduct, raw: DbProduct): MockProduct {
  if ((raw.sizes || []).some((s) => s.includes("="))) return product;
  const ref = mockProducts.find((m) => m.node.handle === product.node.handle);
  if (!ref) return product;
  // Même proportion que le catalogue, appliquée au prix de base saisi dans l'admin.
  const refBase = Number(ref.node.priceRange.minVariantPrice.amount);
  const base = Number(raw.price);
  const priceOf = new Map(ref.node.variants.edges.map((v) => [v.node.title, Number(v.node.price.amount)]));
  const edges = product.node.variants.edges.map((v) => {
    const refPrice = priceOf.get(v.node.title);
    if (!refPrice || !refBase || !base) return v;
    const amount = String(Math.round((base * refPrice) / refBase / 500) * 500);
    return { node: { ...v.node, price: { ...v.node.price, amount } } };
  });
  const min = minPrice(edges.map((v) => v.node.price.amount), product.node.priceRange.minVariantPrice.amount);
  return {
    node: {
      ...product.node,
      variants: { edges },
      priceRange: { minVariantPrice: { ...product.node.priceRange.minVariantPrice, amount: min } },
    },
  };
}

async function fetchDbProducts(): Promise<MockProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data as unknown as DbProduct[]).map((p) => withCatalogPrices(dbProductToMock(p), p));
}

/** Products from the database (admin-managed) merged with the built-in catalog. */
export function useCatalog(category?: string, collection?: string) {
  const { data: dbItems = [], isLoading } = useQuery({
    queryKey: ["db-products"],
    queryFn: fetchDbProducts,
    staleTime: 30_000,
  });

  const dbHandles = new Set(dbItems.map((p) => p.node.handle));

  let db = dbItems;
  if (category && category !== "all") {
    db = db.filter((p) => p.node.productType === category);
  }
  if (collection) {
    db = db.filter((p) => (p.node.collections || []).includes(collection));
    // Mock products have no collections, so a collection view shows DB items only.
    return { products: db, isLoading };
  }

  const mocks = getMockProducts(category).filter((p) => !dbHandles.has(p.node.handle));
  return { products: [...db, ...mocks], isLoading };
}

export function useCatalogProduct(handle?: string) {
  const { data: dbItems = [], isLoading } = useQuery({
    queryKey: ["db-products"],
    queryFn: fetchDbProducts,
    staleTime: 30_000,
  });

  const dbHandles = new Set(dbItems.map((p) => p.node.handle));
  const all = [...dbItems, ...mockProducts.filter((p) => !dbHandles.has(p.node.handle))];
  const found = handle ? all.find((p) => p.node.handle === handle) : undefined;
  return { product: found?.node ?? null, isLoading };
}
