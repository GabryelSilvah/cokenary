import { useState } from "react";
import { Plus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCreateFuncionario, useFuncionarios, useCargos } from "@/hooks/useEmployees";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddEmployeeDialog() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { mutate: createFuncionario, isPending } = useCreateFuncionario();
  const { data: funcionarios } = useFuncionarios();
  const { data: cargos } = useCargos();

  const [formData, setFormData] = useState({
    data: {
      rg: "",
      nome: "",
      dt_adm: "",
      salario: "",
      cargo_id: ""
    }
  });

  const [cargoNome, setCargoNome] = useState("");

  const resetForm = () => {
    setFormData({
      data: {
        rg: "",
        nome: "",
        dt_adm: "",
        salario: "",
        cargo_id: ""
      }
    });
    setCargoNome("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        [id]: value
      }
    }));
  };

  const handleCargoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      data: {
        ...prev.data,
        cargo_id: value
      }
    }));

    const cargoId = Number(value);
    const cargo = cargos?.find(c => c.id === cargoId);
    setCargoNome(cargo ? cargo.nome : "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.data.rg || isNaN(Number(formData.data.rg))) {
      toast({
        title: "Erro",
        description: "RG deve conter apenas números",
        variant: "destructive"
      });
      return;
    }

    if (!formData.data.nome) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive"
      });
      return;
    }

    if (!formData.data.dt_adm) {
      toast({
        title: "Erro",
        description: "Data de admissão é obrigatória",
        variant: "destructive"
      });
      return;
    }

    if (!formData.data.salario || isNaN(Number(formData.data.salario))) {
      toast({
        title: "Erro",
        description: "Salário deve ser um valor numérico",
        variant: "destructive"
      });
      return;
    }

    const cargoId = formData.data.cargo_id ? Number(formData.data.cargo_id) : null;
    if (formData.data.cargo_id && isNaN(cargoId)) {
      toast({
        title: "Erro",
        description: "ID do cargo deve ser um número",
        variant: "destructive"
      });
      return;
    }

    const funcionarioData = {
      data: {
        id: null,
        rg: Number(formData.data.rg),
        nome: formData.data.nome,
        dt_adm: formData.data.dt_adm,
        salario: Number(formData.data.salario),
        cargo: cargoId ? { id: cargoId, nome: cargoNome } : null
      }
    };

    const isRgDuplicado = funcionarios?.some(func => func.data.rg === funcionarioData.data.rg);

    if (isRgDuplicado) {
      toast({
        title: "Erro",
        description: "Já existe um funcionário cadastrado com este RG.",
        variant: "destructive"
      });
      return;
    }

    createFuncionario(funcionarioData, {
      onSuccess: () => {
        resetForm();
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Erro",
          description: error.message || "Ocorreu um erro ao cadastrar o funcionário",
          variant: "destructive"
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Funcionário
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Funcionário</DialogTitle>
          <DialogDescription>
            Preencha os dados para cadastrar um novo funcionário
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo*</Label>
              <Input
                id="nome"
                placeholder="Digite o nome completo"
                required
                value={formData.data.nome}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rg">RG*</Label>
              <Input
                id="rg"
                placeholder="Digite o RG (apenas números)"
                required
                value={formData.data.rg}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dt_adm">Data de Admissão*</Label>
              <Input
                id="dt_adm"
                type="date"
                required
                value={formData.data.dt_adm}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salario">Salário*</Label>
              <Input
                id="salario"
                placeholder="Digite o salário"
                required
                value={formData.data.salario}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo_id">Cargo (opcional)</Label>
              <select
                id="cargo_id"
                value={formData.data.cargo_id}
                onChange={handleCargoChange}
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
                <p className="text-muted-foreground mt-1">Cargo: {cargoNome}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Cadastrando..." : "Cadastrar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
