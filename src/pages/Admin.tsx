import { useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Trash2, Upload, X, Pencil, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";
import type { DbProduct } from "@/hooks/useCatalog";

const CATEGORIES = [
  { id: "lingerie-sexy", label: "Lingerie Sexy" },
  { id: "robe", label: "Robes" },
  { id: "pagne", label: "Pagnes" },
  { id: "thiouraye", label: "Thiouraye" },
  { id: "binbin", label: "Bin Bin" },
];

const TEN_YEARS = 60 * 60 * 24 * 365 * 10;

const productSchema = z.object({
  title: z.string().trim().min(1, "Le nom est requis").max(120, "Nom trop long (120 max)"),
  description: z.string().trim().max(2000, "Description trop longue (2000 max)"),
  price: z.number().min(0, "Prix invalide").max(100000000, "Prix trop élevé"),
  product_type: z.string().min(1),
  sizes: z.array(z.string().trim().min(1).max(30)).min(1, "Au moins une taille"),
  images: z.array(z.string().url()).min(1, "Ajoutez au moins une photo"),
});

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);

const emptyForm = {
  id: null as string | null,
  title: "",
  description: "",
  price: "",
  product_type: "lingerie-sexy",
  sizes: "S, M, L, XL, XXL",
  images: [] as string[],
  published: true,
};

const AuthPanel = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (!data.session) {
          toast.info("Vérifiez votre e-mail pour confirmer votre compte.");
        }
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur d'authentification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md py-20">
      <h1 className="font-display text-4xl text-gold-gradient text-center mb-8">Administration</h1>
      <form onSubmit={submit} className="space-y-4 border border-border rounded-xl p-6 bg-card">
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} maxLength={72} />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-primary text-primary-foreground">
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "login" ? "Se connecter" : "Créer un compte"}
        </Button>
        <button
          type="button"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-xs text-muted-foreground hover:text-primary font-body"
        >
          {mode === "login" ? "Pas encore de compte ? Inscription" : "Déjà un compte ? Connexion"}
        </button>
      </form>
    </div>
  );
};

const Admin = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as unknown as DbProduct[];
    },
  });

  const parsedSizes = useMemo(
    () => form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    [form.sizes]
  );

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const urls: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) {
          toast.error(`${file.name} n'est pas une image`);
          continue;
        }
        if (file.size > 10 * 1024 * 1024) {
          toast.error(`${file.name} dépasse 10 Mo`);
          continue;
        }
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${session!.user.id}/${crypto.randomUUID()}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (error) throw error;
        const { data, error: signErr } = await supabase.storage
          .from("product-images")
          .createSignedUrl(path, TEN_YEARS);
        if (signErr || !data) throw signErr ?? new Error("URL introuvable");
        urls.push(data.signedUrl);
      }
      setForm((f) => ({ ...f, images: [...f.images, ...urls] }));
      if (urls.length) toast.success(`${urls.length} photo(s) ajoutée(s)`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Échec de l'envoi");
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => setForm(emptyForm);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = productSchema.safeParse({
      title: form.title,
      description: form.description,
      price: Number(form.price),
      product_type: form.product_type,
      sizes: parsedSizes,
      images: form.images,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...parsed.data,
        handle: form.id ? undefined : `${slugify(parsed.data.title)}-${Date.now().toString(36)}`,
        published: form.published,
        created_by: session!.user.id,
      };
      if (form.id) {
        delete (payload as Record<string, unknown>).handle;
        const { error } = await supabase.from("products").update(payload).eq("id", form.id);
        if (error) throw error;
        toast.success("Produit mis à jour");
      } else {
        const { error } = await supabase.from("products").insert(payload as never);
        if (error) throw error;
        toast.success("Produit ajouté à la boutique");
      }
      resetForm();
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      queryClient.invalidateQueries({ queryKey: ["db-products"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Enregistrement impossible");
    } finally {
      setSaving(false);
    }
  };

  const edit = (p: DbProduct) => {
    setForm({
      id: p.id,
      title: p.title,
      description: p.description || "",
      price: String(p.price),
      product_type: p.product_type,
      sizes: (p.sizes || []).join(", "),
      images: p.images || [],
      published: p.published,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Produit supprimé");
    if (form.id === id) resetForm();
    queryClient.invalidateQueries({ queryKey: ["admin-products"] });
    queryClient.invalidateQueries({ queryKey: ["db-products"] });
  };

  if (!authReady) {
    return (
      <div className="container py-32 flex justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!session) return <AuthPanel />;

  return (
    <div className="container py-12 space-y-12">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.4em] text-primary/70 mb-2">Espace admin</p>
          <h1 className="font-display text-4xl md:text-5xl text-gold-gradient">Gérer la boutique</h1>
        </div>
        <Button variant="outline" onClick={() => supabase.auth.signOut()}>
          <LogOut className="w-4 h-4 mr-2" /> Déconnexion
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={save} className="border border-border rounded-xl p-6 bg-card space-y-6">
        <h2 className="font-display text-2xl">
          {form.id ? "Modifier le produit" : "Nouveau produit"}
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Nom du produit</Label>
            <Input id="title" value={form.title} maxLength={120} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Prix (FCFA)</Label>
            <Input id="price" type="number" min={0} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Catégorie</Label>
            <Select value={form.product_type} onValueChange={(v) => setForm({ ...form, product_type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sizes">Tailles (séparées par des virgules)</Label>
            <Input id="sizes" value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })} />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" rows={4} maxLength={2000} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>

        {/* Images */}
        <div className="space-y-3">
          <Label>Photos</Label>
          <div className="flex flex-wrap gap-3">
            {form.images.map((url) => (
              <div key={url} className="relative w-24 h-32 rounded-md overflow-hidden border border-border">
                <img src={url} alt="Photo produit" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm({ ...form, images: form.images.filter((u) => u !== url) })}
                  className="absolute top-1 right-1 bg-background/80 rounded-full p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <label className="w-24 h-32 rounded-md border border-dashed border-border flex flex-col items-center justify-center gap-1 cursor-pointer hover:border-primary/60 transition-colors text-muted-foreground">
              {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              <span className="text-[10px] font-body uppercase tracking-wider">Ajouter</span>
              <input type="file" accept="image/*" multiple hidden disabled={uploading} onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />
            </label>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Switch id="published" checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
          <Label htmlFor="published">Visible dans la boutique</Label>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={saving || uploading} className="bg-primary text-primary-foreground">
            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
            {form.id ? "Enregistrer" : "Ajouter le produit"}
          </Button>
          {form.id && (
            <Button type="button" variant="outline" onClick={resetForm}>Annuler</Button>
          )}
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        <h2 className="font-display text-2xl">Mes produits ({products.length})</h2>
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
        ) : products.length === 0 ? (
          <p className="text-muted-foreground font-body text-sm">Aucun produit ajouté pour l'instant.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="border border-border rounded-lg overflow-hidden bg-card flex">
                <div className="w-24 h-32 bg-secondary flex-shrink-0">
                  {p.images?.[0] && <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />}
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <p className="font-display text-base truncate">{p.title}</p>
                  <p className="font-body text-xs text-muted-foreground">{p.price} FCFA</p>
                  <p className="font-body text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                    {p.product_type} · {p.published ? "visible" : "masqué"}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => edit(p)}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => remove(p.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
