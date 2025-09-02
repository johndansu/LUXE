export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  session_id: string;
  product_id: number;
  quantity: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

// Mock database functions for now - will be replaced with real DB integration
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Silk Evening Gown",
    description:
      "Elegant black silk evening gown with intricate beading and flowing silhouette",
    price: 899.99,
    image_url:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop&auto=format",
    category: "Evening Wear",
    stock_quantity: 15,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Cashmere Sweater",
    description:
      "Luxurious cashmere sweater in soft cream with ribbed texture and relaxed fit",
    price: 299.99,
    image_url:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop&auto=format",
    category: "Casual Luxury",
    stock_quantity: 25,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    description:
      "Premium leather crossbody bag with gold hardware and adjustable strap",
    price: 199.99,
    image_url:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop&auto=format",
    category: "Accessories",
    stock_quantity: 30,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Silk Blouse",
    description:
      "Sophisticated silk blouse in emerald green with pearl buttons and tailored fit",
    price: 179.99,
    image_url:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&h=1000&fit=crop&auto=format",
    category: "Spring Essentials",
    stock_quantity: 20,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Wool Trench Coat",
    description:
      "Classic wool trench coat in camel with belt and double-breasted design",
    price: 449.99,
    image_url:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&auto=format",
    category: "Spring Essentials",
    stock_quantity: 18,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Statement Necklace",
    description:
      "Bold statement necklace with mixed metals and geometric design",
    price: 89.99,
    image_url:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=1000&fit=crop&auto=format",
    category: "Accessories",
    stock_quantity: 40,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Pencil Skirt",
    description:
      "Tailored pencil skirt in navy blue with side slit and stretch fabric",
    price: 129.99,
    image_url:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&auto=format",
    category: "Casual Luxury",
    stock_quantity: 35,
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Silk Scarf",
    description:
      "Luxurious silk scarf with abstract floral print and hand-rolled edges",
    price: 79.99,
    image_url:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop&auto=format",
    category: "Accessories",
    stock_quantity: 50,
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

let mockCart: CartItem[] = [];

export async function getProducts(): Promise<Product[]> {
  return mockProducts;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return mockProducts.filter((product) => product.featured);
}

export async function getProductById(id: number): Promise<Product | null> {
  return mockProducts.find((product) => product.id === id) || null;
}

export async function getProductsByCategory(
  category: string
): Promise<Product[]> {
  return mockProducts.filter((product) => product.category === category);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
}

export async function addToCart(
  sessionId: string,
  productId: number,
  quantity = 1
): Promise<void> {
  const existingItem = mockCart.find(
    (item) => item.session_id === sessionId && item.product_id === productId
  );

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.updated_at = new Date().toISOString();
  } else {
    const newItem: CartItem = {
      id: mockCart.length + 1,
      session_id: sessionId,
      product_id: productId,
      quantity,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockCart.push(newItem);
  }
}

export async function getCartItems(sessionId: string): Promise<CartItem[]> {
  const items = mockCart.filter((item) => item.session_id === sessionId);

  // Attach product data
  return items.map((item) => ({
    ...item,
    product: mockProducts.find((product) => product.id === item.product_id),
  }));
}

export async function updateCartItemQuantity(
  sessionId: string,
  productId: number,
  quantity: number
): Promise<void> {
  const item = mockCart.find(
    (item) => item.session_id === sessionId && item.product_id === productId
  );
  if (item) {
    if (quantity <= 0) {
      mockCart = mockCart.filter(
        (item) =>
          !(item.session_id === sessionId && item.product_id === productId)
      );
    } else {
      item.quantity = quantity;
      item.updated_at = new Date().toISOString();
    }
  }
}

export async function removeFromCart(
  sessionId: string,
  productId: number
): Promise<void> {
  mockCart = mockCart.filter(
    (item) => !(item.session_id === sessionId && item.product_id === productId)
  );
}

export async function clearCart(sessionId: string): Promise<void> {
  mockCart = mockCart.filter((item) => item.session_id !== sessionId);
}
