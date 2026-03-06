import { useQuery } from '@tanstack/react-query';
import { storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY, type ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(first = 20, searchQuery?: string) {
  return useQuery({
    queryKey: ['shopify-products', first, searchQuery],
    queryFn: async (): Promise<ShopifyProduct[]> => {
      const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first, query: searchQuery || null });
      return data?.data?.products?.edges || [];
    },
  });
}
