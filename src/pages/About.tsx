import { motion } from "framer-motion";

const About = () => (
  <div className="min-h-screen">
    <div className="container py-16 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-display text-4xl md:text-5xl text-gold-gradient text-center mb-10">À Propos de JOFA</h1>

        <div className="space-y-8 font-body text-muted-foreground leading-relaxed">
          <p>
            JOFA est née d'une vision : créer une marque de lingerie qui célèbre la beauté de la femme africaine
            dans toute sa diversité. Fondée avec la conviction que chaque femme mérite de se sentir exceptionnelle
            dans sa propre peau, JOFA propose des créations qui allient tradition et modernité.
          </p>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="font-display text-2xl text-foreground mb-4">Notre Vision</h2>
            <p>
              Devenir la référence de la lingerie de luxe pour la femme africaine moderne.
              Chaque pièce JOFA est conçue pour sublimer les courbes, offrir un confort inégalé
              et insuffler confiance et élégance au quotidien.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="font-display text-2xl text-foreground mb-4">Nos Valeurs</h2>
            <ul className="space-y-3">
              <li><strong className="text-primary">Authenticité</strong> — Des designs inspirés par le patrimoine culturel africain</li>
              <li><strong className="text-primary">Excellence</strong> — Des matières nobles et un savoir-faire artisanal</li>
              <li><strong className="text-primary">Inclusivité</strong> — Une gamme de tailles pensée pour toutes les morphologies</li>
              <li><strong className="text-primary">Durabilité</strong> — Un engagement vers une mode plus responsable</li>
            </ul>
          </div>

          <p className="text-center italic font-display text-lg text-foreground">
            « JOFA, la féminité en signature »
          </p>
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
