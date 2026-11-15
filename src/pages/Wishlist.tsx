import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useCatalog } from "@/hooks/useCatalog";
import { useWishlistStore } from "@/stores/wishlistStore";

const Wishlist = () => {
  const handles = useWishlistStore((s) => s.handles);
  const { products } = useCatalog();
  // Ordre d'ajout conservé ; un produit retiré du catalogue disparaît simplement.
  const favorites = handles
    .map((h) => products.find((p) => p.node.handle === h))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="min-h-screen container py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-display text-4xl md:text-5xl text-gold-gradient mb-2">Mes favoris</h1>
        <p className="font-body text-muted-foreground">
          {favorites.length} article{favorites.length !== 1 ? "s" : ""} dans votre liste d'envies
        </p>
      </motion.div>

      {favorites.length === 0 ? (
        <div className="text-center py-24">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <p className="font-display text-2xl mb-2">Votre liste d'envies est vide</p>
          <p className="text-muted-foreground font-body mb-8">Touchez le ❤️ sur un article pour le retrouver ici.</p>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/boutique">Voir la boutique</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {favorites.map((p) => (
            <ProductCard key={p.node.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
