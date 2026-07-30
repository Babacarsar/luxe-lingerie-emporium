import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { COLLECTIONS_QUERY, SITE_URL, storefront } from "../storefront";

type CollectionNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
};

const SITE_CATEGORIES = [
  { label: "Lingerie Sexy", url: `${SITE_URL}/boutique?cat=lingerie-sexy` },
  { label: "Robes", url: `${SITE_URL}/boutique?cat=robe` },
  { label: "Bin Bin", url: `${SITE_URL}/boutique?cat=binbin` },
  { label: "Pagne", url: `${SITE_URL}/boutique?cat=pagne` },
  { label: "Thiouraye", url: `${SITE_URL}/boutique?cat=thiouraye` },
];

export default defineTool({
  name: "list_categories",
  title: "List categories",
  description:
    "List the public JOFA shop categories and Shopify collections, with links to browse each one on the storefront.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async () => {
    let collections: Array<{ title: string; handle: string; description: string }> = [];
    try {
      const data = await storefront<{ collections: { edges: Array<{ node: CollectionNode }> } }>(
        COLLECTIONS_QUERY,
        { first: 25 },
      );
      collections = data.collections.edges.map(({ node }) => ({
        title: node.title,
        handle: node.handle,
        description: node.description,
      }));
    } catch (error) {
      throw new ToolError(error instanceof Error ? error.message : "Collection lookup failed");
    }

    const result = { siteCategories: SITE_CATEGORIES, collections };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
