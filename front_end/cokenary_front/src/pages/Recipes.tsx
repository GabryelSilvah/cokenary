import { useState } from "react";
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

// Define the Recipe type
type Recipe = {
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
  prepTime?: string;
  rating?: number;
  image?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [recipeToEdit, setRecipeToEdit] = useState<any>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const {
    data: recipes,
    isLoading,
    error,
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
    difficulty: "Medium", // Valor padrão definido como "Medium"
    time: "30 min",
    rating: 0,
    image: ""
  });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddRecipe = async () => {
    setIsAdding(true);
    try {
      const currentDate = new Date().toISOString();

      // Formata os ingredientes como um array
      const formattedRecipe = {
        title: newRecipe.title,
        nome: newRecipe.title,
        description: newRecipe.description,
        ingredients: typeof newRecipe.ingredients === 'string' ?
          newRecipe.ingredients.split('\n').filter(Boolean) : // Converte string em array
          newRecipe.ingredients,
        ingredientes: typeof newRecipe.ingredients === 'string' ?
          newRecipe.ingredients.split('\n').filter(Boolean) : // Converte string em array
          newRecipe.ingredients,
        instructions: typeof newRecipe.instructions === 'string' ?
          newRecipe.instructions :
          newRecipe.instructions.join('\n'),
        modoPreparo: typeof newRecipe.instructions === 'string' ?
          newRecipe.instructions :
          newRecipe.instructions.join('\n'),
        chef: newRecipe.chef,
        category: newRecipe.category,
        difficulty: newRecipe.difficulty || "Medium", // Garante que a dificuldade tenha um valor padrão
        time: newRecipe.time,
        rating: parseFloat(newRecipe.rating.toString()) || 0,
        image: newRecipe.image,
        createdAt: currentDate,
        updatedAt: currentDate
      };

      console.log("Submitting recipe:", formattedRecipe); // Verifique se os ingredientes estão corretos aqui

      await createRecipeMutation.mutateAsync(formattedRecipe);

      // Limpa o formulário após o envio
      setNewRecipe({
        id: "",
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        category: "",
        chef: "",
        difficulty: "Medium", // Valor padrão ao limpar o formulário
        time: "",
        rating: 0,
        image: ""
      });

      // Fecha o diálogo
      const closeButton = document.querySelector('.close-dialog');
      if (closeButton instanceof HTMLElement) {
        closeButton.click();
      }
    } catch (error) {
      console.error("Error creating recipe:", error);
      toast({
        title: "Erro ao adicionar receita",
        description: "Ocorreu um erro ao salvar a receita.",
        variant: "destructive"
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (recipe: Recipe) => {
    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join('\n')
      : Array.isArray(recipe.ingredientes)
        ? recipe.ingredientes.join('\n')
        : (typeof recipe.ingredients === "string" ? recipe.ingredients :
          typeof recipe.ingredientes === "string" ? recipe.ingredientes : "");

    setRecipeToEdit({
      id: recipe.id,
      title: recipe.title || recipe.nome || "",
      description: recipe.description || "",
      ingredients: ingredients,
      instructions: Array.isArray(recipe.instructions)
        ? recipe.instructions.join('\n')
        : Array.isArray(recipe.modoPreparo)
          ? recipe.modoPreparo.join('\n')
          : recipe.instructions || recipe.modoPreparo || "",
      category: recipe.category || "comida",
      chef: recipe.chef || "",
      difficulty: newRecipe.difficulty, // Valor padrão ao editar
      time: recipe.time || "",
      rating: recipe.rating || 0,
      image: recipe.image || "",
      createdAt: recipe.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    setEditDialogOpen(true);
  };

  const handleUpdateRecipe = async () => {
    try {
      if (!recipeToEdit) throw new Error("Nenhuma receita selecionada para edição.");
      if (!recipeToEdit.title || !recipeToEdit.description) throw new Error("Título e descrição são obrigatórios.");

      const updatedRecipe = {
        ...recipeToEdit,
        ingredients: Array.isArray(recipeToEdit.ingredients)
          ? recipeToEdit.ingredients.filter(Boolean) // Remove strings vazias
          : typeof recipeToEdit.ingredients === "string"
            ? recipeToEdit.ingredients.split("\n").filter(Boolean) // Converte string para array
            : [],
        instructions: Array.isArray(recipeToEdit.instructions)
          ? recipeToEdit.instructions.join("\n") // Converte array para string
          : recipeToEdit.instructions || "", // Mantém string
        updatedAt: new Date().toISOString(),
      };

      console.log("Enviando atualização para API:", updatedRecipe);

      const response = await fetch(`http://localhost:8080/receitas/${updatedRecipe.id}`, {
        method: "PUT", // Troque para PATCH se a API exigir atualização parcial
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRecipe),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

      setEditDialogOpen(false);

      toast({
        title: "Receita atualizada!",
        description: "Os dados foram atualizados com sucesso.",
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);

      toast({
        title: "Erro ao atualizar",
        description: error instanceof Error ? error.message : "Erro desconhecido.",
        variant: "destructive",
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      await deleteRecipeMutation.mutateAsync(recipeToDelete);
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
    setSelectedRecipe(recipe); // Atualiza a receita selecionada
    setRecipeDetailsOpen(true); // Abre o diálogo de detalhes
  };

  const getRecipeTitle = (recipe: any) => {
    return recipe.title || recipe.nome || "Sem título";
  };

  const getRecipeIngredients = (recipe: any) => {
    return recipe.ingredients || recipe.ingredientes || "";
  };

  const getRecipeInstructions = (recipe: any) => {
    return recipe.instructions || recipe.modoPreparo || "";
  };

  const filteredRecipes = Array.isArray(recipes) ? recipes.filter(recipe => {
    const titleMatch = recipe.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.nome?.toLowerCase().includes(searchTerm.toLowerCase());
    const ingredientsMatch = Array.isArray(recipe.ingredients) ?
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm.toLowerCase())) :
      recipe.ingredients?.toLowerCase().includes(searchTerm.toLowerCase());
    const instructionsMatch = Array.isArray(recipe.instructions) ?
      recipe.instructions.some(instruction => instruction.toLowerCase().includes(searchTerm.toLowerCase())) :
      recipe.instructions?.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      (searchTerm === "" || titleMatch || ingredientsMatch || instructionsMatch) &&
      (categoryFilter === null || recipe.category === categoryFilter)
    );
  }) : [];

  const getCategoryIcon = (category: string) => {
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

  const getCategoryName = (category: string) => {
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

  const getDifficultyInPortuguese = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "Fácil";
      case "Medium":
        return "Médio";
      case "Hard":
        return "Difícil";
      default:
        return "Médio"; // Valor padrão
    }
  };

  const formatDateForInput = (dateString: string | Date | undefined) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  };

  const RecipeDates = ({ createdAt, updatedAt }: { createdAt?: string | Date | null; updatedAt?: string | Date | null }) => {
    return (
      <div className="flex flex-col gap-1">
        {/* Data de Publicação */}
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>Publicado: {formatDateForInput(createdAt)}</span>
        </div>

        {/* Data de Atualização (se diferente da data de publicação) */}
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

  if (isLoading) return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  if (error) return <div className="p-4 text-red-500">Erro ao carregar receitas: {error.message}</div>;

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
                {/* Título da Receita */}
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Receita</Label>
                  <Input
                    id="title"
                    placeholder="Ex: Risoto de Camarão"
                    value={newRecipe.title}
                    onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })}
                  />
                </div>

                {/* Descrição */}
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descrição da receita"
                    value={newRecipe.description}
                    onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })}
                  />
                </div>

                {/* Ingredientes */}
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredientes</Label>
                  <Textarea
                    id="ingredients"
                    placeholder="Lista de ingredientes (um por linha)"
                    className="min-h-[100px]"
                    value={newRecipe.ingredients}
                    onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })}
                  />
                </div>

                {/* Modo de Preparo */}
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

                {/* Tempo de Cozimento */}
                <div className="space-y-2">
                  <Label htmlFor="cookTime">Tempo de Cozimento</Label>
                  <Input
                    id="cookTime"
                    placeholder="Ex: 20 minutos"
                    value={newRecipe.time}
                    onChange={(e) => setNewRecipe({ ...newRecipe, time: e.target.value })}
                  />
                </div>

                {/* Dificuldade */}
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

                {/* Chef e Avaliação */}
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

                {/* Categoria */}
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

                {/* URL da Imagem */}
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
                    // Redefine o estado do formulário
                    setNewRecipe({
                      id: "",
                      title: "",
                      description: "",
                      ingredients: "",
                      instructions: "",
                      category: "comida",
                      chef: "",
                      difficulty: "Medium", // Valor padrão ao limpar o formulário
                      time: "30 min",
                      rating: 0,
                      image: "",
                    });

                    // Fecha o diálogo (modal)
                    const closeButton = document.querySelector('.close-dialog');
                    if (closeButton instanceof HTMLElement) {
                      closeButton.click();
                    }
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
                  <div className=" text-black absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1">
                    <Badge variant="outline" className=" text-black flex items-center">
                      {getCategoryIcon(recipe.category ?? "comida")}
                      {getCategoryName(recipe.category ?? "comida")}
                    </Badge>
                  </div>
                  {recipe?.rating !== undefined && (
                    <div className=" text-black absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-md px-2 py-1">
                      {renderRating(recipe.rating ?? 0)}
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
                        {getDifficultyInPortuguese(recipe.difficulty || "Medium")}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tempo:</span> {recipe.time || "30 min"}
                      </div>
                    </div>

                    <div className="flex flex-col mt-2 text-xs text-muted-foreground">
                      <div className="flex flex-col gap-1">
                        {/* Data de Publicação */}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Publicado: {formatDateForInput(recipe.createdAt)}</span>
                        </div>

                        {/* Data de Atualização (se diferente da data de publicação) */}
                        {recipe.updatedAt && recipe.updatedAt !== recipe.createdAt && (
                          <div className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" />
                            <span>Atualizado: {formatDateForInput(recipe.updatedAt)}</span>
                          </div>
                        )}
                      </div>

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
              {/* Título da Receita */}
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título da Receita</Label>
                <Input
                  id="edit-title"
                  value={recipeToEdit.title}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, title: e.target.value })}
                  required
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={recipeToEdit.description}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, description: e.target.value })}
                />
              </div>

              {/* Ingredientes */}
              <div className="space-y-2">
                <Label htmlFor="edit-ingredients">Ingredientes</Label>
                <Textarea
                  id="edit-ingredients"
                  value={recipeToEdit.ingredients}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, ingredients: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>

              {/* Modo de Preparo */}
              <div className="space-y-2">
                <Label htmlFor="edit-instructions">Modo de Preparo</Label>
                <Textarea
                  id="edit-instructions"
                  value={recipeToEdit.instructions}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, instructions: e.target.value })}
                  className="min-h-[100px]"
                  required
                />
              </div>

              {/* Tempo de Preparo */}
              <div className="space-y-2">
                <Label htmlFor="edit-time">Tempo de Preparo</Label>
                <Input
                  id="edit-time"
                  placeholder="Ex: 30 minutos"
                  value={recipeToEdit.time}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, time: e.target.value })}
                />
              </div>

              {/* Dificuldade */}
              <div className="space-y-2">
                <Label htmlFor="edit-difficulty">Dificuldade</Label>
                <select
                  id="edit-difficulty"
                  value={recipeToEdit.difficulty}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, difficulty: e.target.value })}
                  className="text-white bg-black w-full p-2 border rounded-md"
                >
                  <option value="Easy">Fácil</option>
                  <option value="Medium">Médio</option>
                  <option value="Hard">Difícil</option>
                </select>
              </div>

              {/* Chef e Avaliação */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-chef">Chef</Label>
                  <Input
                    id="edit-chef"
                    value={recipeToEdit.chef}
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
                    value={recipeToEdit.rating}
                    onChange={(e) => setRecipeToEdit({ ...recipeToEdit, rating: parseFloat(e.target.value) })}
                  />
                </div>
              </div>

              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <select
                  id="edit-category"
                  value={recipeToEdit.category}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, category: e.target.value })}
                  className=" text-white bg-black w-full p-2 border rounded-md"
                >
                  <option value="comida">Comida</option>
                  <option value="bebida">Bebida</option>
                  <option value="sobremesa">Sobremesa</option>
                </select>
              </div>

              {/* URL da Imagem */}
              <div className="space-y-2">
                <Label htmlFor="edit-image">URL da Imagem</Label>
                <Input
                  id="edit-image"
                  value={recipeToEdit.image}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, image: e.target.value })}
                />
              </div>

              {/* Datas da Receita */}
              <div className="space-y-2">
                <Label>Datas da Receita</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="created-at" className="text-xs">Data de Publicação</Label>
                    <Input
                      id="created-at"
                      value={formatDateForInput(recipeToEdit.createdAt)}
                      readOnly
                      disabled
                      className="bg-gray-100 text-black"
                    />
                  </div>
                  <div>
                    <Label htmlFor="updated-at" className="text-xs">Última Atualização</Label>
                    <Input
                      id="updated-at"
                      value={formatDateForInput(recipeToEdit.updatedAt)}
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
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
              <Button onClick={handleUpdateRecipe}>Atualizar Receita</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {selectedRecipe && (
        <RecipeDetailsDialog
          recipe={selectedRecipe}
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