import { ProductGrid } from "@/components/ProductGrid";
import { motion } from "framer-motion";

const Shop = () => (
  <div className="min-h-screen">
    <div className="container pt-16 pb-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Collection</p>
        <h1 className="font-display text-5xl md:text-7xl text-gold-gradient">Boutique</h1>
        <p className="font-body text-muted-foreground mt-4 font-light">
          Découvrez notre collection de lingerie de luxe
        </p>
      </motion.div>
    </div>
    <ProductGrid limit={40} />
  </div>
);

export default Shop;
