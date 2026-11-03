import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ProductItem, CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  
  // Actions
  addItem: (product: ProductItem, weightKg: number) => void;
  updateWeight: (productId: string, weightKg: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;

  // Computed helpers
  getTotalWeight: () => number;
  getItemsTotal: () => number;
  getRemainingForFreeDelivery: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      isCheckoutOpen: false,

      addItem: (product: ProductItem, weightKg: number) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const newWeight = updatedItems[existingIndex].weightKg + weightKg;
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              weightKg: Number(newWeight.toFixed(2)),
              totalPrice: Math.round(newWeight * product.pricePerKg),
            };
            return { items: updatedItems, isCartOpen: true };
          }

          const newItem: CartItem = {
            product,
            weightKg: Number(weightKg.toFixed(2)),
            totalPrice: Math.round(weightKg * product.pricePerKg),
          };

          return { items: [...state.items, newItem], isCartOpen: true };
        });
      },

      updateWeight: (productId: string, weightKg: number) => {
        set((state) => {
          if (weightKg <= 0) {
            return {
              items: state.items.filter((item) => item.product.id !== productId),
            };
          }

          const updatedItems = state.items.map((item) => {
            if (item.product.id === productId) {
              const safeWeight = Number(weightKg.toFixed(2));
              return {
                ...item,
                weightKg: safeWeight,
                totalPrice: Math.round(safeWeight * item.product.pricePerKg),
              };
            }
            return item;
          });

          return { items: updatedItems };
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

      openCheckout: () => set({ isCheckoutOpen: true, isCartOpen: false }),
      closeCheckout: () => set({ isCheckoutOpen: false }),

      getTotalWeight: () => {
        return Number(
          get()
            .items.reduce((sum, item) => sum + item.weightKg, 0)
            .toFixed(2)
        );
      },

      getItemsTotal: () => {
        return get().items.reduce((sum, item) => sum + item.totalPrice, 0);
      },

      getRemainingForFreeDelivery: () => {
        const total = get().getTotalWeight();
        const remaining = 10 - total;
        return remaining > 0 ? Number(remaining.toFixed(2)) : 0;
      },
    }),
    {
      name: "andijon-mazza-cart-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
