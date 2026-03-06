import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductGridProps {
  title?: string;
  limit?: number;
  searchQuery?: string;
}

export const ProductGrid = ({ title, limit = 20, searchQuery }: ProductGridProps) => {
  const { data: products, isLoading, error } = useShopifyProducts(limit, searchQuery);

  return (
    <section className="container py-16 md:py-24">
      {title && (
        <div className="text-center mb-14">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Sélection</p>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient">{title}</h2>
        </div>
      )}
      {isLoading ? (
        <div className="flex justify-center py-24">
          <Loader2 className="w-6 h-6 animate-spin text-primary/50" />
        </div>
      ) : error ? (
        <p className="text-center text-muted-foreground font-body text-sm">Erreur de chargement des produits.</p>
      ) : !products || products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-muted-foreground font-body text-base">Aucun produit trouvé.</p>
          <p className="text-muted-foreground font-body text-sm mt-3 opacity-60">
            Dites-moi dans le chat quel produit vous souhaitez créer avec son prix.
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
        >
          {products.map((product) => (
            <motion.div
              key={product.node.id}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
};
