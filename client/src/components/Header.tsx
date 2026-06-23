/**
 * Header Component — Fixed, premium navigation
 * Design: Charcoal & Gold Prestige
 * - Logo left, menu centered, WhatsApp button right
 * - Transparent on top, solid charcoal on scroll
 * - Imóveis submenu on hover
 */

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de informações sobre imóveis.");

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const isActive = (path: string) => location === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-[#0F0F0F]/95 backdrop-blur-xl border-b border-[#C9A84C]/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663776255515/Y24dj4zK4qnVXuNjCoSvoL/logo-icon-JsYW9DcKwRYLNaMm2hkTP8.png"
              alt="ImóvelPrime"
              className="w-9 h-9 object-contain transition-transform duration-200 group-hover:scale-105"
            />
            <div className="flex flex-col leading-none">
              <span
                className="font-display text-lg font-semibold text-[#C9A84C] tracking-wide"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                ImóvelPrime
              </span>
              <span className="text-[10px] text-[#9A9A8A] tracking-widest uppercase font-sans">
                Imóveis Premium
              </span>
            </div>
          </Link>

          {/* Desktop Navigation — Centered */}
          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            <NavLink href="/" active={isActive("/")}>
              Home
            </NavLink>
            <NavLink href="/sobre" active={isActive("/sobre")}>
              Sobre Nós
            </NavLink>

            {/* Imóveis Dropdown */}
            <div className="relative group">
              <button
                className={`flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  location.startsWith("/imoveis")
                    ? "text-[#C9A84C]"
                    : "text-[#F5F0E8]/80 hover:text-[#C9A84C]"
                }`}
              >
                Imóveis
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 group-hover:rotate-180`}
                />
              </button>

              {/* Espaço invisível que mantém o hover ativo */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-44 h-3 pointer-events-auto" />

              {/* Submenu - sempre renderizado, mas invisível */}
              <div
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 rounded-lg overflow-hidden invisible group-hover:visible opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-200 origin-top pointer-events-none group-hover:pointer-events-auto z-50"
                style={{
                  background: "oklch(0.14 0.005 60)",
                  border: "1px solid oklch(0.72 0.12 75 / 30%)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <Link
                  href="/imoveis/comprar"
                  className="block px-4 py-3 text-sm text-[#F5F0E8]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/8 transition-all duration-150"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    Comprar
                  </span>
                </Link>
                <div className="mx-3 h-px bg-[#C9A84C]/15" />
                <Link
                  href="/imoveis/alugar"
                  className="block px-4 py-3 text-sm text-[#F5F0E8]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/8 transition-all duration-150"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
                    Alugar
                  </span>
                </Link>
              </div>
            </div>

            <NavLink href="/contato" active={isActive("/contato")}>
              Contato
            </NavLink>
          </nav>

          {/* Right: WhatsApp + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md text-sm font-semibold transition-all duration-200"
              style={{
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                color: "white",
                boxShadow: "0 2px 12px rgba(37, 211, 102, 0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 20px rgba(37, 211, 102, 0.4)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 12px rgba(37, 211, 102, 0.25)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              <Phone size={14} />
              WhatsApp
            </a>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-[#F5F0E8]/80 hover:text-[#C9A84C] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ background: "oklch(0.12 0.005 60)" }}
      >
        <div className="container py-4 flex flex-col gap-1">
          <MobileNavLink href="/" active={isActive("/")}>
            Home
          </MobileNavLink>
          <MobileNavLink href="/sobre" active={isActive("/sobre")}>
            Sobre Nós
          </MobileNavLink>
          <MobileNavLink
            href="/imoveis/comprar"
            active={isActive("/imoveis/comprar")}
          >
            Imóveis — Comprar
          </MobileNavLink>
          <MobileNavLink
            href="/imoveis/alugar"
            active={isActive("/imoveis/alugar")}
          >
            Imóveis — Alugar
          </MobileNavLink>
          <MobileNavLink href="/contato" active={isActive("/contato")}>
            Contato
          </MobileNavLink>

          <div className="mt-3 pt-3 border-t border-[#C9A84C]/20">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp w-full justify-center"
            >
              <Phone size={16} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
        active
          ? "text-[#C9A84C]"
          : "text-[#F5F0E8]/80 hover:text-[#C9A84C]"
      }`}
    >
      {children}
      {active && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9A84C] rounded-full" />
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-3 rounded-md text-sm font-medium transition-all duration-150 ${
        active
          ? "text-[#C9A84C] bg-[#C9A84C]/10"
          : "text-[#F5F0E8]/80 hover:text-[#C9A84C] hover:bg-[#C9A84C]/8"
      }`}
    >
      {children}
    </Link>
  );
}
