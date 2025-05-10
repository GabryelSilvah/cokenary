import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

// Tipo do usuário
export interface User {
  id: number;
  email: string;
  role: string;
  token: string;
  name?: string;
  avatar?: string;
  status?: number;
  message?: string;
}

// Tipo do contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  token?: string;
  role?: string;
  isAdmin?: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void; // Add this line
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:8081";
  const REGISTER_URL = `${API_URL}/user`;
  const LOGIN_URL = `${API_URL}/auth`;

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          
          // Verifica se o token ainda é válido (opcional)
          if (parsedUser.token) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem("user");
          }
        }
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    setError(null);
  
    try {
      let response;
      try {
        response = await fetch(LOGIN_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, senha }),
        });
      } catch (fetchError) {
        // Handle network errors (like Failed to fetch)
        throw new Error("Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.");
      }
  
      // Handle cases where response.json() fails
      let responseData;
      try {
        responseData = await response.json();
      } catch (jsonError) {
        throw new Error("Resposta inválida do servidor");
      }
  
      if (!response.ok) {
        throw new Error(responseData.message || "Credenciais inválidas");
      }
  
      // Rest of your success handling...
      const token = responseData.data?.token;
      if (!token) {
        throw new Error("Token não encontrado na resposta.");
      }
  
      const userData: User = {
        id: responseData.data?.id || 0,
        email: responseData.data?.email || email,
        role: responseData.data?.role || "USER",
        token,
        name: responseData.data?.name,
        avatar: responseData.data?.avatar,
        status: responseData.status,
        message: responseData.message,
      };
  
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
  
      toast({
        title: "Login realizado",
        description: "Você entrou com sucesso!",
      });
    } catch (error: any) {
      console.error("Erro no login:", error);
      const message = error.message || "Erro inesperado";
      setError(message);
      toast({
        title: "Erro no login",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, role = "USER") => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha: password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no cadastro");
      }

      // Faz login automaticamente após o cadastro
      await login(email, password);

      toast({
        title: "Cadastro realizado",
        description: "Conta criada com sucesso!",
      });

      return data;
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      const message = error.message || "Erro inesperado";
      setError(message);
      toast({
        title: "Erro no cadastro",
        description: message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast({
      title: "Logout",
      description: "Você saiu da conta.",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token: user?.token,
        role: user?.role,
        isAdmin: user?.role === "ADMIN",
        loading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para consumir contexto de auth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};

// Proteção de rotas por role
export const RequireAuth = ({
  children,
  requiredRole,
}: {
  children: ReactNode;
  requiredRole?: string;
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login", { replace: true });
    } else if (!loading && requiredRole && user?.role !== requiredRole) {
      navigate("/unauthorized", { replace: true });
    }
  }, [user, loading, navigate, requiredRole]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }

  return <>{children}</>;
};

// Header de autenticação para requisições
export const getAuthHeader = (additionalHeaders: Record<string, string> = {}) => {
  try {
    const userString = localStorage.getItem("user");
    if (!userString) return {
      "Content-Type": "application/json",
      ...additionalHeaders
    };
    
    const user = JSON.parse(userString);
    
    return { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token}`,
      ...additionalHeaders
    };
  } catch (err) {
    console.error("Erro ao obter token:", err);
    return {
      "Content-Type": "application/json",
      ...additionalHeaders
    };
  }
};

// Função para fazer requisições autenticadas
export const authFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: getAuthHeader(options.headers as Record<string, string>),
  });

  if (response.status === 401) {
    // Token inválido ou expirado
    localStorage.removeItem("user");
    window.location.href = "/login";
    throw new Error("Sessão expirada. Por favor, faça login novamente.");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Erro na requisição");
  }

  return response.json();
};