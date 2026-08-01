import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface DbCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: string;
  position: number;
  published: boolean;
}

async function fetchCollections(includeHidden: boolean): Promise<DbCollection[]> {
  let query = supabase.from("collections").select("*").order("position", { ascending: true });
  if (!includeHidden) query = query.eq("published", true);
  const { data, error } = await query;
  if (error) return [];
  return data as unknown as DbCollection[];
}

export function useCollections(includeHidden = false) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["collections", includeHidden],
    queryFn: () => fetchCollections(includeHidden),
    staleTime: 30_000,
  });
  return { collections: data, isLoading };
}
