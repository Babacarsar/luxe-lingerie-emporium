import { ProductCard } from "./ProductCard";
import { motion } from "framer-motion";
import { useCatalog } from "@/hooks/useCatalog";

interface ProductGridProps {
  title?: string;
  limit?: number;
  category?: string;
  searchQuery?: string;
}

export const ProductGrid = ({ title, limit = 20, category, searchQuery }: ProductGridProps) => {
  const { products: all } = useCatalog(category);
  let products = all.slice(0, limit);

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    products = products.filter(p =>
      p.node.title.toLowerCase().includes(q) ||
      p.node.description.toLowerCase().includes(q) ||
      p.node.productType.toLowerCase().includes(q)
    );
  }

  return (
    <section className="container py-16 md:py-24">
      {title && (
        <div className="text-center mb-14">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Sélection</p>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient">{title}</h2>
        </div>
      )}
      {products.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-muted-foreground font-body text-base">Aucun produit trouvé{searchQuery ? ` pour "${searchQuery}"` : " dans cette catégorie"}.</p>
        </div>
      ) : (
        <motion.div
          key={`${category}-${searchQuery}`}
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
