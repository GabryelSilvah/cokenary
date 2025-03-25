import { useState } from 'react';
import { Plus, Edit, Trash, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Positions = () => {
  const { toast } = useToast();
  const [positions, setPositions] = useState([
    { id: 1, title: 'Chef Principal', department: 'Cozinha', level: 'Sênior' },
    { id: 2, title: 'Sous Chef', department: 'Cozinha', level: 'Pleno' },
    { id: 3, title: 'Confeiteiro', department: 'Confeitaria', level: 'Pleno' },
    { id: 4, title: 'Garçom', department: 'Atendimento', level: 'Júnior' },
    { id: 5, title: 'Bartender', department: 'Bar', level: 'Pleno' },
    { id: 6, title: 'Auxiliar de Cozinha', department: 'Cozinha', level: 'Júnior' }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [positionToDelete, setPositionToDelete] = useState(null);
  const [editingPosition, setEditingPosition] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    level: ''
  });
  const [searchTerm, setSearchTerm] = useState(''); // Estado para o termo de pesquisa

  // Função para filtrar os cargos com base no termo de pesquisa
  const filteredPositions = positions.filter((position) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      position.title.toLowerCase().includes(searchLower) ||
      position.department.toLowerCase().includes(searchLower) ||
      position.level.toLowerCase().includes(searchLower)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPosition) {
      setPositions(positions.map(pos => 
        pos.id === editingPosition.id ? { ...formData, id: pos.id } : pos
      ));
      toast({
        description: "Cargo atualizado com sucesso!"
      });
    } else {
      setPositions([...positions, { ...formData, id: Date.now() }]);
      toast({
        description: "Cargo adicionado com sucesso!"
      });
    }
    handleCloseModal();
  };

  const handleEdit = (position) => {
    setEditingPosition(position);
    setFormData(position);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id) => {
    setPositionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setPositions(positions.filter(pos => pos.id !== positionToDelete));
    setIsDeleteModalOpen(false);
    toast({
      variant: "destructive",
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
        <h1 className="text-4xl font-bold">Cargos</h1>
        <Button className="flex items-center gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4" /> Adicionar Cargo
        </Button>
      </div>

      {/* Barra de Pesquisa */}
      <div className="mb-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Pesquisar cargos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>

      {/* Lista de Cargos Filtrados */}
      <div className="grid gap-4">
        {filteredPositions.map((position) => (
          <Card key={position.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{position.title}</h3>
                <p className="text-gray-600">{position.department} • {position.level}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => handleEdit(position)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(position.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingPosition ? 'Editar Cargo' : 'Novo Cargo'}
              </h2>
              <Button variant="outline" size="icon" onClick={handleCloseModal}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Título</label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Departamento</label>
                <Input
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nível</label>
                <Input
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingPosition ? 'Salvar Alterações' : 'Adicionar Cargo'}
              </Button>
            </form>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Confirmar Exclusão</h2>
              <Button variant="outline" size="icon" onClick={handleCancelDelete}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <p className="mb-4">Tem certeza que deseja excluir este cargo?</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelDelete}>Cancelar</Button>
              <Button variant="destructive" onClick={handleConfirmDelete}>Excluir</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;