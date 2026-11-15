import { useState, type FormEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  author_name: string;
  rating: number;
  comment: string;
  product_handle: string | null;
  product_title: string | null;
  created_at: string;
}

interface ReviewsProps {
  /** Avis d'un produit précis. Sans valeur : tous les avis de la boutique. */
  productHandle?: string;
  productTitle?: string;
  title?: string;
  limit?: number;
  /** Affiche le formulaire « Donner mon avis ». */
  allowPost?: boolean;
}

const Stars = ({ value, size = "w-4 h-4" }: { value: number; size?: string }) => (
  <div className="flex gap-0.5" aria-label={`${value} sur 5`}>
    {[1, 2, 3, 4, 5].map((n) => (
      <Star key={n} className={`${size} ${n <= value ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
    ))}
  </div>
);

export const Reviews = ({ productHandle, productTitle, title = "Avis clients", limit = 20, allowPost = true }: ReviewsProps) => {
  const queryClient = useQueryClient();
  const queryKey = ["reviews", productHandle ?? "all", limit];

  const { data: reviews = [], isError } = useQuery({
    queryKey,
    queryFn: async (): Promise<Review[]> => {
      let q = supabase.from("reviews").select("*").order("created_at", { ascending: false }).limit(limit);
      if (productHandle) q = q.eq("product_handle", productHandle);
      const { data, error } = await q;
      if (error) throw error;
      return data as Review[];
    },
    staleTime: 30_000,
    retry: false,
  });

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const post = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("reviews").insert({
        author_name: name.trim(),
        rating,
        comment: comment.trim(),
        product_handle: productHandle ?? null,
        product_title: productTitle ?? null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Merci pour votre avis !", { position: "top-center" });
      setName("");
      setComment("");
      setRating(5);
      setShowForm(false);
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: () => toast.error("Impossible d'envoyer votre avis pour le moment.", { position: "top-center" }),
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Indiquez votre prénom.");
    if (comment.trim().length < 3) return toast.error("Écrivez quelques mots sur votre achat.");
    post.mutate();
  };

  const average = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;

  return (
    <section className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-gold-gradient">{title}</h2>
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mt-3">
              <Stars value={Math.round(average)} />
              <span className="font-body text-sm text-muted-foreground">
                {average.toFixed(1)} / 5 · {reviews.length} avis
              </span>
            </div>
          )}
        </div>
        {allowPost && !isError && (
          <Button variant="outline" onClick={() => setShowForm((v) => !v)} className="font-body uppercase tracking-widest text-xs">
            {showForm ? "Fermer" : "Donner mon avis"}
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={submit} className="rounded-xl border border-border bg-card p-6 space-y-4">
          <div>
            <p className="font-body text-xs uppercase tracking-wider text-muted-foreground mb-2">Votre note</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} étoile${n > 1 ? "s" : ""}`}>
                  <Star className={`w-7 h-7 transition-colors ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground/40 hover:text-primary/60"}`} />
                </button>
              ))}
            </div>
          </div>
          <Input placeholder="Votre prénom" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} className="bg-secondary border-border" />
          <Textarea placeholder="Votre avis..." value={comment} maxLength={1000} onChange={(e) => setComment(e.target.value)} className="bg-secondary border-border min-h-[100px]" />
          <Button type="submit" disabled={post.isPending} className="bg-primary text-primary-foreground hover:bg-primary/90 font-body uppercase tracking-widest text-xs">
            {post.isPending ? "Envoi..." : "Publier mon avis"}
          </Button>
        </form>
      )}

      {reviews.length === 0 ? (
        <p className="font-body text-sm text-muted-foreground">
          {isError ? "Les avis seront bientôt disponibles." : "Aucun avis pour le moment. Soyez la première à donner le vôtre !"}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <article key={r.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
              <Stars value={r.rating} />
              <p className="font-body text-sm text-foreground/80 leading-relaxed">« {r.comment} »</p>
              <div className="font-body text-xs text-muted-foreground">
                <span className="text-foreground font-semibold">{r.author_name}</span>
                {!productHandle && r.product_title && <> · {r.product_title}</>}
                {" · "}
                {new Date(r.created_at).toLocaleDateString("fr-FR")}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
