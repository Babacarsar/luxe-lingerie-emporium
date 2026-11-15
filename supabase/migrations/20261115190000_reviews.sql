-- Avis clients (page produit + accueil). Tout le monde peut lire et publier un avis ;
-- la modération (masquer / supprimer) est réservée aux admins : voir 20261115210000_admin_only_writes.sql.
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
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated; -- filtré par les règles ci-dessous
GRANT ALL ON public.reviews TO service_role;

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published reviews are viewable by everyone"
  ON public.reviews FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Anyone can post a review"
  ON public.reviews FOR INSERT TO anon, authenticated WITH CHECK (published = true);
