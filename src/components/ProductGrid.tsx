import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  title?: string;
  limit?: number;
  searchQuery?: string;
}

export const ProductGrid = ({ title, limit = 20, searchQuery }: ProductGridProps) => {
  const { data: products, isLoading, error } = useShopifyProducts(limit, searchQuery);

  return (
    <section className="container py-12">
      {title && (
        <h2 className="font-display text-3xl md:text-4xl text-center mb-10 text-gold-gradient">{title}</h2>
      )}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <p className="text-center text-muted-foreground font-body">Erreur de chargement des produits.</p>
      ) : !products || products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground font-body text-lg">Aucun produit trouvé.</p>
          <p className="text-muted-foreground font-body text-sm mt-2">
            Dites-moi dans le chat quel produit vous souhaitez créer avec son prix.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.node.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
