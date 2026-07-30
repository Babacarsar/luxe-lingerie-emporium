import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import {
  PRODUCTS_QUERY,
  storefront,
  summarizeProduct,
  type ProductNode,
} from "../storefront";

export default defineTool({
  name: "search_products",
  title: "Search products",
  description:
    "Search the JOFA public product catalog (lingerie, robes, bin bin, pagne, thiouraye) by keyword and return matching products with prices and links.",
  inputSchema: {
    query: z
      .string()
      .trim()
      .optional()
      .describe("Keywords to search for, e.g. 'lingerie dentelle' or 'binbin'. Omit to list featured products."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(25)
      .optional()
      .describe("Maximum number of products to return (default 10)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ query, limit }) => {
    try {
      const data = await storefront<{ products: { edges: Array<{ node: ProductNode }> } }>(
        PRODUCTS_QUERY,
        { first: limit ?? 10, query: query || null },
      );
      const products = data.products.edges.map((edge) => summarizeProduct(edge.node));
      return {
        content: [{ type: "text", text: JSON.stringify(products, null, 2) }],
        structuredContent: { products },
      };
    } catch (error) {
      throw new ToolError(error instanceof Error ? error.message : "Product search failed");
    }
  },
});
