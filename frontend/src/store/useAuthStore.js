import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isAdmin: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role === "admin";
  },
  isCustomer: () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role === "customer";
  },
  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
    toast.success("Logged out successfully");
  },
  loginCustomer: async (username) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/customer/login`, { username });
      if (response.data.success) {
        const userData = response.data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error logging in customer:", error);
      throw error;
    }
  },
  loginAdmin: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/admin/login`, credentials);
      if (response.data.success) {
        const userData = response.data.data;
        localStorage.setItem("user", JSON.stringify(userData));
        set({ user: userData });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error logging in admin:", error);
      throw error;
    }
  },
}));