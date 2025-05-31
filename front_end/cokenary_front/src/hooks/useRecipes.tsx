import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

// Tipos (mantidos os mesmos)
export interface Ingredient {
  id: string;
  nome: string;
}

export interface Measure {
  id: string;
  nome: string;
}

export interface Cargo {
  id_cargo: string;
  nome: string;
  descricao?: string;
}

export interface Categoria {
  id_categoria: string;
  nome: string;
}

export interface Funcionario {
  id_funcionario: string;
  nome: string;
  cargo_id: Cargo;
}

export interface IngredientWithMeasure {
  id: string;
  nome: string;
  quantidade: string;
  medida: string;
}

export interface Recipe {
  id_receita: string;
  nomeReceita: string;
  data_criacao: string;
  cozinheiro_id: Funcionario;
  categoria_id: Categoria;
  modo_preparo: string;
  ingredientes: IngredientWithMeasure[];
}

export interface NewRecipePayload {
  nomeReceita: string;
  data_criacao?: string;
  cozinheiro_id: { id_func: string };
  categoria_id: { id_cat: number };
  modo_preparo: string;
  //ingredientes?: IngredientWithMeasure[];
}

type RecipeUpdatePayload = Recipe;

export const useRecipes = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleApiError = (error: unknown) => {
    console.error("API Error:", error);
    let errorMessage = "Erro ao processar a requisição. Tente novamente.";

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

  // --- QUERY: Buscar receitas ---
  const fetchRecipes = async (): Promise<Recipe[]> => {
    try {
      const response = await axios.get("http://localhost:8081/receitas/listar", {
        headers: defaultHeaders,
        
      });
      console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      handleApiError(error);

      return [];
    }
  };


  const {
    data: recipes = [],
    isLoading: isLoadingRecipes,
    error: recipesError,
    refetch: refetchRecipes,
  } = useQuery<Recipe[], Error>({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
    retry: 1,
  });

  // --- QUERY: Buscar categorias ---
  const {
    data: categorias = [],
    isLoading: isLoadingCategorias,
    error: categoriasError,
    refetch: refetchCategorias,
  } = useQuery<Categoria[], Error>({
    queryKey: ["categoria"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8081/receitas/categoria/listar", {
        headers: defaultHeaders,
      });
      return response.data;
    },
    retry: 1,
  });

  // --- QUERY: Buscar medidas ---
  const {
    data: medidas = [],
    isLoading: isLoadingMedidas,
    error: medidasError,
    refetch: refetchMedidas,
  } = useQuery<Measure[], Error>({
    queryKey: ["medidas"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:8081/receitas/medida/listar", {
        headers: defaultHeaders,
      });
      return response.data;
    },
    retry: 1,
  });

  // --- MUTATION: Criar receita ---
  const createRecipeMutation = useMutation({
    mutationFn: async (recipeData: NewRecipePayload) => {
      const payload = {
        ...recipeData,
        data_criacao: recipeData.data_criacao || new Date().toISOString().split("T")[0],
      };

      const response = await axios.post("http://localhost:8081/receitas/cadastrar", payload, {
        headers: defaultHeaders,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast({
        title: "Sucesso",
        description: "Receita criada com sucesso!",
        variant: "default",
      });
    },
    onError: handleApiError,
  });

  // --- MUTATION: Atualizar receita ---
  const updateRecipeMutation = useMutation({
    mutationFn: async (updatedRecipe: RecipeUpdatePayload) => {
      const response = await axios.put(
        `http://localhost:8081/receitas/alterar/${updatedRecipe.id_receita}`,
        updatedRecipe,
        { headers: defaultHeaders }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast({
        title: "Sucesso",
        description: "Receita atualizada com sucesso!",
        variant: "default",
      });
    },
    onError: handleApiError,
  });

  // --- MUTATION: Deletar receita ---
  const deleteRecipeMutation = useMutation({
    mutationFn: async (recipeId: string) => {
      const response = await axios.delete(
        `http://localhost:8081/receitas/excluir/${recipeId}`,
        { headers: defaultHeaders }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      toast({
        title: "Sucesso",
        description: "Receita excluída com sucesso!",
        variant: "default",
      });
    },
    onError: handleApiError,
  });

  return {
    // receitas
    recipes,
    isLoadingRecipes,
    recipesError,
    refetchRecipes,

    // categorias
    categorias,
    isLoadingCategorias,
    categoriasError,
    refetchCategorias,

    // medidas
    medidas,
    isLoadingMedidas,
    medidasError,
    refetchMedidas,

    // mutations
    createRecipeMutation,
    updateRecipeMutation,
    deleteRecipeMutation,
  };
};