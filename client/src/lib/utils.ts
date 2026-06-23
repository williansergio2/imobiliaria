import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { PropertyStatus, PropertyType, ListingType } from "./supabase";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Currency Formatting ───────────────────────────────────────────────────────
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

// ─── Date Formatting ──────────────────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(dateStr));
}

// ─── Property Status ──────────────────────────────────────────────────────────
export const STATUS_CONFIG: Record<
  PropertyStatus,
  { label: string; color: string; bgColor: string; textColor: string }
> = {
  disponivel: {
    label: "DISPONÍVEL",
    color: "#16a34a",
    bgColor: "#16a34a",
    textColor: "#ffffff",
  },
  reservado: {
    label: "RESERVADO",
    color: "#ca8a04",
    bgColor: "#ca8a04",
    textColor: "#ffffff",
  },
  em_negociacao: {
    label: "EM NEGOCIAÇÃO",
    color: "#ea580c",
    bgColor: "#ea580c",
    textColor: "#ffffff",
  },
  alugado: {
    label: "ALUGADO",
    color: "#2563eb",
    bgColor: "#2563eb",
    textColor: "#ffffff",
  },
  vendido: {
    label: "VENDIDO",
    color: "#dc2626",
    bgColor: "#dc2626",
    textColor: "#ffffff",
  },
  encerrado: {
    label: "ENCERRADO",
    color: "#6b7280",
    bgColor: "#6b7280",
    textColor: "#ffffff",
  },
};

// ─── Property Type Labels ─────────────────────────────────────────────────────
export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  casa: "Casa",
  apartamento: "Apartamento",
  terreno: "Terreno",
  comercial: "Comercial",
  rural: "Rural",
  outro: "Outro",
};

// ─── Listing Type Labels ──────────────────────────────────────────────────────
export const LISTING_TYPE_LABELS: Record<ListingType, string> = {
  venda: "Venda",
  aluguel: "Aluguel",
};

// ─── WhatsApp Message Builder ─────────────────────────────────────────────────
export function buildWhatsAppMessage(property: {
  code: string;
  title: string;
  price: number;
  listing_type: ListingType;
}): string {
  const priceLabel =
    property.listing_type === "aluguel"
      ? `${formatCurrency(property.price)}/mês`
      : formatCurrency(property.price);

  return encodeURIComponent(
    `Olá!\n\nTenho interesse neste imóvel.\n\nCódigo: ${property.code}\nTítulo: ${property.title}\nValor: ${priceLabel}\n\nGostaria de mais informações.`
  );
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  const cleanPhone = phone.replace(/\D/g, "");
  return `https://wa.me/${cleanPhone}?text=${message}`;
}

// ─── Slug Generator ───────────────────────────────────────────────────────────
export function generateSlug(title: string, code: string): string {
  const normalized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
  return `${normalized}-${code.toLowerCase()}`;
}

// ─── Area Formatting ──────────────────────────────────────────────────────────
export function formatArea(value: number | null): string {
  if (!value) return "—";
  return `${value.toLocaleString("pt-BR")} m²`;
}

// ─── Truncate Text ────────────────────────────────────────────────────────────
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// ─── Supabase configured check ────────────────────────────────────────────────
export function isSupabaseConfigured(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(
    url &&
    key &&
    url !== "https://placeholder.supabase.co" &&
    key !== "placeholder-key"
  );
}
