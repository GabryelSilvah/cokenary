
import { useState } from "react";
import { 
  Users, 
  UtensilsCrossed, 
  Store, 
  Briefcase, 
  LayoutDashboard, 
  Settings, 
  ChevronRight,
  LogOut,
  Eye 
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Dados fictícios para o painel
  const stats = [
    { id: 1, title: "Receitas", value: 8, icon: <UtensilsCrossed className="h-5 w-5" />, route: "/recipes" },
    { id: 2, title: "Restaurantes", value: 6, icon: <Store className="h-5 w-5" />, route: "/restaurants" },
    { id: 3, title: "Funcionários", value: 12, icon: <Users className="h-5 w-5" />, route: "/employees" },
    { id: 4, title: "Cargos", value: 5, icon: <Briefcase className="h-5 w-5" />, route: "/jobs" },
  ];
  
  const recentActivities = [
    { id: 1, action: "Nova receita adicionada", user: "Admin", time: "Há 2 horas" },
    { id: 2, action: "Funcionário atualizado", user: "Gerente", time: "Há 5 horas" },
    { id: 3, action: "Restaurante excluído", user: "Admin", time: "Há 1 dia" },
    { id: 4, action: "Novo cargo criado", user: "Gerente RH", time: "Há 2 dias" },
  ];
  
  return (
    <div className="pb-12">
      <SectionContainer className="py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <PageHeader 
            title="Painel Administrativo" 
            description="Gerencie todos os aspectos do seu sistema"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-4">
            <Card className="bg-card">
              <CardContent className="p-0">
                <div className="divide-y">
                  <Button 
                    variant={activeTab === "dashboard" ? "default" : "ghost"} 
                    className="w-full justify-start rounded-none h-14"
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>
                  <Button 
                    variant={activeTab === "recipes" ? "default" : "ghost"} 
                    className="w-full justify-start rounded-none h-14"
                    onClick={() => setActiveTab("recipes")}
                  >
                    <UtensilsCrossed className="mr-2 h-5 w-5" />
                    Receitas
                  </Button>
                  <Button 
                    variant={activeTab === "restaurants" ? "default" : "ghost"} 
                    className="w-full justify-start rounded-none h-14"
                    onClick={() => setActiveTab("restaurants")}
                  >
                    <Store className="mr-2 h-5 w-5" />
                    Restaurantes
                  </Button>
                  <Button 
                    variant={activeTab === "employees" ? "default" : "ghost"} 
                    className="w-full justify-start rounded-none h-14"
                    onClick={() => setActiveTab("employees")}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Funcionários
                  </Button>
                  <Button 
                    variant={activeTab === "jobs" ? "default" : "ghost"} 
                    className="w-full justify-start rounded-none h-14"
                    onClick={() => setActiveTab("jobs")}
                  >
                    <Briefcase className="mr-2 h-5 w-5" />
                    Cargos
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="w-full justify-start rounded-none h-14"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-5 w-5" />
                    Configurações
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start rounded-none h-14 text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => navigate("/login")}
                  >
                    <LogOut className="mr-2 h-5 w-5" />
                    Sair
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main content */}
          <div className="md:col-span-3 space-y-6">
            {/* Dashboard Tab */}
            {activeTab === "dashboard" && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat) => (
                    <Card key={stat.id} className="relative overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="text-sm font-medium text-muted-foreground">
                          {stat.title}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{stat.value}</div>
                      </CardContent>
                      <CardFooter className="p-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full justify-between"
                          onClick={() => navigate(stat.route)}
                        >
                          Ver todos
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </CardFooter>
                      <div className="absolute right-4 top-4 text-muted-foreground opacity-20">
                        <div className="h-8 w-8">{stat.icon}</div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Atividades Recentes</CardTitle>
                    <CardDescription>
                      Monitoramento das últimas ações no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div 
                          key={activity.id}
                          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium">{activity.action}</span>
                            <span className="text-sm text-muted-foreground">Por: {activity.user}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
            
            {/* Outros Tabs */}
            {activeTab === "recipes" && (
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Receitas</CardTitle>
                  <CardDescription>
                    Adicione, edite e remova receitas do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full mb-4" 
                    onClick={() => navigate("/recipes")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Página de Receitas
                  </Button>
                  <p className="text-muted-foreground text-center">
                    Acesse a página de receitas para gerenciamento completo.
                  </p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "restaurants" && (
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Restaurantes</CardTitle>
                  <CardDescription>
                    Adicione, edite e remova restaurantes do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full mb-4" 
                    onClick={() => navigate("/restaurants")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Página de Restaurantes
                  </Button>
                  <p className="text-muted-foreground text-center">
                    Acesse a página de restaurantes para gerenciamento completo.
                  </p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "employees" && (
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Funcionários</CardTitle>
                  <CardDescription>
                    Adicione, edite e remova funcionários do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full mb-4" 
                    onClick={() => navigate("/employees")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Página de Funcionários
                  </Button>
                  <p className="text-muted-foreground text-center">
                    Acesse a página de funcionários para gerenciamento completo.
                  </p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "jobs" && (
              <Card>
                <CardHeader>
                  <CardTitle>Gerenciamento de Cargos</CardTitle>
                  <CardDescription>
                    Adicione, edite e remova cargos do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full mb-4" 
                    onClick={() => navigate("/jobs")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver Página de Cargos
                  </Button>
                  <p className="text-muted-foreground text-center">
                    Acesse a página de cargos para gerenciamento completo.
                  </p>
                </CardContent>
              </Card>
            )}
            
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Configurações do Sistema</CardTitle>
                  <CardDescription>
                    Gerencie as configurações gerais do sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <p className="text-muted-foreground text-center mt-8 mb-8">
                        Configurações do sistema serão implementadas em breve.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default AdminPanel;
