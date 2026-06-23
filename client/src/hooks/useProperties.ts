/**
 * useProperties hook — fetches from Supabase or falls back to mock data
 * Design: Charcoal & Gold Prestige
 */

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Property, PropertyImage, ListingType, PropertyStatus, PropertyType } from "@/lib/supabase";
import { MOCK_PROPERTIES, MOCK_PROPERTY_IMAGES } from "@/lib/mockData";
import { isSupabaseConfigured } from "@/lib/utils";

export interface PropertyFilters {
  listing_type?: ListingType;
  city?: string;
  neighborhood?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  parking_spots?: number;
  property_type?: PropertyType;
  status?: PropertyStatus;
  search?: string;
  featured?: boolean;
}

export function useProperties(filters?: PropertyFilters) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      // Use mock data
      let filtered = [...MOCK_PROPERTIES];

      if (filters?.listing_type) {
        filtered = filtered.filter((p) => p.listing_type === filters.listing_type);
      }
      if (filters?.city) {
        filtered = filtered.filter((p) =>
          p.city.toLowerCase().includes(filters.city!.toLowerCase())
        );
      }
      if (filters?.neighborhood) {
        filtered = filtered.filter((p) =>
          p.neighborhood.toLowerCase().includes(filters.neighborhood!.toLowerCase())
        );
      }
      if (filters?.min_price) {
        filtered = filtered.filter((p) => p.price >= filters.min_price!);
      }
      if (filters?.max_price) {
        filtered = filtered.filter((p) => p.price <= filters.max_price!);
      }
      if (filters?.bedrooms) {
        filtered = filtered.filter((p) => (p.bedrooms ?? 0) >= filters.bedrooms!);
      }
      if (filters?.bathrooms) {
        filtered = filtered.filter((p) => (p.bathrooms ?? 0) >= filters.bathrooms!);
      }
      if (filters?.parking_spots) {
        filtered = filtered.filter((p) => (p.parking_spots ?? 0) >= filters.parking_spots!);
      }
      if (filters?.property_type) {
        filtered = filtered.filter((p) => p.property_type === filters.property_type);
      }
      if (filters?.status) {
        filtered = filtered.filter((p) => p.status === filters.status);
      }
      if (filters?.featured) {
        filtered = filtered.filter((p) => p.featured);
      }
      if (filters?.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.code.toLowerCase().includes(q) ||
            p.title.toLowerCase().includes(q) ||
            p.city.toLowerCase().includes(q) ||
            p.neighborhood.toLowerCase().includes(q)
        );
      }

      setProperties(filtered);
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (filters?.listing_type) query = query.eq("listing_type", filters.listing_type);
      if (filters?.city) query = query.ilike("city", `%${filters.city}%`);
      if (filters?.neighborhood) query = query.ilike("neighborhood", `%${filters.neighborhood}%`);
      if (filters?.min_price) query = query.gte("price", filters.min_price);
      if (filters?.max_price) query = query.lte("price", filters.max_price);
      if (filters?.bedrooms) query = query.gte("bedrooms", filters.bedrooms);
      if (filters?.bathrooms) query = query.gte("bathrooms", filters.bathrooms);
      if (filters?.parking_spots) query = query.gte("parking_spots", filters.parking_spots);
      if (filters?.property_type) query = query.eq("property_type", filters.property_type);
      if (filters?.status) query = query.eq("status", filters.status);
      if (filters?.featured) query = query.eq("featured", true);
      if (filters?.search) {
        query = query.or(
          `code.ilike.%${filters.search}%,title.ilike.%${filters.search}%,city.ilike.%${filters.search}%,neighborhood.ilike.%${filters.search}%`
        );
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProperties((data as Property[]) || []);
    } catch (err) {
      setError("Erro ao carregar imóveis. Verifique sua conexão.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters?.listing_type, filters?.city, filters?.neighborhood, filters?.min_price, filters?.max_price, filters?.bedrooms, filters?.bathrooms, filters?.parking_spots, filters?.property_type, filters?.status, filters?.featured, filters?.search]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  return { properties, loading, error, refetch: fetchProperties };
}

export function useProperty(slugOrCode: string) {
  const [property, setProperty] = useState<Property | null>(null);
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      setError(null);

      if (!isSupabaseConfigured()) {
        const found = MOCK_PROPERTIES.find(
          (p) => p.slug === slugOrCode || p.code === slugOrCode || p.id === slugOrCode
        );
        setProperty(found || null);
        if (found) {
          setImages(MOCK_PROPERTY_IMAGES[found.id] || []);
        }
        setLoading(false);
        return;
      }

      try {
        const { data: propData, error: propError } = await supabase
          .from("properties")
          .select("*")
          .or(`slug.eq.${slugOrCode},code.eq.${slugOrCode},id.eq.${slugOrCode}`)
          .single();

        if (propError) throw propError;
        setProperty(propData as Property);

        const { data: imgData } = await supabase
          .from("property_images")
          .select("*")
          .eq("property_id", propData.id)
          .order("order_index");

        setImages((imgData as PropertyImage[]) || []);
      } catch (err) {
        setError("Imóvel não encontrado.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slugOrCode) fetchProperty();
  }, [slugOrCode]);

  return { property, images, loading, error };
}
