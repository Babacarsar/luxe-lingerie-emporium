import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, ArrowRight } from "lucide-react";

export const Footer = () => (
  <footer className="bg-card border-t border-border">
    {/* Gold line */}
    <div className="gold-line w-full" />

    <div className="container py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Brand */}
        <div className="md:col-span-4">
          <h3 className="font-display text-3xl text-gold-gradient mb-5 tracking-[0.1em]">JOFA</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
            La féminité en signature. Lingerie de luxe pensée pour la femme africaine moderne.
          </p>
          <div className="flex gap-5 mt-8">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Instagram className="h-5 w-5" strokeWidth={1.5} />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              <Facebook className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Boutique */}
        <div className="md:col-span-2">
          <h4 className="font-body text-[11px] uppercase tracking-[0.25em] text-foreground mb-6">Boutique</h4>
          <ul className="space-y-3">
            {["Soutiens-gorge", "Culottes", "Ensembles", "Nuisettes", "Bodys"].map((item) => (
              <li key={item}>
                <Link to="/boutique" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informations */}
        <div className="md:col-span-2">
          <h4 className="font-body text-[11px] uppercase tracking-[0.25em] text-foreground mb-6">Informations</h4>
          <ul className="space-y-3">
            <li><Link to="/a-propos" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body">À Propos</Link></li>
            <li><Link to="/guide-des-tailles" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body">Guide des Tailles</Link></li>
            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body">Contact</Link></li>
            <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 font-body">FAQ</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <h4 className="font-body text-[11px] uppercase tracking-[0.25em] text-foreground mb-6">Newsletter</h4>
          <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
            Recevez nos dernières collections et offres exclusives.
          </p>
          <div className="flex gap-0">
            <Input placeholder="Votre email" className="bg-transparent border-border rounded-none focus-visible:ring-primary h-12" />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 rounded-none h-12 px-6">
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="gold-line w-full mt-16 mb-8" />

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground font-body tracking-wider">
          © 2025 JOFA Lingerie. Tous droits réservés.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body tracking-wider">CGV</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body tracking-wider">Mentions légales</a>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors font-body tracking-wider">Confidentialité</a>
        </div>
      </div>
    </div>
  </footer>
);
