import { motion } from "framer-motion";

export const AnnouncementBar = () => (
  <div className="bg-primary/5 border-b border-primary/10 py-2.5 text-center overflow-hidden">
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-[11px] font-body uppercase tracking-[0.35em] text-primary/80"
    >
      Livraison offerte dès 100€ d'achat — Collection 2025
    </motion.p>
  </div>
);
