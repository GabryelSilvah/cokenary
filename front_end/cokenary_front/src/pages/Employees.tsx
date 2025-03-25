import { useState } from "react";
import { Search, Mail, Phone, Eye, Pencil, Trash } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { AddEmployeeDialog } from "@/components/ui/add-employee-dialog";
import { EditEmployeeDialog } from "@/components/ui/edit-employee-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

const EMPLOYEES = [
  {
    id: "1",
    name: "James Wilson",
    position: "Executive Chef",
    email: "james.wilson@example.com",
    phone: "+1 (555) 123-4567",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    skills: ["French Cuisine", "Menu Development", "Team Leadership"],
    experience: "15 years",
    status: "active" as const
  },
  {
    id: "2",
    name: "Sophia Rodriguez",
    position: "Pastry Chef",
    email: "sophia.rodriguez@example.com",
    phone: "+1 (555) 234-5678",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956",
    skills: ["Desserts", "Chocolate Work", "Bread Baking"],
    experience: "8 years",
    status: "active" as const
  },
  {
    id: "3",
    name: "Michael Chen",
    position: "Sous Chef",
    email: "michael.chen@example.com",
    phone: "+1 (555) 345-6789",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    skills: ["Asian Fusion", "Knife Skills", "Kitchen Management"],
    experience: "10 years",
    status: "inactive" as const
  },
  {
    id: "4",
    name: "Emma Thompson",
    position: "Line Cook",
    email: "emma.thompson@example.com",
    phone: "+1 (555) 456-7890",
    image: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    skills: ["Grill", "Sauces", "Fast-paced Service"],
    experience: "3 years",
    status: "active" as const
  },
  {
    id: "5",
    name: "David Patel",
    position: "Restaurant Manager",
    email: "david.patel@example.com",
    phone: "+1 (555) 567-8901",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
    skills: ["Staff Management", "Customer Service", "Inventory Control"],
    experience: "12 years",
    status: "active" as const
  },
  {
    id: "6",
    name: "Olivia Jackson",
    position: "Sommelier",
    email: "olivia.jackson@example.com",
    phone: "+1 (555) 678-9012",
    image: "https://images.unsplash.com/photo-1619895862022-09114b41f16f",
    skills: ["Wine Pairing", "Wine Service", "Beverage Program"],
    experience: "6 years",
    status: "inactive" as const
  }
];

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleDeleteClick = (id: string) => {
    setEmployeeToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    toast({
      title: "Funcionário Excluído",
      description: `O funcionário foi removido com sucesso.`,
    });
    setDeleteDialogOpen(false);
    setEmployeeToDelete(null);
  };
  
  const handleEditEmployee = (employee: any) => {
    setSelectedEmployee(employee);
    setEditDialogOpen(true);
  };
  
  const handleViewDetails = (employee: any) => {
    setSelectedEmployee(employee);
    setDetailsDialogOpen(true);
  };
  
  const filteredEmployees = EMPLOYEES.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="pb-12">
      <SectionContainer className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <PageHeader 
            title="Funcionários" 
            description="Gerenciar membros da equipe culinária"
          />
          
          <AddEmployeeDialog />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar funcionários..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-4">
          {filteredEmployees.map((employee) => (
            <div 
              key={employee.id} 
              className="bg-card rounded-lg border p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center hover:shadow-md transition-shadow"
            >
              <Avatar className=" h-16 w-16 md:h-20 md:w-20">
                <AvatarImage className="object-cover" src={employee.image} alt={employee.name} />
                <AvatarFallback>{employee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-foreground">{employee.name}</h3>
                    <p className="text-muted-foreground">{employee.position}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex items-center gap-2">
                    <Badge variant="outline">{employee.experience} de experiência</Badge>
                    <Badge 
                      variant={employee.status === "active" ? "secondary" : "destructive"}
                      className={employee.status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 border-green-200 dark:border-green-800" : ""}
                    >
                      {employee.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-foreground">{employee.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-foreground">{employee.phone}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {employee.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-row md:flex-col gap-2 self-end md:self-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleViewDetails(employee)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleEditEmployee(employee)}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Editar
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full text-destructive hover:text-destructive"
                  onClick={() => handleDeleteClick(employee.id)}
                >
                  <Trash className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
      
      {/* Employee Details Dialog */}
      {selectedEmployee && (
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Detalhes do Funcionário</DialogTitle>
              <DialogDescription>
                Informações completas sobre {selectedEmployee.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage className="object-cover" src={selectedEmployee.image} alt={selectedEmployee.name} />
                  <AvatarFallback>{selectedEmployee.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-lg font-medium text-foreground">{selectedEmployee.name}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.position}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{selectedEmployee.experience} de experiência</Badge>
                    <Badge 
                      variant={selectedEmployee.status === "active" ? "secondary" : "destructive"}
                      className={selectedEmployee.status === "active" ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50 border-green-200 dark:border-green-800" : ""}
                    >
                      {selectedEmployee.status === "active" ? "Ativo" : "Inativo"}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Informações de Contato</h4>
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-foreground">{selectedEmployee.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                    <span className="text-foreground">{selectedEmployee.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Habilidades e Especialidades</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Fechar</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Edit Employee Dialog */}
      {selectedEmployee && (
        <EditEmployeeDialog
          employee={selectedEmployee}
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
      
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Funcionário"
        description="Tem certeza que deseja excluir este funcionário? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="delete"
      />
    </div>
  );
};

export default Employees;
