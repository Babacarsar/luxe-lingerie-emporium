import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { storefrontApiRequest, PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const addItem = useCartStore(s => s.addItem);
  const isCartLoading = useCartStore(s => s.isLoading);
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
      return data?.data?.productByHandle;
    },
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground font-body">Produit introuvable.</p>
        <Link to="/boutique"><Button variant="outline" className="mt-4">Retour à la boutique</Button></Link>
      </div>
    );
  }

  const images = product.images.edges;
  const variants = product.variants.edges;
  const selectedVariant = variants[selectedVariantIdx]?.node;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Ajouté au panier", { position: "top-center" });
  };

  return (
    <div className="container py-8">
      <Link to="/boutique" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary font-body mb-6">
        <ChevronLeft className="w-4 h-4" /> Retour
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-[3/4] rounded-lg overflow-hidden bg-secondary border border-border">
            {images[selectedImage]?.node ? (
              <img src={images[selectedImage].node.url} alt={images[selectedImage].node.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">Pas d'image</div>
            )}
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((img: { node: { url: string; altText: string | null } }, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-16 h-16 rounded overflow-hidden border-2 flex-shrink-0 ${i === selectedImage ? 'border-primary' : 'border-border'}`}
                >
                  <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          <h1 className="font-display text-3xl md:text-4xl">{product.title}</h1>
          <p className="font-display text-2xl text-primary font-bold">
            {selectedVariant ? new Intl.NumberFormat('fr-SN', { style: 'currency', currency: 'XOF', minimumFractionDigits: 0 }).format(parseFloat(selectedVariant.price.amount)) : ''}
          </p>

          {/* Options */}
          {product.options?.map((option: { name: string; values: string[] }) => (
            <div key={option.name}>
              <label className="font-body text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2 block">{option.name}</label>
              <div className="flex flex-wrap gap-2">
                {variants.map((v: { node: { id: string; title: string; selectedOptions: Array<{ name: string; value: string }> } }, idx: number) => {
                  const optVal = v.node.selectedOptions.find(o => o.name === option.name)?.value;
                  // Avoid duplicates
                  const isDupe = variants.findIndex((vv: { node: { selectedOptions: Array<{ name: string; value: string }> } }) =>
                    vv.node.selectedOptions.find(o => o.name === option.name)?.value === optVal
                  ) !== idx;
                  if (isDupe) return null;
                  return (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantIdx(idx)}
                      className={`px-4 py-2 text-sm font-body rounded border transition-colors ${
                        idx === selectedVariantIdx ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      {optVal}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          <Button
            onClick={handleAdd}
            disabled={isCartLoading || !selectedVariant?.availableForSale}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            size="lg"
          >
            {isCartLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ShoppingCart className="w-5 h-5 mr-2" />Ajouter au panier</>}
          </Button>

          {selectedVariant && !selectedVariant.availableForSale && (
            <p className="text-sm text-accent font-body">Rupture de stock</p>
          )}

          <div className="pt-4 border-t border-border">
            <h3 className="font-display text-lg mb-2">Description</h3>
            <p className="font-body text-muted-foreground leading-relaxed text-sm">{product.description || "Pas de description disponible."}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
