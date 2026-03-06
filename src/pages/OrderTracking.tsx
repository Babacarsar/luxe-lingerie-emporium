import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle2, Clock, MapPin } from "lucide-react";

interface SimulatedOrder {
  id: string;
  date: string;
  status: "processing" | "shipped" | "in_transit" | "delivered";
  items: { name: string; qty: number; price: string }[];
  total: string;
  tracking: string;
  estimatedDelivery: string;
}

const fakeOrders: Record<string, SimulatedOrder> = {
  "JOFA-2024-001": {
    id: "JOFA-2024-001",
    date: "28 Février 2026",
    status: "in_transit",
    items: [
      { name: "Ensemble Lingerie Dentelle Noire", qty: 1, price: "15 000 FCFA" },
      { name: "Bin Bin Dorées Épaisses", qty: 2, price: "5 000 FCFA" },
    ],
    total: "25 000 FCFA",
    tracking: "SN-TRK-88421",
    estimatedDelivery: "8 Mars 2026",
  },
  "JOFA-2024-002": {
    id: "JOFA-2024-002",
    date: "1 Mars 2026",
    status: "processing",
    items: [{ name: "Thiouraye Premium - Oud Royal", qty: 1, price: "12 000 FCFA" }],
    total: "12 000 FCFA",
    tracking: "",
    estimatedDelivery: "10 Mars 2026",
  },
  "JOFA-2024-003": {
    id: "JOFA-2024-003",
    date: "20 Février 2026",
    status: "delivered",
    items: [
      { name: "Robe Wax Élégance", qty: 1, price: "25 000 FCFA" },
      { name: "Pagne Traditionnel Premium", qty: 1, price: "18 000 FCFA" },
    ],
    total: "43 000 FCFA",
    tracking: "SN-TRK-77310",
    estimatedDelivery: "25 Février 2026",
  },
};

const statusSteps = [
  { key: "processing", label: "En préparation", icon: Clock },
  { key: "shipped", label: "Expédiée", icon: Package },
  { key: "in_transit", label: "En transit", icon: Truck },
  { key: "delivered", label: "Livrée", icon: CheckCircle2 },
];

const statusIndex = { processing: 0, shipped: 1, in_transit: 2, delivered: 3 };

const OrderTracking = () => {
  const [query, setQuery] = useState("");
  const [order, setOrder] = useState<SimulatedOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    setOrder(fakeOrders[query.trim().toUpperCase()] || null);
  };

  const currentStep = order ? statusIndex[order.status] : -1;

  return (
    <div className="min-h-screen">
      <div className="container pt-16 pb-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Suivi</p>
          <h1 className="font-display text-4xl md:text-6xl text-gold-gradient">Suivi de Commande</h1>
          <p className="font-body text-muted-foreground mt-4 font-light max-w-md mx-auto">
            Entrez votre numéro de commande pour suivre son avancement
          </p>
        </motion.div>
      </div>

      <div className="container max-w-2xl pb-20">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex gap-3 mb-4">
          <Input
            placeholder="Ex: JOFA-2024-001"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="font-body bg-card border-border"
          />
          <Button onClick={handleSearch} className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
            <Search className="h-4 w-4 mr-2" /> Rechercher
          </Button>
        </motion.div>
        <p className="text-[10px] text-muted-foreground font-body mb-10 text-center">
          Essayez : JOFA-2024-001, JOFA-2024-002 ou JOFA-2024-003
        </p>

        {searched && !order && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="font-display text-xl">Commande introuvable</p>
            <p className="text-muted-foreground font-body text-sm mt-2">Vérifiez votre numéro de commande et réessayez</p>
          </motion.div>
        )}

        {order && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Status steps */}
            <div className="rounded-xl bg-card border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-body text-xs text-muted-foreground uppercase tracking-wider">Commande</p>
                  <p className="font-display text-lg">{order.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-body text-xs text-muted-foreground">Passée le</p>
                  <p className="font-body text-sm">{order.date}</p>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between relative z-10">
                  {statusSteps.map((step, i) => {
                    const isActive = i <= currentStep;
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex flex-col items-center gap-2 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${isActive ? "bg-primary border-primary text-primary-foreground" : "bg-card border-border text-muted-foreground"}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className={`text-[10px] font-body text-center ${isActive ? "text-primary" : "text-muted-foreground"}`}>{step.label}</span>
                      </div>
                    );
                  })}
                </div>
                {/* Progress line */}
                <div className="absolute top-5 left-[12%] right-[12%] h-0.5 bg-border -z-0">
                  <div className="h-full bg-primary transition-all duration-700" style={{ width: `${(currentStep / 3) * 100}%` }} />
                </div>
              </div>

              {order.tracking && (
                <div className="mt-6 pt-4 border-t border-border flex items-center gap-2 text-sm font-body">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Numéro de suivi :</span>
                  <span className="text-foreground font-medium">{order.tracking}</span>
                </div>
              )}
              <div className="mt-2 flex items-center gap-2 text-sm font-body">
                <Truck className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Livraison estimée :</span>
                <span className="text-foreground font-medium">{order.estimatedDelivery}</span>
              </div>
            </div>

            {/* Order items */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h3 className="font-display text-lg mb-4">Articles commandés</h3>
              <div className="space-y-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center font-body text-sm py-2 border-b border-border last:border-0">
                    <div>
                      <p className="text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qté : {item.qty}</p>
                    </div>
                    <span className="text-primary font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="gold-line my-4" />
              <div className="flex justify-between font-display text-lg">
                <span>Total</span>
                <span className="text-primary">{order.total}</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
