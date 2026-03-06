import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Instagram, Facebook, ArrowRight } from "lucide-react";
import logoJofa from "@/assets/logo-jofa.png";
import footerBg from "@/assets/footer-bg.png";

export const Footer = () => (
  <footer className="relative border-t border-border overflow-hidden">
    {/* Background image */}
    <img
      src={footerBg}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      aria-hidden="true"
    />
    {/* Subtle overlay for readability */}
    <div className="absolute inset-0 bg-black/30" aria-hidden="true" />

    <div className="relative z-10">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <img src={logoJofa} alt="JOFA" className="h-14 w-auto mb-5" />
            <p className="text-sm text-white/70 font-body leading-relaxed max-w-xs">
              La féminité en signature. Lingerie de luxe pensée pour la femme africaine moderne.
            </p>
            <div className="flex gap-5 mt-8">
              <a href="#" className="text-white/60 hover:text-primary transition-colors duration-300">
                <Instagram className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-white/60 hover:text-primary transition-colors duration-300">
                <Facebook className="h-5 w-5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Boutique */}
          <div className="md:col-span-2">
            <h4 className="font-body text-[11px] uppercase tracking-[0.25em] text-white mb-6">Boutique</h4>
            <ul className="space-y-3">
              {["Soutiens-gorge", "Culottes", "Ensembles", "Nuisettes", "Bodys"].map((item) => (
                <li key={item}>
                  <Link to="/boutique" className="text-sm text-white/70 hover:text-primary transition-colors duration-300 font-body">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div className="md:col-span-2">
            <h4 className="font-body text-[11px] uppercase tracking-[0.25em] text-white mb-6">Informations</h4>
            <ul className="space-y-3">
              <li><Link to="/a-propos" className="text-sm text-white/70 hover:text-primary transition-colors duration-300 font-body">À Propos</Link></li>
              <li><Link to="/guide-des-tailles" className="text-sm text-white/70 hover:text-primary transition-colors duration-300 font-body">Guide des Tailles</Link></li>
              <li><Link to="/contact" className="text-sm text-white/70 hover:text-primary transition-colors duration-300 font-body">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-white/70 hover:text-primary transition-colors duration-300 font-body">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h4 className="font-body text-[11px] uppercase tracking-[0.25em] text-white mb-6">Newsletter</h4>
            <p className="text-sm text-white/70 font-body mb-6 leading-relaxed">
              Recevez nos dernières collections et offres exclusives.
            </p>
            <div className="flex gap-0">
              <Input placeholder="Votre email" className="bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-none focus-visible:ring-primary h-12" />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 rounded-none h-12 px-6">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-white/15 mt-16 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/50 font-body tracking-wider">
            © 2025 JOFA Lingerie. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-white/50 hover:text-primary transition-colors font-body tracking-wider">CGV</a>
            <a href="#" className="text-xs text-white/50 hover:text-primary transition-colors font-body tracking-wider">Mentions légales</a>
            <a href="#" className="text-xs text-white/50 hover:text-primary transition-colors font-body tracking-wider">Confidentialité</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
);
