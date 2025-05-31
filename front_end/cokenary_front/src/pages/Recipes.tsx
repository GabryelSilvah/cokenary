import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown, Eye, Pencil, Trash, CakeSlice, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useRecipes } from "@/hooks/useRecipes";

// Components imports
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import RecipeDetailsDialog from "@/components/ui/recipe-details-dialog";
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
import { Label } from "@/components/ui/label";

// Tipos de dados
type Recipe = {
  id_receita: string;
  nomeReceita: string;
  data_criacao: string;
  cozinheiro_id: {
    id_funcionario: string;
    nome: string;
    cargo_id?: string; // Adicionado como opcional para compatibilidade
  };
  categoria_id: {
    id_categoria: string;
    nome: string;
  };
  modo_preparo: string;
  ingredientes: IngredientWithMeasure[];
};

type IngredientWithMeasure = {
  id: string;
  nome: string;
  quantity: string;
  measure: string;
};

type Ingredient = {
  id: string;
  nome: string;
};

type Measure = {
  id: string;
  nome: string;
};

type Funcionario = {
  id_funcionario: string;
  nome: string;
  cargo_id?: string; // Adicionado como opcional para compatibilidade
};

type Categoria = {
  id_categoria: string;
  nome: string;
};

const API_BASE_URL = "http://localhost:8081";

