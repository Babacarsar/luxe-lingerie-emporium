CREATE TABLE public.collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  handle text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  image text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0,
  published boolean NOT NULL DEFAULT true,
  created_by uuid,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.collections TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.collections TO authenticated;
GRANT ALL ON public.collections TO service_role;

ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published collections are viewable by everyone"
  ON public.collections FOR SELECT TO anon, authenticated USING (published = true);
CREATE POLICY "Authenticated users can view all collections"
  ON public.collections FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can insert collections"
  ON public.collections FOR INSERT TO authenticated WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update collections"
  ON public.collections FOR UPDATE TO authenticated USING (auth.uid() IS NOT NULL) WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete collections"
  ON public.collections FOR DELETE TO authenticated USING (auth.uid() IS NOT NULL);

CREATE TRIGGER update_collections_updated_at
  BEFORE UPDATE ON public.collections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.products ADD COLUMN collections text[] NOT NULL DEFAULT '{}'::text[];