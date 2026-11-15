import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCatalog, useCatalogProduct } from "@/hooks/useCatalog";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus, Heart } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const formatPrice = (amount: string) =>
  new Intl.NumberFormat("fr-SN", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(parseFloat(amount));

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const isFavorite = useWishlistStore((s) => (handle ? s.handles.includes(handle) : false));
  const toggleFavorite = useWishlistStore((s) => s.toggle);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const { product } = useCatalogProduct(handle);
  const { products: catalog } = useCatalog();

  // Nouveau produit (clic sur « Vous aimerez aussi ») : on repart de zéro, en haut de page.
  useEffect(() => {
    setSelectedVariantIdx(0);
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo({ top: 0 });
  }, [handle]);

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-body">Produit introuvable.</p>
        <Link to="/boutique">
          <Button variant="outline" className="mt-4">Retour à la boutique</Button>
        </Link>
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;
  const hasMany = images.length > 1;
  const priceVaries = new Set(variants.map((v) => v.node.price.amount)).size > 1;

  const showImage = (i: number) => setSelectedImage((i + images.length) % images.length);
  const prevImage = () => showImage(selectedImage - 1);
  const nextImage = () => showImage(selectedImage + 1);

  // Même catégorie d'abord, puis le reste de la boutique.
  const others = catalog.filter((p) => p.node.handle !== product.handle);
  const related = [
    ...others.filter((p) => p.node.productType === product.productType),
    ...others.filter((p) => p.node.productType !== product.productType),
  ].slice(0, 8);

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product } as any,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${quantity} article${quantity > 1 ? "s" : ""} ajouté${quantity > 1 ? "s" : ""} au panier`, { position: "top-center" });
  };

  const handleFavorite = () => {
    const added = toggleFavorite(product.handle);
    toast.success(added ? "Ajouté à vos favoris" : "Retiré de vos favoris", { position: "top-center" });
  };

  return (
    <div className="container py-8">
      <Link to="/boutique" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary font-body mb-6">
        <ChevronLeft className="w-4 h-4" /> Retour
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images : miniatures verticales à gauche (ordinateur), en ligne dessous (mobile) */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col-reverse md:flex-row gap-3">
          {hasMany && (
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-y-auto md:max-h-[640px] md:w-20 flex-shrink-0">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  aria-label={`Photo ${i + 1}`}
                  className={`w-16 h-20 md:w-20 md:h-24 rounded overflow-hidden border-2 flex-shrink-0 transition-colors ${
                    i === selectedImage ? "border-primary" : "border-border hover:border-primary/50"
                  }`}
                >
                  <img src={img.node.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div
            className="relative flex-1 aspect-[3/4] rounded-lg overflow-hidden bg-secondary border border-border"
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchStartX.current === null || !hasMany) return;
              const dx = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(dx) > 40) (dx < 0 ? nextImage : prevImage)();
              touchStartX.current = null;
            }}
          >
            {images[selectedImage]?.node ? (
              <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Pas d'image</div>
            )}

            {hasMany && (
              <>
                <button
                  onClick={prevImage}
                  aria-label="Photo précédente"
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  aria-label="Photo suivante"
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/70 backdrop-blur flex items-center justify-center text-foreground hover:bg-background transition"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="absolute bottom-3 right-3 rounded-full bg-background/70 px-2.5 py-1 text-xs font-body">
                  {selectedImage + 1} / {images.length}
                </span>
              </>
            )}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            <h1 className="font-display text-3xl md:text-4xl">{product.title}</h1>
            <button
              onClick={handleFavorite}
              aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
              className="h-11 w-11 flex-shrink-0 rounded-full border border-border flex items-center justify-center hover:border-primary transition-colors"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-foreground/70"}`} />
            </button>
          </div>
          <p className="font-display text-2xl text-primary font-bold">
            {selectedVariant ? formatPrice(selectedVariant.price.amount) : ""}
          </p>

          {/* Options : le prix suit la taille / le grammage choisi */}
          {product.options?.map((option) => (
            <div key={option.name}>
              <label className="font-body text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 block">{option.name}</label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((val) => {
                  const varIdx = variants.findIndex((v) => v.node.selectedOptions.some((o) => o.name === option.name && o.value === val));
                  const idx = varIdx >= 0 ? varIdx : 0;
                  const variantPrice = variants[idx]?.node.price.amount;
                  return (
                    <button
                      key={val}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-4 py-2 text-sm font-body rounded border transition-colors ${
                        idx === selectedVariantIdx
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {val}
                      {priceVaries && variantPrice && (
                        <span className="block text-[11px] opacity-80">{formatPrice(variantPrice)}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Quantité */}
          <div>
            <label className="font-body text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 block">Quantité</label>
            <div className="inline-flex items-center rounded border border-border">
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuer la quantité">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center font-body">{quantity}</span>
              <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setQuantity((q) => Math.min(99, q + 1))} aria-label="Augmenter la quantité">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button onClick={handleAdd} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            <ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier
            {selectedVariant && quantity > 1 && (
              <span className="ml-2 opacity-80">· {formatPrice(String(parseFloat(selectedVariant.price.amount) * quantity))}</span>
            )}
          </Button>

          <div className="pt-4 border-t border-border">
            <h3 className="font-display text-lg mb-2">Description</h3>
            <p className="font-body text-muted-foreground leading-relaxed text-sm">{product.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Suite logique : les autres articles */}
      {related.length > 0 && (
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-display text-3xl md:text-4xl text-gold-gradient">Vous aimerez aussi</h2>
            <Link to={`/boutique?cat=${product.productType}`} className="font-body text-xs uppercase tracking-widest text-primary hover:underline">
              Tout voir
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {related.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Avis sur ce produit */}
      <div className="mt-20 pt-12 border-t border-border">
        <Reviews productHandle={product.handle} productTitle={product.title} title="Avis sur ce produit" />
      </div>
    </div>
  );
};

export default ProductDetail;
