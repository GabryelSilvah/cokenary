
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";

// Types that will match our Spring Boot API responses
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  isActive: boolean;
  salary?: string;
  postedDate: string;
  accessLevelRequired: "admin" | "manager" | "employee" | "viewer";
}

// Function to fetch jobs from Spring Boot API
const fetchJobs = async (): Promise<Job[]> => {
  // When connected to Spring Boot, replace with actual API call:
  // const response = await fetch("/api/jobs");
  // if (!response.ok) throw new Error("Failed to fetch jobs");
  // return response.json();
  
  console.log("Fetching jobs from API would happen here");
  
  // Mock data for now
  return [
    {
      id: "1",
      title: "Chef de Cozinha",
      department: "Cozinha",
      location: "São Paulo, SP",
      description: "Estamos procurando um chef experiente para liderar nossa equipe de cozinha.",
      requirements: [
        "Mínimo de 5 anos de experiência como chef",
        "Formação em gastronomia",
        "Experiência em liderar equipes"
      ],
      responsibilities: [
        "Desenvolver novos pratos para o cardápio",
        "Gerenciar equipe de cozinha",
        "Garantir padrões de higiene e qualidade"
      ],
      isActive: true,
      salary: "R$ 7.000 - R$ 9.000",
      postedDate: "2023-09-15",
      accessLevelRequired: "manager"
    },
    {
      id: "2",
      title: "Gerente de Restaurante",
      department: "Operações",
      location: "Rio de Janeiro, RJ",
      description: "Precisamos de um gerente de restaurante para supervisionar as operações diárias.",
      requirements: [
        "Experiência em gestão de restaurantes",
        "Excelentes habilidades de comunicação",
        "Conhecimento em controle de estoque e gestão financeira"
      ],
      responsibilities: [
        "Supervisionar operações diárias",
        "Gerenciar equipe de atendimento",
        "Garantir satisfação do cliente"
      ],
      isActive: true,
      salary: "R$ 6.500 - R$ 8.000",
      postedDate: "2023-10-05",
      accessLevelRequired: "admin"
    },
    // Additional mock jobs could be added here
  ];
};

// Function to fetch a single job by ID
const fetchJobById = async (id: string): Promise<Job> => {
  console.log(`Fetching job with ID ${id} would happen here`);
  
  // Mock implementation
  const jobs = await fetchJobs();
  const job = jobs.find(j => j.id === id);
  if (!job) throw new Error("Job not found");
  return job;
};

// Function to create a new job
const createJob = async (job: Omit<Job, "id">): Promise<Job> => {
  console.log("Creating job would happen here", job);
  
  // Mock implementation
  return {
    ...job,
    id: Math.random().toString(36).substring(2, 9)
  };
};

// Function to update an existing job
const updateJob = async (job: Job): Promise<Job> => {
  console.log("Updating job would happen here", job);
  
  // Mock implementation
  return job;
};

// Function to delete a job
const deleteJob = async (id: string): Promise<void> => {
  console.log(`Deleting job with ID ${id} would happen here`);
  
  // Mock implementation - no return needed
};

// Hook for fetching all jobs
export const useJobs = () => {
  return useQuery({
    queryKey: ["jobs"],
    queryFn: fetchJobs
  });
};

// Hook for fetching a single job
export const useJob = (id: string) => {
  return useQuery({
    queryKey: ["jobs", id],
    queryFn: () => fetchJobById(id),
    enabled: !!id
  });
};

// Hook for creating a job
export const useCreateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Vaga Criada",
        description: "A vaga foi criada com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error creating job:", error);
      toast({
        title: "Erro",
        description: "Não foi possível criar a vaga.",
        variant: "destructive"
      });
    }
  });
};

// Hook for updating a job
export const useUpdateJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateJob,
    onSuccess: (updatedJob) => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["jobs", updatedJob.id] });
      toast({
        title: "Vaga Atualizada",
        description: "A vaga foi atualizada com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error updating job:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a vaga.",
        variant: "destructive"
      });
    }
  });
};

// Hook for deleting a job
export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      toast({
        title: "Vaga Removida",
        description: "A vaga foi removida com sucesso."
      });
    },
    onError: (error) => {
      console.error("Error deleting job:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover a vaga.",
        variant: "destructive"
      });
    }
  });
};
