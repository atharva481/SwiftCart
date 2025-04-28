import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";
import { useCartStore } from "./useCartStore";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const usePaymentStore = create((set, get) => ({
  // Payment state
  payments: [],
  loading: false,
  error: null,

  // Process payment
  processPayment: async (paymentType) => {
    try {
      set({ loading: true, error: null });
      const cartStore = useCartStore.getState();
      const { cartItems, totalCost } = cartStore;

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      const payment = {
        payment_id: `PAY-${Date.now()}`,
        payment_date: new Date().toLocaleDateString(),
        payment_time: new Date().toLocaleTimeString(),
        total_amount: totalCost,
        payment_type: paymentType,
        items: cartItems,
      };

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Add payment to history
      set((state) => ({
        payments: [...state.payments, payment],
        loading: false,
      }));

      // Clear cart after successful payment
      cartStore.clearCart();

      toast.success("Payment processed successfully");
      return payment;
    } catch (error) {
      set({ loading: false, error: error.message });
      toast.error(error.message || "Payment processing failed");
      throw error;
    }
  },

  // Get payment history
  getPaymentHistory: () => {
    return get().payments;
  },

  // Clear payment history
  clearPaymentHistory: () => {
    set({ payments: [] });
    toast.success("Payment history cleared");
  },
}));