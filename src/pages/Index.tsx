import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/ProductGrid";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Heart, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/hero-video.mp4";
import collectionLingerie from "@/assets/collection-lingerie.jpg";
import collectionRobe from "@/assets/collection-robe.jpg";
import collectionPagne from "@/assets/collection-pagne.jpg";
import brandStory from "@/assets/brand-story.jpg";
import editorial1 from "@/assets/editorial-1.jpg";
import editorial2 from "@/assets/editorial-2.jpg";
import thiouraye1 from "@/assets/thiouraye-1.jpg";
import thiouraye2 from "@/assets/thiouraye-2.jpg";
import thiouraye3 from "@/assets/thiouraye-3.jpg";
import thiouraye4 from "@/assets/thiouraye-4.jpg";
import thiouraye5 from "@/assets/thiouraye-5.jpg";
import binBin1 from "@/assets/bin-bin-1.jpg";
import binBin2 from "@/assets/bin-bin-2.jpg";
import binBin3 from "@/assets/bin-bin-3.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const collections = [
  { title: "Lingerie", desc: "Séduction & élégance", image: collectionLingerie },
  { title: "Robes", desc: "Grâce & raffinement", image: collectionRobe },
  { title: "Pagnes", desc: "Tradition & modernité", image: collectionPagne },
];

const values = [
  { icon: Sparkles, title: "Savoir-faire", desc: "Dentelle et soie sélectionnées avec soin" },
  { icon: Heart, title: "Inclusivité", desc: "Du XS au 3XL, pour toutes les femmes" },
  { icon: Shield, title: "Qualité", desc: "Matières premières soigneusement sélectionnées" },
];

