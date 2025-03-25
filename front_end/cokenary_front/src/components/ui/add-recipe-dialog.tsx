import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// Recipes.tsx
import { useRecipes, Recipe } from "@/hooks/useRecipes";

interface RecipeDetailsDialogProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export const RecipeDetailsDialog = ({
  recipe,
  isOpen,
  onClose,
}: RecipeDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{recipe.title || recipe.nome || "Sem título"}</DialogTitle>
          <DialogDescription>{recipe.description || ""}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Ingredientes</h3>
            <ul className="list-disc list-inside">
              {Array.isArray(recipe.ingredients)
                ? recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                : recipe.ingredients?.split("\n").map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Modo de Preparo</h3>
            <ol className="list-decimal list-inside">
              {Array.isArray(recipe.instructions)
                ? recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))
                : recipe.instructions?.split("\n").map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
            </ol>
          </div>

          <div>
            <h3 className="font-semibold">Detalhes Adicionais</h3>
            <p>
              <strong>Chef:</strong> {recipe.chef || "Não especificado"}
            </p>
            <p>
              <strong>Categoria:</strong> {recipe.category || "Não especificada"}
            </p>
            <p>
              <strong>Dificuldade:</strong> {recipe.difficulty || "Não especificada"}
            </p>
            <p>
              <strong>Tempo de Preparo:</strong> {recipe.time || "Não especificado"}
            </p>
            <p>
              <strong>Avaliação:</strong> {recipe.rating || "Não avaliada"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};