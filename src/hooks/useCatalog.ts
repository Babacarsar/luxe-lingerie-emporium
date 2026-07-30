import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
  published: boolean;
}

export function dbProductToMock(p: DbProduct): MockProduct {
  const amount = String(p.price ?? 0);
  const sizes = p.sizes?.length ? p.sizes : ["Unique"];
  return {
    node: {
      id: p.id,
      title: p.title,
      description: p.description || "",
      handle: p.handle,
      productType: p.product_type,
      priceRange: { minVariantPrice: { amount, currencyCode: p.currency || "XOF" } },
      images: {
        edges: (p.images || []).map((url) => ({ node: { url, altText: p.title } })),
      },
      variants: {
        edges: sizes.map((s, i) => ({
          node: {
            id: `${p.id}-${i}`,
            title: s,
            price: { amount, currencyCode: p.currency || "XOF" },
            availableForSale: true,
            selectedOptions: [{ name: "Taille", value: s }],
          },
        })),
      },
      options: [{ name: "Taille", values: sizes }],
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
  return (data as unknown as DbProduct[]).map(dbProductToMock);
}

/** Products from the database (admin-managed) merged with the built-in catalog. */
export function useCatalog(category?: string) {
  const { data: dbItems = [], isLoading } = useQuery({
    queryKey: ["db-products"],
    queryFn: fetchDbProducts,
    staleTime: 30_000,
  });

  const filteredDb =
    !category || category === "all"
      ? dbItems
      : dbItems.filter((p) => p.node.productType === category);

  return { products: [...filteredDb, ...getMockProducts(category)], isLoading };
}

export function useCatalogProduct(handle?: string) {
  const { data: dbItems = [], isLoading } = useQuery({
    queryKey: ["db-products"],
    queryFn: fetchDbProducts,
    staleTime: 30_000,
  });

  const all = [...dbItems, ...mockProducts];
  const found = handle ? all.find((p) => p.node.handle === handle) : undefined;
  return { product: found?.node ?? null, isLoading };
}
