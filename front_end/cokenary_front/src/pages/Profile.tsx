import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Image, Save, UserCog } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";
import { PageHeader } from "@/components/ui/page-header";
import { SectionContainer } from "@/components/ui/section-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Tipo para os dados do perfil
type ProfileData = {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const Profile = () => {
  const { user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Extrai o primeiro nome do email (parte antes do @)
  const getFirstNameFromEmail = (email: string) => {
    return email.split('@')[0];
  };

  // Estado inicial
  const [profileData, setProfileData] = useState<ProfileData>(() => {
    // Tenta carregar do localStorage
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }
    
    // Se não, usa os dados do authUser com nome padrão do email
    return {
      name: authUser?.name || getFirstNameFromEmail(authUser?.email || ""),
      email: authUser?.email || "",
      bio: "",
      avatar: authUser?.avatar || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  });

  // Redireciona se não estiver logado
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  // Salva no localStorage quando o perfil é atualizado
  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }, [profileData]);

  // Manipula seleção de nova imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newAvatar = event.target?.result as string;
        setProfileData(prev => ({
          ...prev,
          avatar: newAvatar
        }));
        // Atualiza também no contexto de autenticação
        updateUser({ ...authUser, avatar: newAvatar });
        toast({
          title: "Imagem atualizada",
          description: "Sua foto de perfil foi alterada com sucesso!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Atualiza no contexto de autenticação
    updateUser({ 
      ...authUser, 
      name: profileData.name,
      email: profileData.email,
      avatar: profileData.avatar
    });
    
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso!",
    });
  };
  
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    // Aqui você implementaria a lógica real de alteração de senha
    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso!",
    });
    
    // Reset dos campos de senha
    setProfileData(prev => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };
  
  // Aciona o input file quando o botão é clicado
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <SectionContainer className="pt-12 pb-16">
      {/* Input file escondido */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      
      <PageHeader 
        title="Meu Perfil" 
        description="Gerencie suas informações pessoais e configurações de conta"
      />
      
      <div className="mt-8 grid gap-8 md:grid-cols-[300px_1fr]">
        {/* Card de Perfil */}
        <Card className="h-fit">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Informações</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={profileData.avatar} alt={profileData.name} />
              <AvatarFallback className="text-2xl">
                {profileData.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-lg">{profileData.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{profileData.email}</p>
            <p className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs mt-2 capitalize">
              {authUser.role}
            </p>
          </CardContent>
        </Card>
        
        {/* Configurações */}
        <Tabs defaultValue="informacoes" className="w-full">
          <TabsList>
            <TabsTrigger value="informacoes">Informações</TabsTrigger>
            <TabsTrigger value="seguranca">Segurança</TabsTrigger>
          </TabsList>
          
          <TabsContent value="informacoes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                        <User className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="name"
                          name="name"
                          value={profileData.name}
                          onChange={handleChange}
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                        <Mail className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={profileData.bio}
                        onChange={handleChange}
                        placeholder="Conte um pouco sobre você..."
                        className="min-h-[120px]"
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="avatar">Foto de Perfil</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={profileData.avatar} alt={profileData.name} />
                          <AvatarFallback className="text-lg">
                            {profileData.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            className="mb-2"
                            onClick={triggerFileInput}
                          >
                            <Image className="mr-2 h-4 w-4" />
                            Alterar Imagem
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            JPG, PNG ou GIF. Tamanho máximo de 2MB.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seguranca" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Alterar Senha</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                        <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={profileData.currentPassword}
                          onChange={handleChange}
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                        <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={profileData.newPassword}
                          onChange={handleChange}
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
                        <Lock className="ml-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={handleChange}
                          className="border-0 focus-visible:ring-0"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    <Save className="mr-2 h-4 w-4" />
                    Alterar Senha
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {authUser.role === "admin" && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Configurações Avançadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full sm:w-auto">
                      <UserCog className="mr-2 h-4 w-4" />
                      Gerenciar Permissões
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </SectionContainer>
  );
};

export default Profile;