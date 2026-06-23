/**
 * Admin Users — /admin/usuarios
 * Design: Charcoal & Gold Prestige
 * Admin only — manage corretors and admins
 */

import { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Shield,
  User,
  Mail,
  Phone,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { isSupabaseConfigured } from "@/lib/utils";
import { toast } from "sonner";

interface UserData {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: "admin" | "corretor";
  created_at: string;
}

const MOCK_USERS: UserData[] = [
  {
    id: "1",
    full_name: "Administrador Principal",
    email: "admin@imovelprime.com.br",
    phone: "(11) 99999-9999",
    role: "admin",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    full_name: "Carlos Oliveira",
    email: "carlos@imovelprime.com.br",
    phone: "(11) 98888-8888",
    role: "corretor",
    created_at: "2024-02-15T00:00:00Z",
  },
  {
    id: "3",
    full_name: "Ana Santos",
    email: "ana@imovelprime.com.br",
    phone: "(11) 97777-7777",
    role: "corretor",
    created_at: "2024-03-10T00:00:00Z",
  },
];

export default function AdminUsers() {
  const { isAdmin } = useAuth();
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<UserData | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "corretor" as "admin" | "corretor",
    password: "",
  });
  const [saving, setSaving] = useState(false);

  if (!isAdmin) {
    return (
      <AdminLayout title="Usuários" subtitle="Acesso restrito">
        <div className="flex flex-col items-center justify-center py-20">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{ background: "oklch(0.50 0.20 25 / 12%)" }}
          >
            <Shield size={28} style={{ color: "oklch(0.75 0.15 25)" }} />
          </div>
          <h3
            className="text-xl font-semibold text-[#F5F0E8] mb-2"
            style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
          >
            Acesso Restrito
          </h3>
          <p className="text-[#9A9A8A] text-sm">
            Apenas administradores podem gerenciar usuários.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const openNewModal = () => {
    setEditUser(null);
    setForm({ full_name: "", email: "", phone: "", role: "corretor", password: "" });
    setModalOpen(true);
  };

  const openEditModal = (user: UserData) => {
    setEditUser(user);
    setForm({
      full_name: user.full_name,
      email: user.email,
      phone: user.phone || "",
      role: user.role,
      password: "",
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (!isSupabaseConfigured()) {
        if (editUser) {
          setUsers(
            users.map((u) =>
              u.id === editUser.id
                ? { ...u, full_name: form.full_name, email: form.email, phone: form.phone, role: form.role }
                : u
            )
          );
        } else {
          setUsers([
            ...users,
            {
              id: String(Date.now()),
              full_name: form.full_name,
              email: form.email,
              phone: form.phone,
              role: form.role,
              created_at: new Date().toISOString(),
            },
          ]);
        }
        toast.success(editUser ? "Usuário atualizado!" : "Usuário criado!");
        setModalOpen(false);
        setSaving(false);
        return;
      }

      if (!editUser && form.password) {
        // Create user in Supabase Auth
        const { data, error } = await supabase.auth.admin.createUser({
          email: form.email,
          password: form.password,
          user_metadata: { full_name: form.full_name },
        });
        if (error) throw error;

        // Create profile
        await supabase.from("user_profiles").insert({
          id: data.user.id,
          full_name: form.full_name,
          email: form.email,
          phone: form.phone,
          role: form.role,
        });
      } else if (editUser) {
        await supabase
          .from("user_profiles")
          .update({ full_name: form.full_name, phone: form.phone, role: form.role })
          .eq("id", editUser.id);
      }

      toast.success(editUser ? "Usuário atualizado!" : "Usuário criado!");
      setModalOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar usuário.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    setDeleteConfirm(null);
    toast.success("Usuário removido.");
  };

  return (
    <AdminLayout
      title="Usuários"
      subtitle={`${users.length} usuários cadastrados`}
      action={
        <button onClick={openNewModal} className="btn-gold text-sm">
          <Plus size={16} />
          Novo Usuário
        </button>
      }
    >
      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="p-5 rounded-xl"
            style={{
              background: "oklch(0.14 0.005 60)",
              border: "1px solid oklch(0.72 0.12 75 / 20%)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-[#0F0F0F] flex-shrink-0"
                  style={{ background: "oklch(0.72 0.12 75)" }}
                >
                  {user.full_name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#F5F0E8]">
                    {user.full_name}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {user.role === "admin" ? (
                      <Shield size={11} className="text-[#C9A84C]" />
                    ) : (
                      <User size={11} className="text-[#9A9A8A]" />
                    )}
                    <span
                      className="text-[10px] uppercase tracking-wider"
                      style={{
                        color:
                          user.role === "admin"
                            ? "oklch(0.72 0.12 75)"
                            : "oklch(0.60 0.005 60)",
                      }}
                    >
                      {user.role === "admin" ? "Administrador" : "Corretor"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => openEditModal(user)}
                  className="p-1.5 rounded text-[#9A9A8A] hover:text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all"
                >
                  <Edit size={14} />
                </button>
                <button
                  onClick={() => setDeleteConfirm(user.id)}
                  className="p-1.5 rounded text-[#9A9A8A] hover:text-red-400 hover:bg-red-400/10 transition-all"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#9A9A8A]">
                <Mail size={12} className="text-[#C9A84C]" />
                {user.email}
              </div>
              {user.phone && (
                <div className="flex items-center gap-2 text-xs text-[#9A9A8A]">
                  <Phone size={12} className="text-[#C9A84C]" />
                  {user.phone}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <div
            className="w-full max-w-md rounded-xl p-6"
            style={{
              background: "oklch(0.14 0.005 60)",
              border: "1px solid oklch(0.72 0.12 75 / 30%)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3
                className="text-lg font-semibold text-[#F5F0E8]"
                style={{ fontFamily: "Cormorant Garamond, Georgia, serif" }}
              >
                {editUser ? "Editar Usuário" : "Novo Usuário"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-[#9A9A8A] hover:text-[#F5F0E8]"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  value={form.full_name}
                  onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                  className="input-premium w-full"
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
                  className="input-premium w-full"
                  disabled={!!editUser}
                />
              </div>
              <div>
                <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="input-premium w-full"
                />
              </div>
              {!editUser && (
                <div>
                  <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                    Senha *
                  </label>
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="input-premium w-full"
                    placeholder="Mínimo 6 caracteres"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs text-[#9A9A8A] uppercase tracking-wider mb-1.5">
                  Perfil *
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as any })}
                  className="input-premium w-full"
                >
                  <option value="corretor" style={{ background: "#1E1E1E" }}>Corretor</option>
                  <option value="admin" style={{ background: "#1E1E1E" }}>Administrador</option>
                </select>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2.5 rounded-md text-sm text-[#9A9A8A] border border-[#C9A84C]/20 hover:border-[#C9A84C]/40 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 btn-gold justify-center"
              >
                {saving ? (
                  <div className="w-4 h-4 rounded-full border-2 border-[#0F0F0F] border-t-transparent animate-spin" />
                ) : (
                  <Save size={15} />
                )}
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          <div
            className="w-full max-w-sm rounded-xl p-6"
            style={{
              background: "oklch(0.14 0.005 60)",
              border: "1px solid oklch(0.50 0.20 25 / 40%)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle size={20} style={{ color: "oklch(0.75 0.15 25)" }} />
              <h3 className="text-base font-semibold text-[#F5F0E8]">
                Remover Usuário
              </h3>
            </div>
            <p className="text-sm text-[#9A9A8A] mb-5">
              Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 rounded-md text-sm text-[#9A9A8A] border border-[#C9A84C]/20"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 rounded-md text-sm font-semibold text-white"
                style={{ background: "oklch(0.50 0.20 25)" }}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
