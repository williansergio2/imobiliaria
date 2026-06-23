/**
 * ProtectedRoute — Redirects unauthenticated users to /admin/login
 * Design: Charcoal & Gold Prestige
 */

import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/admin/login");
      } else if (adminOnly && !isAdmin) {
        navigate("/admin/dashboard");
      }
    }
  }, [isAuthenticated, isAdmin, loading, adminOnly, navigate]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(0.10 0.005 60)" }}
      >
        <div className="w-8 h-8 rounded-full border-2 border-[#C9A84C] border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (adminOnly && !isAdmin) return null;

  return <>{children}</>;
}
