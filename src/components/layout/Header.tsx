import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Boutique", to: "/boutique" },
  { label: "À Propos", to: "/a-propos" },
  { label: "Guide des Tailles", to: "/guide-des-tailles" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        {/* Nav left (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Logo center */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-gold-gradient tracking-wider">
            JOFA
          </h1>
        </Link>

        {/* Nav right (desktop) + cart */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <CartDrawer />
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col py-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="px-6 py-3 text-sm font-body uppercase tracking-widest text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
