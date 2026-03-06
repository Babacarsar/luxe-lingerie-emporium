import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const formatPrice = (amount: string) =>
  new Intl.NumberFormat("fr-SN", { style: "currency", currency: "XOF", minimumFractionDigits: 0 }).format(parseFloat(amount));

const Cart = () => {
  const { items, isLoading, updateQuantity, removeItem } = useCartStore();
  const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price.amount) * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    toast.success("Simulation : commande passée avec succès ! 🎉", { position: "top-center" });
  };

  return (
    <div className="min-h-screen">
      <div className="container pt-12 pb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/boutique" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm font-body mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Continuer mes achats
          </Link>
          <h1 className="font-display text-4xl md:text-5xl text-gold-gradient mb-2">Mon Panier</h1>
          <p className="font-body text-muted-foreground">{totalItems} article{totalItems !== 1 ? "s" : ""}</p>
        </motion.div>
      </div>

      <div className="container pb-20">
        {items.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <p className="font-display text-2xl text-foreground mb-2">Votre panier est vide</p>
            <p className="text-muted-foreground font-body mb-8">Découvrez notre collection pour trouver votre bonheur</p>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/boutique">Voir la boutique</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <motion.div
                  key={item.variantId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex gap-4 md:gap-6 p-4 md:p-6 rounded-xl bg-card border border-border"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img src={item.product.node.images.edges[0].node.url} alt={item.product.node.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base md:text-lg truncate">{item.product.node.title}</h3>
                    <p className="text-xs text-muted-foreground font-body mt-1">{item.selectedOptions.map((o) => o.value).join(" • ")}</p>
                    <p className="text-primary font-bold font-body mt-2">{formatPrice(item.price.amount)}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-body text-sm">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive ml-auto" onClick={() => removeItem(item.variantId)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-28 h-fit"
            >
              <div className="rounded-xl bg-card border border-border p-6 space-y-6">
                <h2 className="font-display text-xl">Récapitulatif</h2>
                <div className="space-y-3 font-body text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total</span>
                    <span>{formatPrice(String(totalPrice))}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span className="text-primary text-xs">Calculée au checkout</span>
                  </div>
                  <div className="gold-line my-4" />
                  <div className="flex justify-between text-lg font-bold">
                    <span className="font-display">Total</span>
                    <span className="text-primary">{formatPrice(String(totalPrice))}</span>
                  </div>
                </div>
                <Button onClick={handleCheckout} className="w-full bg-primary text-primary-foreground hover:bg-primary/90" size="lg" disabled={isLoading}>
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><ExternalLink className="w-4 h-4 mr-2" /> Passer la commande</>}
                </Button>
                <p className="text-[10px] text-muted-foreground text-center font-body">Paiement sécurisé via Shopify</p>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
