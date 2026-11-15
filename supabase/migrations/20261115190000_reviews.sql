-- Avis clients (page produit + accueil). Tout le monde peut lire et publier un avis ;
-- seuls les comptes admin (authenticated) peuvent masquer ou supprimer.
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_handle text,
  product_title text,
  author_name text NOT NULL CHECK (char_length(author_name) BETWEEN 2 AND 60),
  rating smallint NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment text NOT NULL CHECK (char_length(comment) BETWEEN 3 AND 1000),
  published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX reviews_product_handle_idx ON public.reviews (product_handle);

GRANT SELECT, INSERT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published reviews are viewable by everyone"
  ON public.reviews FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Anyone can post a review"
  ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (published = true);
CREATE POLICY "Authenticated users can update reviews"
  ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete reviews"
  ON public.reviews FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);
