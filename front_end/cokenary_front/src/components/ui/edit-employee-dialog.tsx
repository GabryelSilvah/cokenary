
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface EmployeeProps {
  employee: {
    id: string;
    name: string;
    position: string;
    email: string;
    phone: string;
    image: string;
    skills: string[];
    experience: string;
    status?: "active" | "inactive";
  };
  isOpen: boolean;
  onClose: () => void;
}

export function EditEmployeeDialog({ employee, isOpen, onClose }: EmployeeProps) {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);
  const [email, setEmail] = useState(employee.email);
  const [phone, setPhone] = useState(employee.phone);
  const [image, setImage] = useState(employee.image);
  const [skills, setSkills] = useState(employee.skills.join(', '));
  const [experience, setExperience] = useState(employee.experience);
  const [status, setStatus] = useState<"active" | "inactive">(employee.status || "active");
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen) {
      setName(employee.name);
      setPosition(employee.position);
      setEmail(employee.email);
      setPhone(employee.phone);
      setImage(employee.image);
      setSkills(employee.skills.join(', '));
      setExperience(employee.experience);
      setStatus(employee.status || "active");
    }
  }, [isOpen, employee]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Funcionário Atualizado",
      description: "As informações do funcionário foram atualizadas com sucesso.",
    });
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px] bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
          <DialogDescription>
            Atualize as informações do funcionário.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Nome</Label>
            <Input 
              id="edit-name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-position">Cargo</Label>
            <Input 
              id="edit-position" 
              value={position} 
              onChange={(e) => setPosition(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input 
              id="edit-email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Telefone</Label>
            <Input 
              id="edit-phone" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-image">URL da Imagem</Label>
            <Input 
              id="edit-image" 
              value={image} 
              onChange={(e) => setImage(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-experience">Experiência</Label>
            <Input 
              id="edit-experience" 
              value={experience} 
              onChange={(e) => setExperience(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-skills">Habilidades (separadas por vírgula)</Label>
            <Textarea 
              id="edit-skills" 
              value={skills} 
              onChange={(e) => setSkills(e.target.value)} 
              required 
              className="bg-background text-foreground"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch 
              id="employee-status" 
              checked={status === "active"}
              onCheckedChange={(checked) => setStatus(checked ? "active" : "inactive")}
            />
            <Label htmlFor="employee-status">
              Status: {status === "active" ? "Ativo" : "Inativo"}
            </Label>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Atualizar Funcionário</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
