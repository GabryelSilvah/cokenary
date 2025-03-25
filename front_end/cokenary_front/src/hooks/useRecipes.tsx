import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Define the Recipe type
export type Recipe = {
  id: string;
  title?: string;
  nome?: string;
  description?: string;
  ingredients?: string[] | string;
  ingredientes?: string[] | string;
  instructions?: string[] | string;
  modoPreparo?: string[] | string;
  chef?: string;
  category?: string;
  difficulty?: string;
  time?: string;
  rating?: number;
  image?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

// URL base da API
const API_BASE_URL = "http://localhost:8080"; // Use o link da sua API

// Função para buscar todas as receitas
const fetchRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/receitas`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar receitas:", error);
    if (axios.isAxiosError(error)) {
      console.error("Detalhes do erro:", {
        data: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
      });
    }
    throw new Error("Erro ao carregar receitas. Tente novamente mais tarde.");
  }
};

// Função para criar uma nova receita
const createRecipe = async (recipe: Omit<Recipe, "id">): Promise<Recipe> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/receitas`, recipe);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar receita:", error);
    if (axios.isAxiosError(error)) {
      console.error("Detalhes do erro:", error.response?.data);
    }
    throw new Error("Erro ao criar receita. Verifique os dados e tente novamente.");
  }
};

// Função para atualizar uma receita existente
const updateRecipe = async (updatedRecipe: Recipe): Promise<Recipe> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/receitas/${updatedRecipe.id}`, updatedRecipe, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("Resposta do backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar receita:", error);
    if (axios.isAxiosError(error)) {
      console.error("Detalhes do erro:", error.response?.data); // Log detalhado do erro
      console.error("Status do erro:", error.response?.status); // Log do status HTTP
    } else {
      console.error("Erro desconhecido:", error);
    }
    throw new Error("Erro ao atualizar receita. Tente novamente mais tarde.");
  }
};
// Hook useRecipes
export const useRecipes = () => {
  const queryClient = useQueryClient();

  // Busca todas as receitas
  const { data, isLoading, error } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  // Mutação para criar uma nova receita
  const createRecipeMutation = useMutation<Recipe, Error, Omit<Recipe, "id">>({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  // Mutação para atualizar uma receita existente
  const updateRecipeMutation = useMutation<Recipe, Error, Recipe>({
    mutationFn: updateRecipe,
    onSuccess: (data) => {
      // Atualiza o cache com a receita atualizada
      queryClient.setQueryData<Recipe[]>(["recipes"], (oldData) => {
        return oldData?.map(recipe => recipe.id === data.id ? data : recipe) || [];
      });
    },
  });

  // Função para deletar uma receita
  const deleteRecipe = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_BASE_URL}/receitas/${id}`);
    } catch (error) {
      console.error("Erro ao deletar receita:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalhes do erro:", error.response?.data);
      }
      throw new Error("Erro ao deletar receita. Tente novamente mais tarde.");
    }
  };

  // Mutação para deletar uma receita
  const deleteRecipeMutation = useMutation<void, Error, string>({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
  });

  return {
    data,
    isLoading,
    error,
    createRecipeMutation,
    updateRecipeMutation,
    deleteRecipeMutation,
  };
};

function deleteRecipe(variables: string): Promise<void> {
  throw new Error("Function not implemented.");
}
