import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      <aside className="w-64 bg-zinc-900 p-4">
        <h2 className="text-yellow-400 font-bold mb-6">Admin</h2>

        <nav className="space-y-2">
          <a href="/admin/dashboard">Dashboard</a>
          <a href="/admin/imoveis">Imóveis</a>
          <a href="/admin/usuarios">Usuários</a>
          <a href="/admin/configuracoes">Configurações</a>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}