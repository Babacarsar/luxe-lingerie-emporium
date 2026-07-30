// Public Shopify Storefront access used by the MCP tools.
// The storefront token is a publishable key (same one the website uses).
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_DOMAIN = "lingerie-luxe-xxl-0bfy4.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "6905c1ce847b7be320e8278e046bbfba";

export const SITE_URL = "https://luxe-lingerie-emporium.lovable.app";

export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify storefront request failed (HTTP ${response.status})`);
  }

  const payload = (await response.json()) as {
    data?: T;
    errors?: Array<{ message: string }>;
  };

  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join(", "));
  }
  if (!payload.data) throw new Error("Shopify storefront returned no data");
  return payload.data;
}

export const PRODUCTS_QUERY = `
  query Products($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          handle
          description
          productType
          tags
          availableForSale
          priceRange { minVariantPrice { amount currencyCode } }
          images(first: 1) { edges { node { url altText } } }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query Product($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      productType
      tags
      availableForSale
      priceRange { minVariantPrice { amount currencyCode } }
      images(first: 8) { edges { node { url altText } } }
      options { name values }
      variants(first: 50) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges { node { id title handle description } }
    }
  }
`;

export type ProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  productType: string | null;
  tags: string[];
  availableForSale: boolean;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  options?: Array<{ name: string; values: string[] }>;
  variants?: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
};

export function summarizeProduct(node: ProductNode) {
  return {
    title: node.title,
    handle: node.handle,
    url: `${SITE_URL}/product/${node.handle}`,
    price: `${node.priceRange.minVariantPrice.amount} ${node.priceRange.minVariantPrice.currencyCode}`,
    productType: node.productType ?? undefined,
    tags: node.tags,
    availableForSale: node.availableForSale,
    image: node.images.edges[0]?.node.url,
  };
}
