
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

interface JobProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    salary: string;
    type: string;
    postedAt: string;
    category: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export function EditJobDialog({ job, isOpen, onClose }: JobProps) {
  const [title, setTitle] = useState(job.title);
  const [company, setCompany] = useState(job.company);
  const [location, setLocation] = useState(job.location);
  const [description, setDescription] = useState(job.description);
  const [salary, setSalary] = useState(job.salary);
  const [type, setType] = useState(job.type);
  const [postedAt, setPostedAt] = useState(job.postedAt);
  const [category, setCategory] = useState(job.category);
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen) {
      setTitle(job.title);
      setCompany(job.company);
      setLocation(job.location);
      setDescription(job.description);
      setSalary(job.salary);
      setType(job.type);
      setPostedAt(job.postedAt);
      setCategory(job.category);
    }
  }, [isOpen, job]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Cargo Atualizado",
      description: "As informações do cargo foram atualizadas com sucesso.",
    });
    
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Cargo</DialogTitle>
          <DialogDescription>
            Atualize as informações do cargo.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título do Cargo</Label>
            <Input 
              id="edit-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-company">Empresa</Label>
            <Input 
              id="edit-company" 
              value={company} 
              onChange={(e) => setCompany(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-location">Localização</Label>
            <Input 
              id="edit-location" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição</Label>
            <Textarea 
              id="edit-description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              className="min-h-[100px]"
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-salary">Salário</Label>
            <Input 
              id="edit-salary" 
              value={salary} 
              onChange={(e) => setSalary(e.target.value)} 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-type">Tipo de Contrato</Label>
            <Select 
              value={type} 
              onValueChange={setType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Integral">Integral</SelectItem>
                <SelectItem value="Meio-período">Meio-período</SelectItem>
                <SelectItem value="Contrato">Contrato</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-category">Categoria</Label>
            <Select 
              value={category} 
              onValueChange={setCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Cozinha">Cozinha</SelectItem>
                <SelectItem value="Atendimento">Atendimento</SelectItem>
                <SelectItem value="Administração">Administração</SelectItem>
                <SelectItem value="Limpeza">Limpeza</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit">Atualizar Cargo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
