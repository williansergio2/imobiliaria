/**
 * Footer Component — Premium dark footer with gold accents
 * Design: Charcoal & Gold Prestige
 */

import { Link } from "wouter";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de informações sobre imóveis.");

export default function Footer() {
  return (
    <footer
      className="relative mt-auto"
      style={{
        background: "oklch(0.08 0.005 60)",
        borderTop: "1px solid oklch(0.72 0.12 75 / 20%)",
      }}
    >
      {/* Gold top line */}
      <div className="gold-line" />

      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663776255515/Y24dj4zK4qnVXuNjCoSvoL/logo-icon-JsYW9DcKwRYLNaMm2hkTP8.png"
                alt="ImóvelPrime"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div
                  className="text-xl font-semibold text-[#C9A84C]"
                  style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
                >
                  ImóvelPrime
                </div>
                <div className="text-[10px] text-[#9A9A8A] tracking-widest uppercase">
                  Imóveis Premium
                </div>
              </div>
            </div>
            <p className="text-sm text-[#9A9A8A] leading-relaxed mb-5">
              Especialistas em locação e venda de imóveis com atendimento rápido,
              transparente e profissional.
            </p>
            <div className="flex gap-3">
              <SocialLink href="#" label="Instagram">
                <Instagram size={16} />
              </SocialLink>
              <SocialLink href="#" label="Facebook">
                <Facebook size={16} />
              </SocialLink>
              <SocialLink
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                label="WhatsApp"
              >
                <WhatsAppIcon />
              </SocialLink>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-5">
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/sobre", label: "Sobre Nós" },
                { href: "/imoveis/comprar", label: "Comprar Imóvel" },
                { href: "/imoveis/alugar", label: "Alugar Imóvel" },
                { href: "/contato", label: "Contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors duration-150 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/50" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Imóveis */}
          <div>
            <h4 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-5">
              Imóveis
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/imoveis/comprar", label: "Casas à Venda" },
                { href: "/imoveis/comprar", label: "Apartamentos à Venda" },
                { href: "/imoveis/alugar", label: "Casas para Alugar" },
                { href: "/imoveis/alugar", label: "Apartamentos para Alugar" },
                { href: "/imoveis/comprar", label: "Terrenos" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors duration-150 flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C9A84C]/50" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#C9A84C] uppercase tracking-widest mb-5">
              Contato
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#9A9A8A] leading-relaxed">
                  Av. Paulista, 1000 — Bela Vista
                  <br />
                  São Paulo — SP
                </span>
              </li>
              <li>
                <a
                  href="tel:+5511999999999"
                  className="flex items-center gap-3 text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors"
                >
                  <Phone size={15} className="text-[#C9A84C] flex-shrink-0" />
                  (11) 99999-9999
                </a>
              </li>
              <li>
                <a
                  href="mailto:contato@imovelprime.com.br"
                  className="flex items-center gap-3 text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors"
                >
                  <Mail size={15} className="text-[#C9A84C] flex-shrink-0" />
                  contato@imovelprime.com.br
                </a>
              </li>
            </ul>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp mt-5 w-full justify-center text-xs py-2.5"
            >
              <WhatsAppIcon />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#C9A84C]/15 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#9A9A8A]">
            © {new Date().getFullYear()} ImóvelPrime. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-xs text-[#9A9A8A]/50 hover:text-[#C9A84C]/70 transition-colors"
            >
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-md flex items-center justify-center text-[#9A9A8A] hover:text-[#C9A84C] transition-all duration-200"
      style={{ border: "1px solid oklch(0.72 0.12 75 / 25%)" }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.72 0.12 75 / 60%)";
        (e.currentTarget as HTMLElement).style.background =
          "oklch(0.72 0.12 75 / 8%)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "oklch(0.72 0.12 75 / 25%)";
        (e.currentTarget as HTMLElement).style.background = "transparent";
      }}
    >
      {children}
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
