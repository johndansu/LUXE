import { createServerComponentClient } from './supabase'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  _id: string
  email: string
  first_name: string
  last_name: string
  phone?: string
  created_at: string
  updated_at: string
}

// Get current user with profile
export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const supabase = await createServerComponentClient()
    
    // Get auth user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return null
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return null
    }

    return {
      _id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone || undefined,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

// Create user (signup)
export async function createUser(userData: {
  email: string
  password: string
  first_name: string
  last_name: string
  phone?: string
}): Promise<UserProfile | null> {
  try {
    const supabase = await createServerComponentClient()

    // Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
        },
      },
    })

    if (authError || !authData.user) {
      if (authError?.message.includes('already registered')) {
        throw new Error('User already exists')
      }
      throw new Error(authError?.message || 'Failed to create user')
    }

    // Wait a bit for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 500))

    // Get the created profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !profile) {
      throw new Error('Failed to create profile')
    }

    return {
      _id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone || undefined,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

// Authenticate user (login)
export async function authenticateUser(
  email: string,
  password: string
): Promise<UserProfile | null> {
  try {
    const supabase = await createServerComponentClient()

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return null
    }

    // Get profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !profile) {
      return null
    }

    return {
      _id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone || undefined,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    console.error('Error authenticating user:', error)
    return null
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<UserProfile | null> {
  try {
    const supabase = await createServerComponentClient()
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !profile) {
      return null
    }

    return {
      _id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone || undefined,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Get user by email
export async function getUserByEmail(email: string): Promise<UserProfile | null> {
  try {
    const supabase = await createServerComponentClient()
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single()

    if (error || !profile) {
      return null
    }

    return {
      _id: profile.id,
      email: profile.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
      phone: profile.phone || undefined,
      created_at: profile.created_at,
      updated_at: profile.updated_at,
    }
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

// Clear user session (logout)
export async function clearUserSession() {
  try {
    const supabase = await createServerComponentClient()
    await supabase.auth.signOut()
  } catch (error) {
    console.error('Error clearing session:', error)
  }
}

// Require auth (middleware helper)
export async function requireAuth(): Promise<UserProfile> {
  const user = await getCurrentUser()
  if (!user) {
    throw new Error('Authentication required')
  }
  return user
}
