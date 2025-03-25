
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

interface RestaurantProps {
  restaurant: {
    id: string;
    name: string;
    description: string;
    image: string;
    address: string;
    phone: string;
    rating: number;
    cuisine: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function EditRestaurantDialog({ restaurant, isOpen, onClose }: RestaurantProps) {
  const [name, setName] = useState(restaurant.name);
  const [description, setDescription] = useState(restaurant.description);
  const [image, setImage] = useState(restaurant.image);
  const [address, setAddress] = useState(restaurant.address);
  const [phone, setPhone] = useState(restaurant.phone);
  const [rating, setRating] = useState(restaurant.rating.toString());
  const [cuisine, setCuisine] = useState(restaurant.cuisine);
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen) {
      setName(restaurant.name);
      setDescription(restaurant.description);
      setImage(restaurant.image);
      setAddress(restaurant.address);
      setPhone(restaurant.phone);
      setRating(restaurant.rating.toString());
      setCuisine(restaurant.cuisine);
    }
  }, [isOpen, restaurant]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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
          <DialogDescription>
            Atualize os detalhes do restaurante.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome do Restaurante</Label>
            <Input 
              id="edit-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
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
            <Label htmlFor="edit-cuisine">Tipo de Cozinha</Label>
            <Select 
              value={cuisine} 
              onValueChange={setCuisine}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de cozinha" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="American">Americana</SelectItem>
                <SelectItem value="French">Francesa</SelectItem>
                <SelectItem value="Italian">Italiana</SelectItem>
                <SelectItem value="Japanese">Japonesa</SelectItem>
                <SelectItem value="Mexican">Mexicana</SelectItem>
                <SelectItem value="Indian">Indiana</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-address">Endereço</Label>
            <Input 
              id="edit-address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Telefone</Label>
            <Input 
              id="edit-phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-rating">Avaliação (1-5)</Label>
            <Input 
              id="edit-rating" 
              type="number" 
              min="1" 
              max="5" 
              step="0.1" 
              value={rating}
              onChange={(e) => setRating(e.target.value)} 
              required 
            />
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Atualizar Restaurante</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
