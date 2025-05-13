import { useState } from 'react';
import { Plus, Edit, Trash, X, Search, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComp } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useCargos } from '@/hooks/use-cargos';

type Cargo = {
  id: string;
  nome: string;
  descricao?: string;
  departamento?: string;
  nivel?: string;
  dataInicio?: string;
  dataFim?: string;
  indAtivo?: boolean;
  funcionariosCount?: number;
};

const CargosPage = () => {
  const { toast } = useToast();
  const { 
    cargos, 
    cargosAtivos,
    cargosInativos,
    isLoadingCargos: isLoading, 
    cargosError: error,
    createCargoMutation,
    updateCargoMutation,
    deleteCargoMutation
  } = useCargos();

  const { mutateAsync: createCargo, isPending: isCreating } = createCargoMutation;
  const { mutateAsync: updateCargo, isPending: isUpdating } = updateCargoMutation;
  const { mutateAsync: deleteCargo, isPending: isDeleting } = deleteCargoMutation;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cargoToDelete, setCargoToDelete] = useState<Cargo | null>(null);
  const [editingCargo, setEditingCargo] = useState<Cargo | null>(null);
  const [formData, setFormData] = useState<Omit<Cargo, 'id' | 'funcionariosCount'>>({
    nome: '',
    descricao: '',
    departamento: '',
    nivel: '',
    dataInicio: format(new Date(), 'yyyy-MM-dd'),
    dataFim: undefined,
    indAtivo: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'ativos' | 'inativos'>('todos');

  // Filtra os cargos conforme o termo de pesquisa e status
  const filteredCargos = (() => {
    let baseCargos = cargos || [];
    
    if (statusFilter === 'ativos') {
      baseCargos = cargosAtivos || [];
    } else if (statusFilter === 'inativos') {
      baseCargos = cargosInativos || [];
    }

    if (!searchTerm) return baseCargos;

    const searchLower = searchTerm.toLowerCase();
    return baseCargos.filter((cargo) => (
      cargo.nome.toLowerCase().includes(searchLower) ||
      (cargo.departamento && cargo.departamento.toLowerCase().includes(searchLower)) ||
      (cargo.nivel && cargo.nivel.toLowerCase().includes(searchLower))
    ));
  })();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: 'dataInicio' | 'dataFim', date: Date | undefined) => {
    if (!date) {
      if (name === 'dataFim') {
        setFormData(prev => ({ ...prev, [name]: undefined }));
      }
      return;
    }
    setFormData(prev => ({ 
      ...prev, 
      [name]: format(date, 'yyyy-MM-dd') 
    }));
  };

  const handleStatusChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, indAtivo: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCargo) {
        await updateCargo({ 
          ...formData, 
          id: editingCargo.id,
          descricao: formData.descricao || '',
          dataFim: formData.dataFim || null
        });
      } else {
        await createCargo(formData);
      }
      handleCloseModal();
    } catch (error) {
      // O erro já é tratado no useCargos
    }
  };

  const handleEdit = (cargo: Cargo) => {
    setEditingCargo(cargo);
    setFormData({
      nome: cargo.nome,
      descricao: cargo.descricao || '',
      departamento: cargo.departamento || '',
      nivel: cargo.nivel || '',
      dataInicio: cargo.dataInicio || format(new Date(), 'yyyy-MM-dd'),
      dataFim: cargo.dataFim || undefined,
      indAtivo: cargo.indAtivo ?? true
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (cargo: Cargo) => {
    setCargoToDelete(cargo);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!cargoToDelete) return;
    
    try {
      await deleteCargo(cargoToDelete.id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      // O erro já é tratado no useCargos
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCargoToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCargo(null);
    setFormData({ 
      nome: '', 
      descricao: '', 
      departamento: '', 
      nivel: '',
      dataInicio: format(new Date(), 'yyyy-MM-dd'),
      dataFim: undefined,
      indAtivo: true
    });
  };

  if (isLoading) return <div className="container py-8">Carregando...</div>;
  if (error) return <div className="container py-8">Erro ao carregar cargos</div>;

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Cargos</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" /> Adicionar Cargo
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex gap-4 mb-8">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Pesquisar cargos por nome, departamento ou nível..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as 'ativos' | 'inativos' | 'todos')}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="ativos">Ativos</SelectItem>
            <SelectItem value="inativos">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Cargos Filtrados */}
      <div className="grid gap-4">
        {filteredCargos.length > 0 ? (
          filteredCargos.map((cargo) => (
            <Card key={cargo.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{cargo.nome}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      cargo.indAtivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {cargo.indAtivo ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {cargo.descricao && <span>Descrição: {cargo.descricao}</span>}
                    {cargo.departamento && <span>Departamento: {cargo.departamento}</span>}
                    {cargo.nivel && <span>Nível: {cargo.nivel}</span>}
                    {cargo.dataInicio && (
                      <span>Início: {format(new Date(cargo.dataInicio), 'dd/MM/yyyy', { locale: ptBR })}</span>
                    )}
                    {cargo.dataFim && (
                      <span>Término: {format(new Date(cargo.dataFim), 'dd/MM/yyyy', { locale: ptBR })}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEdit(cargo)}
                    aria-label="Editar cargo"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleDeleteClick(cargo)}
                    aria-label="Excluir cargo"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 text-center">
            <p className="text-gray-500">Nenhum cargo encontrado</p>
          </Card>
        )}
      </div>

      {/* Modal de Adicionar/Editar Cargo */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg p-6 max-w-md w-full animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingCargo ? 'Editar Cargo' : 'Novo Cargo'}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Cargo*</label>
                <Input
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Chef de Cozinha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <Input
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descrição do cargo"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Departamento</label>
                <Input
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleInputChange}
                  placeholder="Ex: Cozinha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nível</label>
                <Select
                  value={formData.nivel}
                  onValueChange={(value) => handleSelectChange('nivel', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Júnior">Júnior</SelectItem>
                    <SelectItem value="Pleno">Pleno</SelectItem>
                    <SelectItem value="Sênior">Sênior</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="status-cargo" 
                  checked={formData.indAtivo} 
                  onCheckedChange={handleStatusChange}
                />
                <Label htmlFor="status-cargo">
                  {formData.indAtivo ? 'Ativo' : 'Inativo'}
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Data Início</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.dataInicio ? 
                          format(new Date(formData.dataInicio), 'dd/MM/yyyy', { locale: ptBR }) : 
                          'Selecione a data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComp
                        mode="single"
                        selected={formData.dataInicio ? new Date(formData.dataInicio) : new Date()}
                        onSelect={(date) => handleDateChange('dataInicio', date)}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data Término (opcional)</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {formData.dataFim ? 
                          format(new Date(formData.dataFim), 'dd/MM/yyyy', { locale: ptBR }) : 
                          'Selecione a data'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComp
                        mode="single"
                        selected={formData.dataFim ? new Date(formData.dataFim) : undefined}
                        onSelect={(date) => handleDateChange('dataFim', date)}
                        initialFocus
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isCreating || isUpdating}>
                  {editingCargo ? 
                    (isUpdating ? 'Salvando...' : 'Salvar Alterações') : 
                    (isCreating ? 'Adicionando...' : 'Adicionar Cargo')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && cargoToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg p-6 max-w-md w-full animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Confirmar Exclusão</h2>
              <Button variant="ghost" size="icon" onClick={handleCancelDelete}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {cargoToDelete.funcionariosCount && cargoToDelete.funcionariosCount > 0 ? (
              <div className="space-y-4">
                <p className="text-red-500 font-medium">
                  Não é possível excluir este cargo pois ele está vinculado a {cargoToDelete.funcionariosCount} funcionário(s).
                </p>
                <p>Para excluir, primeiro remova ou altere os funcionários vinculados a este cargo.</p>
                <div className="flex justify-end">
                  <Button onClick={handleCancelDelete}>Entendido</Button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-4">Tem certeza que deseja excluir o cargo <strong>{cargoToDelete.nome}</strong>?</p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancelDelete}>Cancelar</Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleConfirmDelete}
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Excluindo...' : 'Confirmar Exclusão'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CargosPage;