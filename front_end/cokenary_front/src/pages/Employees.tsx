import { useState, useEffect } from "react";
import { Search, Eye, Pencil, Trash } from "lucide-react";
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
import { useFuncionarios, useDeleteFuncionario, useCargos } from "@/hooks/useEmployees"; // Ensure useCargos is imported



interface Funcionario {
  data: {
    id: number;
    rg: number;
    nome: string;
    dt_adm: string;
    salario: number;
    cargo?: {
      id: number;
      nome: string;
    };
  };
}


interface Cargo {
  id: number;
  nome: string;
}

const Employees = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState<number | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Funcionario | null>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const { toast } = useToast();

  // Usando os hooks da API

  const {
    data: funcionarios = [],
    isLoading,
    isError,
    error
  } = useFuncionarios();

  useEffect(() => {
    console.log("Funcionario:", funcionarios.map(f => f.data.cargo.nome));
  }, [funcionarios]);

  const { mutate: deleteFuncionario } = useDeleteFuncionario();
  const { data: cargos } = useCargos(); // Fetching cargos

  const handleDeleteClick = (id: number) => {
    setEmployeeToDelete(id);
    setDeleteDialogOpen(true);
    console.log("ID do funcionário a ser excluído:", id);
  };

  const handleConfirmDelete = () => {
    if (employeeToDelete) {
      deleteFuncionario(employeeToDelete, {
        onSuccess: () => {
          toast({
            title: "Funcionário Excluído",
            description: "O funcionário foi removido com sucesso.",
          });
          setDeleteDialogOpen(false);
          setEmployeeToDelete(null);
        },
        onError: (error: Error) => {
          toast({
            title: "Erro",
            description: error.message || "Não foi possível excluir o funcionário",
            variant: "destructive"
          });
        }
      });
    }
  };

  const handleEditEmployee = (funcionario: Funcionario) => {
    setSelectedEmployee(funcionario);
    setEditDialogOpen(true);
  };

  const handleViewDetails = (funcionario: Funcionario) => {
    setSelectedEmployee(funcionario);
    setDetailsDialogOpen(true);
  };

  // Função para formatar a data
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  // Função para formatar salário
  const formatSalary = (salario: number) => {
    return salario.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  // Filtrar funcionários baseado no termo de busca
  const filteredEmployees = funcionarios.filter(funcionario => {
    const searchLower = searchTerm.toLowerCase();
    return (
      funcionario.data.nome.toLowerCase().includes(searchLower) ||
      funcionario.data.cargo.nome.toLowerCase().includes(searchLower)
    );
  });

  if (isLoading) {
    return <div className="py-12 text-center">Carregando funcionários...</div>;
  }

  if (isError) {
    return (
      <div className="py-12 text-center text-destructive">
        Erro ao carregar funcionários: {error?.message || "Erro desconhecido"}
      </div>
    );
  }

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
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((funcionario) => (
              <div
                key={funcionario.data.id}
                className="bg-card rounded-lg border p-4 md:p-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center hover:shadow-md transition-shadow"
              >
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${funcionario.data.nome}&background=random`}
                    alt={funcionario.data.nome}
                  />
                  <AvatarFallback>
                    {funcionario.data.nome.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{funcionario.data.nome}</h3>
                      <p className="text-muted-foreground">
                      {funcionario.data.cargo.nome}
                      </p>
                    </div>
                    <p className="text-muted-foreground">
                    {funcionario.data.cargo.nome}
                 
                    </p>
                


                    <div className="mt-2 md:mt-0 flex items-center gap-2">
                      <Badge variant="outline">RG: {funcionario.data.rg}</Badge>
                      <Badge variant="secondary">
                        Admitido em: {formatDate(funcionario.data.dt_adm)}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-sm">
                    <div className="flex items-center">
                      <span className="text-muted-foreground mr-2">Salário:</span>
                      <span>{formatSalary(funcionario.data.salario)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 self-end md:self-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(funcionario)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditEmployee(funcionario)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDeleteClick(funcionario.data.id)}
                  >
                    <Trash className="h-4 w-4 mr-1" />
                    Excluir
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              {funcionarios.length === 0 ? "Nenhum funcionário cadastrado" : "Nenhum funcionário encontrado"}
            </div>
          )}
        </div>
      </SectionContainer>

      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle>Detalhes do Funcionário</DialogTitle>
                <DialogDescription>
                  Informações completas sobre {selectedEmployee.data.nome}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Avatar e nome */}
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${selectedEmployee.data.nome}&background=random`}
                      alt={selectedEmployee.data.nome}
                    />
                    <AvatarFallback>
                      {selectedEmployee.data.nome.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="text-lg font-medium">{selectedEmployee.data.nome}</h3>
                    <p className="text-muted-foreground">
                    {selectedEmployee.data.cargo ? selectedEmployee.data.cargo.nome : "Nenhum cargo atribuído"}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">RG: {selectedEmployee.data.rg}</Badge>
                      <Badge variant="secondary">
                        Admitido em: {formatDate(selectedEmployee.data.dt_adm)}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Informações pessoais */}
                <div className="space-y-2">
                  <h4 className="font-medium">Informações Pessoais</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">RG:</span>
                      <span className="ml-2">{selectedEmployee.data.rg}</span>
                    </div>
                    
                    <div>
                      <span className="text-muted-foreground">Data de Admissão:</span>
                      <span className="ml-2">{formatDate(selectedEmployee.data.dt_adm)}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Salário:</span>
                      <span className="ml-2">
                        {formatSalary(selectedEmployee.data.salario)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Informações do cargo */}
                <div className="space-y-2">
                  <h4 className="font-medium">Informações do Cargo</h4>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    {selectedEmployee.data.cargo ? (
                      <>
                        <div>
                          <span className="text-muted-foreground">Cargo:</span>
                          <span className="ml-2">{selectedEmployee.data.cargo.nome}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ID do Cargo:</span>
                          <span className="ml-2">{selectedEmployee.data.cargo.id}</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-muted-foreground">
                        Nenhum cargo atribuído a este funcionário
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Fechar</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>


      {/* Edit Employee Dialog */}
      {selectedEmployee && (
        <EditEmployeeDialog
          employee={{
            id: selectedEmployee.data.id.toString(),
            rg: selectedEmployee.data.rg,
            nome: selectedEmployee.data.nome,
            dt_adm: selectedEmployee.data.dt_adm,
            salario: selectedEmployee.data.salario,
            cargo: selectedEmployee.data.cargo.id,
          }}
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          onOpenChange={setEditDialogOpen}
          onEmployeeUpdated={() => {
            toast({
              title: "Sucesso",
              description: "Funcionário atualizado com sucesso!",
            });
          }}
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
