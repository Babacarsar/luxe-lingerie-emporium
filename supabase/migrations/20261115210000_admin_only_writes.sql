-- Sécurité : seuls les e-mails listés dans admin_users peuvent modifier la boutique.
-- Avant : n'importe quel compte connecté (inscription libre sur /admin) pouvait
-- créer, modifier ou supprimer produits, collections et images.
--
-- Ajouter un admin plus tard :
--   INSERT INTO public.admin_users (email) VALUES ('autre@exemple.com');

CREATE TABLE IF NOT EXISTS public.admin_users (
  email text PRIMARY KEY CHECK (email = lower(email)),
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO public.admin_users (email) VALUES ('babacarsarr.tech@gmail.com')
ON CONFLICT DO NOTHING;

ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.admin_users FROM anon;
GRANT SELECT ON public.admin_users TO authenticated;
GRANT ALL ON public.admin_users TO service_role;

DROP POLICY IF EXISTS "Users can see their own admin row" ON public.admin_users;
CREATE POLICY "Users can see their own admin row"
  ON public.admin_users FOR SELECT TO authenticated
  USING (email = lower(auth.jwt() ->> 'email'));

-- SECURITY DEFINER : lit admin_users sans dépendre des règles de la table.
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
REVOKE ALL ON FUNCTION public.is_admin() FROM public;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;

-- ─── Produits ───
DROP POLICY IF EXISTS "Authenticated users can view all products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can insert products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON public.products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;

CREATE POLICY "Admins can view all products" ON public.products FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.is_admin());

-- ─── Collections ───
DROP POLICY IF EXISTS "Authenticated users can view all collections" ON public.collections;
DROP POLICY IF EXISTS "Authenticated users can insert collections" ON public.collections;
DROP POLICY IF EXISTS "Authenticated users can update collections" ON public.collections;
DROP POLICY IF EXISTS "Authenticated users can delete collections" ON public.collections;
DROP POLICY IF EXISTS "Admins can view all collections" ON public.collections;
DROP POLICY IF EXISTS "Admins can insert collections" ON public.collections;
DROP POLICY IF EXISTS "Admins can update collections" ON public.collections;
DROP POLICY IF EXISTS "Admins can delete collections" ON public.collections;

CREATE POLICY "Admins can view all collections" ON public.collections FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admins can insert collections" ON public.collections FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "Admins can update collections" ON public.collections FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admins can delete collections" ON public.collections FOR DELETE TO authenticated USING (public.is_admin());

-- ─── Images produits (stockage) ───
DROP POLICY IF EXISTS "Authenticated can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

CREATE POLICY "Admins can upload product images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.is_admin());
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin());
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND public.is_admin());

-- ─── Avis (si la table existe déjà) : seule la modération est réservée aux admins ───
DO $$
BEGIN
  IF to_regclass('public.reviews') IS NOT NULL THEN
    DROP POLICY IF EXISTS "Authenticated users can update reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Authenticated users can delete reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Admins can update reviews" ON public.reviews;
    DROP POLICY IF EXISTS "Admins can delete reviews" ON public.reviews;
    CREATE POLICY "Admins can update reviews" ON public.reviews FOR UPDATE TO authenticated
      USING (public.is_admin()) WITH CHECK (public.is_admin());
    CREATE POLICY "Admins can delete reviews" ON public.reviews FOR DELETE TO authenticated
      USING (public.is_admin());
  END IF;
END $$;
