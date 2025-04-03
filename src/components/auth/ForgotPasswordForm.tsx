
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate password reset - this would be replaced with actual auth
    setTimeout(() => {
      toast({
        title: "Ссылка отправлена!",
        description: "Пожалуйста, проверьте вашу электронную почту для получения инструкций по сбросу пароля.",
      });
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Сброс пароля</CardTitle>
        <CardDescription className="text-center">
          {!isSubmitted 
            ? "Введите вашу электронную почту, и мы отправим ссылку для сброса пароля" 
            : "Мы отправили вам письмо с инструкциями по сбросу пароля"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Электронная почта</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="you@example.com"
                  type="email"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-anime-purple hover:bg-anime-indigo transition-colors" 
              disabled={isLoading}
            >
              {isLoading ? "Отправка..." : "Отправить ссылку"}
            </Button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Если аккаунт с адресом <span className="font-semibold text-foreground">{email}</span> существует,
              вы вскоре получите ссылку для сброса пароля.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="mx-auto"
            >
              Использовать другой адрес
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Вернуться ко входу
        </Button>
      </CardFooter>
    </Card>
  );
}
