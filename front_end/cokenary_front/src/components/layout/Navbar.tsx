import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, User, LogOut, Settings, UserRound } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/ui/theme-provider';
import { useAuth } from '@/hooks/useAuth';

const MENU_ITEMS = [
  { label: 'Início', path: '/' },
  { label: 'Receitas', path: '/recipes' },
  { label: 'Restaurantes', path: '/restaurants' },
  { label: 'Funcionários', path: '/employees' },
  { label: 'Cargos', path: '/jobs' },
  { label: 'livros', path: '/books' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={cn(
      "fixed top-0 left-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b shadow-sm" : "bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
    )}>
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display text-xl font-medium">Cokenary
            </span>
            <span className="text-primary/80 font-display text-xl font-light"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {MENU_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "menu-item text-sm font-medium py-1.5",
                  isActive(item.path) 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary transition-colors"
                )}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Admin Panel Link (only for admins) */}
            {user && user.role === "admin" && (
              <Link
                to="/admin"
                className={cn(
                  "menu-item text-sm font-medium py-1.5",
                  isActive("/admin") 
                    ? "text-primary" 
                    : "text-muted-foreground hover:text-primary transition-colors"
                )}
              >
                Painel Administrativo
              </Link>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
              className="border-gray-300 dark:border-gray-700"
              aria-label="Alternar tema"
            >
              {theme === 'dark' ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 pl-2 pr-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-xs">
                        {user.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link to="/profile">
                      <UserRound className="mr-2 h-4 w-4" />
                      <span>Meu Perfil</span>
                    </Link>
                  </DropdownMenuItem>
                  
                  {user.role === "admin" && (
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link to="/admin">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Painel Administrativo</span>
                      </Link>
                    </DropdownMenuItem>
                  )}
                  
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer text-destructive" onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" className="border-gray-300 dark:border-gray-700" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <Link to="/register">Cadastro</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col py-12">
              {user && (
                <div className="flex items-center gap-3 mb-4 p-4 bg-muted/50 rounded-lg">
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-xs">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
              )}
              
              <div className="flex flex-col space-y-6 mt-4">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "text-base font-medium py-2 transition-colors",
                      isActive(item.path) 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
                
                {user && (
                  <Link
                    to="/profile"
                    className={cn(
                      "text-base font-medium py-2 transition-colors",
                      isActive("/profile") 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Meu Perfil
                  </Link>
                )}
                
                {/* Admin Panel Link (only for admins) */}
                {user && user.role === "admin" && (
                  <Link
                    to="/admin"
                    className={cn(
                      "text-base font-medium py-2 transition-colors",
                      isActive("/admin") 
                        ? "text-primary" 
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Painel Administrativo
                  </Link>
                )}
              </div>
              <div className="mt-auto flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start border-gray-300 dark:border-gray-700" 
                  onClick={toggleTheme}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="h-4 w-4 mr-2" />
                      Tema Claro
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-2" />
                      Tema Escuro
                    </>
                  )}
                </Button>
                
                {user ? (
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start" 
                    onClick={logout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full border-gray-300 dark:border-gray-700" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <Link to="/register">Cadastro</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
