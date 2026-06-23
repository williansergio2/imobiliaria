/**
 * Admin Dashboard — /admin/dashboard
 * Design: Charcoal & Gold Prestige
 */

import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  Home,
  TrendingUp,
  Eye,
  Clock,
  Plus,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Star,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_PROPERTIES } from "@/lib/mockData";
import { formatCurrency, STATUS_CONFIG } from "@/lib/utils";

export default function AdminDashboard() {
  const { profile, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    reserved: 0,
    sold: 0,
    featured: 0,
  });

  useEffect(() => {
    // In production, fetch from Supabase
    const props = MOCK_PROPERTIES;
    setStats({
      total: props.length,
      available: props.filter((p) => p.status === "disponivel").length,
      reserved: props.filter((p) => p.status === "reservado" || p.status === "em_negociacao").length,
      sold: props.filter((p) => p.status === "vendido" || p.status === "alugado").length,
      featured: props.filter((p) => p.featured).length,
    });
  }, []);

  const recentProperties = MOCK_PROPERTIES.slice(0, 5);

  return (
    <AdminLayout
      title={`Olá, ${profile?.full_name?.split(" ")[0] || "Administrador"}!`}
      subtitle={`${new Date().toLocaleDateString("pt-BR", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`}
      action={
        <Link href="/admin/imoveis/novo" className="btn-gold text-sm">
          <Plus size={16} />
          Novo Imóvel
        </Link>
      }
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Home size={20} />}
          label="Total de Imóveis"
          value={stats.total}
          color="#C9A84C"
        />
        <StatCard
          icon={<CheckCircle size={20} />}
          label="Disponíveis"
          value={stats.available}
          color="#4CAF50"
        />
        <StatCard
          icon={<Clock size={20} />}
          label="Reservados"
          value={stats.reserved}
          color="#FF9800"
        />
        <StatCard
          icon={<TrendingUp size={20} />}
          label="Vendidos/Alugados"
          value={stats.sold}
          color="#2196F3"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className="p-5 rounded-xl flex items-center gap-4"
          style={{
            background: "oklch(0.14 0.005 60)",
            border: "1px solid oklch(0.72 0.12 75 / 20%)",
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-[#C9A84C]"
            style={{ background: "oklch(0.72 0.12 75 / 12%)" }}
          >
            <Star size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold text-[#C9A84C]" style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}>
              {stats.featured}
            </div>
            <div className="text-xs text-[#9A9A8A] uppercase tracking-wider">
              Imóveis em Destaque
            </div>
          </div>
          <Link
            href="/admin/imoveis"
            className="ml-auto text-[#9A9A8A] hover:text-[#C9A84C] transition-colors"
          >
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          className="p-5 rounded-xl flex items-center gap-4"
          style={{
            background: "oklch(0.14 0.005 60)",
            border: "1px solid oklch(0.72 0.12 75 / 20%)",
          }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.50 0.20 25 / 12%)", color: "oklch(0.75 0.15 25)" }}
          >
            <AlertCircle size={20} />
          </div>
          <div>
            <div className="text-2xl font-bold" style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color: "oklch(0.75 0.15 25)" }}>
              {MOCK_PROPERTIES.filter((p) => p.status === "encerrado").length}
            </div>
            <div className="text-xs text-[#9A9A8A] uppercase tracking-wider">
              Encerrados
            </div>
          </div>
        </div>
      </div>

      {/* Recent Properties */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "oklch(0.14 0.005 60)",
          border: "1px solid oklch(0.72 0.12 75 / 20%)",
        }}
      >
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid oklch(0.72 0.12 75 / 15%)" }}
        >
          <h2
            className="text-base font-semibold text-[#F5F0E8]"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Imóveis Recentes
          </h2>
          <Link
            href="/admin/imoveis"
            className="flex items-center gap-1 text-xs text-[#C9A84C] hover:text-[#E8C96B] transition-colors"
          >
            Ver todos
            <ArrowRight size={12} />
          </Link>
        </div>

        <div className="divide-y divide-[#C9A84C]/10">
          {recentProperties.map((property) => {
            const status = STATUS_CONFIG[property.status];
            return (
              <div
                key={property.id}
                className="flex items-center gap-4 px-5 py-3 hover:bg-[#C9A84C]/5 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-12 h-10 rounded-md overflow-hidden flex-shrink-0">
                  <img
                    src={
                      property.main_image_url ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=100&q=60"
                    }
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#F5F0E8] truncate">
                    {property.title}
                  </div>
                  <div className="text-xs text-[#9A9A8A]">
                    {property.code} · {property.neighborhood}, {property.city}
                  </div>
                </div>

                {/* Status */}
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm flex-shrink-0"
                  style={{
                    background: status.bgColor + "25",
                    color: status.bgColor,
                    border: `1px solid ${status.bgColor}40`,
                  }}
                >
                  {status.label}
                </span>

                {/* Price */}
                <div className="text-sm font-semibold text-[#C9A84C] flex-shrink-0 hidden sm:block">
                  {formatCurrency(property.price)}
                </div>

                {/* Actions */}
                <Link
                  href={`/admin/imoveis/${property.id}`}
                  className="text-[#9A9A8A] hover:text-[#C9A84C] transition-colors flex-shrink-0"
                >
                  <Eye size={15} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className="p-5 rounded-xl"
      style={{
        background: "oklch(0.14 0.005 60)",
        border: "1px solid oklch(0.72 0.12 75 / 20%)",
      }}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
        style={{ background: color + "20", color }}
      >
        {icon}
      </div>
      <div
        className="text-3xl font-bold mb-1"
        style={{ fontFamily: "Cormorant Garamond, Georgia, serif", color }}
      >
        {value}
      </div>
      <div className="text-xs text-[#9A9A8A] uppercase tracking-wider">{label}</div>
    </div>
  );
}
