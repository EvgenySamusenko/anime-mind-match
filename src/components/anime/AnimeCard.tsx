
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ExternalLink } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AnimeCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  genres: string[];
  rating: number;
  year: number;
  isFavorite?: boolean;
}

export function AnimeCard({ id, title, image, description, genres, rating, year, isFavorite = false }: AnimeCardProps) {
  const [favorite, setFavorite] = useState(isFavorite);
  const navigate = useNavigate();
  const { toast } = useToast();

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      toast({
        title: "Login Required",
        description: "Please log in to add anime to your favorites.",
        variant: "destructive"
      });
      return;
    }
    
    const newState = !favorite;
    setFavorite(newState);
    
    toast({
      title: newState ? "Added to Favorites" : "Removed from Favorites",
      description: newState ? `${title} has been added to your favorites.` : `${title} has been removed from your favorites.`,
    });
    
    // In a real app, we would update the user's favorites in the database
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

  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <Card 
      className="h-full anime-card overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/anime/${id}`)}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={toggleFavorite}
            className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
              favorite 
                ? "bg-anime-pink text-white" 
                : "bg-black/30 text-white hover:bg-black/50"
            }`}
          >
            <Heart className={`h-4 w-4 ${favorite ? "fill-current" : ""}`} />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <div className="flex items-center gap-1 text-white">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="outline">{year}</Badge>
        </div>
        <CardDescription>
          {truncateDescription(description)}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {genres.slice(0, 3).map((genre, index) => (
            <Badge key={index} variant="secondary" className="bg-muted text-xs">
              {genre}
            </Badge>
          ))}
          {genres.length > 3 && (
            <Badge variant="secondary" className="bg-muted text-xs">
              +{genres.length - 3}
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full text-anime-purple border-anime-purple/30 hover:bg-anime-purple/10 group-hover:border-anime-purple transition-colors flex items-center gap-2"
        >
          <ExternalLink className="h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}
