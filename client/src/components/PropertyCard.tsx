/**
 * PropertyCard Component — Premium card with status ribbon
 * Design: Charcoal & Gold Prestige
 * - Status ribbon diagonal over photo
 * - Gold hover glow
 * - Agent name (small, discreet)
 */

import { Link } from "wouter";
import { MapPin, Bed, Bath, Car, Maximize2 } from "lucide-react";
import type { Property } from "@/lib/supabase";
import {
  formatCurrency,
  STATUS_CONFIG,
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
} from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const status = STATUS_CONFIG[property.status];
  const detailUrl = `/imovel/${property.slug || property.code}`;

  const priceLabel =
    property.listing_type === "aluguel"
      ? `${formatCurrency(property.price)}/mês`
      : formatCurrency(property.price);

  return (
    <div className="property-card group">
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
        <img
          src={
            property.main_image_url ||
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"
          }
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status Ribbon */}
        <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden">
          <div
            className="status-ribbon text-white"
            style={{ backgroundColor: status.bgColor }}
          >
            {status.label}
          </div>
        </div>

        {/* Listing Type Badge */}
        <div className="absolute top-3 right-3">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm"
            style={{
              background:
                property.listing_type === "venda"
                  ? "oklch(0.72 0.12 75)"
                  : "oklch(0.50 0.20 25)",
              color: "oklch(0.10 0.005 60)",
            }}
          >
            {LISTING_TYPE_LABELS[property.listing_type]}
          </span>
        </div>

        {/* Code Badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="text-[10px] font-mono tracking-wider px-2 py-1 rounded-sm"
            style={{
              background: "rgba(0,0,0,0.7)",
              color: "oklch(0.72 0.12 75)",
              border: "1px solid oklch(0.72 0.12 75 / 40%)",
            }}
          >
            {property.code}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type + Title */}
        <div className="mb-2">
          <span className="text-[11px] text-[#C9A84C] uppercase tracking-widest font-medium">
            {PROPERTY_TYPE_LABELS[property.property_type]}
          </span>
          <h3
            className="text-base font-semibold text-[#F5F0E8] mt-0.5 leading-snug line-clamp-2"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            {property.title}
          </h3>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-3">
          <MapPin size={12} className="text-[#9A9A8A] flex-shrink-0" />
          <span className="text-xs text-[#9A9A8A] truncate">
            {property.neighborhood}, {property.city}
          </span>
        </div>

        {/* Features */}
        {(property.bedrooms || property.bathrooms || property.parking_spots || property.built_area) && (
          <div className="flex items-center gap-3 mb-3 pb-3 border-b border-[#C9A84C]/15">
            {property.bedrooms != null && property.bedrooms > 0 && (
              <FeatureItem icon={<Bed size={12} />} value={property.bedrooms} label="qts" />
            )}
            {property.bathrooms != null && property.bathrooms > 0 && (
              <FeatureItem icon={<Bath size={12} />} value={property.bathrooms} label="ban" />
            )}
            {property.parking_spots != null && property.parking_spots > 0 && (
              <FeatureItem icon={<Car size={12} />} value={property.parking_spots} label="vgs" />
            )}
            {property.built_area && (
              <FeatureItem
                icon={<Maximize2 size={12} />}
                value={`${property.built_area}m²`}
                label=""
              />
            )}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-end justify-between gap-2">
          <div>
            <div className="text-[11px] text-[#9A9A8A] mb-0.5">
              {property.listing_type === "aluguel" ? "Aluguel" : "Valor"}
            </div>
            <div
              className="text-lg font-bold text-[#C9A84C]"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              {priceLabel}
            </div>
          </div>

          <Link
            href={detailUrl}
            className="btn-outline-gold text-xs px-4 py-2 flex-shrink-0"
          >
            Ver Detalhes
          </Link>
        </div>

        {/* Agent */}
        {property.agent_name && (
          <div className="mt-2 pt-2 border-t border-[#C9A84C]/10">
            <span className="text-[10px] text-[#9A9A8A]/60">
              Corretor: {property.agent_name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function FeatureItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1 text-[#9A9A8A]">
      {icon}
      <span className="text-xs">
        {value}
        {label && <span className="text-[10px] ml-0.5">{label}</span>}
      </span>
    </div>
  );
}
