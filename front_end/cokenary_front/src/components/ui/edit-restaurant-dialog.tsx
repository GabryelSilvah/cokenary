import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export interface Restaurant {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
  tipoCozinha: string;
}

interface EditRestaurantDialogProps {
  restaurant: Restaurant;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updatedRestaurant: Restaurant) => void;
}

export function EditRestaurantDialog({
  restaurant,
  isOpen,
  onClose,
  onSave,
}: EditRestaurantDialogProps) {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoCozinha, setTipoCozinha] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && restaurant) {
      setNome(restaurant.nome);
      setEndereco(restaurant.endereco);
      setTelefone(restaurant.telefone);
      setTipoCozinha(restaurant.tipoCozinha);
    }
  }, [isOpen, restaurant]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!tipoCozinha) {
      toast({
        title: "Tipo de cozinha obrigatório",
        description: "Selecione um tipo de cozinha.",
        variant: "destructive",
      });
      return;
    }

    const updatedRestaurant: Restaurant = {
      ...restaurant,
      nome,
      endereco,
      telefone,
      tipoCozinha,
    };

    if (onSave) {
      onSave(updatedRestaurant);
    }

    toast({
      title: "Restaurante Atualizado",
      description: "O restaurante foi atualizado com sucesso.",
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Restaurante</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Restaurante</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="tipoCozinha">Tipo de Cozinha</Label>
            <Select
              value={tipoCozinha}
              onValueChange={(value) => setTipoCozinha(value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de cozinha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Americana">Americana</SelectItem>
                <SelectItem value="Francesa">Francesa</SelectItem>
                <SelectItem value="Italiana">Italiana</SelectItem>
                <SelectItem value="Japonesa">Japonesa</SelectItem>
                <SelectItem value="Mexicana">Mexicana</SelectItem>
                <SelectItem value="Indiana">Indiana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
