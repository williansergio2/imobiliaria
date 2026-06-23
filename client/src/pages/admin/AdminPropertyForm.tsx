/**
 * Admin Property Form — /admin/imoveis/novo and /admin/imoveis/:id
 * Design: Charcoal & Gold Prestige
 * - Full CRUD form
 * - Image upload (multiple)
 * - Auto-generates code on create
 */

import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import {
  Save,
  ArrowLeft,
  Upload,
  X,
  Star,
  StarOff,
  Image as ImageIcon,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useProperty } from "@/hooks/useProperties";
import { supabase } from "@/lib/supabase";
import { isSupabaseConfigured, generateSlug } from "@/lib/utils";
import { MOCK_PROPERTIES } from "@/lib/mockData";
import type {
  PropertyType,
  ListingType,
  PropertyStatus,
} from "@/lib/supabase";
import { toast } from "sonner";

const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: "casa", label: "Casa" },
  { value: "apartamento", label: "Apartamento" },
  { value: "terreno", label: "Terreno" },
  { value: "comercial", label: "Comercial" },
  { value: "rural", label: "Rural" },
  { value: "outro", label: "Outro" },
];

const PROPERTY_STATUSES: { value: PropertyStatus; label: string }[] = [
  { value: "disponivel", label: "Disponível" },
  { value: "reservado", label: "Reservado" },
  { value: "em_negociacao", label: "Em Negociação" },
  { value: "alugado", label: "Alugado" },
  { value: "vendido", label: "Vendido" },
  { value: "encerrado", label: "Encerrado" },
];

