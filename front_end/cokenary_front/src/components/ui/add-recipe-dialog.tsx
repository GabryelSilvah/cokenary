import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Recipe } from "@/hooks/useRecipes";

interface RecipeDetailsDialogProps {
  recipe: Partial<Recipe> & { receitas_and_ingredientes?: string[] | string };
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
          <DialogTitle>{recipe.nomeReceita || "Sem título"}</DialogTitle>
          <DialogDescription>{recipe.modo_preparo || ""}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Ingredientes</h3>
            <ul className="list-disc list-inside">
              {Array.isArray(recipe.receitas_and_ingredientes)
                ? recipe.receitas_and_ingredientes.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))
                : recipe.receitas_and_ingredientes?.split("\n").map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Modo de Preparo</h3>
            <p>{recipe.modo_preparo || "Não especificado"}</p>
          </div>

          <div>
            <h3 className="font-semibold">Detalhes Adicionais</h3>
            <p>
              <strong>Cozinheiro:</strong> {recipe.cozinheiro_id ? recipe.cozinheiro_id.nome : "Não especificado"}
            </p>
            <p>
              <strong>Categoria:</strong> {recipe.categoria_id ? recipe.categoria_id.nome : "Não especificada"}
            </p>
            <p>
              <strong>Data de Criação:</strong> {recipe.data_criacao || "Não especificada"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
