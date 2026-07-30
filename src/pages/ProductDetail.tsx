import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCatalogProduct } from "@/hooks/useCatalog";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore((s) => s.addItem);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = handle ? getMockProductByHandle(handle) : null;

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

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product } as any,
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Ajouté au panier", { position: "top-center" });
  };

  const formatPrice = (amount: string) =>
    new Intl.NumberFormat("fr-SN", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(parseFloat(amount));

  return (
    <div className="container py-8">
      <Link to="/boutique" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary font-body mb-6">
        <ChevronLeft className="w-4 h-4" /> Retour
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary border border-border">
            {images[selectedImage]?.node ? (
              <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} loading="lazy" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Pas d'image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 ${i === selectedImage ? "border-primary" : "border-border"}`}
                >
                  <img src={img.node.url} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
          <h1 className="font-display text-3xl md:text-4xl">{product.title}</h1>
          <p className="font-display text-2xl text-primary font-bold">
            {selectedVariant ? formatPrice(selectedVariant.price.amount) : ""}
          </p>

          {/* Options */}
          {product.options?.map((option) => (
            <div key={option.name}>
              <label className="font-body text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 block">{option.name}</label>
              <div className="flex flex-wrap gap-2">
                {option.values.map((val, idx) => {
                  const varIdx = variants.findIndex((v) => v.node.selectedOptions.some((o) => o.name === option.name && o.value === val));
                  return (
                    <button
                      key={val}
                      onClick={() => setSelectedVariantIdx(varIdx >= 0 ? varIdx : 0)}
                      className={`px-4 py-2 text-sm font-body rounded border transition-colors ${
                        (varIdx >= 0 ? varIdx : 0) === selectedVariantIdx
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <Button onClick={handleAdd} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
            <ShoppingCart className="w-5 h-5 mr-2" /> Ajouter au panier
          </Button>

          <div className="pt-4 border-t border-border">
            <h3 className="font-display text-lg mb-2">Description</h3>
            <p className="font-body text-muted-foreground leading-relaxed text-sm">{product.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
