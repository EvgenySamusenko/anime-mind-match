
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Home, 
  User, 
  Settings, 
  BookOpen, 
  Heart, 
  LogOut, 
  Menu, 
  X,
  LogIn,
  Brain,
  Film
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    toast({
      title: "Выход выполнен успешно",
      description: "Вы вышли из своей учетной записи",
    });
    navigate("/");
  };

  const NavItems = () => (
    <>
      <Link to="/" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
        <Home className="h-4 w-4" />
        <span>Главная</span>
      </Link>
      <Link to="/anime" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
        <Film className="h-4 w-4" />
        <span>Аниме</span>
      </Link>
      <Link to="/tests" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
        <Brain className="h-4 w-4" />
        <span>Психологические тесты</span>
      </Link>
    </>
  );

  return (
    <header className="bg-background/80 backdrop-blur-md py-4 sticky top-0 z-40 w-full border-b">
      <div className="container flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl sm:text-2xl text-anime-purple">AnimeMind Match</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavItems />
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageSwitcher />
          
          {!isLoggedIn ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/login")} className="text-foreground hover:text-anime-purple">
                Войти
              </Button>
              <Button onClick={() => navigate("/register")} className="bg-anime-purple hover:bg-anime-indigo">
                Регистрация
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="rounded-full h-10 w-10 p-0 text-foreground bg-muted hover:bg-muted-foreground/20"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/favorites")}>
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Избранное</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                  <BookOpen className="mr-2 h-4 w-4" />
                  <span>Панель управления</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Настройки</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Выйти</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 z-50 bg-background border-t p-4 animate-fade-in">
            <nav className="flex flex-col space-y-4 py-4">
              <NavItems />
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>Профиль</span>
                  </Link>
                  <Link to="/favorites" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>Избранное</span>
                  </Link>
                  <Link to="/dashboard" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>Панель управления</span>
                  </Link>
                  <Link to="/settings" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
                    <Settings className="h-4 w-4" />
                    <span>Настройки</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Выйти</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-foreground hover:text-anime-purple transition-colors flex items-center gap-1">
                    <LogIn className="h-4 w-4" />
                    <span>Войти</span>
                  </Link>
                  <Button onClick={() => navigate("/register")} className="w-full bg-anime-purple hover:bg-anime-indigo">
                    Регистрация
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
