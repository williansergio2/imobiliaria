/**
 * Admin Properties List — /admin/imoveis
 * Design: Charcoal & Gold Prestige
 * - Full CRUD table
 * - Search and filters
 * - Status badges
 */

import { useState } from "react";
import { Link } from "wouter";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Star,
  StarOff,
  Filter,
  X,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useProperties } from "@/hooks/useProperties";
import { useAuth } from "@/contexts/AuthContext";
import {
  formatCurrency,
  STATUS_CONFIG,
  PROPERTY_TYPE_LABELS,
  LISTING_TYPE_LABELS,
} from "@/lib/utils";
import type { Property } from "@/lib/supabase";

export default function AdminProperties() {
  const { isAdmin, profile } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const { properties, loading, refetch } = useProperties({
    search: search || undefined,
    status: (statusFilter as any) || undefined,
    property_type: (typeFilter as any) || undefined,
  });

  // Admins see all; Corretors see only their own
  const visibleProperties = isAdmin
    ? properties
    : properties.filter((p) => p.agent_id === profile?.id);

  const handleDelete = async (id: string) => {
    // In production: supabase.from("properties").delete().eq("id", id)
    setDeleteConfirm(null);
    refetch();
  };

  return (
    <AdminLayout
      title="Imóveis"
      subtitle={`${visibleProperties.length} imóveis cadastrados`}
      action={
        <Link href="/admin/imoveis/novo" className="btn-gold text-sm">
          <Plus size={16} />
          Novo Imóvel
        </Link>
      }
    >
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A9A8A]"
          />
          <input
            type="text"
            placeholder="Buscar por código, título, cidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-premium pl-9 w-full text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9A8A] hover:text-[#F5F0E8]"
            >
              <X size={13} />
            </button>
          )}
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="input-premium text-sm"
          style={{ minWidth: 140 }}
        >
          <option value="">Todos os status</option>
          <option value="disponivel">Disponível</option>
          <option value="reservado">Reservado</option>
          <option value="em_negociacao">Em Negociação</option>
          <option value="alugado">Alugado</option>
          <option value="vendido">Vendido</option>
          <option value="encerrado">Encerrado</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="input-premium text-sm"
          style={{ minWidth: 140 }}
        >
          <option value="">Todos os tipos</option>
          {Object.entries(PROPERTY_TYPE_LABELS).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "oklch(0.14 0.005 60)",
          border: "1px solid oklch(0.72 0.12 75 / 20%)",
        }}
      >
        {loading ? (
          <div className="p-8 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin mx-auto" />
          </div>
        ) : visibleProperties.length === 0 ? (
          <div className="p-12 text-center">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ background: "oklch(0.72 0.12 75 / 10%)" }}
            >
              <Search size={22} className="text-[#C9A84C]" />
            </div>
            <p className="text-[#9A9A8A] text-sm mb-4">
              Nenhum imóvel encontrado.
            </p>
            <Link href="/admin/imoveis/novo" className="btn-gold text-sm">
              <Plus size={16} />
              Cadastrar Imóvel
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)" }}>
                  {["Imóvel", "Código", "Tipo", "Modalidade", "Status", "Preço", "Ações"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-left px-4 py-3 text-[10px] text-[#9A9A8A] uppercase tracking-widest font-medium"
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C9A84C]/8">
                {visibleProperties.map((property) => (
                  <PropertyRow
                    key={property.id}
                    property={property}
                    onDelete={() => setDeleteConfirm(property.id)}
                    isAdmin={isAdmin}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirm Dialog */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)" }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6"
            style={{
              background: "oklch(0.14 0.005 60)",
              border: "1px solid oklch(0.50 0.20 25 / 40%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.50 0.20 25 / 15%)" }}
              >
                <Trash2 size={18} style={{ color: "oklch(0.75 0.15 25)" }} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#F5F0E8]">
                  Excluir Imóvel
                </h3>
                <p className="text-xs text-[#9A9A8A]">Esta ação não pode ser desfeita.</p>
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-md text-sm text-[#9A9A8A] border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 rounded-md text-sm font-semibold text-white transition-colors"
                style={{ background: "oklch(0.50 0.20 25)" }}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

function PropertyRow({
  property,
  onDelete,
  isAdmin,
}: {
  property: Property;
  onDelete: () => void;
  isAdmin: boolean;
}) {
  const status = STATUS_CONFIG[property.status];

  return (
    <tr className="hover:bg-[#C9A84C]/4 transition-colors">
      {/* Imóvel */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-8 rounded overflow-hidden flex-shrink-0">
            <img
              src={
                property.main_image_url ||
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=80&q=60"
              }
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <div className="text-sm font-medium text-[#F5F0E8] truncate max-w-[180px]">
              {property.title}
            </div>
            <div className="text-xs text-[#9A9A8A]">
              {property.neighborhood}, {property.city}
            </div>
          </div>
          {property.featured && (
            <Star size={12} className="text-[#C9A84C] fill-[#C9A84C] flex-shrink-0" />
          )}
        </div>
      </td>

      {/* Código */}
      <td className="px-4 py-3">
        <span className="text-xs font-mono text-[#C9A84C]">{property.code}</span>
      </td>

      {/* Tipo */}
      <td className="px-4 py-3">
        <span className="text-xs text-[#9A9A8A]">
          {PROPERTY_TYPE_LABELS[property.property_type]}
        </span>
      </td>

      {/* Modalidade */}
      <td className="px-4 py-3">
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm"
          style={{
            background:
              property.listing_type === "venda"
                ? "oklch(0.72 0.12 75 / 15%)"
                : "oklch(0.50 0.20 25 / 15%)",
            color:
              property.listing_type === "venda"
                ? "oklch(0.72 0.12 75)"
                : "oklch(0.75 0.15 25)",
          }}
        >
          {LISTING_TYPE_LABELS[property.listing_type]}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm"
          style={{
            background: status.bgColor + "20",
            color: status.bgColor,
            border: `1px solid ${status.bgColor}40`,
          }}
        >
          {status.label}
        </span>
      </td>

      {/* Preço */}
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-[#C9A84C]">
          {formatCurrency(property.price)}
        </span>
      </td>

      {/* Ações */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <a
            href={`/imovel/${property.slug || property.code}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded text-[#9A9A8A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
            title="Ver no site"
          >
            <Eye size={14} />
          </a>
          <Link
            href={`/admin/imoveis/${property.id}`}
            className="p-1.5 rounded text-[#9A9A8A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
            title="Editar"
          >
            <Edit size={14} />
          </Link>
          {isAdmin && (
            <button
              onClick={onDelete}
              className="p-1.5 rounded text-[#9A9A8A] hover:text-red-400 hover:bg-red-400/10 transition-all"
              title="Excluir"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
