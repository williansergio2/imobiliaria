/**
 * App.tsx — Routes & top-level layout
 * ImóvelPrime — Site Imobiliário Premium
 * Design: Charcoal & Gold Prestige
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import { lazy, Suspense } from "react";

// Public Pages
import Home from "./pages/Home";
import PropertiesPage from "./pages/PropertiesPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";

// Admin Pages - Lazy loaded
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminProperties = lazy(() => import("./pages/admin/AdminProperties"));
const AdminPropertyForm = lazy(() => import("./pages/admin/AdminPropertyForm"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));

// Loading component
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C9A84C]"></div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/sobre" component={AboutPage} />
      <Route path="/contato" component={ContactPage} />
      <Route path="/imoveis/comprar">
        {() => <PropertiesPage listingType="venda" />}
      </Route>
      <Route path="/imoveis/alugar">
        {() => <PropertiesPage listingType="aluguel" />}
      </Route>
      <Route path="/imovel/:slug" component={PropertyDetailPage} />

      {/* Admin Routes */}
      <Route path="/admin">
        {() => {
          window.location.replace("/admin/login");
          return null;
        }}
      </Route>
      <Route path="/admin/login">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <AdminLogin />
          </Suspense>
        )}
      </Route>
      <Route path="/admin/dashboard">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          </Suspense>
        )}
      </Route>
      <Route path="/admin/imoveis">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <AdminProperties />
            </ProtectedRoute>
          </Suspense>
        )}
      </Route>
      <Route path="/admin/imoveis/novo">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <AdminPropertyForm />
            </ProtectedRoute>
          </Suspense>
        )}
      </Route>
      <Route path="/admin/imoveis/:id">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute>
              <AdminPropertyForm />
            </ProtectedRoute>
          </Suspense>
        )}
      </Route>
      <Route path="/admin/usuarios">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute adminOnly>
              <AdminUsers />
            </ProtectedRoute>
          </Suspense>
        )}
      </Route>
      <Route path="/admin/configuracoes">
        {() => (
          <Suspense fallback={<LoadingSpinner />}>
            <ProtectedRoute adminOnly>
              <AdminSettings />
            </ProtectedRoute>
          </Suspense>
        )}
      </Route>

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <AuthProvider>
          <TooltipProvider>
            <Toaster richColors position="top-right" />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
