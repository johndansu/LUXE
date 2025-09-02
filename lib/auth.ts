import { cookies } from "next/headers";

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

export interface UserAddress {
  id: number;
  user_id: number;
  type: "shipping" | "billing";
  first_name: string;
  last_name: string;
  company?: string;
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

// Mock users database - replace with real database integration
const mockUsers: User[] = [];
const mockAddresses: UserAddress[] = [];
let userIdCounter = 1;
let addressIdCounter = 1;

// Simple password hashing (use bcrypt in production)
function hashPassword(password: string): string {
  return btoa(password); // Base64 encoding - NOT secure for production
}

function verifyPassword(password: string, hash: string): boolean {
  return btoa(password) === hash;
}

export async function createUser(userData: {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone?: string;
}): Promise<User | null> {
  // Check if user already exists
  const existingUser = mockUsers.find((user) => user.email === userData.email);
  if (existingUser) {
    throw new Error("User already exists");
  }

  const newUser: User = {
    id: userIdCounter++,
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    phone: userData.phone,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  // Store user with hashed password (password not included in User type for security)
  mockUsers.push(newUser);

  return newUser;
}

export async function authenticateUser(
  email: string,
  password: string
): Promise<User | null> {
  const user = mockUsers.find((user) => user.email === email);
  if (!user) {
    return null;
  }

  // In a real implementation, you'd verify the hashed password
  // For now, we'll use a simple check
  return user;
}

export async function getUserById(id: number): Promise<User | null> {
  return mockUsers.find((user) => user.id === id) || null;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return mockUsers.find((user) => user.email === email) || null;
}

export async function createUserAddress(
  addressData: Omit<UserAddress, "id" | "created_at" | "updated_at">
): Promise<UserAddress> {
  const newAddress: UserAddress = {
    ...addressData,
    id: addressIdCounter++,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockAddresses.push(newAddress);
  return newAddress;
}

export async function getUserAddresses(userId: number): Promise<UserAddress[]> {
  return mockAddresses.filter((address) => address.user_id === userId);
}

export async function getDefaultAddress(
  userId: number,
  type: "shipping" | "billing"
): Promise<UserAddress | null> {
  return (
    mockAddresses.find(
      (address) =>
        address.user_id === userId &&
        address.type === type &&
        address.is_default
    ) || null
  );
}

// Session management
export async function setUserSession(userId: number) {
  const cookieStore = await cookies();
  cookieStore.set("user_id", userId.toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function getUserSession(): Promise<number | null> {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  return userId ? Number.parseInt(userId) : null;
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete("user_id");
}

export async function getCurrentUser(): Promise<User | null> {
  const userId = await getUserSession();
  if (!userId) return null;
  return await getUserById(userId);
}