export default function AdminPropertyForm() {
  const params = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const isNew = !params.id || params.id === "novo";

  const { property: existingProperty, loading: loadingProperty } = useProperty(
    isNew ? "" : params.id
  );

  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    property_type: "apartamento" as PropertyType,
    listing_type: "venda" as ListingType,
    status: "disponivel" as PropertyStatus,
    price: "",
    city: "",
    neighborhood: "",
    address: "",
    zip_code: "",
    bedrooms: "",
    bathrooms: "",
    parking_spots: "",
    built_area: "",
    land_area: "",
    featured: false,
    agent_name: "",
  });

  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState("");

  // Load existing property data
  useEffect(() => {
    if (existingProperty && !isNew) {
      setForm({
        title: existingProperty.title || "",
        description: existingProperty.description || "",
        property_type: existingProperty.property_type,
        listing_type: existingProperty.listing_type,
        status: existingProperty.status,
        price: String(existingProperty.price || ""),
        city: existingProperty.city || "",
        neighborhood: existingProperty.neighborhood || "",
        address: existingProperty.address || "",
        zip_code: existingProperty.zip_code || "",
        bedrooms: String(existingProperty.bedrooms || ""),
        bathrooms: String(existingProperty.bathrooms || ""),
        parking_spots: String(existingProperty.parking_spots || ""),
        built_area: String(existingProperty.built_area || ""),
        land_area: String(existingProperty.land_area || ""),
        featured: existingProperty.featured || false,
        agent_name: existingProperty.agent_name || "",
      });
      if (existingProperty.main_image_url) {
        setImageUrls([existingProperty.main_image_url]);
      }
    }
  }, [existingProperty, isNew]);

  const handleAddImage = () => {
    if (newImageUrl.trim() && !imageUrls.includes(newImageUrl.trim())) {
      setImageUrls([...imageUrls, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const handleRemoveImage = (url: string) => {
    setImageUrls(imageUrls.filter((u) => u !== url));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const slug = generateSlug(form.title, isNew ? "temp" : (existingProperty?.code || "temp"));
    const propertyData = {
      title: form.title,
      description: form.description,
      property_type: form.property_type,
      listing_type: form.listing_type,
      status: form.status,
      price: Number(form.price),
      city: form.city,
      neighborhood: form.neighborhood,
      address: form.address,
      zip_code: form.zip_code,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      parking_spots: form.parking_spots ? Number(form.parking_spots) : null,
      built_area: form.built_area ? Number(form.built_area) : null,
      land_area: form.land_area ? Number(form.land_area) : null,
      featured: form.featured,
      agent_name: form.agent_name,
      main_image_url: imageUrls[0] || null,
      slug,
      published_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured()) {
      // Mock save
      toast.success(isNew ? "Imóvel cadastrado com sucesso!" : "Imóvel atualizado com sucesso!");
      setSaving(false);
      navigate("/admin/imoveis");
      return;
    }

    try {
      if (isNew) {
        // Generate code
        const { count } = await supabase
          .from("properties")
          .select("*", { count: "exact", head: true });
        const code = `IMV-${1001 + (count || 0)}`;

        const { error } = await supabase
          .from("properties")
          .insert({ ...propertyData, code });

        if (error) throw error;
        toast.success("Imóvel cadastrado com sucesso!");
      } else {
        const { error } = await supabase
          .from("properties")
          .update(propertyData)
          .eq("id", params.id);

        if (error) throw error;
        toast.success("Imóvel atualizado com sucesso!");
      }

      navigate("/admin/imoveis");
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar imóvel.");
    } finally {
      setSaving(false);
    }
  };

  const setField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <AdminLayout
      title={isNew ? "Novo Imóvel" : "Editar Imóvel"}
      subtitle={isNew ? "Preencha os dados do imóvel" : existingProperty?.code}
      action={
        <button
          onClick={() => navigate("/admin/imoveis")}
          className="flex items-center gap-2 text-sm text-[#9A9A8A] hover:text-[#C9A84C] transition-colors"
        >
          <ArrowLeft size={16} />
          Voltar
        </button>
      }
    >
      {loadingProperty && !isNew ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
          {/* Basic Info */}
          <FormSection title="Informações Básicas">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <FormLabel>Título do Imóvel *</FormLabel>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  className="input-premium w-full"
                  placeholder="Ex: Apartamento 3 quartos no Jardins"
                />
              </div>

              <div>
                <FormLabel>Tipo de Imóvel *</FormLabel>
                <select
                  required
                  value={form.property_type}
                  onChange={(e) => setField("property_type", e.target.value)}
                  className="input-premium w-full"
                >
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t.value} value={t.value} style={{ background: "#1E1E1E" }}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FormLabel>Modalidade *</FormLabel>
                <select
                  required
                  value={form.listing_type}
                  onChange={(e) => setField("listing_type", e.target.value)}
                  className="input-premium w-full"
                >
                  <option value="venda" style={{ background: "#1E1E1E" }}>Venda</option>
                  <option value="aluguel" style={{ background: "#1E1E1E" }}>Aluguel</option>
                </select>
              </div>

              <div>
                <FormLabel>Status *</FormLabel>
                <select
                  required
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                  className="input-premium w-full"
                >
                  {PROPERTY_STATUSES.map((s) => (
                    <option key={s.value} value={s.value} style={{ background: "#1E1E1E" }}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <FormLabel>Preço (R$) *</FormLabel>
                <input
                  type="number"
                  required
                  min="0"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                  className="input-premium w-full"
                  placeholder="Ex: 450000"
                />
              </div>

              <div>
                <FormLabel>Corretor Responsável</FormLabel>
                <input
                  type="text"
                  value={form.agent_name}
                  onChange={(e) => setField("agent_name", e.target.value)}
                  className="input-premium w-full"
                  placeholder="Nome do corretor"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setField("featured", !form.featured)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all ${
                    form.featured
                      ? "bg-[#C9A84C] text-[#0F0F0F]"
                      : "border border-[#C9A84C]/30 text-[#9A9A8A] hover:border-[#C9A84C]"
                  }`}
                >
                  {form.featured ? <Star size={16} className="fill-current" /> : <StarOff size={16} />}
                  {form.featured ? "Em Destaque" : "Marcar como Destaque"}
                </button>
              </div>
            </div>

            <div>
              <FormLabel>Descrição</FormLabel>
              <textarea
                rows={5}
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                className="input-premium w-full resize-none"
                placeholder="Descreva o imóvel em detalhes..."
              />
            </div>
          </FormSection>

          {/* Location */}
          <FormSection title="Localização">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormLabel>Cidade *</FormLabel>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setField("city", e.target.value)}
                  className="input-premium w-full"
                  placeholder="Ex: São Paulo"
                />
              </div>
              <div>
                <FormLabel>Bairro *</FormLabel>
                <input
                  type="text"
                  required
                  value={form.neighborhood}
                  onChange={(e) => setField("neighborhood", e.target.value)}
                  className="input-premium w-full"
                  placeholder="Ex: Jardins"
                />
              </div>
              <div className="md:col-span-2">
                <FormLabel>Endereço</FormLabel>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => setField("address", e.target.value)}
                  className="input-premium w-full"
                  placeholder="Rua, número"
                />
              </div>
              <div>
                <FormLabel>CEP</FormLabel>
                <input
                  type="text"
                  value={form.zip_code}
                  onChange={(e) => setField("zip_code", e.target.value)}
                  className="input-premium w-full"
                  placeholder="00000-000"
                />
              </div>
            </div>
          </FormSection>

          {/* Features */}
          <FormSection title="Características">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <FormLabel>Quartos</FormLabel>
                <input
                  type="number"
                  min="0"
                  value={form.bedrooms}
                  onChange={(e) => setField("bedrooms", e.target.value)}
                  className="input-premium w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <FormLabel>Banheiros</FormLabel>
                <input
                  type="number"
                  min="0"
                  value={form.bathrooms}
                  onChange={(e) => setField("bathrooms", e.target.value)}
                  className="input-premium w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <FormLabel>Vagas</FormLabel>
                <input
                  type="number"
                  min="0"
                  value={form.parking_spots}
                  onChange={(e) => setField("parking_spots", e.target.value)}
                  className="input-premium w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <FormLabel>Área Construída (m²)</FormLabel>
                <input
                  type="number"
                  min="0"
                  value={form.built_area}
                  onChange={(e) => setField("built_area", e.target.value)}
                  className="input-premium w-full"
                  placeholder="0"
                />
              </div>
              <div>
                <FormLabel>Área do Terreno (m²)</FormLabel>
                <input
                  type="number"
                  min="0"
                  value={form.land_area}
                  onChange={(e) => setField("land_area", e.target.value)}
                  className="input-premium w-full"
                  placeholder="0"
                />
              </div>
            </div>
          </FormSection>

          {/* Images */}
          <FormSection title="Fotos do Imóvel">
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="url"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="input-premium flex-1"
                  placeholder="URL da imagem (https://...)"
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddImage())}
                />
                <button
                  type="button"
                  onClick={handleAddImage}
                  className="btn-outline-gold px-4 flex-shrink-0"
                >
                  <Upload size={16} />
                  Adicionar
                </button>
              </div>

              <p className="text-xs text-[#9A9A8A]">
                Adicione URLs de imagens. A primeira imagem será a foto principal.
                {isSupabaseConfigured() && " Você também pode fazer upload direto pelo Supabase Storage."}
              </p>

              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {imageUrls.map((url, i) => (
                    <div key={url} className="relative group">
                      <div
                        className="rounded-lg overflow-hidden"
                        style={{
                          aspectRatio: "4/3",
                          border:
                            i === 0
                              ? "2px solid oklch(0.72 0.12 75)"
                              : "2px solid transparent",
                        }}
                      >
                        <img
                          src={url}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200&q=60";
                          }}
                        />
                      </div>
                      {i === 0 && (
                        <div className="absolute top-1 left-1 bg-[#C9A84C] text-[#0F0F0F] text-[9px] font-bold px-1.5 py-0.5 rounded">
                          PRINCIPAL
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(url)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {imageUrls.length === 0 && (
                <div
                  className="flex flex-col items-center justify-center py-10 rounded-xl"
                  style={{
                    background: "oklch(0.12 0.005 60)",
                    border: "2px dashed oklch(0.72 0.12 75 / 25%)",
                  }}
                >
                  <ImageIcon size={32} className="text-[#9A9A8A] mb-2" />
                  <p className="text-sm text-[#9A9A8A]">
                    Nenhuma imagem adicionada
                  </p>
                </div>
              )}
            </div>
          </FormSection>

          {/* Submit */}
          <div className="flex items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-gold"
            >
              {saving ? (
                <div className="w-4 h-4 rounded-full border-2 border-[#0F0F0F] border-t-transparent animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {saving ? "Salvando..." : isNew ? "Cadastrar Imóvel" : "Salvar Alterações"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/imoveis")}
              className="px-5 py-2.5 rounded-md text-sm text-[#9A9A8A] border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </AdminLayout>
  );
}

function FormSection({
  title,
  children,
}: {
  title: string;
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
      <h3
        className="text-base font-semibold text-[#F5F0E8] pb-3"
        style={{
          fontFamily: "Cormorant Garamond, Georgia, serif",
          borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)",
        }}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

function FormLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
      {children}
    </label>
  );
}
