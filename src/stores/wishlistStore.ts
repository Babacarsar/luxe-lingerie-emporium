import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

/** Liste des envies : on garde seulement les handles, le produit est relu depuis le catalogue. */
interface WishlistStore {
  handles: string[];
  has: (handle: string) => boolean;
  toggle: (handle: string) => boolean;
  remove: (handle: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      handles: [],
      has: (handle) => get().handles.includes(handle),
      toggle: (handle) => {
        const added = !get().handles.includes(handle);
        set({ handles: added ? [...get().handles, handle] : get().handles.filter((h) => h !== handle) });
        return added;
      },
      remove: (handle) => set({ handles: get().handles.filter((h) => h !== handle) }),
    }),
    { name: "jofa-wishlist", storage: createJSONStorage(() => localStorage) }
  )
);
