import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "USER",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading, register, error } = useAuth();
  const navigate = useNavigate();

  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError("");

    // Validação do email
    if (!formData.email.trim()) {
      setFormError("O email é obrigatório");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setFormError("Por favor, insira um email válido");
      setIsSubmitting(false);
      return;
    }

    // Validação da senha
    if (!formData.password.trim()) {
      setFormError("A senha é obrigatória");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setFormError("A senha deve ter pelo menos 6 caracteres");
      setIsSubmitting(false);
      return;
    }

    try {
      await register(formData.email, formData.password, formData.role);
      
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso.",
      });

      // Redireciona para a página inicial após cadastro
      navigate("/");
    } catch (error: any) {
      console.error("Registration error:", error);
      setFormError(error.message || "Erro durante o cadastro");
      toast({
        title: "Erro no cadastro",
        description: error.message || "Ocorreu um erro ao criar sua conta",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer className="py-12 md:py-20">
      <div className="flex justify-center">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-display">Criar Conta</CardTitle>
            <CardDescription>
              Junte-se à nossa comunidade culinária
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="space-y-4">
              {/* Campo Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <Label htmlFor="password">Senha*</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="pr-10"
                    autoComplete="new-password"
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground">
                  A senha deve ter pelo menos 6 caracteres
                </p>
              </div>

              {/* Campo Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Conta*</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="USER">Usuário</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>

              {/* Mensagens de erro */}
              {(formError || error) && (
                <p className="text-sm text-destructive">
                  {formError || error}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || loading}
                aria-disabled={isSubmitting || loading}
              >
                {isSubmitting || loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Criando conta...
                  </>
                ) : "Criar Conta"}
              </Button>
              
              <div className="text-center text-sm">
                Já tem uma conta?{" "}
                <Link 
                  to="/login" 
                  className="font-medium text-primary hover:underline"
                >
                  Entrar
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </SectionContainer>
  );
};

export default Register;