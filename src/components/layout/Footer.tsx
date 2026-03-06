import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook } from "lucide-react";

export const Footer = () => (
  <footer className="bg-card border-t border-border mt-20">
    <div className="container py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <h3 className="font-display text-2xl text-gold-gradient mb-4">JOFA</h3>
          <p className="text-sm text-muted-foreground font-body leading-relaxed">
            La féminité en signature. Lingerie de luxe pensée pour la femme africaine moderne.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Boutique */}
        <div>
          <h4 className="font-display text-lg text-foreground mb-4">Boutique</h4>
          <ul className="space-y-2">
            {["Soutiens-gorge", "Culottes", "Ensembles", "Nuisettes", "Bodys"].map((item) => (
              <li key={item}>
                <Link to="/boutique" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Informations */}
        <div>
          <h4 className="font-display text-lg text-foreground mb-4">Informations</h4>
          <ul className="space-y-2">
            <li><Link to="/a-propos" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">À Propos</Link></li>
            <li><Link to="/guide-des-tailles" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">Guide des Tailles</Link></li>
            <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">Contact</Link></li>
            <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">FAQ</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display text-lg text-foreground mb-4">Newsletter</h4>
          <p className="text-sm text-muted-foreground font-body mb-4">
            Recevez nos dernières collections et offres exclusives.
          </p>
          <div className="flex gap-2">
            <Input placeholder="Votre email" className="bg-secondary border-border" />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
              OK
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center">
        <p className="text-xs text-muted-foreground font-body">
          © 2025 JOFA Lingerie. Tous droits réservés.
        </p>
      </div>
    </div>
  </footer>
);
