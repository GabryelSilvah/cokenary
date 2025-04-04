
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface RecipeProps {
  recipe: {
    id: string;
    title: string;
    description: string;
    image: string;
    chef: string;
    difficulty: string;
    time: string;
    ingredients?: string[];
    instructions?: string[];
    rating?: number;
    createdAt?: string | Date;
    updatedAt?: string | Date;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function EditRecipeDialog({ recipe, isOpen, onClose }: RecipeProps) {
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [image, setImage] = useState(recipe.image);
  const [chef, setChef] = useState(recipe.chef);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const [time, setTime] = useState(recipe.time);
  const [ingredients, setIngredients] = useState(recipe.ingredients?.join('\n') || '');
  const [instructions, setInstructions] = useState(recipe.instructions?.join('\n') || '');
  const [rating, setRating] = useState(recipe.rating?.toString() || '');

  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setTitle(recipe.title);
      setDescription(recipe.description);
      setImage(recipe.image);
      setChef(recipe.chef);
      setDifficulty(recipe.difficulty);
      setTime(recipe.time);
      setIngredients(recipe.ingredients?.join('\n') || '');
      setInstructions(recipe.instructions?.join('\n') || '');
      setRating(recipe.rating?.toString() || '');
    }
  }, [isOpen, recipe]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Update the updatedAt date to now
    const updatedRecipe = {
      ...recipe,
      title,
      description,
      image,
      chef,
      difficulty,
      time,
      ingredients: ingredients.split('\n').filter(line => line.trim() !== ''),
      instructions: instructions.split('\n').filter(line => line.trim() !== ''),
      rating: rating ? parseFloat(rating) : undefined,
      updatedAt: new Date().toISOString()
    };

    // In a real app, this would save to a database
    console.log("Updated recipe:", updatedRecipe);

    toast({
      title: "Receita Atualizada",
      description: "A receita foi atualizada com sucesso.",
    });

    onClose();
  };

  // Format a date for display in form fields
  const formatDateForInput = (date?: string | Date) => {
    if (!date) return '';
    return format(new Date(date), "yyyy-MM-dd");
  };
  const [category, setCategoryState] = useState<string>("");
  
  function handleCategoryChange(value: string): void {
    setCategoryState(value);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Receita</DialogTitle>
          <DialogDescription>
            Atualize os detalhes da sua receita.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título da Receita</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-image">URL da Imagem</Label>
            <Input
              id="edit-image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-chef">Chef</Label>
            <Input
              id="edit-chef"
              value={chef}
              onChange={(e) => setChef(e.target.value)}
              required
            />
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-difficulty">Dificuldade</Label>
              <Select
                value={difficulty}
                onValueChange={setDifficulty}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Fácil</SelectItem>
                  <SelectItem value="Medium">Média</SelectItem>
                  <SelectItem value="Hard">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Novo campo de categoria */}
            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoria</Label>
              <Select
                value={category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Comida">Comida</SelectItem>
                  <SelectItem value="Sobremesa">Sobremesa</SelectItem>
                  <SelectItem value="Bebida">Bebida</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-time">Tempo de Preparo</Label>
              <Input
                id="edit-time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-rating">Avaliação (0-5)</Label>
            <Input
              id="edit-rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Datas da Receita</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="created-at" className="text-xs">Data de Publicação</Label>
                <Input
                  id="created-at"
                  value={formatDateForInput(recipe.createdAt)}
                  readOnly
                  disabled
                  className="bg-gray-100"
                />
              </div>
              <div>
                <Label htmlFor="updated-at" className="text-xs">Última Atualização</Label>
                <Input
                  id="updated-at"
                  value={formatDateForInput(recipe.updatedAt)}
                  readOnly
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">A data de atualização será definida automaticamente ao salvar as mudanças.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-ingredients">Ingredientes</Label>
            <Textarea
              id="edit-ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-instructions">Instruções</Label>
            <Textarea
              id="edit-instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="min-h-[100px]"
              required
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Atualizar Receita</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
