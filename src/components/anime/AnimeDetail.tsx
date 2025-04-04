
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  Star, 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Film,
  PlayCircle,
  BookOpen
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { animeData } from "@/data/animeData";

export function AnimeDetail() {
  const { id } = useParams<{ id: string }>();
  const [anime, setAnime] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchAnime = () => {
      setLoading(true);
      
      // Find anime by ID in our mock data
      const foundAnime = animeData.find(a => a.id === id);
      
      if (foundAnime) {
        setAnime(foundAnime);
        
        // Check if this anime is in user's favorites
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          const favorites = user.favorites || [];
          setFavorite(favorites.includes(id));
          
          // Check if user has rated this anime
          const ratings = user.ratings || {};
          if (ratings[id]) {
            setUserRating(ratings[id]);
          }
        }
      }
      
      setLoading(false);
    };
    
    fetchAnime();
  }, [id]);

  const toggleFavorite = () => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        title: "Требуется вход",
        description: "Пожалуйста, войдите, чтобы добавить аниме в избранное.",
        variant: "destructive"
      });
      return;
    }
    
    const newState = !favorite;
    setFavorite(newState);
    
    toast({
      title: newState ? "Добавлено в избранное" : "Удалено из избранного",
      description: newState ? `${anime.title} было добавлено в ваше избранное.` : `${anime.title} было удалено из вашего избранного.`,
    });
    
    // Update user's favorites in localStorage (would be database in production)
    const user = JSON.parse(userData);
    let favorites = user.favorites || [];
    
    if (newState) {
      favorites.push(id);
    } else {
      favorites = favorites.filter((favId: string) => favId !== id);
    }
    
    localStorage.setItem("user", JSON.stringify({
      ...user,
      favorites
    }));
  };

  const handleRating = (rating: number) => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        title: "Требуется вход",
        description: "Пожалуйста, войдите, чтобы оценить аниме.",
        variant: "destructive"
      });
      return;
    }
    
    setUserRating(rating);
    
    toast({
      title: "Оценка отправлена",
      description: `Вы оценили ${anime.title} на ${rating} звезд.`,
    });
    
    // Update user's ratings in localStorage (would be database in production)
    const user = JSON.parse(userData);
    const ratings = user.ratings || {};
    
    ratings[id!] = rating;
    
    localStorage.setItem("user", JSON.stringify({
      ...user,
      ratings
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse h-8 w-8 rounded-full bg-anime-purple"></div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Аниме не найдено</h2>
        <p className="text-muted-foreground mb-6">Аниме, которое вы ищете, не существует.</p>
        <Button 
          onClick={() => navigate("/anime")}
          className="bg-anime-purple hover:bg-anime-indigo"
        >
          Просмотреть аниме
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          <Card className="overflow-hidden">
            <div className="relative">
              <img 
                src={anime.image} 
                alt={anime.title} 
                className="w-full object-cover aspect-[2/3]"
              />
              <Button
                variant="outline"
                size="icon"
                className={`absolute top-4 right-4 rounded-full ${
                  favorite 
                    ? "bg-anime-pink text-white border-none" 
                    : "bg-black/50 text-white border-none hover:bg-black/70"
                }`}
                onClick={toggleFavorite}
              >
                <Heart className={`h-5 w-5 ${favorite ? "fill-current" : ""}`} />
              </Button>
            </div>
            <CardContent className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-bold">{anime.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground text-sm">/ 10</span>
                </div>
                <Badge variant="outline">{anime.year}</Badge>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre: string, index: number) => (
                  <Badge key={index} variant="secondary" className="bg-muted">
                    {genre}
                  </Badge>
                ))}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Выпущено: {anime.year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Эпизоды: {anime.episodes}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Film className="h-4 w-4" />
                  <span>Студия: {anime.studio}</span>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-sm font-medium mb-3">Оцените это аниме:</h3>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <Button
                      key={rating}
                      variant="ghost"
                      size="icon"
                      className={`h-10 w-10 ${userRating && userRating >= rating ? "text-yellow-400" : "text-muted-foreground"}`}
                      onClick={() => handleRating(rating)}
                    >
                      <Star className={`h-6 w-6 ${userRating && userRating >= rating ? "fill-yellow-400" : ""}`} />
                    </Button>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                asChild
              >
                <a href="#" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Официальный сайт
                </a>
              </Button>
              
              <Button 
                className="w-full bg-anime-purple hover:bg-anime-indigo flex items-center gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                Смотреть трейлер
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{anime.title}</h1>
            {anime.alternativeTitles && (
              <p className="text-muted-foreground mb-4">
                Также известно как: {anime.alternativeTitles.join(", ")}
              </p>
            )}
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="characters">Персонажи</TabsTrigger>
                <TabsTrigger value="related">Связанные</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-2">Синопсис</h2>
                        <p className="text-muted-foreground whitespace-pre-line">
                          {anime.description}
                        </p>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold mb-2">Соответствие вашему профилю</h2>
                        <p className="text-muted-foreground mb-4">
                          Основываясь на вашем психологическом профиле, вот как это аниме соответствует вашим предпочтениям:
                        </p>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Общее соответствие</span>
                              <span className="text-sm text-muted-foreground">85%</span>
                            </div>
                            <Progress value={85} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Сложность сюжета</span>
                              <span className="text-sm text-muted-foreground">92%</span>
                            </div>
                            <Progress value={92} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Глубина персонажей</span>
                              <span className="text-sm text-muted-foreground">78%</span>
                            </div>
                            <Progress value={78} className="h-2" />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">Эмоциональный резонанс</span>
                              <span className="text-sm text-muted-foreground">88%</span>
                            </div>
                            <Progress value={88} className="h-2" />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h2 className="text-xl font-semibold mb-2">Почему вам это понравится</h2>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-anime-purple/10 text-anime-purple flex items-center justify-center mt-0.5">
                              <BookOpen className="h-3 w-3" />
                            </div>
                            <span>Сложные философские темы соответствуют вашему аналитическому мышлению</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-anime-purple/10 text-anime-purple flex items-center justify-center mt-0.5">
                              <BookOpen className="h-3 w-3" />
                            </div>
                            <span>Развитие персонажей соответствует вашему предпочтению реалистичных личностей</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-anime-purple/10 text-anime-purple flex items-center justify-center mt-0.5">
                              <BookOpen className="h-3 w-3" />
                            </div>
                            <span>Стиль визуального повествования соответствует вашим привычкам погружения</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="characters">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {/* This would contain character cards */}
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          Информация о персонажах скоро появится.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="related">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 gap-4">
                      {/* This would contain related anime */}
                      <div className="text-center py-12">
                        <p className="text-muted-foreground">
                          Информация о связанных аниме скоро появится.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
