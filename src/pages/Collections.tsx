import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCollections } from "@/hooks/useCollections";

const Collections = () => {
  const { collections, isLoading } = useCollections();

  return (
    <div className="min-h-screen">
      <div className="container pt-16 pb-10 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">JOFA</p>
          <h1 className="font-display text-5xl md:text-7xl text-gold-gradient">Collections</h1>
          <p className="font-body text-muted-foreground mt-4 font-light">
            Nos univers, pensés pour sublimer la femme africaine
          </p>
        </motion.div>
      </div>

      <div className="container pb-24">
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div key={i} className="aspect-[3/4] bg-secondary animate-pulse rounded-lg" />
            ))}
          </div>
        ) : collections.length === 0 ? (
          <p className="text-center text-muted-foreground font-body">Aucune collection pour le moment.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {collections.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <Link to={`/collections/${c.handle}`} className="group block relative overflow-hidden rounded-lg aspect-[3/4] bg-card">
                  {c.image ? (
                    <img
                      src={c.image}
                      alt={`Collection ${c.title}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-display text-3xl text-gold-gradient">{c.title}</h2>
                    {c.description && (
                      <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-2">{c.description}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collections;
