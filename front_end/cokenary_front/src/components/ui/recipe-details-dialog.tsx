import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Recipe } from "@/hooks/useRecipes";
import { Search, Filter, ChevronDown, Eye, Pencil, Trash, Coffee, CakeSlice, Wine, Calendar, Star, RefreshCw } from "lucide-react";// Adjust the import path as necessary


interface RecipeDetailsDialogProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

const RecipeDetailsDialog = ({ recipe, isOpen, onClose }: RecipeDetailsDialogProps) => {
  // Função para garantir que os ingredientes sejam sempre tratados como um array
  const getIngredients = () => {
    if (Array.isArray(recipe.ingredients)) {
      return recipe.ingredients;
    }
    return recipe.ingredients ? [recipe.ingredients] : [];
  };

  // Função para garantir que as instruções sejam sempre tratadas como um array
  const getInstructions = () => {
    if (Array.isArray(recipe.instructions)) {
      return recipe.instructions;
    }
    return recipe.instructions ? [recipe.instructions] : [];
  };

  const RecipeDates = ({ createdAt, updatedAt }: { createdAt?: string | Date | null; updatedAt?: string | Date | null }) => {
    function formatDateForInput(date: string | Date | null | undefined): string {
      if (!date) return "Data não disponível";
      const parsedDate = new Date(date);
      return parsedDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      });
    }

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

  return (
<Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className="sm:max-w-[525px] max-h-[90vh] overflow-y-auto">
    <DialogHeader>
      <DialogTitle>{recipe.title || "Sem título"}</DialogTitle>
      <DialogDescription>Detalhes da receita</DialogDescription>
    </DialogHeader>

    <div className="grid gap-4 py-4">
      {/* Data de Publicação e Atualização */}
      <div className="space-y-2">
        <Label htmlFor="dates">Datas</Label>
        <RecipeDates createdAt={recipe.createdAt} updatedAt={recipe.updatedAt} />
      </div>

      {/* Descrição */}
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <p id="description">{recipe.description || "Nenhuma descrição fornecida."}</p>
      </div>

      {/* Ingredientes */}
      <div className="space-y-2">
        <Label htmlFor="ingredients">Ingredientes</Label>
        <ul id="ingredients" className="list-disc list-inside">
          {getIngredients().length > 0 ? (
            getIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))
          ) : (
            <li>Nenhum ingrediente fornecido.</li>
          )}
        </ul>
      </div>

      {/* Modo de Preparo */}
      <div className="space-y-2">
        <Label htmlFor="instructions">Modo de Preparo</Label>
        <ol id="instructions" className="list-decimal list-inside">
          {getInstructions().length > 0 ? (
            getInstructions().map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))
          ) : (
            <li>Nenhum modo de preparo fornecido.</li>
          )}
        </ol>
      </div>

      {/* Chef */}
      <div className="space-y-2">
        <Label htmlFor="chef">Chef</Label>
        <p id="chef">{recipe.chef || "Chef não especificado."}</p>
      </div>

      {/* Avaliação */}
      <div className="space-y-2">
        <Label htmlFor="rating">Avaliação</Label>
        <p id="rating">{recipe.rating ? `${recipe.rating}/5` : "Nenhuma avaliação fornecida."}</p>
      </div>
    </div>
  </DialogContent>
</Dialog>
  );
};

export default RecipeDetailsDialog;