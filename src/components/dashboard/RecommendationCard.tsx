
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Sparkles, Zap } from "lucide-react";

interface RecommendationCardProps {
  id: string;
  title: string;
  image: string;
  matchPercentage: number;
  matchType?: "personality" | "mood";
}

export function RecommendationCard({
  id,
  title,
  image,
  matchPercentage,
  matchType = "personality"
}: RecommendationCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="overflow-hidden cursor-pointer group anime-card h-full"
      onClick={() => navigate(`/anime/${id}`)}
    >
      <div className="relative h-40 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-white font-semibold line-clamp-2 text-sm">
            {title}
          </h3>
        </div>
        <div 
          className={`absolute top-2 right-2 rounded-md py-1 px-2 flex items-center gap-1 text-xs font-medium ${
            matchPercentage >= 90 
              ? "bg-green-500/90 text-white" 
              : matchPercentage >= 75 
                ? "bg-anime-purple/90 text-white" 
                : "bg-anime-blue/90 text-white"
          }`}
        >
          {matchType === "personality" ? (
            <Sparkles className="h-3 w-3" />
          ) : (
            <Zap className="h-3 w-3" />
          )}
          <span>{matchPercentage}% Match</span>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs text-muted-foreground">
              {matchType === "personality" ? "Based on your profile" : "Matches your mood"}
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Would handle favorites in a real app
            }}
            className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-anime-pink transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