const Recipes = () => {
  // Estados para controle da UI
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  
  // Estados para diálogos
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);
  
  // Estados para dados selecionados
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  // Estados para formulário
  const [newRecipe, setNewRecipe] = useState({
    nomeReceita: "",
    cozinheiro_id: "",
    categoria_id: "",
    modo_preparo: "",
    ingredientes: [] as IngredientWithMeasure[]
  });
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientWithMeasure[]>([]);

  // Estados para listas de dados
  const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
  const [measuresList, setMeasuresList] = useState<Measure[]>([]);
  const [funcionariosList, setFuncionariosList] = useState<Funcionario[]>([]);
  const [categoriasList, setCategoriasList] = useState<Categoria[]>([]);

  // Estados de loading
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingIngredients, setIsLoadingIngredients] = useState(false);
  const [isLoadingMeasures, setIsLoadingMeasures] = useState(false);
  const [isLoadingFuncionarios, setIsLoadingFuncionarios] = useState(false);
  const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);

  // Hooks customizados
  const { toast } = useToast();
  const {
    recipes,
    isLoadingRecipes,
    recipesError,
    createRecipeMutation,
    updateRecipeMutation,
    deleteRecipeMutation
  } = useRecipes();

  // ====================== EFEITOS ======================

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      await Promise.all([
        fetchIngredients(),
        fetchMeasures(),
        fetchFuncionarios(),
        fetchCategorias()
      ]);
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao carregar dados iniciais",
        variant: "destructive"
      });
    }
  };

  // ====================== FUNÇÕES DE BUSCA ======================

  const fetchData = async (endpoint: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`Erro ${response.status} ao carregar dados de ${endpoint}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Erro ao buscar ${endpoint}:`, error);
      throw error;
    }
  };

  const fetchIngredients = async () => {
    setIsLoadingIngredients(true);
    try {
      const data = await fetchData('/receitas/ingredientes/listar');
      // Verifica a estrutura dos dados recebidos
      const ingredients = Array.isArray(data.data) ? data.data.map((item: { id: number; nome: string }) => ({ 
        id: item.id.toString(), 
        nome: item.nome 
      })) : [];
      setIngredientsList(ingredients);
    } catch (error) {
      showErrorToast("Falha ao carregar ingredientes");
    } finally {
      setIsLoadingIngredients(false);
    }
  };

  const fetchMeasures = async () => {
    setIsLoadingMeasures(true);
    try {
      const data = await fetchData('/receitas/medida/listar');
      const measures = Array.isArray(data.data) ? data.data.map((item: { id: number; nome: string }) => ({ 
        id: item.id.toString(), 
        nome: item.nome 
      })) : [];
      setMeasuresList(measures);
    } catch (error) {
      showErrorToast("Falha ao carregar medidas");
    } finally {
      setIsLoadingMeasures(false);
    }
  };

  const fetchFuncionarios = async () => {
    setIsLoadingFuncionarios(true);
    try {
      const data = await fetchData('/funcionarios/listar');
      const funcionarios = Array.isArray(data.data) ? data.data.map((func: { id: number; nome: string; cargo_id?: string }) => ({
        id_funcionario: func.id.toString(),
        nome: func.nome,
        cargo_id: func.cargo_id?.toString()
      })) : [];
      setFuncionariosList(funcionarios);
    } catch (error) {
      showErrorToast("Falha ao carregar funcionários");
    } finally {
      setIsLoadingFuncionarios(false);
    }
  };

  const fetchCategorias = async () => {
    setIsLoadingCategorias(true);
    try {
      const data = await fetchData('/receitas/categoria/listar');
      // Ajuste para diferentes estruturas de resposta
      const categoriasData = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      const categorias = categoriasData.map((cat: { id: number; nome: string }) => ({
        id_categoria: cat.id.toString(),
        nome: cat.nome
      }));
      setCategoriasList(categorias);
    } catch (error) {
      showErrorToast("Falha ao carregar categorias");
    } finally {
      setIsLoadingCategorias(false);
    }
  };

  // ====================== MANIPULAÇÃO DE INGREDIENTES ======================

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => {
      const exists = prev.some(i => i.id === ingredient.id);
      if (exists) return prev.filter(i => i.id !== ingredient.id);
      
      return [...prev, {
        id: ingredient.id,
        nome: ingredient.nome,
        quantity: '',
        measure: measuresList[0]?.nome || ''
      }];
    });
  };

  const handleQuantityChange = (ingredientId: string, field: 'quantity' | 'measure', value: string) => {
    setSelectedIngredients(prev =>
      prev.map(ingredient =>
        ingredient.id === ingredientId ? { ...ingredient, [field]: value } : ingredient
      )
    );
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
  };

  // ====================== OPERAÇÕES CRUD ======================

  const validateRecipe = (recipe: { 
    nomeReceita: string; 
    modo_preparo: string; 
    cozinheiro_id: string; 
    categoria_id: string 
  }) => {
    if (!recipe.nomeReceita.trim()) throw new Error("O nome da receita é obrigatório");
    if (!recipe.modo_preparo.trim()) throw new Error("O modo de preparo é obrigatório");
    if (!recipe.cozinheiro_id) throw new Error("Selecione um cozinheiro");
    if (!recipe.categoria_id) throw new Error("Selecione uma categoria");
    if (selectedIngredients.length === 0) throw new Error("Adicione pelo menos um ingrediente");
  };

  const handleAddRecipe = async () => {
    setIsAdding(true);
    try {
      validateRecipe(newRecipe);

      const recipeData = {
        nomeReceita: newRecipe.nomeReceita,
        cozinheiro_id: newRecipe.cozinheiro_id,
        categoria_id: newRecipe.categoria_id,
        modo_preparo: newRecipe.modo_preparo,
        /*ingredientes: selectedIngredients.map(({ id, quantity, measure }) => ({
          id, quantity, measure
        }))*/
      };

      await createRecipeMutation.mutateAsync(recipeData);

      resetForm();
      showSuccessToast("Receita adicionada com sucesso!");
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : "Erro ao adicionar receita");
    } finally {
      setIsAdding(false);
    }
  };

  const handleEditClick = (recipe: Recipe) => {
    setRecipeToEdit(recipe);
    setSelectedIngredients(recipe.ingredientes || []);
    setEditDialogOpen(true);
  };

  const handleUpdateRecipe = async () => {
    if (!recipeToEdit) return;

    setIsAdding(true);
    try {
      validateRecipe(recipeToEdit);

      const updatedRecipe = {
        ...recipeToEdit,
        ingredientes: selectedIngredients
      };

      await updateRecipeMutation.mutateAsync(updatedRecipe);

      setEditDialogOpen(false);
      showSuccessToast("Receita atualizada com sucesso!");
    } catch (error) {
      showErrorToast(error instanceof Error ? error.message : "Erro ao atualizar receita");
    } finally {
      setIsAdding(false);
    }
  };

  const handleDeleteClick = (recipeId: string) => {
    setRecipeToDelete(recipeId);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!recipeToDelete) return;

    try {
      await deleteRecipeMutation.mutateAsync(recipeToDelete);
      showSuccessToast("Receita excluída com sucesso!");
    } catch (error) {
      showErrorToast("Erro ao excluir receita");
    } finally {
      setDeleteDialogOpen(false);
      setRecipeToDelete(null);
    }
  };

  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setRecipeDetailsOpen(true);
  };

  // ====================== UTILITÁRIOS ======================

  const resetForm = () => {
    setNewRecipe({
      nomeReceita: "",
      cozinheiro_id: "",
      categoria_id: "",
      modo_preparo: "",
      ingredientes: []
    });
    setSelectedIngredients([]);
  };

  const showSuccessToast = (description: string) => {
    toast({
      title: "Sucesso",
      description,
      variant: "default"
    });
  };

  const showErrorToast = (description: string) => {
    toast({
      title: "Erro",
      description,
      variant: "destructive"
    });
  };

  const filteredRecipes = Array.isArray(recipes) ? recipes.filter(recipe => {
    // Verifica se recipe e suas propriedades existem
    if (!recipe || !recipe.nomeReceita || !recipe.modo_preparo || !recipe.categoria_id) {
      return false;
    }

    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      recipe.nomeReceita.toLowerCase().includes(searchTermLower) ||
      recipe.modo_preparo.toLowerCase().includes(searchTermLower);

    const matchesCategory = !categoryFilter || 
      (recipe.categoria_id.nome && 
       recipe.categoria_id.nome.toLowerCase() === categoryFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  }) : [];

  // ====================== COMPONENTES AUXILIARES ======================

  const RecipeDates = ({ createdAt }: { createdAt?: string }) => {
    if (!createdAt) return null;

    return (
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar className="h-3 w-3" />
        <span>Criado em: {format(new Date(createdAt), 'dd/MM/yyyy')}</span>
      </div>
    );
  };

  const IngredientItem = ({ ingredient }: { ingredient: IngredientWithMeasure }) => (
    <div className="flex items-center gap-2">
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
          <Button variant="outline" size="sm">
            {ingredient.measure || "Medida"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {measuresList.map(measure => (
            <DropdownMenuItem
              key={measure.id}
              onClick={() => handleQuantityChange(ingredient.id, 'measure', measure.nome)}
            >
              {measure.nome}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  // ====================== RENDERIZAÇÃO CONDICIONAL ======================

  if (isLoadingRecipes) return <div className="flex items-center justify-center h-screen">Carregando receitas...</div>;
  if (recipesError) return <div className="p-4 text-red-500">Erro ao carregar receitas: {recipesError.message}</div>;

  // ====================== RENDERIZAÇÃO PRINCIPAL ======================

  return (
    <div className="pb-12">
      <SectionContainer className="py-8">
        {/* Cabeçalho e botão de adicionar */}
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
                {/* Nome da Receita */}
                <div className="space-y-2">
                  <Label htmlFor="nomeReceita">Nome da Receita*</Label>
                  <Input
                    id="nomeReceita"
                    placeholder="Ex: Risoto de Camarão"
                    value={newRecipe.nomeReceita}
                    onChange={(e) => setNewRecipe({ ...newRecipe, nomeReceita: e.target.value })}
                  />
                </div>

                {/* Cozinheiro */}
                <div className="space-y-2">
                  <Label htmlFor="cozinheiro_id">Cozinheiro*</Label>
                  <select
                    id="cozinheiro_id"
                    value={newRecipe.cozinheiro_id}
                    onChange={(e) => setNewRecipe({ ...newRecipe, cozinheiro_id: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    disabled={isLoadingFuncionarios}
                  >
                    <option value="">{isLoadingFuncionarios ? "Carregando..." : "Selecione um cozinheiro"}</option>
                    {funcionariosList.map(func => (
                      <option key={func.id_funcionario} value={func.id_funcionario}>
                        {func.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Categoria */}
                <div className="space-y-2">
                  <Label htmlFor="categoria_id">Categoria*</Label>
                  <select
                    id="categoria_id"
                    value={newRecipe.categoria_id}
                    onChange={(e) => setNewRecipe({ ...newRecipe, categoria_id: e.target.value })}
                    className="w-full p-2 border rounded-md"
                    disabled={isLoadingCategorias}
                  >
                    <option value="">Selecione uma categoria</option>
                    {categoriasList.map(cat => (
                      <option key={cat.id_categoria} value={cat.id_categoria}>
                        {cat.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Ingredientes */}
                <div className="space-y-2">
                  <Label>Ingredientes*</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full">
                        Selecionar Ingredientes ({selectedIngredients.length})
                        <ChevronDown className="ml-2 h-4 w-4" />
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

                  {/* Lista de ingredientes selecionados */}
                  <div className="mt-2 space-y-2">
                    {selectedIngredients.map(ingredient => (
                      <IngredientItem key={ingredient.id} ingredient={ingredient} />
                    ))}
                  </div>
                </div>

                {/* Modo de Preparo */}
                <div className="space-y-2">
                  <Label htmlFor="modo_preparo">Modo de Preparo*</Label>
                  <Textarea
                    id="modo_preparo"
                    placeholder="Descreva o modo de preparo"
                    className="min-h-[100px]"
                    value={newRecipe.modo_preparo}
                    onChange={(e) => setNewRecipe({ ...newRecipe, modo_preparo: e.target.value })}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Limpar
                </Button>
                <Button onClick={handleAddRecipe} disabled={isAdding}>
                  {isAdding ? "Salvando..." : "Salvar Receita"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Barra de busca e filtros */}
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
              {categoriasList.map(categoria => (
                <DropdownMenuItem
                  key={categoria.id_categoria}
                  onClick={() => setCategoryFilter(categoria.nome)}
                >
                  {categoria.nome}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Lista de receitas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Card key={recipe.id_receita} className="overflow-hidden">
                <CardHeader>
                  <CardTitle>{recipe.nomeReceita}</CardTitle>
                  <CardDescription>
                    {recipe.categoria_id?.nome} • {recipe.cozinheiro_id?.nome}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-medium">Ingredientes:</span>
                      <ul className="list-disc list-inside mt-1">
                        {recipe.ingredientes?.slice(0, 3).map((ing, index) => (
                          <li key={index}>{ing.quantity} {ing.measure} {ing.nome}</li>
                        ))}
                        {recipe.ingredientes?.length > 3 && <li>...e mais {recipe.ingredientes.length - 3}</li>}
                      </ul>
                    </div>
                    <RecipeDates createdAt={recipe.data_criacao} />
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
                      onClick={() => handleDeleteClick(recipe.id_receita)}
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

      {/* Diálogo de edição */}
      {recipeToEdit && (
        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Receita</DialogTitle>
              <DialogDescription>
                Atualize os detalhes da receita.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-nomeReceita">Nome da Receita</Label>
                <Input
                  id="edit-nomeReceita"
                  value={recipeToEdit.nomeReceita}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, nomeReceita: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-cozinheiro_id">Cozinheiro</Label>
                <select
                  id="edit-cozinheiro_id"
                  value={recipeToEdit.cozinheiro_id?.id_funcionario || ''}
                  onChange={(e) => setRecipeToEdit({
                    ...recipeToEdit,
                    cozinheiro_id: {
                      id_funcionario: e.target.value,
                      nome: funcionariosList.find(f => f.id_funcionario === e.target.value)?.nome || ''
                    }
                  })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Selecione um cozinheiro</option>
                  {funcionariosList.map(func => (
                    <option key={func.id_funcionario} value={func.id_funcionario}>
                      {func.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-categoria_id">Categoria</Label>
                <select
                  id="edit-categoria_id"
                  value={recipeToEdit.categoria_id?.id_categoria || ''}
                  onChange={(e) => setRecipeToEdit({
                    ...recipeToEdit,
                    categoria_id: {
                      id_categoria: e.target.value,
                      nome: categoriasList.find(c => c.id_categoria === e.target.value)?.nome || ''
                    }
                  })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Selecione uma categoria</option>
                  {categoriasList.map(cat => (
                    <option key={cat.id_categoria} value={cat.id_categoria}>
                      {cat.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label>Ingredientes</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full">
                      Selecionar Ingredientes ({selectedIngredients.length})
                      <ChevronDown className="ml-2 h-4 w-4" />
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

                <div className="mt-2 space-y-2">
                  {selectedIngredients.map(ingredient => (
                    <IngredientItem key={ingredient.id} ingredient={ingredient} />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-modo_preparo">Modo de Preparo</Label>
                <Textarea
                  id="edit-modo_preparo"
                  className="min-h-[100px]"
                  value={recipeToEdit.modo_preparo}
                  onChange={(e) => setRecipeToEdit({ ...recipeToEdit, modo_preparo: e.target.value })}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateRecipe}>
                Atualizar Receita
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Diálogo de visualização */}
      {selectedRecipe && (
        <RecipeDetailsDialog
          recipe={{
            id: selectedRecipe.id_receita,
            title: selectedRecipe.nomeReceita,
            description: `Categoria: ${selectedRecipe.categoria_id?.nome} • Chef: ${selectedRecipe.cozinheiro_id?.nome}`,
            ingredients: selectedRecipe.ingredientes.map(ing =>
              `${ing.quantity} ${ing.measure} ${ing.nome}`
            ),
            instructions: selectedRecipe.modo_preparo,
            createdAt: selectedRecipe.data_criacao
          }}
          isOpen={recipeDetailsOpen}
          onClose={() => setRecipeDetailsOpen(false)}
        />
      )}

      {/* Diálogo de confirmação de exclusão */}
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