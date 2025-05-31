import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

export interface Recipe {
  id: string;
  title: string;
  description: string;
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
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleApiError = (error: any) => {
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

    throw new Error(errorMessage);
  };

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const { data: recipes, isLoading: isLoadingRecipes, error: recipesError } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8081/receitas", {
          headers: defaultHeaders,
        });
        return response.data;
      } catch (error) {
        return handleApiError(error);
      }
    },
  });

  const createRecipeMutation = useMutation({
    mutationFn: async (recipeData: any) => {
      try {
        const response = await axios.post("http://localhost:8081/receitas", recipeData, {
          headers: defaultHeaders,
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
      try {
        const response = await axios.put(
          `http://localhost:8081/receitas/${updatedRecipe.id}`,
          updatedRecipe,
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
      try {
        const response = await axios.delete(`http://localhost:8081/receitas/${recipeId}`, {
          headers: defaultHeaders,
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
