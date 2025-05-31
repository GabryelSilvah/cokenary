import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface Cargo {
  id: string;
  nome: string;
  descricao?: string | null;
  departamento?: string | null;
  nivel?: string | null;
  dataInicio?: string | null;
  dataFim?: string | null;
  indAtivo?: boolean;
  funcionarios?: Array<{ id: string; nome: string; cargoId: string }>;
  funcionariosCount?: number;
}

export const useCargos = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleApiError = (error: unknown) => {
    console.error("API Error:", error);
    let errorMessage = "Erro interno no servidor. Por favor, tente novamente mais tarde.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
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

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const { data: cargos, isLoading: isLoadingCargos, error: cargosError, refetch: refetchCargos } = useQuery<Cargo[], Error>({
    queryKey: ["cargos"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8081/cargos", {
          headers: defaultHeaders,
        });
        return response.data.map((cargo: Cargo) => ({
          ...cargo,
          funcionariosCount: cargo.funcionarios?.length || 0,
          indAtivo: cargo.indAtivo ?? true
        }));
      } catch (error) {
        return handleApiError(error);
      }
    },
  });

  const { data: cargosAtivos, isLoading: isLoadingAtivos, refetch: refetchAtivos } = useQuery<Cargo[], Error>({
    queryKey: ["cargos", "ativos"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8081/cargos/ativos", {
          headers: defaultHeaders,
        });
        return response.data.map((cargo: Cargo) => ({
          ...cargo,
          funcionariosCount: cargo.funcionarios?.length || 0
        }));
      } catch (error) {
        return handleApiError(error);
      }
    },
  });

  const { data: cargosInativos, isLoading: isLoadingInativos, refetch: refetchInativos } = useQuery<Cargo[], Error>({
    queryKey: ["cargos", "inativos"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8081/cargos/inativos", {
          headers: defaultHeaders,
        });
        return response.data.map((cargo: Cargo) => ({
          ...cargo,
          funcionariosCount: cargo.funcionarios?.length || 0
        }));
      } catch (error) {
        return handleApiError(error);
      }
    },
  });

  const createCargoMutation = useMutation({
    mutationFn: async (cargoData: Omit<Cargo, "id" | "funcionariosCount">) => {
      try {
        const response = await axios.post("http://localhost:8081/cargos", 
          {
            ...cargoData,
            descricao: cargoData.descricao || null,
            departamento: cargoData.departamento || null,
            nivel: cargoData.nivel || null,
            dataInicio: cargoData.dataInicio || new Date().toISOString().split('T')[0],
            dataFim: cargoData.dataFim || null,
            indAtivo: cargoData.indAtivo ?? true
          },
          {
            headers: defaultHeaders,
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

  const updateCargoMutation = useMutation({
    mutationFn: async ({ id, ...cargoData }: Cargo) => {
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
            headers: defaultHeaders,
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

  const deleteCargoMutation = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(`http://localhost:8081/cargos/${id}`, {
          headers: defaultHeaders,
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

  const useCargo = (id: string) => {
    return useQuery<Cargo, Error>({
      queryKey: ["cargo", id],
      queryFn: async () => {
        try {
          const response = await axios.get(`http://localhost:8081/cargos/${id}`, {
            headers: defaultHeaders,
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
      enabled: !!id,
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
