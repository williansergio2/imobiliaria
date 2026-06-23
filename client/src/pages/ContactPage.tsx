/**
 * Contact Page — /contato
 * Design: Charcoal & Gold Prestige
 */

import { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, Clock, Home } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { MapView } from "@/components/Map";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MSG = encodeURIComponent("Olá! Gostaria de informações sobre imóveis.");

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", phone: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.10 0.005 60)" }}>
      <Header />

      {/* Header */}
      <section
        className="relative pt-28 pb-16"
        style={{ background: "oklch(0.12 0.005 60)", borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)" }}
      >
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6 bg-[#C9A84C]" />
            <span className="text-xs text-[#C9A84C] uppercase tracking-[0.2em]">Fale Conosco</span>
          </div>
          <h1
            className="text-5xl font-semibold text-[#F5F0E8] mb-3"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Entre em Contato
          </h1>
          <p className="text-[#9A9A8A] max-w-xl">
            Nossa equipe está pronta para atendê-lo. Envie uma mensagem ou entre em contato
            diretamente pelo WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Info */}
            <div>
              <h2
                className="text-2xl font-semibold text-[#F5F0E8] mb-6"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Informações de Contato
              </h2>

              <div className="space-y-5 mb-8">
                <InfoItem icon={<MapPin size={18} />} title="Endereço">
                  Av. Paulista, 1000 — Bela Vista<br />São Paulo — SP, CEP 01310-100
                </InfoItem>
                <InfoItem icon={<Phone size={18} />} title="Telefone">
                  <a href="tel:+5511999999999" className="hover:text-[#C9A84C] transition-colors">
                    (11) 99999-9999
                  </a>
                </InfoItem>
                <InfoItem icon={<Mail size={18} />} title="E-mail">
                  <a href="mailto:contato@imovelprime.com.br" className="hover:text-[#C9A84C] transition-colors">
                    contato@imovelprime.com.br
                  </a>
                </InfoItem>
                <InfoItem icon={<Clock size={18} />} title="Horário de Atendimento">
                  Segunda a Sexta: 8h às 18h<br />Sábado: 9h às 13h
                </InfoItem>
              </div>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp inline-flex mb-8"
              >
                <Phone size={16} />
                Falar no WhatsApp
              </a>

              {/* Map */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ height: 280, border: "1px solid oklch(0.72 0.12 75 / 20%)" }}
              >
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

            {/* Form */}
            <div
              className="p-8 rounded-xl"
              style={{
                background: "oklch(0.14 0.005 60)",
                border: "1px solid oklch(0.72 0.12 75 / 20%)",
              }}
            >
              <h2
                className="text-2xl font-semibold text-[#F5F0E8] mb-6"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                Envie uma mensagem
              </h2>

              {sent ? (
                <div
                  className="flex items-center gap-3 p-4 rounded-lg"
                  style={{
                    background: "oklch(0.16 0.08 145 / 20%)",
                    border: "1px solid oklch(0.56 0.18 145 / 40%)",
                  }}
                >
                  <CheckCircle size={20} className="text-green-400" />
                  <p className="text-green-400 text-sm">
                    Mensagem enviada! Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-premium"
                      placeholder="Seu nome completo"
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
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
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

function InfoItem({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-[#C9A84C]"
        style={{ background: "oklch(0.72 0.12 75 / 12%)" }}
      >
        {icon}
      </div>
      <div>
        <div className="text-xs text-[#C9A84C] uppercase tracking-wider mb-1">{title}</div>
        <div className="text-sm text-[#9A9A8A] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
