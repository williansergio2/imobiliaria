/**
 * Property Detail Page — /imovel/:slug
 * Design: Charcoal & Gold Prestige
 * - Image gallery with carousel
 * - Full property details
 * - WhatsApp button with auto message
 * - Google Maps integration
 */

import { useState } from "react";
import { useParams, useLocation } from "wouter";
import {
  Bed,
  Bath,
  Car,
  Maximize2,
  MapPin,
  Calendar,
  User,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  Home,
  Phone,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useProperty } from "@/hooks/useProperties";
import {
  formatCurrency,
  formatDate,
  formatArea,
  STATUS_CONFIG,
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/utils";
import { MapView } from "@/components/Map";

const WHATSAPP_NUMBER = "5511999999999";

export default function PropertyDetailPage() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const { property, images, loading, error } = useProperty(params.slug || "");
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const allImages =
    images.length > 0
      ? images.map((img) => img.url)
      : property?.main_image_url
      ? [property.main_image_url]
      : [];

  const handlePrevImage = () => {
    setActiveImage((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImage((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
        <Header />
        <div className="container pt-28 pb-16">
          <div className="skeleton h-8 w-48 mb-8" />
          <div className="skeleton h-96 w-full rounded-xl mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="skeleton h-10 w-3/4" />
              <div className="skeleton h-4 w-full" />
              <div className="skeleton h-4 w-2/3" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
        <Header />
        <div className="container pt-28 pb-16 text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: "oklch(0.72 0.12 75 / 10%)" }}
          >
            <Home size={32} className="text-[#C9A84C]" />
          </div>
          <h1
            className="text-3xl font-semibold text-[#F5F0E8] mb-3"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Imóvel não encontrado
          </h1>
          <p className="text-[#9A9A8A] mb-6">
            O imóvel que você está procurando não existe ou foi removido.
          </p>
          <button onClick={() => navigate("/imoveis/comprar")} className="btn-gold">
            <ArrowLeft size={16} />
            Ver todos os imóveis
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const status = STATUS_CONFIG[property.status];
  const priceLabel =
    property.listing_type === "aluguel"
      ? `${formatCurrency(property.price)}/mês`
      : formatCurrency(property.price);

  const waMessage = buildWhatsAppMessage(property);
  const waUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, waMessage);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
      <Header />

      <div className="container pt-24 pb-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#9A9A8A] mb-6">
          <a href="/" className="hover:text-[#C9A84C] transition-colors flex items-center gap-1">
            <Home size={12} />
            Home
          </a>
          <span>/</span>
          <a
            href={`/imoveis/${property.listing_type === "venda" ? "comprar" : "alugar"}`}
            className="hover:text-[#C9A84C] transition-colors"
          >
            {LISTING_TYPE_LABELS[property.listing_type]}
          </a>
          <span>/</span>
          <span className="text-[#C9A84C] truncate max-w-xs">{property.title}</span>
        </div>

        {/* Back button */}
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>

        {/* Image Gallery */}
        <div className="mb-8">
          {/* Main Image */}
          <div
            className="relative rounded-xl overflow-hidden mb-3 cursor-pointer"
            style={{ aspectRatio: "16/7" }}
            onClick={() => setLightboxOpen(true)}
          >
            {allImages.length > 0 ? (
              <img
                src={allImages[activeImage]}
                alt={property.title}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ background: "oklch(0.14 0.005 60)" }}
              >
                <Home size={48} className="text-[#9A9A8A]" />
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

            {/* Status badge */}
            <div className="absolute top-4 left-4">
              <span
                className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-widest text-white"
                style={{ background: status.bgColor }}
              >
                {status.label}
              </span>
            </div>

            {/* Code badge */}
            <div className="absolute top-4 right-4">
              <span
                className="px-3 py-1.5 rounded-md text-xs font-mono tracking-wider"
                style={{
                  background: "rgba(0,0,0,0.75)",
                  color: "oklch(0.72 0.12 75)",
                  border: "1px solid oklch(0.72 0.12 75 / 40%)",
                }}
              >
                {property.code}
              </span>
            </div>

            {/* Navigation arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                >
                  <ChevronLeft size={20} className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all"
                  style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                >
                  <ChevronRight size={20} className="text-white" />
                </button>
              </>
            )}

            {/* Image counter */}
            {allImages.length > 1 && (
              <div
                className="absolute bottom-4 right-4 px-3 py-1 rounded-full text-xs text-white"
                style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              >
                {activeImage + 1} / {allImages.length}
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className="flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden transition-all"
                  style={{
                    border:
                      i === activeImage
                        ? "2px solid oklch(0.72 0.12 75)"
                        : "2px solid transparent",
                    opacity: i === activeImage ? 1 : 0.6,
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title & Type */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[#C9A84C] uppercase tracking-widest font-medium">
                  {PROPERTY_TYPE_LABELS[property.property_type]}
                </span>
                <span className="text-[#9A9A8A]/50">·</span>
                <span className="text-xs text-[#9A9A8A] uppercase tracking-wider">
                  {LISTING_TYPE_LABELS[property.listing_type]}
                </span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-semibold text-[#F5F0E8] leading-tight"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {property.title}
              </h1>
              <div className="flex items-center gap-1.5 mt-3">
                <MapPin size={14} className="text-[#9A9A8A]" />
                <span className="text-sm text-[#9A9A8A]">
                  {property.neighborhood}, {property.city}
                  {property.address && ` — ${property.address}`}
                </span>
              </div>
            </div>

            {/* Features Grid */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl mb-6"
              style={{
                background: "oklch(0.14 0.005 60)",
                border: "1px solid oklch(0.72 0.12 75 / 20%)",
              }}
            >
              {property.bedrooms != null && property.bedrooms > 0 && (
                <FeatureDetail icon={<Bed size={18} />} value={property.bedrooms} label="Quartos" />
              )}
              {property.bathrooms != null && property.bathrooms > 0 && (
                <FeatureDetail icon={<Bath size={18} />} value={property.bathrooms} label="Banheiros" />
              )}
              {property.parking_spots != null && property.parking_spots > 0 && (
                <FeatureDetail icon={<Car size={18} />} value={property.parking_spots} label="Vagas" />
              )}
              {property.built_area && (
                <FeatureDetail
                  icon={<Maximize2 size={18} />}
                  value={formatArea(property.built_area)}
                  label="Área Construída"
                />
              )}
              {property.land_area && (
                <FeatureDetail
                  icon={<Maximize2 size={18} />}
                  value={formatArea(property.land_area)}
                  label="Área do Terreno"
                />
              )}
            </div>

            {/* Description */}
            {property.description && (
              <div className="mb-8">
                <h2
                  className="text-xl font-semibold text-[#F5F0E8] mb-4"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  Descrição
                </h2>
                <div className="gold-line-left mb-4" />
                <p className="text-[#9A9A8A] leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            )}

            {/* Details Table */}
            <div className="mb-8">
              <h2
                className="text-xl font-semibold text-[#F5F0E8] mb-4"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Detalhes do Imóvel
              </h2>
              <div className="gold-line-left mb-4" />
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.72 0.12 75 / 20%)" }}
              >
                {[
                  { label: "Código", value: property.code },
                  { label: "Tipo", value: PROPERTY_TYPE_LABELS[property.property_type] },
                  { label: "Modalidade", value: LISTING_TYPE_LABELS[property.listing_type] },
                  { label: "Status", value: status.label },
                  { label: "Cidade", value: property.city },
                  { label: "Bairro", value: property.neighborhood },
                  property.address ? { label: "Endereço", value: property.address } : null,
                  property.zip_code ? { label: "CEP", value: property.zip_code } : null,
                  property.built_area ? { label: "Área Construída", value: formatArea(property.built_area) } : null,
                  property.land_area ? { label: "Área do Terreno", value: formatArea(property.land_area) } : null,
                  property.bedrooms ? { label: "Quartos", value: property.bedrooms } : null,
                  property.bathrooms ? { label: "Banheiros", value: property.bathrooms } : null,
                  property.parking_spots ? { label: "Vagas", value: property.parking_spots } : null,
                  property.published_at ? { label: "Publicado em", value: formatDate(property.published_at) } : null,
                ]
                  .filter(Boolean)
                  .map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-4 py-3 ${
                        i % 2 === 0 ? "bg-transparent" : ""
                      }`}
                      style={
                        i % 2 !== 0
                          ? { background: "oklch(0.14 0.005 60)" }
                          : {}
                      }
                    >
                      <span className="text-xs text-[#9A9A8A] uppercase tracking-wider">
                        {item!.label}
                      </span>
                      <span className="text-sm text-[#F5F0E8] font-medium">
                        {String(item!.value)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Map */}
            {property.address && (
              <div className="mb-8">
                <h2
                  className="text-xl font-semibold text-[#F5F0E8] mb-4"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  Localização
                </h2>
                <div className="gold-line-left mb-4" />
                <div
                  className="rounded-xl overflow-hidden"
                  style={{ height: 300, border: "1px solid oklch(0.72 0.12 75 / 20%)" }}
                >
                  <MapView
                    onMapReady={(map: google.maps.Map) => {
                      const geocoder = new google.maps.Geocoder();
                      const address = `${property.address}, ${property.neighborhood}, ${property.city}`;
                      geocoder.geocode({ address }, (results, status) => {
                        if (status === "OK" && results?.[0]) {
                          map.setCenter(results[0].geometry.location);
                          map.setZoom(15);
                          new google.maps.Marker({
                            position: results[0].geometry.location,
                            map,
                            title: property.title,
                          });
                        }
                      });
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div
              className="sticky top-24 rounded-xl p-6"
              style={{
                background: "oklch(0.14 0.005 60)",
                border: "1px solid oklch(0.72 0.12 75 / 25%)",
              }}
            >
              {/* Price */}
              <div className="mb-6">
                <div className="text-xs text-[#9A9A8A] uppercase tracking-wider mb-1">
                  {property.listing_type === "aluguel" ? "Aluguel mensal" : "Valor"}
                </div>
                <div
                  className="text-3xl font-bold text-[#C9A84C]"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  {priceLabel}
                </div>
              </div>

              <div className="gold-line mb-6" />

              {/* Agent */}
              {property.agent_name && (
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0F0F0F]"
                    style={{ background: "oklch(0.72 0.12 75)" }}
                  >
                    {property.agent_name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-xs text-[#9A9A8A] uppercase tracking-wider">
                      Corretor responsável
                    </div>
                    <div className="text-sm font-medium text-[#F5F0E8]">
                      {property.agent_name}
                    </div>
                  </div>
                </div>
              )}

              {/* WhatsApp CTA */}
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full justify-center mb-3"
              >
                <Phone size={18} />
                Falar no WhatsApp
              </a>

              <p className="text-xs text-[#9A9A8A] text-center leading-relaxed">
                Mensagem automática com os dados do imóvel será enviada
              </p>

              <div className="gold-line my-5" />

              {/* Quick info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#9A9A8A]">
                  <MapPin size={13} className="text-[#C9A84C]" />
                  {property.neighborhood}, {property.city}
                </div>
                {property.published_at && (
                  <div className="flex items-center gap-2 text-xs text-[#9A9A8A]">
                    <Calendar size={13} className="text-[#C9A84C]" />
                    Publicado em {formatDate(property.published_at)}
                  </div>
                )}
                {property.agent_name && (
                  <div className="flex items-center gap-2 text-xs text-[#9A9A8A]">
                    <User size={13} className="text-[#C9A84C]" />
                    {property.agent_name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && allImages.length > 0 && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.95)" }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={() => setLightboxOpen(false)}
          >
            <X size={20} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
          >
            <ChevronLeft size={24} />
          </button>

          <img
            src={allImages[activeImage]}
            alt={property.title}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white"
            style={{ background: "rgba(255,255,255,0.1)" }}
            onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 text-white/60 text-sm">
            {activeImage + 1} / {allImages.length}
          </div>
        </div>
      )}

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

function FeatureDetail({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 py-2">
      <div className="text-[#C9A84C]">{icon}</div>
      <div
        className="text-lg font-semibold text-[#F5F0E8]"
        style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
      >
        {value}
      </div>
      <div className="text-[10px] text-[#9A9A8A] uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  );
}