const Index = () => {
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center">
        <motion.div style={{ scale: heroScale }} className="absolute inset-0">
          <video 
            src={heroVideo} 
            className="w-full h-full object-cover" 
            autoPlay 
            muted 
            loop 
            playsInline
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-4xl"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-body text-sm md:text-base uppercase tracking-[0.4em] text-primary/80 mb-6"
            >
              Collection 2025
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-light text-gold-gradient mb-8 leading-[0.9]"
            >
              La féminité
              <br />
              <span className="italic">en signature</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-body text-lg md:text-xl text-foreground/60 mb-10 max-w-xl mx-auto font-light"
            >
              Lingerie de luxe pensée pour sublimer la femme sénégalaise moderne
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.8, delay: 0.3 }}>
              <Link to="/boutique">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-[0.3em] text-xs px-12 py-7 rounded-none"
                >
                  Découvrir la Collection
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent"
          />
        </motion.div>
      </section>

      {/* Gold divider */}
      <div className="gold-line w-full" />

      {/* Collections */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">
              Explorer
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-4xl md:text-6xl text-gold-gradient">
              Nos Collections
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {collections.map((cat, i) => (
              <motion.div key={cat.title} variants={fadeUp} transition={{ duration: 0.7 }}>
                <Link
                  to="/boutique"
                  className="group relative block h-[500px] md:h-[600px] overflow-hidden"
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute inset-0 border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <p className="font-body text-xs uppercase tracking-[0.3em] text-primary/70 mb-2">{cat.desc}</p>
                    <h3 className="font-display text-3xl md:text-4xl text-foreground group-hover:text-primary transition-colors duration-500">
                      {cat.title}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-primary/0 group-hover:text-primary transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                      <span className="font-body text-xs uppercase tracking-[0.2em]">Découvrir</span>
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Editorial photos */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6"
          >
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="overflow-hidden">
              <img src={editorial1} alt="JOFA Editorial" loading="lazy" className="w-full h-[500px] md:h-[700px] object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.7 }} className="overflow-hidden">
              <img src={editorial2} alt="JOFA Editorial" className="w-full h-[500px] md:h-[700px] object-cover hover:scale-105 transition-transform duration-700" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Thiouraye section */}
      <section className="py-24 md:py-32">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">
              Encens Traditionnel
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-4xl md:text-6xl text-gold-gradient mb-4">
              Thiouraye
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-muted-foreground max-w-xl mx-auto">
              Parfumez votre intérieur avec nos encens d'exception. Oud, santal, bois précieux — une tradition sénégalaise sublimée.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4"
          >
            {[thiouraye1, thiouraye2, thiouraye3, thiouraye4, thiouraye5].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className={`overflow-hidden ${i === 0 ? "col-span-2 row-span-2" : ""}`}
              >
                <img
                  src={img}
                  alt={`Thiouraye JOFA ${i + 1}`}
                  className={`w-full object-cover hover:scale-105 transition-transform duration-700 ${i === 0 ? "h-full min-h-[400px]" : "h-[250px] md:h-[300px]"}`}
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/boutique?cat=thiouraye">
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-body uppercase tracking-[0.3em] text-xs px-10 py-6 rounded-none"
              >
                Découvrir nos Thiouraye
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Bin Bin — Perles Tour de Taille */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">
              Bijoux Traditionnels
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-4xl md:text-6xl text-gold-gradient mb-4">
              Bin Bin
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-muted-foreground max-w-xl mx-auto">
              Les perles tour de taille authentiques. Un accessoire intemporel qui célèbre la beauté et la tradition sénégalaise.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
          >
            {[binBin1, binBin2, binBin3].map((img, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.6 }}
                className="overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Bin Bin JOFA ${i + 1}`}
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/boutique?cat=bin-bin">
              <Button
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-body uppercase tracking-[0.3em] text-xs px-10 py-6 rounded-none"
              >
                Découvrir nos Bin Bin
                <ArrowRight className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      <ProductGrid title="Nos Pièces" limit={8} />
      <div className="gold-line w-full" />

      {/* Brand story — cinematic split */}
      <section className="py-24 md:py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch min-h-[600px]">
            {/* Image side */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden"
            >
              <img src={brandStory} alt="L'histoire JOFA" className="w-full h-full object-cover min-h-[400px]" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/30 lg:to-background" />
            </motion.div>

            {/* Text side */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col justify-center px-8 lg:px-16 py-16 bg-card lg:bg-transparent"
            >
              <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">Notre Histoire</p>
              <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-8 leading-tight">
                La beauté dans
                <br />
                <span className="italic">chaque détail</span>
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6 text-base">
                JOFA célèbre la beauté et la sensualité de la femme africaine à travers des pièces de lingerie
                d'exception. Chaque création mêle savoir-faire artisanal et design contemporain.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-10 text-base">
                Des matières nobles, une coupe précise, un souci du détail obsessionnel — pour une lingerie
                qui vous ressemble : audacieuse, élégante, inoubliable.
              </p>
              <Link to="/a-propos">
                <Button
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-body uppercase tracking-[0.3em] text-xs px-10 py-6 rounded-none w-fit"
                >
                  En savoir plus
                  <ArrowRight className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 border-y border-border">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8"
          >
            {values.map((val) => (
              <motion.div key={val.title} variants={fadeUp} transition={{ duration: 0.6 }} className="text-center">
                <val.icon className="h-8 w-8 text-primary mx-auto mb-5" strokeWidth={1} />
                <h3 className="font-display text-2xl text-foreground mb-3">{val.title}</h3>
                <p className="font-body text-muted-foreground text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter — editorial */}
      <section className="py-24 md:py-32">
        <div className="container max-w-2xl text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">
              Newsletter
            </motion.p>
            <motion.h2 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-4xl md:text-5xl text-gold-gradient mb-6">
              Restez Connectée
            </motion.h2>
            <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-muted-foreground mb-10 font-light">
              Inscrivez-vous pour recevoir nos offres exclusives, avant-premières et inspirations.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 h-14 border border-border bg-transparent px-6 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors rounded-none"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-[0.2em] text-xs h-14 px-8 rounded-none">
                S'inscrire
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
