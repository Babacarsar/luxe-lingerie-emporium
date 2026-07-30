import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  PRODUCT_BY_HANDLE_QUERY,
  SITE_URL,
  storefront,
  type ProductNode,
} from "../storefront";

export default defineTool({
  name: "get_product",
  title: "Get product details",
  description:
    "Get full public details for one JOFA product by its handle: description, price, images, available sizes and variants.",
  inputSchema: {
    handle: z
      .string()
      .trim()
      .describe("Product handle (slug), as returned by search_products, e.g. 'ensemble-sophie'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ handle }) => {
    let product: ProductNode | null;
    try {
      const data = await storefront<{ productByHandle: ProductNode | null }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle },
      );
      product = data.productByHandle;
    } catch (error) {
      throw new ToolError(error instanceof Error ? error.message : "Product lookup failed");
    }

    if (!product) {
      return {
        content: [{ type: "text", text: `No product found with handle "${handle}".` }],
        isError: true,
      };
    }

    const details = {
      title: product.title,
      handle: product.handle,
      url: `${SITE_URL}/product/${product.handle}`,
      description: product.description,
      productType: product.productType ?? undefined,
      tags: product.tags,
      availableForSale: product.availableForSale,
      priceFrom: `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`,
      images: product.images.edges.map((edge) => edge.node.url),
      options: product.options ?? [],
      variants:
        product.variants?.edges.map((edge) => ({
          title: edge.node.title,
          price: `${edge.node.price.amount} ${edge.node.price.currencyCode}`,
          availableForSale: edge.node.availableForSale,
          options: edge.node.selectedOptions,
        })) ?? [],
    };

    return {
      content: [{ type: "text", text: JSON.stringify(details, null, 2) }],
      structuredContent: { product: details },
    };
  },
});
