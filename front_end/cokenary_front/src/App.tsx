import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";

import { Layout } from "./components/layout/Layout";
import { AuthProvider, RequireAuth } from "./hooks/useAuth";

import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Restaurants from "./pages/Restaurants";
import Employees from "./pages/Employees";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/Admin";
import Books from "./pages/books";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" storageKey="app-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />

                <Route
                  path="/recipes"
                  element={
                    <RequireAuth>
                      <Recipes />
                    </RequireAuth>
                  }
                />


                {/* Rotas protegidas apenas para usuários autenticados */}
                <Route
                  path="/restaurants"
                  element={
                    <RequireAuth>
                      <Restaurants />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/books"
                  element={
                    <RequireAuth>
                      <Books />
                    </RequireAuth>
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <RequireAuth>
                      <Profile />
                    </RequireAuth>
                  }
                />

                {/* 🔓 Estas páginas estão liberadas sem autenticação */}
                <Route path="/employees" element={<Employees />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/admin" element={<AdminPanel />} />

                {/* Rotas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
