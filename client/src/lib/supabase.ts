/**
 * Supabase client configuration
 * Design: Charcoal & Gold Prestige
 *
 * IMPORTANT: Configure these environment variables in your .env file:
 * VITE_SUPABASE_URL=your_supabase_project_url
 * VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
 *
 * For Vercel deployment, add these as environment variables in the Vercel dashboard.
 */

import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "placeholder-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Database Types ────────────────────────────────────────────────────────────

export type UserRole = "admin" | "corretor";

export type PropertyStatus =
  | "disponivel"
  | "reservado"
  | "em_negociacao"
  | "alugado"
  | "vendido"
  | "encerrado";

export type PropertyType =
  | "casa"
  | "apartamento"
  | "terreno"
  | "comercial"
  | "rural"
  | "outro";

export type ListingType = "venda" | "aluguel";

export interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Property {
  id: string;
  code: string; // IMV-1001
  title: string;
  description: string | null;
  listing_type: ListingType;
  price: number;
  city: string;
  neighborhood: string;
  address: string | null;
  zip_code: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  parking_spots: number | null;
  built_area: number | null;
  land_area: number | null;
  property_type: PropertyType;
  status: PropertyStatus;
  featured: boolean;
  main_image_url: string | null;
  agent_id: string | null;
  agent_name: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  slug: string | null;
}

export interface PropertyImage {
  id: string;
  property_id: string;
  url: string;
  is_main: boolean;
  order_index: number;
  created_at: string;
}

export interface Settings {
  id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
}

// ─── SQL Schema (for Supabase setup) ──────────────────────────────────────────
// Run this SQL in your Supabase SQL editor to create the required tables.
// See /supabase-schema.sql in the project root.
