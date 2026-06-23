/**
 * Admin Settings — /admin/configuracoes
 * Design: Charcoal & Gold Prestige
 */

import { useState } from "react";
import { Save, Globe, Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { toast } from "sonner";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    company_name: "ImóvelPrime",
    tagline: "Imóveis Premium",
    whatsapp: "5511999999999",
    email: "contato@imovelprime.com.br",
    phone: "(11) 99999-9999",
    address: "Av. Paulista, 1000 — Bela Vista, São Paulo — SP",
    instagram: "@imovelprime",
    facebook: "imovelprime",
    whatsapp_message: "Olá! Gostaria de informações sobre o imóvel {codigo} — {titulo}.",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    // In production: save to Supabase settings table
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Configurações salvas com sucesso!");
    setSaving(false);
  };

  return (
    <AdminLayout title="Configurações" subtitle="Dados da empresa e configurações gerais">
      <form onSubmit={handleSave} className="space-y-6 max-w-2xl">
        {/* Company */}
        <SettingsSection title="Dados da Empresa" icon={<Globe size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SettingsLabel>Nome da Empresa</SettingsLabel>
              <input
                type="text"
                value={settings.company_name}
                onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                className="input-premium w-full"
              />
            </div>
            <div>
              <SettingsLabel>Slogan</SettingsLabel>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="input-premium w-full"
              />
            </div>
          </div>
          <div>
            <SettingsLabel>Endereço</SettingsLabel>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="input-premium w-full"
            />
          </div>
        </SettingsSection>

        {/* Contact */}
        <SettingsSection title="Contato" icon={<Phone size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SettingsLabel>WhatsApp (somente números)</SettingsLabel>
              <input
                type="text"
                value={settings.whatsapp}
                onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                className="input-premium w-full"
                placeholder="5511999999999"
              />
            </div>
            <div>
              <SettingsLabel>Telefone (exibição)</SettingsLabel>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="input-premium w-full"
              />
            </div>
            <div className="md:col-span-2">
              <SettingsLabel>E-mail</SettingsLabel>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="input-premium w-full"
              />
            </div>
          </div>
        </SettingsSection>

        {/* Social */}
        <SettingsSection title="Redes Sociais" icon={<MessageSquare size={18} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <SettingsLabel>Instagram</SettingsLabel>
              <input
                type="text"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="input-premium w-full"
                placeholder="@imovelprime"
              />
            </div>
            <div>
              <SettingsLabel>Facebook</SettingsLabel>
              <input
                type="text"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                className="input-premium w-full"
              />
            </div>
          </div>
        </SettingsSection>

        {/* WhatsApp Message */}
        <SettingsSection title="Mensagem Automática WhatsApp" icon={<MessageSquare size={18} />}>
          <div>
            <SettingsLabel>Template da mensagem</SettingsLabel>
            <textarea
              rows={4}
              value={settings.whatsapp_message}
              onChange={(e) => setSettings({ ...settings, whatsapp_message: e.target.value })}
              className="input-premium w-full resize-none"
            />
            <p className="text-xs text-[#9A9A8A] mt-2">
              Variáveis disponíveis:{" "}
              <code className="text-[#C9A84C]">{"{codigo}"}</code>,{" "}
              <code className="text-[#C9A84C]">{"{titulo}"}</code>,{" "}
              <code className="text-[#C9A84C]">{"{cidade}"}</code>,{" "}
              <code className="text-[#C9A84C]">{"{preco}"}</code>
            </p>
          </div>
        </SettingsSection>

        <button type="submit" disabled={saving} className="btn-gold">
          {saving ? (
            <div className="w-4 h-4 rounded-full border-2 border-[#0F0F0F] border-t-transparent animate-spin" />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Salvando..." : "Salvar Configurações"}
        </button>
      </form>
    </AdminLayout>
  );
}

function SettingsSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-xl p-6 space-y-4"
      style={{
        background: "oklch(0.14 0.005 60)",
        border: "1px solid oklch(0.72 0.12 75 / 20%)",
      }}
    >
      <div
        className="flex items-center gap-2 pb-3"
        style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)" }}
      >
        <span className="text-[#C9A84C]">{icon}</span>
        <h3
          className="text-base font-semibold text-[#F5F0E8]"
          style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
        >
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function SettingsLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}
