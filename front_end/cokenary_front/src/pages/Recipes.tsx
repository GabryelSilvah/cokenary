import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Eye, Pencil, Trash, Coffee, CakeSlice, Wine, Calendar, Star, RefreshCw } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import RecipeDetailsDialog from "@/components/ui/recipe-details-dialog";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import {
  Badge
} from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useRecipes } from "@/hooks/useRecipes";

type Recipe = {
  id: string;
  title: string;
  nome?: string;
  description: string;
  ingredients?: string | string[];
  ingredientes?: string[] | string;
  instructions?: string[] | string;
  modoPreparo?: string[] | string;
  chef?: string;
  category?: string;
  difficulty?: string;
  time?: string;
  prepTime?: string;
  rating?: number;
  image?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  ingredientsWithQuantities?: IngredientWithQuantity[]; // Added this property
};

type Ingredient = {
  id: string;
  nome: string;
};

type Measure = {
  id: string;
  nome: string;
};

type IngredientWithQuantity = {
  id: string;
  nome: string;
  quantity: string;
  measure: string;
};

const Recipes = () => {
  const { token } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const {
    recipes,                   // Alterado de data para recipes
    isLoadingRecipes,
    recipesError,
    createRecipeMutation,
    updateRecipeMutation,
    deleteRecipeMutation
  } = useRecipes();

  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const [newRecipe, setNewRecipe] = useState<Recipe>({
    id: "",
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: "comida",
    chef: "",
    difficulty: "Medium",
    time: "30 min",
    rating: 0,
    image: ""
  });
  const [isAdding, setIsAdding] = useState(false);

  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [measuresList, setMeasuresList] = useState<Measure[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientWithQuantity[]>([]);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isLoadingMeasures, setIsLoadingMeasures] = useState(false);
  const [ingredientsError, setIngredientsError] = useState<string | null>(null);
  const [measuresError, setMeasuresError] = useState<string | null>(null);




  const fetchIngredients = async () => {
    if (!token) {
      setIngredientsError("Autenticação necessária");
      return;
    }

    setIsLoadingIngredients(true);
    setIngredientsError(null);
    try {
      const response = await fetch('http://localhost:8081/ingredientes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro ao carregar ingredientes: ${response.status}`);
      }
      const data: Ingredient[] = await response.json();
      setIngredientsList(data);
    } catch (error) {
      console.error("Error fetching ingredients:", error);
      setIngredientsError("Falha ao carregar ingredientes");
      toast({
        title: "Erro",
        description: "Não foi possível carregar os ingredientes",
        variant: "destructive"
      });
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  const fetchMeasures = async () => {
    if (!token) {
      setMeasuresError("Autenticação necessária");
      return;
    }

    setIsLoadingMeasures(true);
    setMeasuresError(null);
    try {
      const response = await fetch('http://localhost:8081/medidas', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error(`Erro ao carregar medidas: ${response.status}`);
      }
      const data: Measure[] = await response.json();
      setMeasuresList(data);
    } catch (error) {
      console.error("Error fetching measures:", error);
      setMeasuresError("Falha ao carregar medidas");
      toast({
        title: "Erro",
        description: "Não foi possível carregar as medidas",
        variant: "destructive"
      });
    } finally {
      setIsLoadingMeasures(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchIngredients();
      fetchMeasures();
    }
  }, [token]);

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => {
      if (prev.some(i => i.id === ingredient.id)) {
        return prev.filter(i => i.id !== ingredient.id);
      }
      return [...prev, {
        id: ingredient.id,
        nome: ingredient.nome,
        quantity: '',
        measure: ''
      }];
    });
  };

  const handleQuantityChange = (ingredientId: string, field: 'quantity' | 'measure', value: string) => {
    setSelectedIngredients(prev =>
      prev.map(ingredient =>
        ingredient.id === ingredientId
          ? { ...ingredient, [field]: value }
          : ingredient
      )
    );
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
  };

  const handleAddRecipe = async () => {
    setIsAdding(true);
    try {
      if (!token) {
        throw new Error("Usuário não autenticado. Por favor, faça login.");
      }

      validateRecipe(newRecipe, selectedIngredients);
      const recipeData = formatRecipeData(newRecipe, selectedIngredients);

      await createRecipeMutation.mutateAsync(recipeData);

      // Reset do formulário
      setNewRecipe({
        id: "",
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        category: "comida",
        chef: "",
        difficulty: "Medium",
        time: "30 min",
        rating: 0,
        image: ""
      });
      setSelectedIngredients([]);

      toast({
        title: "Sucesso",
        description: "Receita adicionada com sucesso!",
        variant: "default"
      });

      setEditDialogOpen(false);
    } catch (error) {
      handleApiError(error, "Erro ao adicionar receita");
    } finally {
      setIsAdding(false);
    }
  };


  const handleDeleteClick = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = async (recipe: Recipe) => {
    const parsedIngredients: IngredientWithQuantity[] = [];

    const ingredientsText = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join('\n')
      : Array.isArray(recipe.ingredientes)
        ? recipe.ingredientes.join('\n')
        : typeof recipe.ingredients === "string"
          ? recipe.ingredients
          : typeof recipe.ingredientes === "string"
            ? recipe.ingredientes
            : "";

    const ingredientLines = ingredientsText.split('\n').filter(line => line.trim() !== '');
    const addedIngredients = new Set<string>();

    for (const line of ingredientLines) {
      if (!line.trim()) continue;

      const exactMatch = ingredientsList.find(ing => {
        const normalizedLine = line.trim().toLowerCase();
        const normalizedIngName = ing.nome.toLowerCase();

        if (normalizedLine === normalizedIngName) {
          return true;
        }

        return normalizedLine.endsWith(normalizedIngName) &&
          normalizedLine.length > normalizedIngName.length;
      });

      if (exactMatch) {
        if (addedIngredients.has(exactMatch.id)) continue;

        parsedIngredients.push({
          id: exactMatch.id,
          nome: exactMatch.nome,
          quantity: '',
          measure: ''
        });
        addedIngredients.add(exactMatch.id);
        continue;
      }

      const match = line.match(/^(\d+\s?\d*\/?\d*\s?)?([^\s\d]+\s?)?(.+)?/);

      if (match) {
        const quantity = match[1]?.trim() || '';
        const measure = match[2]?.trim() || '';
        const name = match[3]?.trim() || line.trim();

        let ingredient = ingredientsList.find(ing => {
          const normalizedName = name.toLowerCase();
          const normalizedIngName = ing.nome.toLowerCase();

          if (normalizedName === normalizedIngName) {
            return true;
          }

          return normalizedName.endsWith(normalizedIngName) &&
            normalizedName.length > normalizedIngName.length;
        });

        if (!ingredient) {
          ingredient = {
            id: `temp-${name}`,
            nome: name
          };
        }

        if (addedIngredients.has(ingredient.id)) continue;

        parsedIngredients.push({
          id: ingredient.id,
          nome: ingredient.nome,
          quantity,
          measure
        });
        addedIngredients.add(ingredient.id);
      }
    }

    setSelectedIngredients(parsedIngredients);

    const instructionsText = Array.isArray(recipe.instructions)
      ? recipe.instructions.join('\n')
      : Array.isArray(recipe.modoPreparo)
        ? recipe.modoPreparo.join('\n')
        : recipe.instructions || recipe.modoPreparo || "";

    setRecipeToEdit({
      id: recipe.id,
      title: recipe.title || recipe.nome || "",
      description: recipe.description || "",
      ingredients: ingredientsText,
      instructions: instructionsText,
      category: recipe.category || "comida",
      chef: recipe.chef || "",
      difficulty: recipe.difficulty || "Medium",
      time: recipe.time || "",
      rating: recipe.rating || 0,
      image: recipe.image || "",
      createdAt: recipe.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    setEditDialogOpen(true);
  };


  // Função auxiliar para tratamento de erros
  const handleApiError = (error: unknown, defaultMessage: string) => {
    console.error("Erro:", error);

    let errorMessage = defaultMessage;

    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    } else if (error && typeof error === 'object' && 'response' in error) {
      // Tratamento para erros de API (Axios, Fetch, etc.)
      const apiError = error as { response?: { data?: { message?: string } } };
      errorMessage = apiError.response?.data?.message || defaultMessage;
    } else if (error && typeof error === 'object' && 'message' in error) {
      errorMessage = (error as { message: string }).message;
    }

    toast({
      title: "Erro",
      description: errorMessage,
      variant: "destructive"
    });

    // Log detalhado em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.groupCollapsed("Detalhes do erro:");
      console.log("Tipo:", typeof error);
      console.log("Objeto completo:", error);
      if (error instanceof Error && error.stack) {
        console.log("Stack trace:", error.stack);
      }
      console.groupEnd();
    }

    return errorMessage;
  };

  const validateRecipe = (recipe: any, ingredients: any[]) => {
    if (!recipe.title?.trim()) {
      throw new Error("O título da receita é obrigatório");
    }
    if (!recipe.description?.trim()) {
      throw new Error("A descrição da receita é obrigatória");
    }
    if (ingredients.length === 0) {
      throw new Error("Pelo menos um ingrediente deve ser adicionado");
    }
    ingredients.forEach(ingredient => {
      if (!ingredient.nome?.trim()) {
        throw new Error("Nome do ingrediente não pode estar vazio");
      }
    });

    const instructions = typeof recipe.instructions === 'string'
      ? recipe.instructions
      : Array.isArray(recipe.instructions)
        ? recipe.instructions.join('\n')
        : '';

    if (!instructions.trim()) {
      throw new Error("As instruções da receita são obrigatórias");
    }

    const rating = parseFloat(recipe.rating?.toString() || "0") || 0;
    if (rating < 0 || rating > 5) {
      throw new Error("A avaliação deve estar entre 0 e 5");
    }
  };

  const formatRecipeData = (recipe: any, selectedIngredients: any[]) => {
    const formattedIngredients = selectedIngredients.map(ingredient => {
      const quantity = ingredient.quantity ? `${ingredient.quantity} ` : '';
      const measure = ingredient.measure ? `${ingredient.measure} ` : '';
      return `${quantity}${measure}${ingredient.nome}`.trim();
    });

    const instructions = typeof recipe.instructions === 'string'
      ? recipe.instructions
      : Array.isArray(recipe.instructions)
        ? recipe.instructions.join('\n')
        : '';

    return {
      ...recipe,
      title: recipe.title.trim(),
      description: recipe.description.trim(),
      ingredients: formattedIngredients,
      instructions: instructions,
      category: recipe.category || "comida",
      chef: recipe.chef?.trim() || "",
      difficulty: recipe.difficulty || "Medium",
      time: recipe.time || "30 min",
      rating: parseFloat(recipe.rating?.toString() || "0") || 0,
      image: recipe.image?.trim() || "",
      ingredientsWithQuantities: selectedIngredients.map(ingredient => ({
        id: ingredient.id,
        nome: ingredient.nome,
        quantity: ingredient.quantity,
        measure: ingredient.measure
      }))
    };
  };


  const handleUpdateRecipe = async () => {
    if (!recipeToEdit) return;

    setIsAdding(true); // Ou setIsUpdating, se preferir
    try {
      validateRecipe(recipeToEdit, selectedIngredients);
      const updatedRecipe = formatRecipeData(recipeToEdit, selectedIngredients);

      // Mantém as datas originais
      const recipeWithDates = {
        ...updatedRecipe,
        id: recipeToEdit.id,
        description: recipeToEdit.description || '',
        createdAt: recipeToEdit.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await updateRecipeMutation.mutateAsync(recipeWithDates);

      setEditDialogOpen(false);
      toast({
        title: "Receita atualizada!",
        description: "Os dados foram atualizados com sucesso.",
        variant: "default",
      });
    } catch (error) {
      handleApiError(error, "Erro ao atualizar a receita");
    } finally {
      setIsAdding(false); // Ou setIsUpdating(false)
    }
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      await deleteRecipeMutation.mutateAsync(recipeToDelete);
      toast({
        title: "Receita excluída",
        description: "A receita foi removida com sucesso.",
        variant: "default"
      });
    } catch (error) {
      console.error("Error deleting recipe:", error);
      toast({
        title: "Erro ao excluir receita",
        description: "Ocorreu um erro ao excluir a receita.",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setRecipeToDelete(null);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeDetailsOpen(true);
  };

  const getRecipeTitle = (recipe: Recipe) => {
    return recipe.title || recipe.nome || "Sem título";
  };

  const getRecipeIngredients = (recipe: Recipe) => {
    if (Array.isArray(recipe.ingredients)) {
      return recipe.ingredients;
    }
    if (Array.isArray(recipe.ingredientes)) {
      return recipe.ingredientes;
    }
    if (typeof recipe.ingredients === "string") {
      return recipe.ingredients.split('\n');
    }
    if (typeof recipe.ingredientes === "string") {
      return recipe.ingredientes.split('\n');
    }
    return [];
  };

  const getRecipeInstructions = (recipe: Recipe) => {
    if (Array.isArray(recipe.instructions)) {
      return recipe.instructions.join("\n");
    }
    if (Array.isArray(recipe.modoPreparo)) {
      return recipe.modoPreparo.join("\n");
    }
    return recipe.instructions || recipe.modoPreparo || "";
  };

  const filteredRecipes = Array.isArray(recipes) ? recipes.filter(recipe => {
    const titleMatch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const ingredientsMatch = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase()))
      : typeof recipe.ingredients === "string"
        ? typeof recipe.ingredients === "string" && (recipe.ingredients as string).toLowerCase().includes(searchTerm.toLowerCase())
        : false;
    const instructionsMatch = Array.isArray(recipe.instructions)
      ? recipe.instructions.some(instruction => instruction.toLowerCase().includes(searchTerm.toLowerCase()))
      : (recipe.instructions as string)?.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      (searchTerm === "" || titleMatch || ingredientsMatch || instructionsMatch) &&
      (categoryFilter === null || recipe.category === categoryFilter)
    );
  }) : [];

  const getCategoryIcon = (category: string | undefined) => {
    switch (category) {
      case "comida":
        return <CakeSlice className="h-4 w-4 mr-1" />;
      case "bebida":
        return <Wine className="h-4 w-4 mr-1" />;
      case "sobremesa":
        return <Coffee className="h-4 w-4 mr-1" />;
      default:
        return <CakeSlice className="h-4 w-4 mr-1" />;
    }
  };

  const getCategoryName = (category: string | undefined) => {
    switch (category) {
      case "comida":
        return "Comida";
      case "bebida":
        return "Bebida";
      case "sobremesa":
        return "Sobremesa";
      default:
        return "Comida";
    }
  };

  const getDifficultyInPortuguese = (difficulty: string | undefined) => {
    switch (difficulty) {
      case "Easy":
        return "Fácil";
      case "Medium":
        return "Médio";
      case "Hard":
        return "Difícil";
      default:
        return "Médio";
    }
  };

  const formatDateForInput = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const RecipeDates = ({ createdAt, updatedAt }: { createdAt?: string | Date | null; updatedAt?: string | Date | null }) => {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Publicado: {formatDateForInput(createdAt)}</span>
        </div>

        {updatedAt && updatedAt !== createdAt && (
          <div className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            <span>Atualizado: {formatDateForInput(updatedAt)}</span>
          </div>
        )}
      </div>
    );
  };

  const renderRating = (rating?: number) => {
    if (!rating) return null;

    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
          />
        ))}
        <span className="ml-1 text-xs">({rating.toFixed(1)})</span>
      </div>
    );
  };

  const RecipeIngredientsDisplay = ({ ingredients }: { ingredients: string[] }) => (
    <div className="space-y-1">
      {ingredients.map((ingredient, index) => (
        <div key={index} className="flex items-start">
          <span className="mr-2">•</span>
          <span>{ingredient}</span>
        </div>
      ))}
    </div>
  );

  if (isLoadingRecipes) return <div className="flex items-center justify-center h-screen">Carregando receitas...</div>;
  if (recipesError) return <div className="p-4 text-red-500">Erro ao carregar receitas: {recipesError.message}</div>;

  return (
    <div className="pb-12">
      <SectionContainer className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <PageHeader
            title="Receitas"
            description="Explore nossa coleção de receitas profissionais"
          />

          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <CakeSlice className="mr-2 h-4 w-4" />
                Adicionar Receita
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar Receita</DialogTitle>
                <DialogDescription>
                  Preencha os detalhes da nova receita.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Receita</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Risoto de Camarão"
                    value={newRecipe.title}
                    onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descrição da receita"
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Ingredientes</Label>
                  {!token ? (
                    <div className="text-red-500 text-sm">Autenticação necessária para carregar ingredientes</div>
                  ) : ingredientsError ? (
                    <div className="text-red-500 text-sm">{ingredientsError}</div>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full" disabled={isLoadingIngredients}>
                          {isLoadingIngredients ? (
                            "Carregando ingredientes..."
                          ) : (
                            <>
                              Selecionar Ingredientes ({selectedIngredients.length})
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto overflow-x-auto">
                        {ingredientsList.map(ingredient => (
                          <DropdownMenuItem
                            key={ingredient.id}
                            onSelect={(e) => e.preventDefault()}
                            className="flex items-center whitespace-nowrap"
                          >
                            <input
                              type="checkbox"
                              checked={selectedIngredients.some(i => i.id === ingredient.id)}
                              onChange={() => handleIngredientSelect(ingredient)}
                              className="mr-2"
                            />
                            {ingredient.nome}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}

                  <div className="mt-2 space-y-2">
                    {selectedIngredients.map(ingredient => (
                      <div key={ingredient.id} className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveIngredient(ingredient.id)}
                          className="h-6 w-6 text-red-500"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>

                        <Input
                          type="text"
                          placeholder="Qtd"
                          value={ingredient.quantity}
                          onChange={(e) => handleQuantityChange(ingredient.id, 'quantity', e.target.value)}
                          className="w-20"
                        />

                        <span className="flex-1">{ingredient.nome}</span>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" disabled={!token || isLoadingMeasures}>
                              {ingredient.measure || "Medida"}
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="max-h-60 overflow-y-auto overflow-x-auto"
                            style={{ minWidth: "200px" }}
                          >
                            <div className="flex flex-col" style={{ minWidth: "max-content" }}>
                              {measuresList.map(measure => (
                                <DropdownMenuItem
                                  key={measure.id}
                                  onClick={() => handleQuantityChange(ingredient.id, 'measure', measure.nome)}
                                  className="whitespace-nowrap px-4 py-2"
                                >
                                  {measure.nome}
                                </DropdownMenuItem>
                              ))}
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>

                  {selectedIngredients.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedIngredients([])}
                      className="text-red-500 mt-2"
                    >
                      <Trash className="h-3 w-3 mr-1" />
                      Remover todos os ingredientes
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Modo de Preparo</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Passo a passo do preparo (um por linha)"
                    className="min-h-[100px]"
                    value={newRecipe.instructions}
                    onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cookTime">Tempo de Cozimento</Label>
                  <Input
                    id="cookTime"
                    placeholder="Ex: 20 minutos"
                    value={newRecipe.time}
                    onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Dificuldade</Label>
                  <select
                    id="difficulty"
                    value={newRecipe.difficulty}
                    onChange={(e) => setNewRecipe({ ...newRecipe, difficulty: e.target.value })}
                    className="text-white bg-black w-full p-2 border rounded-md"
                  >
                    <option value="Easy">Fácil</option>
                    <option value="Medium">Médio</option>
                    <option value="Hard">Difícil</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="chef">Chef</Label>
                    <Input
                      id="chef"
                      placeholder="Nome do chef"
                      value={newRecipe.chef}
                      onChange={(e) => setNewRecipe({ ...newRecipe, chef: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rating">Avaliação (0-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      placeholder="Ex: 4.5"
                      value={newRecipe.rating}
                      onChange={(e) => setNewRecipe({ ...newRecipe, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <select
                    id="category"
                    value={newRecipe.category}
                    onChange={(e) => setNewRecipe({ ...newRecipe, category: e.target.value })}
                    className="text-white bg-black w-full p-2 border rounded-md"
                  >
                    <option value="comida">Comida</option>
                    <option value="bebida">Bebida</option>
                    <option value="sobremesa">Sobremesa</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={newRecipe.image}
                    onChange={(e) => setNewRecipe({ ...newRecipe, image: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setNewRecipe({
                      id: "",
                      title: "",
                      description: "",
                      ingredients: "",
                      instructions: "",
                      category: "comida",
                      chef: "",
                      difficulty: "Medium",
                      time: "30 min",
                      rating: 0,
                      image: ""
                    });
                    setSelectedIngredients([]);
                  }}
                >
                  Limpar
                </Button>
                <Button onClick={handleAddRecipe} disabled={isAdding}>
                  {isAdding ? "Salvando..." : "Salvar Receita"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar receitas..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Filtrar
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => setCategoryFilter(null)}>
                Todas as Receitas
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCategoryFilter("comida")}>
                <CakeSlice className="h-4 w-4 mr-2" /> Comidas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("bebida")}>
                <Wine className="h-4 w-4 mr-2" /> Bebidas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter("sobremesa")}>
                <Coffee className="h-4 w-4 mr-2" /> Sobremesas
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Card key={recipe.id} className="overflow-hidden card-hover">
                <div className="relative h-48">
                  <img
                    src={recipe.image || "https://images.unsplash.com/photo-1555939594-58d7cb561ad1"}
                    alt={getRecipeTitle(recipe)}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="text-black absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1">
                    <Badge variant="outline" className="text-black flex items-center">
                      {getCategoryIcon(recipe.category)}
                      {getCategoryName(recipe.category)}
                    </Badge>
                  </div>
                  {recipe?.rating !== undefined && (
                    <div className="text-black absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
                      {renderRating(Number(recipe.rating))}
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{getRecipeTitle(recipe)}</CardTitle>
                  <CardDescription>{recipe.description || ""}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Por:</span> {recipe.chef || "Chef não especificado"}
                    </div>

                    <div className="flex flex-wrap justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Dificuldade: </span>
                        {getDifficultyInPortuguese(recipe.difficulty)}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tempo:</span> {recipe.time || "30 min"}
                      </div>
                    </div>

                    <div className="flex flex-col mt-2 text-xs text-muted-foreground">
                      <RecipeDates
                        createdAt={recipe.createdAt}
                        updatedAt={recipe.updatedAt}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewRecipe(recipe)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Receita
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditClick(recipe)}
                    >
                      <Pencil className="h-5 w-5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(recipe.id)}
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground">
              Nenhuma receita encontrada.
            </div>
          )}
        </div>
      </SectionContainer>

      {recipeToEdit && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-[90vw] sm:max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Receita</DialogTitle>
              <DialogDescription>
                Atualize os detalhes da sua receita.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título da Receita</Label>
                <Input
                  id="edit-title"
                  value={recipeToEdit?.title || ''}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={recipeToEdit?.description || ''}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Ingredientes</Label>
                {!token ? (
                  <div className="text-red-500 text-sm">Autenticação necessária para carregar ingredientes</div>
                ) : ingredientsError ? (
                  <div className="text-red-500 text-sm">{ingredientsError}</div>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full" disabled={isLoadingIngredients}>
                        {isLoadingIngredients ? (
                          "Carregando ingredientes..."
                        ) : (
                          <>
                            Selecionar Ingredientes ({selectedIngredients.length})
                            <ChevronDown className="ml-2 h-4 w-4" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
                      {ingredientsList.map(ingredient => (
                        <DropdownMenuItem
                          key={ingredient.id}
                          onSelect={(e) => e.preventDefault()}
                          className="flex items-center"
                        >
                          <input
                            type="checkbox"
                            checked={selectedIngredients.some(i => i.id === ingredient.id)}
                            onChange={() => handleIngredientSelect(ingredient)}
                            className="mr-2"
                          />
                          {ingredient.nome}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}

                <div className="mt-2 space-y-2">
                  {selectedIngredients.map(ingredient => (
                    <div key={ingredient.id} className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveIngredient(ingredient.id)}
                        className="h-6 w-6 text-red-500"
                      >
                        <Trash className="h-3 w-3" />
                      </Button>

                      <Input
                        type="text"
                        placeholder="Qtd"
                        value={ingredient.quantity}
                        onChange={(e) => handleQuantityChange(ingredient.id, 'quantity', e.target.value)}
                        className="w-20"
                      />

                      <span className="flex-1">{ingredient.nome}</span>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" disabled={!token || isLoadingMeasures}>
                            {ingredient.measure || "Medida"}
                            <ChevronDown className="ml-2 h-4 w-4 " />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <div className="max-h-60 overflow-y-auto"> {/* Adicione esta div com max-height e overflow */}
                            {measuresList.map(measure => (
                              <DropdownMenuItem
                                key={measure.id}
                                onClick={() => handleQuantityChange(ingredient.id, 'measure', measure.nome)}
                              >
                                {measure.nome}
                              </DropdownMenuItem>
                            ))}
                          </div>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>

                {selectedIngredients.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedIngredients([])}
                    className="text-red-500 mt-2"
                  >
                    <Trash className="h-3 w-3 mr-1" />
                    Remover todos os ingredientes
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-instructions">Modo de Preparo</Label>
                <Textarea
                  id="edit-instructions"
                  value={recipeToEdit?.instructions || ''}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, instructions: e.target.value })}
                  className="min-h-[100px]"
                />
                <div className="text-sm text-muted-foreground">
                  {typeof recipeToEdit?.instructions === 'string' && (
                    <>{recipeToEdit.instructions.length} caracteres</>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-time">Tempo de Preparo</Label>
                <Input
                  id="edit-time"
                  placeholder="Ex: 30 minutos"
                  value={recipeToEdit?.time || ''}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, time: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-difficulty">Dificuldade</Label>
                <select
                  id="edit-difficulty"
                  value={recipeToEdit?.difficulty || "Medium"}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, difficulty: e.target.value })}
                  className="text-white bg-black w-full p-2 border rounded-md"
                >
                  <option value="Easy">Fácil</option>
                  <option value="Medium">Médio</option>
                  <option value="Hard">Difícil</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-chef">Chef</Label>
                  <Input
                    id="edit-chef"
                    value={recipeToEdit?.chef || ''}
                    onChange={(e) => setRecipeToEdit({ ...recipeToEdit, chef: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-rating">Avaliação (0-5)</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={recipeToEdit?.rating || 0}
                    onChange={(e) => setRecipeToEdit({ ...recipeToEdit, rating: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <select
                  id="edit-category"
                  value={recipeToEdit?.category || "comida"}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, category: e.target.value })}
                  className="text-white bg-black w-full p-2 border rounded-md"
                >
                  <option value="comida">Comida</option>
                  <option value="bebida">Bebida</option>
                  <option value="sobremesa">Sobremesa</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-image">URL da Imagem</Label>
                <Input
                  id="edit-image"
                  value={recipeToEdit?.image || ''}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, image: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Datas da Receita</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="created-at" className="text-xs">Data de Publicação</Label>
                    <Input
                      id="created-at"
                      value={formatDateForInput(recipeToEdit?.createdAt)}
                      readOnly
                      disabled
                      className="bg-gray-100 text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="updated-at" className="text-xs">Última Atualização</Label>
                    <Input
                      id="updated-at"
                      value={formatDateForInput(recipeToEdit?.updatedAt)}
                      readOnly
                      disabled
                      className="bg-gray-100 text-black"
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">A data de atualização será definida automaticamente ao salvar as mudanças.</p>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateRecipe}>Atualizar Receita</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedRecipe && (
        <RecipeDetailsDialog
          recipe={{
            id: selectedRecipe.id || '',
            title: selectedRecipe.title || '',
            description: selectedRecipe.description || '', // Fornece valor padrão
            ingredients: selectedRecipe.ingredients || [],
            instructions: selectedRecipe.instructions || '',
            category: selectedRecipe.category || 'comida',
            chef: selectedRecipe.chef || '',
            difficulty: selectedRecipe.difficulty || 'Medium',
            time: selectedRecipe.time || '30 min',
            rating: selectedRecipe.rating || 0,
            image: selectedRecipe.image || '',
            createdAt: typeof selectedRecipe.createdAt === 'string' ? selectedRecipe.createdAt : selectedRecipe.createdAt?.toISOString() || new Date().toISOString(),
            updatedAt: typeof selectedRecipe.updatedAt === 'string' ? selectedRecipe.updatedAt : selectedRecipe.updatedAt?.toISOString() || new Date().toISOString(),
            ...(selectedRecipe.ingredientsWithQuantities && {
              ingredientsWithQuantities: selectedRecipe.ingredientsWithQuantities
            })
          }}
          isOpen={recipeDetailsOpen}
          onClose={() => setRecipeDetailsOpen(false)}
        />
      )}

      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Receita"
        description="Tem certeza que deseja excluir esta receita? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="delete"
      />
    </div>
  );
};

export default Recipes;