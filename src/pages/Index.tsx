import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img src={heroBg} alt="JOFA Lingerie" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <h1 className="font-display text-5xl md:text-7xl font-bold text-gold-gradient mb-6 leading-tight">
            La féminité en signature
          </h1>
          <p className="font-body text-lg md:text-xl text-foreground/80 mb-8">
            Lingerie de luxe pensée pour sublimer la femme africaine moderne
          </p>
          <Link to="/boutique">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-widest px-10">
              Découvrir la Collection
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Collections */}
      <section className="container py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "Ensembles", desc: "L'art de l'accord parfait" },
            { title: "Nuisettes", desc: "Élégance nocturne" },
            { title: "Bodys", desc: "Seconde peau" },
          ].map((cat) => (
            <Link
              key={cat.title}
              to="/boutique"
              className="group relative h-64 rounded-lg overflow-hidden bg-secondary border border-border flex items-end p-6 hover:border-primary/50 transition-colors"
            >
              <div>
                <h3 className="font-display text-2xl text-foreground group-hover:text-primary transition-colors">{cat.title}</h3>
                <p className="font-body text-sm text-muted-foreground">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </section>

      {/* Products */}
      <ProductGrid title="Nos Pièces" limit={8} />

      {/* Brand story */}
      <section className="bg-card border-y border-border">
        <div className="container py-20 text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl md:text-4xl text-gold-gradient mb-6">L'Histoire JOFA</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              JOFA célèbre la beauté et la sensualité de la femme africaine à travers des pièces de lingerie
              d'exception. Chaque création mêle savoir-faire artisanal et design contemporain, pour une lingerie
              qui vous ressemble — audacieuse, élégante, inoubliable.
            </p>
            <Link to="/a-propos">
              <Button variant="outline" className="mt-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-body uppercase tracking-widest">
                En savoir plus
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-20 text-center max-w-lg mx-auto">
        <h2 className="font-display text-3xl text-gold-gradient mb-4">Restez Connectée</h2>
        <p className="font-body text-muted-foreground mb-6">
          Inscrivez-vous pour recevoir nos offres exclusives et nouveautés.
        </p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Votre adresse email"
            className="flex-1 h-11 rounded-lg border border-border bg-secondary px-4 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body">
            S'inscrire
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
