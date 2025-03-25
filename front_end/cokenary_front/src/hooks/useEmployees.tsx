
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// Types that will match our Spring Boot API responses
export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  department: string;
  image?: string;
  hireDate: string;
  salary?: number;
  accessLevel: "admin" | "manager" | "employee" | "viewer";
}

// Function to fetch employees from Spring Boot API
const fetchEmployees = async (): Promise<Employee[]> => {
  // When connected to Spring Boot, replace with actual API call:
  // const response = await fetch("/api/employees");
  // if (!response.ok) throw new Error("Failed to fetch employees");
  // return response.json();
  
  console.log("Fetching employees from API would happen here");
  
  // Mock data for now
  return [
    {
      id: "1",
      name: "Ana Silva",
      email: "ana.silva@example.com",
      phone: "(11) 98765-4321",
      jobTitle: "Chef Executivo",
      department: "Cozinha",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      hireDate: "2021-03-15",
      salary: 9500,
      accessLevel: "admin"
    },
    {
      id: "2",
      name: "Carlos Oliveira",
      email: "carlos.oliveira@example.com",
      phone: "(11) 91234-5678",
      jobTitle: "Gerente de Restaurante",
      department: "Operações",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      hireDate: "2020-08-10",
      salary: 7800,
      accessLevel: "manager"
    },
    // Additional mock employees could be added here
  ];
};

// Function to fetch a single employee by ID
const fetchEmployeeById = async (id: string): Promise<Employee> => {
  console.log(`Fetching employee with ID ${id} would happen here`);
  
  // Mock implementation
  const employees = await fetchEmployees();
  const employee = employees.find(e => e.id === id);
  if (!employee) throw new Error("Employee not found");
  return employee;
};

// Function to create a new employee
const createEmployee = async (employee: Omit<Employee, "id">): Promise<Employee> => {
  console.log("Creating employee would happen here", employee);
  
  // Mock implementation
  return {
    ...employee,
    id: Math.random().toString(36).substring(2, 9)
  };
};

// Function to update an existing employee
const updateEmployee = async (employee: Employee): Promise<Employee> => {
  console.log("Updating employee would happen here", employee);
  
  // Mock implementation
  return employee;
};

// Function to delete an employee
const deleteEmployee = async (id: string): Promise<void> => {
  console.log(`Deleting employee with ID ${id} would happen here`);
  
  // Mock implementation - no return needed
};

// Hook for fetching all employees
export const useEmployees = () => {
  return useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees
  });
};

// Hook for fetching a single employee
export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: ["employees", id],
    queryFn: () => fetchEmployeeById(id),
    enabled: !!id
  });
};

// Hook for creating an employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Funcionário Criado",
        description: "O funcionário foi adicionado com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error creating employee:", error);
      toast({
        title: "Erro",
        description: "Não foi possível adicionar o funcionário.",
        variant: "destructive"
      });
    }
  });
};

// Hook for updating an employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateEmployee,
    onSuccess: (updatedEmployee) => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["employees", updatedEmployee.id] });
      toast({
        title: "Funcionário Atualizado",
        description: "As informações do funcionário foram atualizadas com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error updating employee:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o funcionário.",
        variant: "destructive"
      });
    }
  });
};

// Hook for deleting an employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast({
        title: "Funcionário Removido",
        description: "O funcionário foi removido com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error deleting employee:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o funcionário.",
        variant: "destructive"
      });
    }
  });
};
