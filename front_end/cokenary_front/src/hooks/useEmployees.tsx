import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// Tipos
export interface Funcionario {
  data:{
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

export interface Cargo {
  id: number;
  nome: string;
}

interface ApiFuncionario {
 data:{
  id: number;
  rg: number;
  nome: string;
  dt_adm: string;
  salario: number;
  cargo?: {
    id: number;
    nome: string;
  };
 }
}

interface ApiCargo {
  id: number;
  nome: string;
}

const API_URL = "http://localhost:8081";

// Função para buscar funcionários
const fetchFuncionarios = async (): Promise<Funcionario[]> => {
  const response = await fetch(`${API_URL}/funcionarios/listar`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || `Erro ${response.status}: ${response.statusText}`);
  }

  const json = await response.json();

  // Verifica se a resposta tem o campo "data" com um array de funcionários
  const funcionariosRaw = Array.isArray(json.data) ? json.data : json;

  // Garante que estamos lidando com um array
  if (!Array.isArray(funcionariosRaw)) {
    throw new Error("A resposta da API não contém um array de funcionários");
  }

  // Mapeia para o tipo Funcionario esperado no frontend
  return funcionariosRaw.map((item) => ({
    data: {
      id: item.id,
      rg: item.rg,
      nome: item.nome,
      dt_adm: item.dt_adm,
      salario: item.salario,
      cargo: {
        id: item.cargo?.id || 0,
        nome: item.cargo?.nome || ''
      }
    }
  }));
};

// Função para criar funcionário
const createFuncionario = async (funcionario: Omit<Funcionario, 'id'>): Promise<Funcionario> => {
  const payload = {
    rg: funcionario.data.rg,
    nome: funcionario.data.nome,
    dt_adm: funcionario.data.dt_adm,
    salario: funcionario.data.salario,
    cargo: {
      id: funcionario.data.cargo.id
    }
  };

  const response = await fetch(`${API_URL}/funcionarios/cadastrar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Erro ao criar funcionário');
  }

  const data: ApiFuncionario = await response.json();
  return {
  data: {
    id: data.data.id,
    rg: data.data.rg,
    nome: data.data.nome,
    dt_adm: data.data.dt_adm,
    salario: data.data.salario,
    cargo: {
      id: data.data.cargo.id,
      nome: data.data.cargo?.nome || ''
    }}
  };
};

// Função para atualizar funcionário
const updateFuncionario = async (funcionario: Funcionario): Promise<Funcionario> => {
  if (!funcionario.data.id) {
    throw new Error('ID do funcionário é obrigatório para atualização');
  }

  const payload = {
    rg: funcionario.data.rg,
    nome: funcionario.data.nome,
    dt_adm: funcionario.data.dt_adm,
    salario: funcionario.data.salario,
    cargo: {
      id: funcionario.data.cargo.id
    }
  };

  const response = await fetch(`${API_URL}/funcionarios/alterar/${funcionario.data.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Erro ao atualizar funcionário');
  }

  const data: ApiFuncionario = await response.json();
  return {
   data: {
    id: data.data.id,
    rg: data.data.rg,   
    nome: data.data.nome,
    dt_adm: data.data.dt_adm,
    salario: data.data.salario,
    cargo: {
      id: data.data.cargo.id,
      nome: data.data.cargo?.nome || ''
      
    }}
  };
};

// Função para deletar funcionário
const deleteFuncionario = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/funcionarios/excluir/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || 'Erro ao deletar funcionário');
  }
};

// Hook para buscar funcionários
export const useFuncionarios = () => {
  return useQuery<Funcionario[], Error>({
    queryKey: ["funcionarios"],
    queryFn: fetchFuncionarios,
    retry: 2,
    retryDelay: 1000,
  });
};

// Hook para criar funcionário
export const useCreateFuncionario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFuncionario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
      toast({
        title: "Sucesso",
        description: "Funcionário criado com sucesso!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para atualizar funcionário
export const useUpdateFuncionario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateFuncionario,
    onSuccess: (updatedFuncionario) => {
      queryClient.setQueryData<Funcionario[]>(['funcionarios'], (old) =>
        old?.map(f => f.data.id === updatedFuncionario.data.id ? updatedFuncionario : f)
      );
      toast({
        title: "Sucesso",
        description: "Funcionário atualizado com sucesso!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook para deletar funcionário
export const useDeleteFuncionario = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFuncionario,
    onSuccess: (_, id) => {
      queryClient.setQueryData<Funcionario[]>(['funcionarios'], (old) =>
        old?.filter(f => f.data.id !== id)
      );
      toast({
        title: "Sucesso",
        description: "Funcionário deletado com sucesso!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

// Hook auxiliar para tipos de cargos
export const useCargos = () => {
  return useQuery<Cargo[], Error>({
    queryKey: ["cargos"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/cargos`);
      if (!response.ok) {
        throw new Error('Erro ao carregar cargos');
      }
      const data: ApiCargo[] = await response.json();
      return data.map(cargo => ({
        id: cargo.id,
        nome: cargo.nome
      }));
    },
  });
};
