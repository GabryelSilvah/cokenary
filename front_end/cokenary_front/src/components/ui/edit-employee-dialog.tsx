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
import { useToast } from "@/components/ui/use-toast";
import { useUpdateFuncionario, useCargos } from "@/hooks/useEmployees";

interface EmployeeProps {
  employee: {
    id: string;
    rg: number;
    nome: string;
    dt_adm: string;
    salario: number;
    cargo: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  onEmployeeUpdated: () => void;
}

export function EditEmployeeDialog({
  employee,
  isOpen,
  onClose,
  onOpenChange,
  onEmployeeUpdated,
}: EmployeeProps) {
  const [formData, setFormData] = useState({
    rg: employee.rg.toString(),
    nome: employee.nome,
    dt_adm: employee.dt_adm.split("T")[0],
    salario: employee.salario.toString(),
    cargo: employee.cargo.toString(),
  });

  const [cargoNome, setCargoNome] = useState("");
  const { toast } = useToast();
  const { mutate: updateFuncionario, status } = useUpdateFuncionario();
  const { data: cargos } = useCargos();
  const isLoading = status === "pending";

  useEffect(() => {
    if (isOpen) {
      setFormData({
        rg: employee.rg.toString(),
        nome: employee.nome,
        dt_adm: employee.dt_adm.split("T")[0],
        salario: employee.salario.toString(),
        cargo: employee.cargo.toString(),
      });

      const cargo = cargos?.find((c) => c.id === employee.cargo);
      setCargoNome(cargo ? cargo.nome : "");
    }
  }, [isOpen, employee, cargos]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isNaN(Number(formData.rg))) {
      toast({
        title: "Erro",
        description: "RG deve conter apenas números",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(formData.salario))) {
      toast({
        title: "Erro",
        description: "Salário deve ser um valor numérico",
        variant: "destructive",
      });
      return;
    }

    if (isNaN(Number(formData.cargo))) {
      toast({
        title: "Erro",
        description: "ID do cargo deve ser um número",
        variant: "destructive",
      });
      return;
    }

    const updatedEmployee = {
      data: {
        id: Number(employee.id),
        rg: Number(formData.rg),
        nome: formData.nome,
        dt_adm: formData.dt_adm,
        salario: Number(formData.salario),
        cargo: {
          id: Number(formData.cargo),
          nome: cargoNome,
        },
      },
    };

    updateFuncionario(updatedEmployee, {
      onSuccess: () => {
        toast({
          title: "Sucesso",
          description: "Funcionário atualizado com sucesso!",
        });
        onEmployeeUpdated();
        onClose();
      },
      onError: (error) => {
        toast({
          title: "Erro",
          description:
            error.message || "Ocorreu um erro ao atualizar o funcionário",
          variant: "destructive",
        });
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "cargo") {
      const cargoId = Number(value);
      const cargo = cargos?.find((c) => c.id === cargoId);
      setCargoNome(cargo ? cargo.nome : "");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Editar Funcionário</DialogTitle>
          <DialogDescription>
            Atualize as informações do funcionário.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rg">RG</Label>
              <Input
                id="rg"
                value={formData.rg}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dt_adm">Data de Admissão</Label>
              <Input
                id="dt_adm"
                type="date"
                value={formData.dt_adm}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salario">Salário</Label>
              <Input
                id="salario"
                value={formData.salario}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo</Label>
              <select
                id="cargo"
                value={formData.cargo}
                onChange={handleChange}
                required
                className="w-full rounded border border-input bg-white text-black px-3 py-2 dark:bg-zinc-900 dark:text-white dark:border-zinc-700"
              >
                <option value="">Selecione um cargo</option>
                {cargos?.map((cargo) => (
                  <option key={cargo.id} value={cargo.id}>
                    {cargo.nome}
                  </option>
                ))}
              </select>
              {cargoNome && (
                <p className="text-muted-foreground">Cargo: {cargoNome}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Atualizando..." : "Atualizar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
