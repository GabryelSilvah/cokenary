import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface Recipe {
  id: string;
  title: string;
  description: string; // <- obrigatória
  ingredients: string | string[] | undefined;
  instructions: string | string[] | undefined;
  chef?: string;
  category?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  difficulty: string;
  time: string;
  image: string;
}

type RecipeUpdatePayload = Recipe & {
  ingredientsWithQuantities?: {
    id: string;
    nome: string;
    quantity: string;
    measure: string;
  }[];
};

export const useRecipes = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleApiError = (error: any) => {
    console.error("API Error:", error);
    let errorMessage = "Erro interno no servidor. Por favor, tente novamente mais tarde.";

    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        errorMessage = "Acesso negado. Verifique se você está autenticado.";
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

    throw new Error(errorMessage);
  };

  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const { data: recipes, isLoading: isLoadingRecipes, error: recipesError } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: async () => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.get("http://localhost:8081/receitas", {
          headers: authHeaders(),
        });
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
    enabled: !!token,
  });

  const createRecipeMutation = useMutation({
    mutationFn: async (recipeData: any) => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.post("http://localhost:8081/receitas", recipeData, {
          headers: authHeaders(),
        });
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast({
        title: "Sucesso",
        description: "Receita criada com sucesso!",
        variant: "default",
      });
    },
  });

  const updateRecipeMutation = useMutation({
    mutationFn: async (updatedRecipe: RecipeUpdatePayload) => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.put(
          `http://localhost:8081/receitas/${updatedRecipe.id}`,
          updatedRecipe,
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
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast({
        title: "Sucesso",
        description: "Receita atualizada com sucesso!",
        variant: "default",
      });
    },
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      if (!token) throw new Error("Token não encontrado. Usuário não autenticado.");

      try {
        const response = await axios.delete(`http://localhost:8081/receitas/${recipeId}`, {
          headers: authHeaders(),
        });
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast({
        title: "Sucesso",
        description: "Receita excluída com sucesso!",
        variant: "default",
      });
    },
  });

  return {
    recipes,
    isLoadingRecipes,
    recipesError,
    createRecipeMutation,
    updateRecipeMutation,
    deleteRecipeMutation,
  };
};
