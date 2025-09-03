"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { showToast } from "@/components/toast";

interface WishlistContextType {
  wishlistItems: string[];
  addToWishlist: (productId: string) => Promise<boolean>;
  removeFromWishlist: (productId: string) => Promise<boolean>;
  isInWishlist: (productId: string) => boolean;
  refreshWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);

  const refreshWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (response.ok) {
        const items = await response.json();
        const productIds = items.map(
          (item: any) => item.product_id._id || item.product_id
        );
        setWishlistItems(productIds);
      } else if (response.status === 401) {
        // User not authenticated, clear wishlist
        setWishlistItems([]);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistItems([]);
    }
  };

  const addToWishlist = async (productId: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        await refreshWishlist();
        showToast({
          type: "success",
          title: "Added to Wishlist",
          message: "Item has been added to your wishlist",
        });
        return true;
      } else if (response.status === 401) {
        showToast({
          type: "warning",
          title: "Please Login",
          message: "You need to be logged in to add items to your wishlist",
        });
        return false;
      } else {
        const error = await response.json();
        showToast({
          type: "error",
          title: "Failed to Add to Wishlist",
          message: error.error || "Something went wrong",
        });
        return false;
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      showToast({
        type: "error",
        title: "Failed to Add to Wishlist",
        message: "Please try again",
      });
      return false;
    }
  };

  const removeFromWishlist = async (productId: string): Promise<boolean> => {
    try {
      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        await refreshWishlist();
        showToast({
          type: "success",
          title: "Removed from Wishlist",
          message: "Item has been removed from your wishlist",
        });
        return true;
      } else if (response.status === 401) {
        showToast({
          type: "warning",
          title: "Please Login",
          message: "You need to be logged in to manage your wishlist",
        });
        return false;
      } else {
        const error = await response.json();
        showToast({
          type: "error",
          title: "Failed to Remove from Wishlist",
          message: error.error || "Something went wrong",
        });
        return false;
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      showToast({
        type: "error",
        title: "Failed to Remove from Wishlist",
        message: "Please try again",
      });
      return false;
    }
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.includes(productId);
  };

  useEffect(() => {
    refreshWishlist();
  }, []);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
