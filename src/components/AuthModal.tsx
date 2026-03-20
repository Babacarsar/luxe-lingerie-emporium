import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 rounded-xl overflow-hidden border-border">
        <DialogTitle className="sr-only">
          {tab === "login" ? "Connexion" : "Inscription"}
        </DialogTitle>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-4 text-sm font-body uppercase tracking-widest transition-all duration-200 ${
              tab === "login"
                ? "text-foreground border-b-2 border-foreground font-semibold"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            Connexion
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-4 text-sm font-body uppercase tracking-widest transition-all duration-200 ${
              tab === "signup"
                ? "text-foreground border-b-2 border-foreground font-semibold"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            Inscription
          </button>
        </div>

        {/* Banner */}
        <div className="mx-4 mt-4 rounded-lg bg-primary/5 border border-primary/10 px-4 py-3">
          <p className="text-xs text-primary font-semibold">
            {tab === "login"
              ? "Programme de fidélité JOFA"
              : "-10% sur votre première commande"}
          </p>
          <p className="text-[11px] text-foreground/50 mt-0.5">
            {tab === "login"
              ? "À chacun de vos achats, cumulez des points et bénéficiez de remises !"
              : "Devenez membre JOFA et bénéficiez de nombreux avantages."}
          </p>
        </div>

        <div className="p-4 pt-3 max-h-[60vh] overflow-y-auto">
          {tab === "login" ? <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} /> : <SignupForm showPassword={showPassword} setShowPassword={setShowPassword} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};

const LoginForm = ({ showPassword, setShowPassword }: { showPassword: boolean; setShowPassword: (v: boolean) => void }) => (
  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
    <h3 className="font-display text-sm font-semibold text-foreground">
      Connexion avec une adresse e-mail
    </h3>

    <div className="space-y-1.5">
      <Label htmlFor="login-email" className="text-xs text-foreground/60">
        E-mail <span className="text-primary">*</span>
      </Label>
      <Input
        id="login-email"
        type="email"
        placeholder="E-mail"
        className="h-11 rounded-lg border-border bg-background text-sm"
      />
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="login-password" className="text-xs text-foreground/60">
        Mot de passe <span className="text-primary">*</span>
      </Label>
      <div className="relative">
        <Input
          id="login-password"
          type={showPassword ? "text" : "password"}
          placeholder="Mot de passe"
          className="h-11 rounded-lg border-border bg-background text-sm pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>

    <button type="button" className="text-xs text-foreground/60 underline hover:text-foreground transition-colors">
      Mot de passe oublié ?
    </button>

    <Button
      type="submit"
      className="w-full bg-foreground text-background hover:bg-foreground/90 h-11 font-body text-xs uppercase tracking-widest rounded-lg active:scale-[0.97] transition-all"
    >
      Connexion
    </Button>

    <button type="button" className="w-full text-xs text-foreground/60 underline hover:text-foreground transition-colors text-center">
      Continuer sans mot de passe
    </button>

    <div className="relative py-2">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-3 text-[11px] text-foreground/40">ou</span>
      </div>
    </div>

    <div>
      <p className="font-display text-xs font-semibold text-foreground mb-2">
        Avec vos réseaux sociaux
      </p>
      <p className="text-[11px] text-foreground/50 mb-3">
        La connexion est simple, sans mot de passe et sécurisée.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="h-11 rounded-lg text-sm font-normal border-border hover:bg-muted/50 active:scale-[0.97] transition-all">
          <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Google
        </Button>
        <Button variant="outline" className="h-11 rounded-lg text-sm font-normal border-border hover:bg-muted/50 active:scale-[0.97] transition-all">
          <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
          Apple
        </Button>
      </div>
    </div>
  </form>
);

const SignupForm = ({ showPassword, setShowPassword }: { showPassword: boolean; setShowPassword: (v: boolean) => void }) => (
  <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
    <h3 className="font-display text-sm font-semibold text-foreground">
      Créer mon compte
    </h3>

    <div className="grid grid-cols-2 gap-3">
      <Button variant="outline" className="h-11 rounded-lg text-sm font-normal border-border hover:bg-muted/50 active:scale-[0.97] transition-all">
        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Google
      </Button>
      <Button variant="outline" className="h-11 rounded-lg text-sm font-normal border-border hover:bg-muted/50 active:scale-[0.97] transition-all">
        <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
        Apple
      </Button>
    </div>

    <div className="relative py-1">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-background px-3 text-[11px] text-foreground/40">ou</span>
      </div>
    </div>

    <p className="font-display text-xs font-semibold text-foreground">
      Avec une adresse e-mail
    </p>

    <div className="space-y-1.5">
      <Label htmlFor="signup-email" className="text-xs text-foreground/60">
        E-mail <span className="text-primary">*</span>
      </Label>
      <Input id="signup-email" type="email" placeholder="E-mail" className="h-11 rounded-lg border-border text-sm" />
    </div>

    <div className="space-y-1.5">
      <Label htmlFor="signup-password" className="text-xs text-foreground/60">
        Mot de passe <span className="text-primary">*</span>
      </Label>
      <div className="relative">
        <Input id="signup-password" type={showPassword ? "text" : "password"} placeholder="Mot de passe" className="h-11 rounded-lg border-border text-sm pr-10" />
        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/60 transition-colors">
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>

    <div className="flex items-start gap-2">
      <Checkbox id="newsletter" className="mt-0.5" />
      <Label htmlFor="newsletter" className="text-xs text-foreground/60 font-normal leading-relaxed cursor-pointer">
        J'accepte de recevoir des offres et actualités par e-mail.
      </Label>
    </div>

    <div className="pt-1">
      <p className="font-display text-xs font-semibold text-foreground mb-3">
        Commençons par faire connaissance
      </p>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label className="text-xs text-foreground/60">
            Civilité : <span className="text-primary">*</span>
          </Label>
          <Select>
            <SelectTrigger className="h-11 rounded-lg border-border text-sm">
              <SelectValue placeholder="Sélectionner" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mme">Mme</SelectItem>
              <SelectItem value="m">M.</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-firstname" className="text-xs text-foreground/60">
            Prénom <span className="text-primary">*</span>
          </Label>
          <Input id="signup-firstname" placeholder="Prénom" className="h-11 rounded-lg border-border text-sm" />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="signup-lastname" className="text-xs text-foreground/60">
            Nom <span className="text-primary">*</span>
          </Label>
          <Input id="signup-lastname" placeholder="Nom" className="h-11 rounded-lg border-border text-sm" />
        </div>
      </div>
    </div>

    <div className="pt-1">
      <p className="font-display text-xs font-semibold text-foreground mb-3">
        Pour faciliter le contact
      </p>
      <div className="space-y-1.5">
        <Label htmlFor="signup-phone" className="text-xs text-foreground/60">Téléphone</Label>
        <div className="relative">
          <Input id="signup-phone" placeholder="Téléphone" className="h-11 rounded-lg border-border text-sm" />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-foreground/30">Facultatif</span>
        </div>
      </div>
    </div>

    <div className="flex items-start gap-2">
      <Checkbox id="sms" className="mt-0.5" />
      <Label htmlFor="sms" className="text-xs text-foreground/60 font-normal leading-relaxed cursor-pointer">
        Je souhaite recevoir des SMS de promotion et d'informations de la part de JOFA.
      </Label>
    </div>

    <div className="flex items-start gap-2">
      <Checkbox id="terms" className="mt-0.5" />
      <Label htmlFor="terms" className="text-xs text-foreground/60 font-normal leading-relaxed cursor-pointer">
        Je reconnais avoir lu et accepté la{" "}
        <span className="underline text-foreground/80">Charte de confidentialité</span>{" "}
        et j'accepte l'adhésion au{" "}
        <span className="underline text-primary">programme de fidélité</span>{" "}
        <span className="text-primary">*</span>
      </Label>
    </div>

    <Button
      type="submit"
      className="w-full bg-foreground text-background hover:bg-foreground/90 h-11 font-body text-xs uppercase tracking-widest rounded-lg active:scale-[0.97] transition-all"
    >
      Devenir membre
    </Button>
  </form>
);
