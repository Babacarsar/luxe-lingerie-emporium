import { useState, useEffect, FormEvent } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartDrawer } from "@/components/CartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import logoJofa from "@/assets/logo-jofa.png";
import { AccountDropdown } from "@/components/AccountDropdown";

const boutiqueSubLinks = [
  { label: "Lingerie Sexy", to: "/boutique?cat=lingerie-sexy" },
  { label: "Robes", to: "/boutique?cat=robe" },
  { label: "Bin Bin", to: "/boutique?cat=binbin" },
  { label: "Pagne", to: "/boutique?cat=pagne" },
  { label: "Thiouraye", to: "/boutique?cat=thiouraye" },
];

const navLinks = [
  { label: "Accueil", to: "/", hasSubmenu: false },
  { label: "Boutique", to: "/boutique", hasSubmenu: true },
  { label: "À propos", to: "/a-propos", hasSubmenu: false },
  { label: "Contact", to: "/contact", hasSubmenu: false },
  { label: "Guide des Tailles", to: "/guide-des-tailles", hasSubmenu: false },
  { label: "FAQ", to: "/faq", hasSubmenu: false },
];

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/boutique?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  useEffect(() => {
    setSearchQuery(searchParams.get("search") || "");
  }, [searchParams]);

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
            <motion.img
              src={logoJofa}
              alt="JOFA"
              className="h-16 md:h-24 w-auto"
              whileHover={{ scale: 1.08, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) =>
            link.hasSubmenu ? (
              <div key={link.to} className="relative group">
                <Link
                  to={link.to}
                  className={`text-[11px] font-body uppercase tracking-[0.2em] transition-colors duration-300 ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                  <div className="bg-background border border-border rounded-md shadow-lg py-2 min-w-[160px] origin-top scale-y-95 group-hover:scale-y-100 transition-transform duration-300 ease-out">
                    {boutiqueSubLinks.map((sub, idx) => (
                      <Link
                        key={sub.to}
                        to={sub.to}
                        className="block px-4 py-2 text-[11px] font-body uppercase tracking-[0.15em] text-foreground/60 hover:text-foreground hover:bg-muted transition-all duration-200"
                        style={{ transitionDelay: `${idx * 30}ms` }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          <form onSubmit={handleSearch} className="relative hidden sm:block">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher..."
              className="h-8 w-40 rounded-full border border-border bg-background/50 pl-8 pr-3 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </form>
          <Button variant="ghost" size="icon" className="sm:hidden text-foreground/50 hover:text-foreground" onClick={() => setMobileOpen(true)}>
            <Search className="h-5 w-5" />
          </Button>
          <CartDrawer />
          <Link to="/mes-commandes" className="text-foreground/50 hover:text-foreground transition-colors">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

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
                    className={`block px-8 py-3 text-[11px] font-body uppercase tracking-[0.25em] transition-colors ${
                      location.pathname === link.to
                        ? "text-primary"
                        : "text-foreground/50 hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.hasSubmenu && (
                    <div className="pl-12 flex flex-col">
                      {boutiqueSubLinks.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className="block py-2 text-[10px] font-body uppercase tracking-[0.15em] text-foreground/40 hover:text-foreground transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
              <div className="px-8 pt-4">
                <form onSubmit={handleSearch} className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher..."
                    className="w-full h-9 rounded-full border border-border bg-background/50 pl-9 pr-4 text-xs text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </form>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
