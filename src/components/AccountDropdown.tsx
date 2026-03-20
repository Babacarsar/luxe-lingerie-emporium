import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Package, Ruler, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AuthModal } from "./AuthModal";

const accountLinks = [
  { label: "Mon compte", icon: User, to: "/mon-compte" },
  { label: "Mes commandes", icon: Package, to: "/mes-commandes" },
  { label: "Mes mensurations", icon: Ruler, to: "/guide-des-tailles" },
  { label: "Besoin d'aide ?", icon: HelpCircle, to: "/faq" },
];

export const AccountDropdown = () => {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button className="text-foreground/50 hover:text-foreground transition-colors active:scale-95">
            <User className="h-5 w-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={12}
          className="w-72 p-0 rounded-xl border border-border bg-background shadow-xl"
        >
          <div className="px-5 pt-5 pb-3">
            <h3 className="font-display text-sm font-semibold text-foreground">
              Programme de fidélité JOFA
            </h3>
            <p className="text-xs text-foreground/50 mt-1">
              Bénéficiez d'une expérience 100% personnalisée !
            </p>
          </div>

          <div className="border-t border-border">
            {accountLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-5 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-muted/50 transition-all duration-200 active:scale-[0.98]"
              >
                <link.icon className="h-4 w-4 text-foreground/40" />
                <span className="font-body text-xs uppercase tracking-widest">
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <Button
              onClick={() => {
                setOpen(false);
                setAuthOpen(true);
              }}
              className="w-full bg-foreground text-background hover:bg-foreground/90 font-body text-xs uppercase tracking-widest rounded-md h-10 active:scale-[0.97] transition-all"
            >
              Connexion
            </Button>
          </div>

          <div className="px-5 pb-4">
            <p className="text-[10px] text-foreground/40 leading-relaxed">
              Rejoignez JOFA et gagnez des points de fidélité sur chaque commande.{" "}
              <button
                onClick={() => {
                  setOpen(false);
                  setAuthOpen(true);
                }}
                className="underline text-primary hover:text-primary/80 transition-colors"
              >
                Créer mon compte
              </button>
            </p>
          </div>
        </PopoverContent>
      </Popover>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  );
};
