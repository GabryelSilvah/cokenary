import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface Cargo {
  id: string;
  nome: string;
  descricao?: string | null;
  departamento?: string | null;
  nivel?: string | null;
  dataInicio?: string | null; // ISO date string (YYYY-MM-DD)
  dataFim?: string | null;    // ISO date string (YYYY-MM-DD)
  indAtivo?: boolean;
  funcionarios?: Array<{ id: string; nome: string; cargoId: string }>;
  funcionariosCount?: number;
}

export const useCargos = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleApiError = (error: unknown) => {
    console.error("API Error:", error);
    let errorMessage = "Erro interno no servidor. Por favor, tente novamente mais tarde.";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        errorMessage = "Sessão expirada. Por favor, faça login novamente.";
      } else if (error.response?.status === 403) {
        errorMessage = "Acesso negado. Você não tem permissão para esta ação.";
      } else {
        errorMessage = error.response?.data?.message || error.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast({
      title: "Erro",
      description: errorMessage,
      variant: "destructive",
    });

    throw error;
  };

  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  // Buscar todos os cargos
  const { 
    data: cargos, 
    isLoading: isLoadingCargos, 
    error: cargosError,
    refetch: refetchCargos
  } = useQuery<Cargo[], Error>({
    queryKey: ["cargos"],
    queryFn: async () => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.get("http://localhost:8081/cargos", {
          headers: authHeaders(),
        });
        return response.data.map((cargo: Cargo) => ({
          ...cargo,
          funcionariosCount: cargo.funcionarios?.length || 0,
          indAtivo: cargo.indAtivo ?? true // Default to true if not specified
        }));
      } catch (error) {
        return handleApiError(error);
      }
    },
    enabled: !!token,
  });

  // Buscar cargos ativos
  const { 
    data: cargosAtivos, 
    isLoading: isLoadingAtivos,
    refetch: refetchAtivos
  } = useQuery<Cargo[], Error>({
    queryKey: ["cargos", "ativos"],
    queryFn: async () => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.get("http://localhost:8081/cargos/ativos", {
          headers: authHeaders(),
        });
        return response.data.map((cargo: Cargo) => ({
          ...cargo,
          funcionariosCount: cargo.funcionarios?.length || 0
        }));
      } catch (error) {
        return handleApiError(error);
      }
    },
    enabled: !!token,
  });

  // Buscar cargos inativos
  const { 
    data: cargosInativos, 
    isLoading: isLoadingInativos,
    refetch: refetchInativos
  } = useQuery<Cargo[], Error>({
    queryKey: ["cargos", "inativos"],
    queryFn: async () => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.get("http://localhost:8081/cargos/inativos", {
          headers: authHeaders(),
        });
        return response.data.map((cargo: Cargo) => ({
          ...cargo,
          funcionariosCount: cargo.funcionarios?.length || 0
        }));
      } catch (error) {
        return handleApiError(error);
      }
    },
    enabled: !!token,
  });

  // Criar novo cargo
  const createCargoMutation = useMutation({
    mutationFn: async (cargoData: Omit<Cargo, "id" | "funcionariosCount">) => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.post("http://localhost:8081/cargos", 
          {
            ...cargoData,
            descricao: cargoData.descricao || null,
            departamento: cargoData.departamento || null,
            nivel: cargoData.nivel || null,
            dataInicio: cargoData.dataInicio || new Date().toISOString().split('T')[0], // Default to today
            dataFim: cargoData.dataFim || null,
            indAtivo: cargoData.indAtivo ?? true // Default to true if not specified
          }, 
          {
            headers: authHeaders(),
          }
        );
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cargos"] });
      queryClient.invalidateQueries({ queryKey: ["cargos", "ativos"] });
      queryClient.invalidateQueries({ queryKey: ["cargos", "inativos"] });
      toast({
        title: "Sucesso",
        description: "Cargo criado com sucesso!",
        variant: "default",
      });
    },
  });

  // Atualizar cargo existente
  const updateCargoMutation = useMutation({
    mutationFn: async ({ id, ...cargoData }: Cargo) => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.put(
          `http://localhost:8081/cargos/${id}`,
          {
            ...cargoData,
            descricao: cargoData.descricao || null,
            departamento: cargoData.departamento || null,
            nivel: cargoData.nivel || null,
            dataInicio: cargoData.dataInicio || null,
            dataFim: cargoData.dataFim || null,
            indAtivo: cargoData.indAtivo ?? true
          },
          {
            headers: authHeaders(),
          }
        );
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["cargos"], (oldData: Cargo[] | undefined) => {
        if (!oldData) return [data];
        return oldData.map(cargo => 
          cargo.id === variables.id ? { ...data, funcionariosCount: cargo.funcionariosCount } : cargo
        );
      });
      queryClient.invalidateQueries({ queryKey: ["cargos", "ativos"] });
      queryClient.invalidateQueries({ queryKey: ["cargos", "inativos"] });
      toast({
        title: "Sucesso",
        description: "Cargo atualizado com sucesso!",
        variant: "default",
      });
    },
  });

  // Deletar cargo
  const deleteCargoMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.delete(`http://localhost:8081/cargos/${id}`, {
          headers: authHeaders(),
        });
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData(["cargos"], (oldData: Cargo[] | undefined) => {
        if (!oldData) return [];
        return oldData.filter(cargo => cargo.id !== id);
      });
      queryClient.invalidateQueries({ queryKey: ["cargos", "ativos"] });
      queryClient.invalidateQueries({ queryKey: ["cargos", "inativos"] });
      toast({
        title: "Sucesso",
        description: "Cargo excluído com sucesso!",
        variant: "default",
      });
    },
  });

  // Buscar um cargo específico
  const useCargo = (id: string) => {
    return useQuery<Cargo, Error>({
      queryKey: ["cargo", id],
      queryFn: async () => {
        if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

        try {
          const response = await axios.get(`http://localhost:8081/cargos/${id}`, {
            headers: authHeaders(),
          });
          return {
            ...response.data,
            funcionariosCount: response.data.funcionarios?.length || 0,
            indAtivo: response.data.indAtivo ?? true
          };
        } catch (error) {
          return handleApiError(error);
        }
      },
      enabled: !!id && !!token,
    });
  };

  return {
    cargos,
    cargosAtivos,
    cargosInativos,
    isLoadingCargos,
    isLoadingAtivos,
    isLoadingInativos,
    cargosError,
    refetchCargos,
    refetchAtivos,
    refetchInativos,
    createCargoMutation,
    updateCargoMutation,
    deleteCargoMutation,
    useCargo,
  };
};