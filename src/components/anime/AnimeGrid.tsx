
import { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Star, 
  Calendar, 
  X,
  ArrowDownAZ,
  ArrowUpAZ
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AnimeCard } from "@/components/anime/AnimeCard";
import { animeData } from "@/data/animeData";

type SortOption = "title-asc" | "title-desc" | "rating-desc" | "year-desc";

export function AnimeGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("rating-desc");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [filteredAnime, setFilteredAnime] = useState(animeData);
  
  // Extract all genres from anime data
  const allGenres = Array.from(
    new Set(animeData.flatMap(anime => anime.genres))
  ).sort();
  
  useEffect(() => {
    // Filter anime based on search term and selected genres
    let filtered = animeData;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(anime => 
        anime.title.toLowerCase().includes(term) || 
        anime.description.toLowerCase().includes(term)
      );
    }
    
    if (selectedGenres.length > 0) {
      filtered = filtered.filter(anime => 
        selectedGenres.every(genre => anime.genres.includes(genre))
      );
    }
    
    // Sort the filtered results
    switch (sortBy) {
      case "title-asc":
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        filtered = [...filtered].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating-desc":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "year-desc":
        filtered = [...filtered].sort((a, b) => b.year - a.year);
        break;
    }
    
    setFilteredAnime(filtered);
  }, [searchTerm, selectedGenres, sortBy]);
  
  const handleGenreChange = (genre: string, checked: boolean) => {
    if (checked) {
      setSelectedGenres([...selectedGenres, genre]);
    } else {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    }
  };
  
  const clearFilters = () => {
    setSelectedGenres([]);
    setSearchTerm("");
  };

  return (
    <div className="container mx-auto animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Поиск аниме по названию или описанию..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="flex gap-2">
          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Сортировка</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating-desc">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Наивысший рейтинг</span>
                </div>
              </SelectItem>
              <SelectItem value="year-desc">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Сначала новые</span>
                </div>
              </SelectItem>
              <SelectItem value="title-asc">
                <div className="flex items-center gap-2">
                  <ArrowDownAZ className="h-4 w-4" />
                  <span>Название (А-Я)</span>
                </div>
              </SelectItem>
              <SelectItem value="title-desc">
                <div className="flex items-center gap-2">
                  <ArrowUpAZ className="h-4 w-4" />
                  <span>Название (Я-А)</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Фильтр
                {selectedGenres.length > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="ml-1 bg-anime-purple text-white"
                  >
                    {selectedGenres.length}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Фильтр аниме</SheetTitle>
                <SheetDescription>
                  Выберите жанры для фильтрации списка аниме.
                </SheetDescription>
              </SheetHeader>
              
              <div className="py-6">
                <h3 className="text-sm font-medium mb-4">Жанры</h3>
                <div className="space-y-3">
                  {allGenres.map(genre => (
                    <div key={genre} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`genre-${genre}`} 
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={(checked) => 
                          handleGenreChange(genre, checked as boolean)
                        }
                      />
                      <Label htmlFor={`genre-${genre}`}>{genre}</Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <SheetFooter className="flex flex-row gap-2 justify-between sm:justify-between">
                <Button 
                  variant="outline" 
                  onClick={clearFilters}
                >
                  Очистить всё
                </Button>
                <SheetClose asChild>
                  <Button className="bg-anime-purple hover:bg-anime-indigo">
                    Применить фильтры
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      {selectedGenres.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-sm font-medium">Активные фильтры:</span>
          {selectedGenres.map(genre => (
            <Badge 
              key={genre} 
              variant="secondary"
              className="flex items-center gap-1 bg-muted"
            >
              {genre}
              <button
                onClick={() => handleGenreChange(genre, false)}
                className="ml-1 rounded-full h-4 w-4 inline-flex items-center justify-center hover:bg-muted-foreground/20"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-xs text-muted-foreground"
          >
            Очистить всё
          </Button>
        </div>
      )}
      
      {filteredAnime.length > 0 ? (
        <div className="anime-card-grid">
          {filteredAnime.map(anime => (
            <AnimeCard
              key={anime.id}
              id={anime.id}
              title={anime.title}
              image={anime.image}
              description={anime.description}
              genres={anime.genres}
              rating={anime.rating}
              year={anime.year}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium mb-2">Аниме не найдено</h3>
          <p className="text-muted-foreground mb-4">
            Попробуйте изменить параметры поиска или фильтры, чтобы найти то, что вы ищете.
          </p>
          <Button onClick={clearFilters}>
            Очистить фильтры
          </Button>
        </div>
      )}
    </div>
  );
}
