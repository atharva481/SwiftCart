import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useCartStore = create((set, get) => ({
  // Cart state
  cartItems: [],
  totalCost: 0,
  loading: false,
  error: null,

  // Calculate total cost
  calculateTotal: () => {
    const { cartItems } = get();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    set({ totalCost: total });
  },

  // Add item to cart
  addToCart: async (product) => {
    try {
      const { cartItems } = get();
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        // If item exists, increment quantity
        const updatedItems = cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        set({ cartItems: updatedItems });
      } else {
        // Add new item with quantity 1
        set({ cartItems: [...cartItems, { ...product, quantity: 1 }] });
      }

      get().calculateTotal();
      toast.success("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    }
  },

  // Remove item from cart
  removeFromCart: (productId) => {
    try {
      const { cartItems } = get();
      const updatedItems = cartItems.filter((item) => item.id !== productId);
      set({ cartItems: updatedItems });
      get().calculateTotal();
      toast.success("Product removed from cart");
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove product from cart");
    }
  },

  // Update item quantity
  updateQuantity: (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const { cartItems } = get();
      const updatedItems = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      set({ cartItems: updatedItems });
      get().calculateTotal();
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    }
  },

  // Clear cart
  clearCart: () => {
    set({ cartItems: [], totalCost: 0 });
    toast.success("Cart cleared");
  },
}));