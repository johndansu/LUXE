"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { showToast } from "@/components/toast";

interface CartContextType {
  cartCount: number;
  addToCart: (productId: string, quantity?: number) => Promise<boolean>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const refreshCart = async () => {
    try {
      const response = await fetch("/api/cart");
      if (response.ok) {
        const cartItems = await response.json();
        const total = cartItems.reduce(
          (sum: number, item: any) => sum + item.quantity,
          0
        );
        setCartCount(total);
      }
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  const addToCart = async (
    productId: string,
    quantity: number = 1
  ): Promise<boolean> => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (response.ok) {
        await refreshCart();
        showToast({
          type: "success",
          title: "Added to Cart",
          message: "Item has been added to your cart",
        });
        return true;
      } else {
        const error = await response.json();
        showToast({
          type: "error",
          title: "Failed to Add to Cart",
          message: error.error || "Something went wrong",
        });
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      showToast({
        type: "error",
        title: "Failed to Add to Cart",
        message: "Please try again",
      });
      return false;
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, addToCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
