import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// Types that will match our Spring Boot API responses
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  address: string;
  phone: string;
  rating: number;
  cuisine: string;
}

// Function to fetch restaurants from Spring Boot API
const fetchRestaurants = async (): Promise<Restaurant[]> => {
  // When connected to Spring Boot, replace with actual API call
  console.log("Fetching restaurants from API would happen here");
  
  // This will be replaced with actual API call:
  // const response = await fetch("/api/restaurants");
  // if (!response.ok) throw new Error("Failed to fetch restaurants");
  // return response.json();
  
  // For now, return mock data
  const mockData = [
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
  
  return mockData;
};

// Function to fetch a single restaurant by ID
const fetchRestaurantById = async (id: string): Promise<Restaurant> => {
  // When connected to Spring Boot:
  // const response = await fetch(`/api/restaurants/${id}`);
  // if (!response.ok) throw new Error("Failed to fetch restaurant");
  // return response.json();
  
  console.log(`Fetching restaurant with ID ${id} would happen here`);
  
  // Mock implementation
  const restaurants = await fetchRestaurants();
  const restaurant = restaurants.find(r => r.id === id);
  if (!restaurant) throw new Error("Restaurant not found");
  return restaurant;
};

// Function to create a new restaurant
const createRestaurant = async (restaurant: Omit<Restaurant, "id">): Promise<Restaurant> => {
  // When connected to Spring Boot:
  // const response = await fetch("/api/restaurants", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(restaurant)
  // });
  // if (!response.ok) throw new Error("Failed to create restaurant");
  // return response.json();
  
  console.log("Creating restaurant would happen here", restaurant);
  
  // Mock implementation
  return {
    ...restaurant,
    id: Math.random().toString(36).substring(2, 9)
  };
};

// Function to update an existing restaurant
const updateRestaurant = async (restaurant: Restaurant): Promise<Restaurant> => {
  // When connected to Spring Boot:
  // const response = await fetch(`/api/restaurants/${restaurant.id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(restaurant)
  // });
  // if (!response.ok) throw new Error("Failed to update restaurant");
  // return response.json();
  
  console.log("Updating restaurant would happen here", restaurant);
  
  // Mock implementation
  return restaurant;
};

// Function to delete a restaurant
const deleteRestaurant = async (id: string): Promise<void> => {
  // When connected to Spring Boot:
  // const response = await fetch(`/api/restaurants/${id}`, {
  //   method: "DELETE"
  // });
  // if (!response.ok) throw new Error("Failed to delete restaurant");
  // return;
  
  console.log(`Deleting restaurant with ID ${id} would happen here`);
  
  // Mock implementation - no return needed
};

// Hook for fetching all restaurants
export const useRestaurants = () => {
  return useQuery({
    queryKey: ["restaurants"],
    queryFn: fetchRestaurants
  });
};

// Hook for fetching a single restaurant
export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ["restaurants", id],
    queryFn: () => fetchRestaurantById(id),
    enabled: !!id
  });
};

// Hook for creating a restaurant
export const useCreateRestaurant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      toast({
        title: "Restaurante Criado",
        description: "O restaurante foi criado com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error creating restaurant:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar o restaurante.",
        variant: "destructive"
      });
    }
  });
};

// Hook for updating a restaurant
export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateRestaurant,
    onSuccess: (updatedRestaurant) => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      queryClient.invalidateQueries({ queryKey: ["restaurants", updatedRestaurant.id] });
      toast({
        title: "Restaurante Atualizado",
        description: "O restaurante foi atualizado com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error updating restaurant:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o restaurante.",
        variant: "destructive"
      });
    }
  });
};

// Hook for deleting a restaurant
export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteRestaurant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurants"] });
      toast({
        title: "Restaurante Excluído",
        description: "O restaurante foi excluído com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error deleting restaurant:", error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o restaurante.",
        variant: "destructive"
      });
    }
  });
};
