import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import logoJofa from "@/assets/logo-jofa.png";

const navLinks = [
  { label: "Accueil", to: "/" },
  { label: "Lingerie", to: "/boutique" },
  { label: "Thiouraye", to: "/boutique?cat=thiouraye" },
  { label: "Bin Bin", to: "/boutique?cat=binbin" },
  { label: "Guide des Tailles", to: "/guide-des-tailles" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  const isHome = location.pathname === "/";
  const showBg = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBg
          ? "bg-background/90 glass-effect border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16 md:h-20">
        {/* Left side: mobile menu + logo */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Link to="/">
            <img src={logoJofa} alt="JOFA" className="h-12 md:h-16 w-auto" />
          </Link>
        </div>

        {/* Nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-[11px] font-body uppercase tracking-[0.2em] transition-colors duration-300 ${
                location.pathname === link.to
                  ? "text-primary"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: cart, account */}
        <div className="flex items-center gap-4">
          <CartDrawer />
          <Link to="/" className="text-foreground/50 hover:text-foreground transition-colors">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 glass-effect border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col py-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    className={`block px-8 py-4 text-[11px] font-body uppercase tracking-[0.25em] transition-colors ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
