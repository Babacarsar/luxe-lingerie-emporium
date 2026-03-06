import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import type { MockProduct } from "@/data/mockProducts";

interface ProductCardProps {
  product: MockProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  const image = node.images.edges[0]?.node;
  const variant = node.variants.edges[0]?.node;
  const price = node.priceRange.minVariantPrice;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product: product as any,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success("Ajouté au panier", { position: "top-center" });
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="relative overflow-hidden bg-card aspect-[3/4] hover-lift">
        {image ? (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-secondary flex items-center justify-center">
            <span className="text-muted-foreground font-body text-xs uppercase tracking-widest">Image non disponible</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <Button
            onClick={handleAddToCart}
            disabled={!variant?.availableForSale}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-none font-body text-xs uppercase tracking-[0.2em] py-5"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />Ajouter
          </Button>
        </div>
      </div>
      <div className="mt-4 space-y-1.5">
        <h3 className="font-display text-lg group-hover:text-primary transition-colors duration-300">{node.title}</h3>
        <p className="font-body text-sm text-primary tracking-wider">
          {new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(parseFloat(price.amount))}
        </p>
      </div>
    </Link>
  );
};
