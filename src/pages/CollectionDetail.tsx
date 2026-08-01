import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ProductGrid } from "@/components/ProductGrid";
import { useCollections } from "@/hooks/useCollections";

const CollectionDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { collections, isLoading } = useCollections();
  const collection = collections.find((c) => c.handle === handle);

  if (!isLoading && !collection) {
    return (
      <div className="container py-32 text-center">
        <h1 className="font-display text-4xl text-gold-gradient mb-4">Collection introuvable</h1>
        <Link to="/collections" className="font-body text-sm text-primary underline">
          Voir toutes les collections
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container pt-16 pb-4 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Collection</p>
          <h1 className="font-display text-5xl md:text-7xl text-gold-gradient">{collection?.title ?? "…"}</h1>
          {collection?.description && (
            <p className="font-body text-muted-foreground mt-4 font-light max-w-2xl mx-auto">{collection.description}</p>
          )}
        </motion.div>
      </div>

      {handle && <ProductGrid limit={60} collection={handle} />}
    </div>
  );
};

export default CollectionDetail;
