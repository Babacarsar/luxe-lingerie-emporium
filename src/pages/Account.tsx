import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Package, Pencil, ShoppingBag, User } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfileStore, type Civilite, type Profile } from "@/stores/profileStore";
import { useWishlistStore } from "@/stores/wishlistStore";

const CIVILITES: { value: Exclude<Civilite, "">; label: string }[] = [
  { value: "Mme", label: "Madame" },
  { value: "M.", label: "Monsieur" },
];

const Account = () => {
  const { profile, save } = useProfileStore();
  const favoritesCount = useWishlistStore((s) => s.handles.length);
  const [editing, setEditing] = useState(!profile.prenom);
  const [form, setForm] = useState<Profile>(profile);

  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.prenom.trim()) return toast.error("Indiquez votre prénom.");
    save({ ...form, prenom: form.prenom.trim(), nom: form.nom.trim() });
    setEditing(false);
    toast.success("Informations enregistrées", { position: "top-center" });
  };

  const cancel = () => {
    setForm(profile);
    setEditing(false);
  };

  const civiliteLabel = CIVILITES.find((c) => c.value === profile.civilite)?.label;

  const cards = [
    { to: "/boutique", icon: ShoppingBag, title: "Boutique", text: "Continuer mes achats" },
    { to: "/mes-commandes", icon: Package, title: "Commandes", text: "Suivre mes commandes" },
    { to: "/favoris", icon: Heart, title: "Favoris", text: `${favoritesCount} article${favoritesCount !== 1 ? "s" : ""}` },
  ];

  return (
    <div className="min-h-screen container py-12 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        {/* La virgule vient après le prénom : « Bonjour Fama, » */}
        <h1 className="font-display text-4xl md:text-5xl text-gold-gradient">
          {profile.prenom ? `Bonjour ${profile.prenom},` : "Bienvenue,"}
        </h1>
        {profile.email && <p className="font-body text-muted-foreground mt-2">{profile.email}</p>}
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {cards.map((c) => (
          <Link key={c.to} to={c.to} className="rounded-xl border border-border bg-card p-5 hover:border-primary transition-colors">
            <c.icon className="h-5 w-5 text-primary mb-3" />
            <p className="font-display text-lg">{c.title}</p>
            <p className="font-body text-xs text-muted-foreground">{c.text}</p>
          </Link>
        ))}
      </div>

      <section className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl flex items-center gap-2">
            <User className="h-5 w-5 text-primary" /> Mes informations
          </h2>
          {!editing && (
            <Button variant="outline" size="sm" onClick={() => { setForm(profile); setEditing(true); }}>
              <Pencil className="h-4 w-4 mr-2" /> Modifier
            </Button>
          )}
        </div>

        {editing ? (
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <Label>Civilité</Label>
              <div className="flex gap-2">
                {CIVILITES.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => set("civilite", c.value)}
                    className={`px-5 py-2 text-sm font-body rounded border transition-colors ${
                      form.civilite === c.value
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prenom">Prénom</Label>
                <Input id="prenom" value={form.prenom} onChange={(e) => set("prenom", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nom">Nom</Label>
                <Input id="nom" value={form.nom} onChange={(e) => set("nom", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tel">Téléphone WhatsApp</Label>
                <Input id="tel" type="tel" placeholder="+221 77 ..." value={form.telephone} onChange={(e) => set("telephone", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="ville">Ville</Label>
              <Input id="ville" value={form.ville} onChange={(e) => set("ville", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse de livraison</Label>
              <Input id="adresse" placeholder="Quartier, rue..." value={form.adresse} onChange={(e) => set("adresse", e.target.value)} />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">Enregistrer</Button>
              {profile.prenom && (
                <Button type="button" variant="outline" onClick={cancel}>Annuler</Button>
              )}
            </div>
          </form>
        ) : (
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 font-body text-sm">
            <dt className="text-muted-foreground">Civilité</dt>
            <dd>{civiliteLabel || "Non renseignée"}</dd>
            <dt className="text-muted-foreground">Nom</dt>
            <dd>{[profile.prenom, profile.nom].filter(Boolean).join(" ")}</dd>
            <dt className="text-muted-foreground">E-mail</dt>
            <dd>{profile.email || "Non renseigné"}</dd>
            <dt className="text-muted-foreground">Téléphone</dt>
            <dd>{profile.telephone || "Non renseigné"}</dd>
            <dt className="text-muted-foreground">Adresse</dt>
            <dd>{[profile.adresse, profile.ville].filter(Boolean).join(", ") || "Non renseignée"}</dd>
          </dl>
        )}
      </section>
    </div>
  );
};

export default Account;
