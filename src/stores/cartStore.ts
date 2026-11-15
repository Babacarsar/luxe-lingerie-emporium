import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  lineId: string | null;
  product: any;
  variantId: string;
  variantTitle: string;
  price: { amount: string; currencyCode: string };
  quantity: number;
  selectedOptions: Array<{ name: string; value: string }>;
}

interface CartStore {
  items: CartItem[];
  isLoading: boolean;
  addItem: (item: Omit<CartItem, 'lineId'>) => Promise<void>;
  updateQuantity: (variantId: string, quantity: number) => Promise<void>;
  removeItem: (variantId: string) => Promise<void>;
  /** Change la taille d'un article du panier (fusionne si cette taille y est déjà). */
  changeVariant: (
    variantId: string,
    next: { variantId: string; variantTitle: string; price: CartItem['price']; selectedOptions: CartItem['selectedOptions'] }
  ) => void;
  clearCart: () => void;
  syncCart: () => Promise<void>;
  getCheckoutUrl: () => string | null;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isLoading: false,

      addItem: async (item) => {
        const { items } = get();
        const existing = items.find(i => i.variantId === item.variantId);
        if (existing) {
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
        } else {
          set({ items: [...items, { ...item, lineId: item.variantId }] });
        }
      },

      updateQuantity: async (variantId, quantity) => {
        if (quantity <= 0) {
          await get().removeItem(variantId);
          return;
        }
        set({
          items: get().items.map(i =>
            i.variantId === variantId ? { ...i, quantity } : i
          ),
        });
      },

      removeItem: async (variantId) => {
        const newItems = get().items.filter(i => i.variantId !== variantId);
        set({ items: newItems });
      },

      changeVariant: (variantId, next) => {
        if (variantId === next.variantId) return;
        const items = get().items;
        const current = items.find(i => i.variantId === variantId);
        if (!current) return;
        const target = items.find(i => i.variantId === next.variantId);
        if (target) {
          set({
            items: items
              .filter(i => i.variantId !== variantId)
              .map(i => (i.variantId === next.variantId ? { ...i, quantity: i.quantity + current.quantity } : i)),
          });
        } else {
          set({
            items: items.map(i =>
              i.variantId === variantId ? { ...i, ...next, lineId: next.variantId } : i
            ),
          });
        }
      },

      clearCart: () => set({ items: [] }),
      syncCart: async () => {},
      getCheckoutUrl: () => null,
    }),
    {
      name: 'mock-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
