import { useState } from "react";
import { useLocation } from "wouter";

export default function AdminLogin() {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // login simples (depois Supabase)
    if (email === "admin@teste.com" && password === "admin123") {
      navigate("/admin/dashboard");
    } else {
      alert("Login inválido");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-xl w-[350px]">
        <h1 className="text-white text-xl mb-4">Login Admin</h1>

        <input
          className="w-full mb-3 p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full mb-3 p-2"
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-yellow-500 p-2 font-bold">
          Entrar
        </button>
      </form>
    </div>
  );
}