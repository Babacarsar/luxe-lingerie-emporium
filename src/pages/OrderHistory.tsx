import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Package, Eye, ChevronRight, User } from "lucide-react";

const fakeHistory = [
  {
    id: "JOFA-2024-003",
    date: "20 Février 2026",
    status: "Livrée",
    statusColor: "text-green-500",
    total: "43 000 FCFA",
    items: ["Robe Wax Élégance", "Pagne Traditionnel Premium"],
    itemCount: 2,
  },
  {
    id: "JOFA-2024-001",
    date: "28 Février 2026",
    status: "En transit",
    statusColor: "text-primary",
    total: "25 000 FCFA",
    items: ["Ensemble Lingerie Dentelle Noire", "Bin Bin Dorées Épaisses"],
    itemCount: 3,
  },
  {
    id: "JOFA-2024-002",
    date: "1 Mars 2026",
    status: "En préparation",
    statusColor: "text-muted-foreground",
    total: "12 000 FCFA",
    items: ["Thiouraye Premium - Oud Royal"],
    itemCount: 1,
  },
];

const OrderHistory = () => (
  <div className="min-h-screen">
    <div className="container pt-16 pb-8 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Mon Compte</p>
        <h1 className="font-display text-4xl md:text-6xl text-gold-gradient">Mes Commandes</h1>
        <p className="font-body text-muted-foreground mt-4 font-light">Historique de vos achats (simulation)</p>
      </motion.div>
    </div>

    <div className="container max-w-3xl pb-20">
      {/* Profile summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl bg-card border border-border p-6 mb-8 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
          <User className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="font-display text-lg">Fatou Diallo</p>
          <p className="text-sm text-muted-foreground font-body">fatou.diallo@email.com • Dakar, Sénégal</p>
        </div>
      </motion.div>

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link to="/suivi-commande" className="rounded-xl bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
          <Package className="h-5 w-5 text-primary mb-2" />
          <p className="font-body text-sm font-medium">Suivre une commande</p>
          <p className="text-[10px] text-muted-foreground font-body">Entrez votre numéro de suivi</p>
        </Link>
        <Link to="/guide-des-tailles" className="rounded-xl bg-card border border-border p-4 hover:border-primary/50 transition-colors group">
          <Eye className="h-5 w-5 text-primary mb-2" />
          <p className="font-body text-sm font-medium">Guide des tailles</p>
          <p className="text-[10px] text-muted-foreground font-body">Trouvez votre taille idéale</p>
        </Link>
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {fakeHistory.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <Link
              to={`/suivi-commande?order=${order.id}`}
              className="block rounded-xl bg-card border border-border p-5 hover:border-primary/40 transition-all group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-display text-base">{order.id}</p>
                  <p className="text-xs text-muted-foreground font-body">{order.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-body font-medium ${order.statusColor}`}>{order.status}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div className="font-body text-xs text-muted-foreground">
                  {order.items.join(" • ")}
                  <span className="ml-2 text-foreground/40">({order.itemCount} article{order.itemCount > 1 ? "s" : ""})</span>
                </div>
                <span className="text-sm font-bold text-primary font-body">{order.total}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default OrderHistory;
