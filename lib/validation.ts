import { z } from "zod";

// User validation schemas
export const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

// Address validation schema
export const addressSchema = z.object({
  type: z.enum(["shipping", "billing"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  addressLine1: z.string().min(1, "Address line 1 is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
  isDefault: z.boolean().default(false),
});

// Cart validation schemas
export const addToCartSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  quantity: z
    .number()
    .positive("Quantity must be positive")
    .max(99, "Quantity too high"),
});

export const updateCartSchema = z.object({
  productId: z.string().min(1, "Invalid product ID"),
  quantity: z
    .number()
    .min(0, "Quantity cannot be negative")
    .max(99, "Quantity too high"),
});

// Checkout validation schema
export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

// Product validation schema
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().positive("Price must be positive"),
  imageUrl: z.string().url("Invalid image URL"),
  category: z.string().min(1, "Category is required"),
  stockQuantity: z.number().min(0, "Stock quantity cannot be negative"),
  featured: z.boolean().default(false),
});

// Validation helper functions
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): T {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      throw new Error(`Validation failed: ${errorMessages.join(", ")}`);
    }
    throw error;
  }
}

export function validateDataSafe<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(
        (err) => `${err.path.join(".")}: ${err.message}`
      );
      return { success: false, errors: errorMessages };
    }
    return { success: false, errors: ["Unknown validation error"] };
  }
}
