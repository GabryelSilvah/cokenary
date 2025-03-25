
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Types for user data
export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "employee" | "viewer";
  avatar?: string;
}

// Types for auth context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermission: (requiredRole: "admin" | "manager" | "employee" | "viewer") => boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // When connected to Spring Boot, this would be an API call to check session
        // const response = await fetch("/api/auth/me");
        // if (response.ok) {
        //   const userData = await response.json();
        //   setUser(userData);
        // }
        
        // For now, check localStorage for a saved user
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setError("Falha ao verificar autenticação");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // When connected to Spring Boot:
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      //   credentials: "include" // Important for cookies
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Falha ao fazer login");
      // }
      // 
      // const userData = await response.json();
      // setUser(userData);
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // For demo, accept any email/password with specific patterns for different roles
      let role: "admin" | "manager" | "employee" | "viewer" = "viewer";
      
      if (email.includes("admin")) {
        role = "admin";
      } else if (email.includes("manager")) {
        role = "manager";
      } else if (email.includes("employee")) {
        role = "employee";
      }
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name: email.split("@")[0],
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo, ${mockUser.name}!`
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error.message || "Falha ao fazer login");
      
      toast({
        title: "Erro de login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // When connected to Spring Boot:
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // 
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Falha ao registrar");
      // }
      // 
      // const userData = await response.json();
      // setUser(userData);
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        role: "viewer", // Default role for new registrations
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      
      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      toast({
        title: "Registro bem-sucedido",
        description: "Sua conta foi criada com sucesso!"
      });
      
      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.message || "Falha ao registrar");
      
      toast({
        title: "Erro de registro",
        description: error.message || "Não foi possível criar sua conta. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    // When connected to Spring Boot:
    // fetch("/api/auth/logout", {
    //   method: "POST",
    //   credentials: "include"
    // });
    
    // Clear user from state and storage
    setUser(null);
    localStorage.removeItem("user");
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso."
    });
    
    navigate("/login");
  };
  
  // Permission check function based on role hierarchy
  const hasPermission = (requiredRole: "admin" | "manager" | "employee" | "viewer") => {
    if (!user) return false;
    
    const roleHierarchy = {
      admin: 4,
      manager: 3,
      employee: 2,
      viewer: 1
    };
    
    return roleHierarchy[user.role] >= roleHierarchy[requiredRole];
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      error, 
      login, 
      register, 
      logout,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};

// Auth guard component to protect routes
export const RequireAuth = ({ 
  children, 
  requiredRole = "viewer" 
}: { 
  children: ReactNode; 
  requiredRole?: "admin" | "manager" | "employee" | "viewer";
}) => {
  const { user, loading, hasPermission } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    } else if (!loading && user && !hasPermission(requiredRole)) {
      toast({
        title: "Acesso Negado",
        description: "Você não tem permissão para acessar esta página.",
        variant: "destructive"
      });
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate, hasPermission, requiredRole]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if (!user) {
    return null; // Will redirect in useEffect
  }
  
  if (!hasPermission(requiredRole)) {
    return null; // Will redirect in useEffect
  }
  
  return <>{children}</>;
};
