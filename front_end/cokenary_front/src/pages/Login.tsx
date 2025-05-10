import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, loading: authLoading, login, error } = useAuth();
  const navigate = useNavigate();

  // Redireciona se estiver logado
  if (user && !authLoading) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await login(email, password);
      
      toast({
        title: "Login realizado",
        description: "Você foi autenticado com sucesso!",
      });

      navigate("/");
    } catch (err) {
      // O erro já é tratado no useAuth
      console.error("Erro no login:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para traduzir mensagens de erro
  const translateError = (errorMsg: string) => {
    const errorMap: Record<string, string> = {
      "Invalid credentials": "Email ou senha incorretos",
      "Failed to fetch": "Não foi possível conectar ao servidor",
      "Network request failed": "Problema de conexão com a rede",
    };
    
    return errorMap[errorMsg] || errorMsg;
  };

  return (
    <SectionContainer className="py-12 md:py-20">
      <div className="flex justify-center">
        <Card className="w-full max-w-md animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-display">Entrar</CardTitle>
            <CardDescription>
              Acesse sua conta com suas credenciais
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {/* Campo Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="nome@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="username"
                  disabled={isSubmitting}
                />
              </div>

              {/* Campo Senha */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                    autoComplete="current-password"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Lembrar de mim */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="remember" 
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
                  disabled={isSubmitting}
                />
                <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                  Lembrar de mim
                </Label>
              </div>

              {/* Mensagem de erro */}
              {error && (
                <p className="text-sm text-destructive">
                  {translateError(error)}
                </p>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting || authLoading}
                aria-disabled={isSubmitting || authLoading}
              >
                {isSubmitting || authLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Autenticando...
                  </>
                ) : "Entrar"}
              </Button>
              
              <div className="text-center text-sm">
                Não tem uma conta?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary hover:underline"
                >
                  Cadastre-se
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </SectionContainer>
  );
};

export default Login;