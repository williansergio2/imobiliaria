/**
 * Home Page — ImóvelPrime
 * Design: Charcoal & Gold Prestige
 * Sections: Hero, Quick Search, Featured Properties, About, Differentials, Testimonials, Contact
 */

import { useState } from "react";
import { useLocation } from "wouter";
import {
  Search,
  ArrowRight,
  Phone,
  Shield,
  Star,
  Clock,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  MapPin,
  Mail,
  Send,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import PropertyCard from "@/components/PropertyCard";
import { useProperties } from "@/hooks/useProperties";
import { MOCK_TESTIMONIALS } from "@/lib/mockData";
import { MapView } from "@/components/Map";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent(
  "Olá! Gostaria de informações sobre imóveis disponíveis."
);

export default function Home() {
  const [, navigate] = useLocation();
  const [searchCode, setSearchCode] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchNeighborhood, setSearchNeighborhood] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [contactSent, setContactSent] = useState(false);

  const { properties: featuredProperties, loading: featuredLoading } =
    useProperties({ featured: true });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchCode) params.set("search", searchCode);
    if (searchCity) params.set("city", searchCity);
    if (searchNeighborhood) params.set("neighborhood", searchNeighborhood);
    navigate(`/imoveis/comprar?${params.toString()}`);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, send to Supabase or email service
    setContactSent(true);
    setTimeout(() => setContactSent(false), 5000);
    setContactForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
      <Header />

      {/* ─── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310519663776255515/Y24dj4zK4qnVXuNjCoSvoL/hero-mansion-QCmLK6jmHtWC7bSGxetC5R.webp"
            alt="Imóvel de alto padrão"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
        </div>

        {/* Content */}
        <div className="relative container pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Label */}
            <div className="flex items-center gap-2 mb-6 animate-fade-in-up">
              <div className="h-px w-8 bg-[#C9A84C]" />
              <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em] font-medium">
                Imóveis Premium
              </span>
            </div>

            {/* Title */}
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6 animate-fade-in-up animate-delay-100"
              style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
            >
              Encontre o imóvel{" "}
              <span className="text-gold-shimmer">ideal</span> para morar,
              investir ou alugar.
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-white/70 leading-relaxed mb-8 max-w-xl animate-fade-in-up animate-delay-200">
              Especialistas em locação e venda de imóveis com atendimento
              rápido, transparente e profissional.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up animate-delay-300">
              <a href="#imoveis-destaque" className="btn-gold text-sm px-7 py-3.5">
                Ver Imóveis
                <ArrowRight size={16} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp text-sm px-7 py-3.5"
              >
                <Phone size={16} />
                Falar no WhatsApp
              </a>
            </div>

            {/* Quick Search */}
            <div
              className="rounded-xl p-5 animate-fade-in-up animate-delay-400"
              style={{
                background: "rgba(0,0,0,0.6)",
                backdropFilter: "blur(12px)",
                border: "1px solid oklch(0.72 0.12 75 / 30%)",
              }}
            >
              <p className="text-xs text-[#C9A84C] uppercase tracking-widest mb-3 font-medium">
                Pesquisa Rápida
              </p>
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Código (ex: IMV-1001)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value)}
                  className="input-premium flex-1 text-sm"
                />
                <input
                  type="text"
                  placeholder="Cidade"
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="input-premium flex-1 text-sm"
                />
                <input
                  type="text"
                  placeholder="Bairro"
                  value={searchNeighborhood}
                  onChange={(e) => setSearchNeighborhood(e.target.value)}
                  className="input-premium flex-1 text-sm"
                />
                <button type="submit" className="btn-gold px-5 py-3 flex-shrink-0">
                  <Search size={16} />
                  <span className="hidden sm:inline">Buscar</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/60 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]/60" />
        </div>
      </section>

      {/* ─── FEATURED PROPERTIES ──────────────────────────────────────────── */}
      <section id="imoveis-destaque" className="py-20">
        <div className="container">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-[#C9A84C]" />
                <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">
                  Seleção Especial
                </span>
              </div>
              <h2 className="section-title">Imóveis em Destaque</h2>
            </div>
            <a
              href="/imoveis/comprar"
              className="hidden sm:flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E8C96B] transition-colors"
            >
              Ver todos
              <ArrowRight size={14} />
            </a>
          </div>

          {featuredLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.slice(0, 6).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <a href="/imoveis/comprar" className="btn-outline-gold">
              Ver todos os imóveis
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── ABOUT SECTION ────────────────────────────────────────────────── */}
      <section id="sobre" className="py-20" style={{ background: "oklch(0.12 0.005 60)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div
                className="absolute -inset-4 rounded-2xl opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at center, oklch(0.72 0.12 75) 0%, transparent 70%)",
                }}
              />
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663776255515/Y24dj4zK4qnVXuNjCoSvoL/about-office-SNFKq5BH9U7WSh85zNa8Go.webp"
                alt="Escritório ImóvelPrime"
                className="relative rounded-xl w-full object-cover"
                style={{
                  aspectRatio: "4/3",
                  border: "1px solid oklch(0.72 0.12 75 / 25%)",
                }}
              />
              {/* Stats overlay */}
              <div
                className="absolute -bottom-6 -right-4 p-5 rounded-xl"
                style={{
                  background: "oklch(0.14 0.005 60)",
                  border: "1px solid oklch(0.72 0.12 75 / 40%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <div className="text-3xl font-bold text-[#C9A84C]" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
                  +10
                </div>
                <div className="text-xs text-[#9A9A8A] mt-1">
                  Anos de experiência
                </div>
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6 bg-[#C9A84C]" />
                <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">
                  Sobre Nós
                </span>
              </div>
              <h2 className="section-title mb-6">
                Mais de uma década conectando pessoas aos seus imóveis ideais
              </h2>
              <p className="text-[#9A9A8A] leading-relaxed mb-4">
                A <strong className="text-[#F5F0E8]">ImóvelPrime</strong> é uma
                imobiliária especializada em locação e venda de imóveis
                residenciais e comerciais. Com mais de 10 anos de experiência no
                mercado, nossa equipe de corretores certificados está pronta para
                encontrar o imóvel ideal para você.
              </p>
              <p className="text-[#9A9A8A] leading-relaxed mb-8">
                Atuamos com total transparência, segurança jurídica e agilidade
                em cada etapa do processo. Nosso compromisso é com a satisfação
                completa de cada cliente, seja na compra, venda ou locação.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { value: "500+", label: "Imóveis negociados" },
                  { value: "98%", label: "Clientes satisfeitos" },
                  { value: "30 dias", label: "Tempo médio de venda" },
                  { value: "15", label: "Corretores especializados" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="p-4 rounded-lg"
                    style={{
                      background: "oklch(0.16 0.005 60)",
                      border: "1px solid oklch(0.72 0.12 75 / 20%)",
                    }}
                  >
                    <div
                      className="text-2xl font-bold text-[#C9A84C]"
                      style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-[#9A9A8A] mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              <a href="/sobre" className="btn-gold">
                Conheça nossa história
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIFFERENTIALS ────────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-6 bg-[#C9A84C]" />
              <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">
                Por que nos escolher
              </span>
              <div className="h-px w-6 bg-[#C9A84C]" />
            </div>
            <h2 className="section-title">Nossos Diferenciais</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DIFFERENTIALS.map((item, i) => (
              <DifferentialCard key={i} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: "oklch(0.12 0.005 60)" }}>
        <div className="container">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-6 bg-[#C9A84C]" />
              <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">
                Depoimentos
              </span>
              <div className="h-px w-6 bg-[#C9A84C]" />
            </div>
            <h2 className="section-title">O que dizem nossos clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-xl"
                style={{
                  background: "oklch(0.14 0.005 60)",
                  border: "1px solid oklch(0.72 0.12 75 / 20%)",
                }}
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                  ))}
                </div>

                <p className="text-[#9A9A8A] text-sm leading-relaxed mb-5 italic">
                  "{t.text}"
                </p>

                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0F0F0F]"
                    style={{ background: "oklch(0.72 0.12 75)" }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#F5F0E8]">
                      {t.name}
                    </div>
                    <div className="text-xs text-[#9A9A8A]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT SECTION ──────────────────────────────────────────────── */}
      <section id="contato" className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6 bg-[#C9A84C]" />
                <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">
                  Fale Conosco
                </span>
              </div>
              <h2 className="section-title mb-4">Entre em contato</h2>
              <p className="text-[#9A9A8A] leading-relaxed mb-8">
                Nossa equipe está disponível para atendê-lo de segunda a
                sábado, das 8h às 18h. Entre em contato e encontre o imóvel
                ideal para você.
              </p>

              <div className="space-y-4 mb-8">
                <ContactItem icon={<MapPin size={18} />}>
                  Av. Paulista, 1000 — Bela Vista, São Paulo — SP
                </ContactItem>
                <ContactItem icon={<Phone size={18} />}>
                  <a href="tel:+5511999999999" className="hover:text-[#C9A84C] transition-colors">
                    (11) 99999-9999
                  </a>
                </ContactItem>
                <ContactItem icon={<Mail size={18} />}>
                  <a
                    href="mailto:contato@imovelprime.com.br"
                    className="hover:text-[#C9A84C] transition-colors"
                  >
                    contato@imovelprime.com.br
                  </a>
                </ContactItem>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex"
              >
                <Phone size={16} />
                Falar no WhatsApp
              </a>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden" style={{ height: 240, border: "1px solid oklch(0.72 0.12 75 / 20%)" }}>
                <MapView
                  onMapReady={(map: google.maps.Map) => {
                    const geocoder = new google.maps.Geocoder();
                    geocoder.geocode(
                      { address: "Av. Paulista, 1000, São Paulo, SP" },
                      (results, status) => {
                        if (status === "OK" && results?.[0]) {
                          map.setCenter(results[0].geometry.location);
                          map.setZoom(15);
                          new google.maps.Marker({
                            position: results[0].geometry.location,
                            map,
                            title: "ImóvelPrime",
                          });
                        }
                      }
                    );
                  }}
                />
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="p-8 rounded-xl"
              style={{
                background: "oklch(0.14 0.005 60)",
                border: "1px solid oklch(0.72 0.12 75 / 20%)",
              }}
            >
              <h3
                className="text-2xl font-semibold text-[#F5F0E8] mb-6"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Envie uma mensagem
              </h3>

              {contactSent ? (
                <div
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    background: "oklch(0.16 0.08 145 / 20%)",
                    border: "1px solid oklch(0.56 0.18 145 / 40%)",
                  }}
                >
                  <CheckCircle size={20} className="text-green-400" />
                  <p className="text-green-400 text-sm">
                    Mensagem enviada com sucesso! Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, name: e.target.value })
                      }
                      className="input-premium"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, phone: e.target.value })
                        }
                        className="input-premium"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                        className="input-premium"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                      Mensagem *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      className="input-premium resize-none"
                      placeholder="Como podemos ajudar você?"
                    />
                  </div>
                  <button type="submit" className="btn-gold w-full justify-center">
                    <Send size={16} />
                    Enviar Mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

// ─── Differential Card ────────────────────────────────────────────────────────
function DifferentialCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="p-6 rounded-xl group transition-all duration-250 hover:-translate-y-1"
      style={{
        background: "oklch(0.14 0.005 60)",
        border: "1px solid oklch(0.72 0.12 75 / 20%)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.72 0.12 75 / 50%)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 24px oklch(0.72 0.12 75 / 10%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.72 0.12 75 / 20%)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      <div
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-[#C9A84C]"
        style={{ background: "oklch(0.72 0.12 75 / 12%)" }}
      >
        {icon}
      </div>
      <h3
        className="text-lg font-semibold text-[#F5F0E8] mb-2"
        style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
      >
        {title}
      </h3>
      <p className="text-sm text-[#9A9A8A] leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Contact Item ─────────────────────────────────────────────────────────────
function ContactItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-[#C9A84C] mt-0.5 flex-shrink-0">{icon}</div>
      <span className="text-[#9A9A8A] text-sm leading-relaxed">{children}</span>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const DIFFERENTIALS = [
  {
    icon: <Users size={22} />,
    title: "Atendimento Personalizado",
    description:
      "Cada cliente recebe atenção exclusiva. Entendemos suas necessidades para encontrar o imóvel perfeito.",
  },
  {
    icon: <Shield size={22} />,
    title: "Segurança Jurídica",
    description:
      "Toda a documentação é verificada e acompanhada por nossa equipe jurídica especializada.",
  },
  {
    icon: <Award size={22} />,
    title: "Especialistas em Locação",
    description:
      "Mais de 10 anos de experiência em locação residencial e comercial na região.",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Avaliação de Imóveis",
    description:
      "Avaliação precisa e baseada no mercado atual para garantir o melhor preço para seu imóvel.",
  },
  {
    icon: <CheckCircle size={22} />,
    title: "Suporte Completo",
    description:
      "Acompanhamento em todas as etapas: da visita à assinatura do contrato e além.",
  },
  {
    icon: <Clock size={22} />,
    title: "Agilidade no Atendimento",
    description:
      "Resposta rápida e eficiente. Nosso time está disponível para atendê-lo quando precisar.",
  },
];
