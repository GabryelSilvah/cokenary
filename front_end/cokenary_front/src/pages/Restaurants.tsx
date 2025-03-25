
import { useState } from "react";
import { Search, Filter, ChevronDown, MapPin, Phone, Star, Eye, Pencil, Trash } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { AddRestaurantDialog } from "@/components/ui/add-restaurant-dialog";
import { EditRestaurantDialog } from "@/components/ui/edit-restaurant-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// Mock data
const RESTAURANTS = [
  {
    id: "1",
    name: "La Belle Vie",
    description: "Culinária francesa refinada em um ambiente elegante",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    address: "123 Gourmet Boulevard, São Paulo, SP",
    phone: "+55 (11) 5555-1234",
    rating: 4.8,
    cuisine: "French"
  },
  {
    id: "2",
    name: "Sakura Sushi",
    description: "Autêntico sushi e sashimi japonês",
    image: "https://images.unsplash.com/photo-1515669097368-22e68427d265",
    address: "456 Avenida Paulista, São Paulo, SP",
    phone: "+55 (11) 5555-6789",
    rating: 4.6,
    cuisine: "Japanese"
  },
  {
    id: "3",
    name: "Trattoria Milano",
    description: "Clássicos italianos em estilo familiar",
    image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c",
    address: "789 Rua Augusta, São Paulo, SP",
    phone: "+55 (11) 5555-8901",
    rating: 4.5,
    cuisine: "Italian"
  },
  {
    id: "4",
    name: "Spice Garden",
    description: "Sabores indianos autênticos e especiarias aromáticas",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b",
    address: "101 Rua das Especiarias, Rio de Janeiro, RJ",
    phone: "+55 (21) 5555-2345",
    rating: 4.3,
    cuisine: "Indian"
  },
  {
    id: "5",
    name: "El Cantina",
    description: "Culinária mexicana vibrante e margaritas artesanais",
    image: "https://images.unsplash.com/photo-1653234254708-ab59c6837782",
    address: "202 Avenida México, Rio de Janeiro, RJ",
    phone: "+55 (21) 5555-3456",
    rating: 4.7,
    cuisine: "Mexican"
  },
  {
    id: "6",
    name: "Mesa Rústica",
    description: "Comida americana do campo à mesa",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
    address: "303 Rua da Fazenda, Belo Horizonte, MG",
    phone: "+55 (31) 5555-4567",
    rating: 4.9,
    cuisine: "American"
  }
];

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [restaurantToDelete, setRestaurantToDelete] = useState<string | null>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [restaurantToEdit, setRestaurantToEdit] = useState<any>(null);
  const { toast } = useToast();
  
  const handleDeleteClick = (id: string) => {
    setRestaurantToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const handleConfirmDelete = () => {
    toast({
      title: "Restaurante Excluído",
      description: `O restaurante foi excluído com sucesso.`,
    });
    setDeleteDialogOpen(false);
    setRestaurantToDelete(null);
  };
  
  const handleEditRestaurant = (restaurant: any) => {
    setRestaurantToEdit(restaurant);
    setEditDialogOpen(true);
  };
  
  const handleViewDetails = (restaurant: any) => {
    setSelectedRestaurant(restaurant);
    setDetailsDialogOpen(true);
  };
  
  const filteredRestaurants = RESTAURANTS.filter(restaurant => 
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="pb-12">
      <SectionContainer className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <PageHeader 
            title="Restaurantes" 
            description="Descubra e conecte-se com os melhores estabelecimentos culinários"
          />
          
          <AddRestaurantDialog />
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar restaurantes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                <Filter className="mr-2 h-4 w-4" />
                Cozinha
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>Todas as Cozinhas</DropdownMenuItem>
              <DropdownMenuItem>Americana</DropdownMenuItem>
              <DropdownMenuItem>Francesa</DropdownMenuItem>
              <DropdownMenuItem>Italiana</DropdownMenuItem>
              <DropdownMenuItem>Japonesa</DropdownMenuItem>
              <DropdownMenuItem>Mexicana</DropdownMenuItem>
              <DropdownMenuItem>Indiana</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Card key={restaurant.id} className="overflow-hidden card-hover">
              <div className="relative h-48">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center">
                  <Star className="h-3.5 w-3.5 text-yellow-500 mr-1 fill-current" />
                  <span className=" text-black text-sm font-medium">{restaurant.rating}</span>
                </div>
                <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1">
                  <span className=" text-black text-xs font-medium">
                    {restaurant.cuisine === "French" ? "Francesa" : 
                     restaurant.cuisine === "Japanese" ? "Japonesa" : 
                     restaurant.cuisine === "Italian" ? "Italiana" : 
                     restaurant.cuisine === "Indian" ? "Indiana" : 
                     restaurant.cuisine === "Mexican" ? "Mexicana" : "Americana"}
                  </span>
                </div>
              </div>
              <CardHeader>
                <CardTitle>{restaurant.name}</CardTitle>
                <CardDescription>{restaurant.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mr-2 mt-0.5" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                  <span>{restaurant.phone}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => handleViewDetails(restaurant)}>
                  <Eye className="mr-2 h-4 w-4" />
                  Ver Detalhes
                </Button>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditRestaurant(restaurant)}
                  >
                    <Pencil className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeleteClick(restaurant.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SectionContainer>
      
      {/* Restaurant Details Dialog */}
      {selectedRestaurant && (
        <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedRestaurant.name}</DialogTitle>
              <DialogDescription>{selectedRestaurant.description}</DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="relative h-60 rounded-md overflow-hidden">
                <img 
                  src={selectedRestaurant.image} 
                  alt={selectedRestaurant.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-current" />
                  <span className="font-medium">{selectedRestaurant.rating}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Cozinha</h4>
                  <p>
                    {selectedRestaurant.cuisine === "French" ? "Francesa" : 
                     selectedRestaurant.cuisine === "Japanese" ? "Japonesa" : 
                     selectedRestaurant.cuisine === "Italian" ? "Italiana" : 
                     selectedRestaurant.cuisine === "Indian" ? "Indiana" : 
                     selectedRestaurant.cuisine === "Mexican" ? "Mexicana" : "Americana"}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium">Contato</h4>
                  <p>{selectedRestaurant.phone}</p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <h4 className="font-medium">Endereço</h4>
                  <p>{selectedRestaurant.address}</p>
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
      
      <ConfirmationDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Restaurante"
        description="Tem certeza que deseja excluir este restaurante? Esta ação não pode ser desfeita."
        confirmText="Excluir"
        cancelText="Cancelar"
        variant="delete"
      />
      
      {restaurantToEdit && (
        <EditRestaurantDialog
          restaurant={restaurantToEdit}
          isOpen={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default Restaurants;
