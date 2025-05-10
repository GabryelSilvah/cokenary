import { useState } from 'react';
import { Plus, Edit, Trash, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Tipos para melhor organização
type Position = {
  id: number;
  title: string;
  department: string;
  level: string;
  employeesCount?: number; // Adicionado para verificar vinculação com funcionários
};

const Positions = () => {
  const { toast } = useToast();
  const [positions, setPositions] = useState<Position[]>([
    { id: 1, title: 'Chef Principal', department: 'Cozinha', level: 'Sênior', employeesCount: 2 },
    { id: 2, title: 'Sous Chef', department: 'Cozinha', level: 'Pleno', employeesCount: 3 },
    { id: 3, title: 'Confeiteiro', department: 'Confeitaria', level: 'Pleno', employeesCount: 1 },
    { id: 4, title: 'Garçom', department: 'Atendimento', level: 'Júnior', employeesCount: 0 },
    { id: 5, title: 'Bartender', department: 'Bar', level: 'Pleno', employeesCount: 2 },
    { id: 6, title: 'Auxiliar de Cozinha', department: 'Cozinha', level: 'Júnior', employeesCount: 4 }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState<Position | null>(null);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);
  const [formData, setFormData] = useState<Omit<Position, 'id' | 'employeesCount'>>({
    title: '',
    department: '',
    level: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Filtra os cargos conforme o termo de pesquisa
  const filteredPositions = positions.filter((position) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      position.title.toLowerCase().includes(searchLower) ||
      position.department.toLowerCase().includes(searchLower) ||
      position.level.toLowerCase().includes(searchLower)
    );
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPosition) {
        // Atualiza o cargo existente
        setPositions(positions.map(pos =>
          pos.id === editingPosition.id ? { ...formData, id: pos.id, employeesCount: pos.employeesCount } : pos
        ));
        toast({
          description: "Cargo atualizado com sucesso!"
        });
      } else {
        // Adiciona novo cargo
        setPositions([...positions, { ...formData, id: Date.now(), employeesCount: 0 }]);
        toast({
          description: "Cargo adicionado com sucesso!"
        });
      }
      handleCloseModal();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Ocorreu um erro ao salvar o cargo."
      });
    }
  };

  const handleEdit = (position: Position) => {
    setEditingPosition(position);
    setFormData({
      title: position.title,
      department: position.department,
      level: position.level
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (position: Position) => {
    setPositionToDelete(position);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!positionToDelete) return;
    
    // Verifica se há funcionários vinculados
    if (positionToDelete.employeesCount && positionToDelete.employeesCount > 0) {
      toast({
        variant: "destructive",
        description: "Não é possível excluir um cargo vinculado a funcionários!"
      });
      setIsDeleteModalOpen(false);
      return;
    }

    // Remove o cargo
    setPositions(positions.filter(pos => pos.id !== positionToDelete.id));
    setIsDeleteModalOpen(false);
    toast({
      description: "Cargo excluído com sucesso!"
    });
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPositionToDelete(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPosition(null);
    setFormData({ title: '', department: '', level: '' });
  };

  return (
    <div className="container py-8 animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gerenciamento de Cargos</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" /> Adicionar Cargo
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Pesquisar cargos por título, departamento ou nível..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Lista de Cargos Filtrados */}
      <div className="grid gap-4">
        {filteredPositions.length > 0 ? (
          filteredPositions.map((position) => (
            <Card key={position.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{position.title}</h3>
                  <div className="flex gap-4 mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <span>Departamento: {position.department}</span>
                    <span>Nível: {position.level}</span>
                    <span>Funcionários: {position.employeesCount}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEdit(position)}
                    aria-label="Editar cargo"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleDeleteClick(position)}
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
                {editingPosition ? 'Editar Cargo' : 'Novo Cargo'}
              </h2>
              <Button variant="ghost" size="icon" onClick={handleCloseModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título do Cargo*</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Chef de Cozinha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Departamento*</label>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  placeholder="Ex: Cozinha"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nível*</label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleSelectChange('level', value)}
                  required
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
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" type="button" onClick={handleCloseModal}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingPosition ? 'Salvar Alterações' : 'Adicionar Cargo'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Exclusão */}
      {isDeleteModalOpen && positionToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-lg p-6 max-w-md w-full animate-scaleIn">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Confirmar Exclusão</h2>
              <Button variant="ghost" size="icon" onClick={handleCancelDelete}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            {positionToDelete.employeesCount && positionToDelete.employeesCount > 0 ? (
              <div className="space-y-4">
                <p className="text-red-500 font-medium">
                  Não é possível excluir este cargo pois ele está vinculado a {positionToDelete.employeesCount} funcionário(s).
                </p>
                <p>Para excluir, primeiro remova ou altere os funcionários vinculados a este cargo.</p>
                <div className="flex justify-end">
                  <Button onClick={handleCancelDelete}>Entendido</Button>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-4">Tem certeza que deseja excluir o cargo <strong>{positionToDelete.title}</strong>?</p>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={handleCancelDelete}>Cancelar</Button>
                  <Button variant="destructive" onClick={handleConfirmDelete}>Confirmar Exclusão</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;