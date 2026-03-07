import { motion } from "framer-motion";
import { Ruler, Sparkles, Info } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const lingerieSizes = [
  { fr: "85A", eu: "70A", uk: "32A", us: "32A", tour: "83-87", bonnet: "A" },
  { fr: "85B", eu: "70B", uk: "32B", us: "32B", tour: "83-87", bonnet: "B" },
  { fr: "90B", eu: "75B", uk: "34B", us: "34B", tour: "88-92", bonnet: "B" },
  { fr: "90C", eu: "75C", uk: "34C", us: "34C", tour: "88-92", bonnet: "C" },
  { fr: "95B", eu: "80B", uk: "36B", us: "36B", tour: "93-97", bonnet: "B" },
  { fr: "95C", eu: "80C", uk: "36C", us: "36C", tour: "93-97", bonnet: "C" },
  { fr: "95D", eu: "80D", uk: "36D", us: "36D", tour: "93-97", bonnet: "D" },
  { fr: "100C", eu: "85C", uk: "38C", us: "38C", tour: "98-102", bonnet: "C" },
  { fr: "100D", eu: "85D", uk: "38D", us: "38D", tour: "98-102", bonnet: "D" },
];

const vetementSizes = [
  { taille: "XS", tour_poitrine: "80-84", tour_taille: "60-64", tour_hanches: "86-90" },
  { taille: "S", tour_poitrine: "85-89", tour_taille: "65-69", tour_hanches: "91-95" },
  { taille: "M", tour_poitrine: "90-94", tour_taille: "70-74", tour_hanches: "96-100" },
  { taille: "L", tour_poitrine: "95-99", tour_taille: "75-79", tour_hanches: "101-105" },
  { taille: "XL", tour_poitrine: "100-104", tour_taille: "80-84", tour_hanches: "106-110" },
  { taille: "2XL", tour_poitrine: "105-109", tour_taille: "85-89", tour_hanches: "111-115" },
  { taille: "3XL", tour_poitrine: "110-114", tour_taille: "90-94", tour_hanches: "116-120" },
];

const binBinSizes = [
  { taille: "S", tour_taille: "60-70", longueur: "~75 cm" },
  { taille: "M", tour_taille: "70-80", longueur: "~85 cm" },
  { taille: "L", tour_taille: "80-90", longueur: "~95 cm" },
  { taille: "XL", tour_taille: "90-100", longueur: "~105 cm" },
  { taille: "2XL", tour_taille: "100-110", longueur: "~115 cm" },
];

const SizeGuide = () => (
  <div className="min-h-screen">
    {/* Header */}
    <div className="container pt-16 pb-6 text-center">
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-4">
          Trouvez votre taille
        </motion.p>
        <motion.h1 variants={fadeUp} transition={{ duration: 0.6 }} className="font-display text-5xl md:text-7xl text-gold-gradient mb-4">
          Guide des Tailles
        </motion.h1>
        <motion.p variants={fadeUp} transition={{ duration: 0.6 }} className="font-body text-muted-foreground max-w-xl mx-auto font-light">
          Lingerie, robes, pagnes et bin bin — tous nos conseils pour un ajustement parfait.
        </motion.p>
      </motion.div>
    </div>

    <div className="container max-w-5xl py-12 space-y-16">
      {/* Comment mesurer */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="border border-border rounded-lg p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <Ruler className="h-6 w-6 text-primary" strokeWidth={1.5} />
            <h2 className="font-display text-2xl md:text-3xl text-foreground">Comment prendre vos mesures</h2>
          </div>
          <ol className="font-body text-muted-foreground space-y-4 list-decimal list-inside text-sm md:text-base leading-relaxed">
            <li>Munissez-vous d'un <strong className="text-foreground">mètre-ruban souple</strong>.</li>
            <li><strong className="text-foreground">Tour de poitrine :</strong> Mesurez horizontalement à l'endroit le plus fort de votre poitrine, sans serrer.</li>
            <li><strong className="text-foreground">Tour de dessous de poitrine :</strong> Mesurez juste sous la poitrine, bien à l'horizontale.</li>
            <li><strong className="text-foreground">Tour de taille :</strong> Mesurez à l'endroit le plus creux de votre taille (au-dessus du nombril).</li>
            <li><strong className="text-foreground">Tour de hanches :</strong> Mesurez à l'endroit le plus large de vos hanches.</li>
          </ol>
        </motion.div>
      </motion.section>

      {/* Lingerie */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mb-8">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-2">Soutien-gorge</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Lingerie</h2>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-primary font-bold">FR</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">EU</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">UK</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">US</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Tour poitrine (cm)</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Bonnet</th>
                </tr>
              </thead>
              <tbody>
                {lingerieSizes.map((s, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-foreground">{s.fr}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.eu}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.uk}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.us}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.tour}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.bonnet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.section>

      {/* Vêtements */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mb-8">
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-2">Robes & Pagnes</p>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Robe</h2>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-primary font-bold">Taille</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Tour poitrine (cm)</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Tour de taille (cm)</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Tour de hanches (cm)</th>
                </tr>
              </thead>
              <tbody>
                {vetementSizes.map((s, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{s.taille}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.tour_poitrine}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.tour_taille}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.tour_hanches}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.section>

      {/* Bin Bin */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70">Perles Tour de Taille</p>
          </div>
          <h2 className="font-display text-3xl md:text-4xl text-foreground">Bine Bine</h2>
        </motion.div>
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="border border-border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-body">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-primary font-bold">Taille</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Tour de taille (cm)</th>
                  <th className="px-4 py-3 text-left text-primary font-bold">Longueur perles</th>
                </tr>
              </thead>
              <tbody>
                {binBinSizes.map((s, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3 text-foreground font-medium">{s.taille}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.tour_taille}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.longueur}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Conseils Bin Bin */}
        <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mt-6 border border-border rounded-lg p-8">
          <div className="flex items-center gap-3 mb-5">
            <Info className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <h3 className="font-display text-xl text-foreground">Conseils d'ajustement</h3>
          </div>
          <ul className="font-body text-muted-foreground space-y-3 text-sm leading-relaxed">
            <li>• <strong className="text-foreground">Mesurez votre taille :</strong> Utilisez un mètre-ruban souple autour de votre taille, là où vous souhaitez porter les perles.</li>
            <li>• <strong className="text-foreground">Ajustement :</strong> Les Bin Bin doivent être confortables, ni trop serrés ni trop lâches. Prévoyez 2-3 cm d'aisance.</li>
            <li>• <strong className="text-foreground">Superposition :</strong> Vous pouvez porter plusieurs rangs à différentes hauteurs sur les hanches et la taille.</li>
            <li>• <strong className="text-foreground">Entretien :</strong> Évitez le contact prolongé avec l'eau et les parfums pour préserver l'éclat des perles.</li>
            <li>• <strong className="text-foreground">Sur mesure :</strong> Contactez-nous pour des Bin Bin ajustés à vos mesures exactes.</li>
          </ul>
        </motion.div>
      </motion.section>
    </div>
  </div>
);

export default SizeGuide;
