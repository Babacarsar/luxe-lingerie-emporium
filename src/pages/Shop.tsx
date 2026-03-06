import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "@/components/ProductGrid";
import { motion } from "framer-motion";

const categories = [
  { id: "all", label: "Tout" },
  { id: "lingerie-sexy", label: "Lingerie Sexy" },
  { id: "robe", label: "Robes" },
  { id: "pagne", label: "Pagnes" },
  { id: "thiouraye", label: "Thiouraye" },
  { id: "binbin", label: "Bin Bin" },
  { id: "binbin-epaisses", label: "Bin Bin Épaisses" },
  { id: "binbin-fins", label: "Bin Bin Fins" },
];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "all";

  const handleCatChange = (cat: string) => {
    if (cat === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ cat });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container pt-16 pb-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Collection</p>
          <h1 className="font-display text-5xl md:text-7xl text-gold-gradient">Boutique</h1>
          <p className="font-body text-muted-foreground mt-4 font-light">Découvrez notre collection de lingerie de luxe</p>
        </motion.div>
      </div>

      {/* Category filters */}
      <div className="container pb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCatChange(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-body uppercase tracking-[0.15em] border transition-all duration-300 ${
                activeCat === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>
      </div>

      <ProductGrid limit={40} category={activeCat} />
    </div>
  );
};

export default Shop;
