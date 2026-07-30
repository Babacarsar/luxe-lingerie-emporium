import { defineMcp } from "@lovable.dev/mcp-js";
import searchProductsTool from "./tools/search-products";
import getProductTool from "./tools/get-product";
import listCategoriesTool from "./tools/list-categories";

export default defineMcp({
  name: "lingerie-luxe-xxl",
  title: "Lingerie Luxe XXL",
  version: "0.1.0",
  instructions:
    "Public tools for the JOFA (Lingerie Luxe XXL) boutique. Use `search_products` to find items in the catalog, `get_product` for full details of one product by handle, and `list_categories` to browse shop categories and collections. All data is the public storefront catalog.",
  tools: [searchProductsTool, getProductTool, listCategoriesTool],
});
