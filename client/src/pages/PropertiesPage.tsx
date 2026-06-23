/**
 * Properties Listing Page — /imoveis/comprar and /imoveis/alugar
 * Design: Charcoal & Gold Prestige
 * - Full filter sidebar
 * - Search by code, title, city, neighborhood
 * - Status ribbons on cards
 */

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Home,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import type {
  PropertyStatus,
  PropertyType,
  ListingType,
} from "@/lib/supabase";
import { PROPERTY_TYPE_LABELS, LISTING_TYPE_LABELS } from "@/lib/utils";

interface PropertiesPageProps {
  listingType: ListingType;
}

export default function PropertiesPage({ listingType }: PropertiesPageProps) {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [parkingSpots, setParkingSpots] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyType | "">("");
  const [status, setStatus] = useState<PropertyStatus | "">("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Read URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("search")) setSearch(params.get("search")!);
    if (params.get("city")) setCity(params.get("city")!);
    if (params.get("neighborhood")) setNeighborhood(params.get("neighborhood")!);
  }, []);

  const { properties, loading, error } = useProperties({
    listing_type: listingType,
    search: search || undefined,
    city: city || undefined,
    neighborhood: neighborhood || undefined,
    min_price: minPrice ? Number(minPrice) : undefined,
    max_price: maxPrice ? Number(maxPrice) : undefined,
    bedrooms: bedrooms ? Number(bedrooms) : undefined,
    bathrooms: bathrooms ? Number(bathrooms) : undefined,
    parking_spots: parkingSpots ? Number(parkingSpots) : undefined,
    property_type: propertyType || undefined,
    status: status || undefined,
  });

  const clearFilters = () => {
    setSearch("");
    setCity("");
    setNeighborhood("");
    setMinPrice("");
    setMaxPrice("");
    setBedrooms("");
    setBathrooms("");
    setParkingSpots("");
    setPropertyType("");
    setStatus("");
  };

  const hasActiveFilters =
    search || city || neighborhood || minPrice || maxPrice ||
    bedrooms || bathrooms || parkingSpots || propertyType || status;

  const pageTitle =
    listingType === "venda" ? "Imóveis para Comprar" : "Imóveis para Alugar";
  const pageSubtitle =
    listingType === "venda"
      ? "Encontre a casa ou apartamento dos seus sonhos"
      : "Encontre o imóvel ideal para alugar";

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
      <Header />

      {/* Page Header */}
      <div
        className="relative pt-24 pb-12 overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.12 0.005 60), oklch(0.10 0.005 60))",
          borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)",
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.72 0.12 75), transparent)",
              filter: "blur(80px)",
            }}
          />
        </div>
        <div className="container relative">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#9A9A8A] mb-4">
            <a href="/" className="hover:text-[#C9A84C] transition-colors flex items-center gap-1">
              <Home size={12} />
              Home
            </a>
            <span>/</span>
            <span className="text-[#C9A84C]">{pageTitle}</span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-semibold text-[#F5F0E8] mb-2"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            {pageTitle}
          </h1>
          <p className="text-[#9A9A8A]">{pageSubtitle}</p>

          {/* Quick search bar */}
          <div className="mt-6 flex gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A8A]"
              />
              <input
                type="text"
                placeholder="Buscar por código, título, cidade ou bairro..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-premium pl-9 w-full"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A8A] hover:text-[#F5F0E8]"
                >
                  <X size={14} />
                </button>
              )}
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                filtersOpen || hasActiveFilters
                  ? "text-[#0F0F0F] bg-[#C9A84C]"
                  : "text-[#F5F0E8] border border-[#C9A84C]/40 hover:border-[#C9A84C]"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filtros
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-[#0F0F0F] text-[#C9A84C] text-[10px] font-bold flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          filtersOpen ? "max-h-[600px]" : "max-h-0"
        }`}
        style={{ background: "oklch(0.13 0.005 60)", borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)" }}
      >
        <div className="container py-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <FilterInput
              label="Cidade"
              value={city}
              onChange={setCity}
              placeholder="Ex: São Paulo"
            />
            <FilterInput
              label="Bairro"
              value={neighborhood}
              onChange={setNeighborhood}
              placeholder="Ex: Jardins"
            />
            <FilterInput
              label="Preço mínimo"
              value={minPrice}
              onChange={setMinPrice}
              placeholder="R$ 0"
              type="number"
            />
            <FilterInput
              label="Preço máximo"
              value={maxPrice}
              onChange={setMaxPrice}
              placeholder="Sem limite"
              type="number"
            />
            <FilterSelect
              label="Quartos"
              value={bedrooms}
              onChange={setBedrooms}
              options={[
                { value: "", label: "Qualquer" },
                { value: "1", label: "1+" },
                { value: "2", label: "2+" },
                { value: "3", label: "3+" },
                { value: "4", label: "4+" },
              ]}
            />
            <FilterSelect
              label="Banheiros"
              value={bathrooms}
              onChange={setBathrooms}
              options={[
                { value: "", label: "Qualquer" },
                { value: "1", label: "1+" },
                { value: "2", label: "2+" },
                { value: "3", label: "3+" },
              ]}
            />
            <FilterSelect
              label="Vagas"
              value={parkingSpots}
              onChange={setParkingSpots}
              options={[
                { value: "", label: "Qualquer" },
                { value: "1", label: "1+" },
                { value: "2", label: "2+" },
                { value: "3", label: "3+" },
              ]}
            />
            <FilterSelect
              label="Tipo de imóvel"
              value={propertyType}
              onChange={(v) => setPropertyType(v as PropertyType | "")}
              options={[
                { value: "", label: "Todos" },
                ...Object.entries(PROPERTY_TYPE_LABELS).map(([k, v]) => ({
                  value: k,
                  label: v,
                })),
              ]}
            />
            <FilterSelect
              label="Status"
              value={status}
              onChange={(v) => setStatus(v as PropertyStatus | "")}
              options={[
                { value: "", label: "Todos" },
                { value: "disponivel", label: "Disponível" },
                { value: "reservado", label: "Reservado" },
                { value: "em_negociacao", label: "Em Negociação" },
                { value: "alugado", label: "Alugado" },
                { value: "vendido", label: "Vendido" },
                { value: "encerrado", label: "Encerrado" },
              ]}
            />
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="mt-4 flex items-center gap-2 text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors"
            >
              <X size={14} />
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container py-10 flex-1">
        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-[#9A9A8A]">
            {loading ? (
              "Carregando..."
            ) : (
              <>
                <span className="text-[#C9A84C] font-semibold">{properties.length}</span>{" "}
                {properties.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}
              </>
            )}
          </p>

          {/* Toggle listing type */}
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: "1px solid oklch(0.72 0.12 75 / 30%)" }}
          >
            <button
              onClick={() => setLocation("/imoveis/comprar")}
              className={`px-4 py-2 text-xs font-medium transition-all ${
                listingType === "venda"
                  ? "bg-[#C9A84C] text-[#0F0F0F]"
                  : "text-[#9A9A8A] hover:text-[#F5F0E8]"
              }`}
            >
              Comprar
            </button>
            <button
              onClick={() => setLocation("/imoveis/alugar")}
              className={`px-4 py-2 text-xs font-medium transition-all ${
                listingType === "aluguel"
                  ? "bg-[#C9A84C] text-[#0F0F0F]"
                  : "text-[#9A9A8A] hover:text-[#F5F0E8]"
              }`}
            >
              Alugar
            </button>
          </div>
        </div>

        {error && (
          <div
            className="p-4 rounded-lg mb-6 text-sm text-red-400"
            style={{ background: "oklch(0.50 0.20 25 / 10%)", border: "1px solid oklch(0.50 0.20 25 / 30%)" }}
          >
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl overflow-hidden">
                <div className="skeleton h-48" />
                <div className="p-4 space-y-3" style={{ background: "oklch(0.14 0.005 60)" }}>
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-3 w-1/2" />
                  <div className="skeleton h-8 w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          <div className="text-center py-20">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "oklch(0.72 0.12 75 / 10%)" }}
            >
              <Search size={24} className="text-[#C9A84C]" />
            </div>
            <h3
              className="text-xl font-semibold text-[#F5F0E8] mb-2"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Nenhum imóvel encontrado
            </h3>
            <p className="text-[#9A9A8A] text-sm mb-6">
              Tente ajustar os filtros ou entre em contato conosco.
            </p>
            <button onClick={clearFilters} className="btn-outline-gold">
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

// ─── Filter Components ────────────────────────────────────────────────────────
function FilterInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] text-[#9A9A8A] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-premium text-sm w-full"
      />
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-[10px] text-[#9A9A8A] uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input-premium text-sm w-full appearance-none pr-8"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: "#1E1E1E" }}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A8A] pointer-events-none"
        />
      </div>
    </div>
  );
}
