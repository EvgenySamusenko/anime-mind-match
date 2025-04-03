
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Clock, 
  Heart, 
  Star,
  Sparkles, 
  BarChart
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const tests = [
  {
    id: "personality-type",
    title: "Индикатор типа личности",
    description: "Откройте свой психологический тип на основе 16 различных личностей.",
    duration: "10-15",
    questions: 30,
    category: "Personality",
    popular: true,
    icon: Brain
  },
  {
    id: "emotional-preference",
    title: "Эмоциональные предпочтения аниме",
    description: "Узнайте, как ваши эмоциональные реакции связаны с разными жанрами аниме.",
    duration: "5-8",
    questions: 15,
    category: "Preferences",
    popular: true,
    icon: Heart
  },
  {
    id: "character-affinity",
    title: "Тест на сходство с персонажами",
    description: "Узнайте, с какими типами аниме-персонажей у вас больше всего сходства.",
    duration: "8-10",
    questions: 20,
    category: "Affinity",
    popular: false,
    icon: Star
  },
  {
    id: "mood-matcher",
    title: "Подбор аниме по настроению",
    description: "Получите рекомендации аниме на основе вашего текущего эмоционального состояния.",
    duration: "3-5",
    questions: 10,
    category: "Mood",
    popular: true,
    icon: Sparkles
  },
  {
    id: "cognitive-style",
    title: "Анализ когнитивного стиля",
    description: "Поймите, как ваши мыслительные паттерны связаны с повествованием в аниме.",
    duration: "12-15",
    questions: 25,
    category: "Cognitive",
    popular: false,
    icon: BarChart
  }
];

const categoryNames = {
  "Personality": "Личность",
  "Preferences": "Предпочтения",
  "Affinity": "Сходство",
  "Mood": "Настроение",
  "Cognitive": "Когнитивный"
};

export function TestsList() {
  const [filter, setFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const filteredTests = filter 
    ? tests.filter(test => test.category.toLowerCase() === filter.toLowerCase())
    : tests;

  const categories = Array.from(new Set(tests.map(test => test.category)));

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-center">Психологические тесты</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Узнайте свои личностные черты и получите персонализированные рекомендации аниме на основе вашего психологического профиля.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button
            variant={filter === null ? "default" : "outline"}
            className={filter === null ? "bg-anime-purple hover:bg-anime-indigo" : ""}
            onClick={() => setFilter(null)}
          >
            Все тесты
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category.toLowerCase() ? "default" : "outline"}
              className={filter === category.toLowerCase() ? "bg-anime-purple hover:bg-anime-indigo" : ""}
              onClick={() => setFilter(category.toLowerCase())}
            >
              {categoryNames[category]}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTests.map(test => {
          const Icon = test.icon;
          
          return (
            <Card key={test.id} className="flex flex-col h-full anime-card group">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-anime-purple/10 text-anime-purple">
                    <Icon className="h-5 w-5" />
                  </div>
                  {test.popular && (
                    <Badge variant="secondary" className="bg-anime-pink/10 text-anime-pink border-none">
                      Популярный
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2">{test.title}</CardTitle>
                <CardDescription>{test.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{test.duration} минут</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Brain className="mr-2 h-4 w-4" />
                    <span>{test.questions} вопросов</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate(`/tests/${test.id}`)}
                  className="w-full bg-anime-purple hover:bg-anime-indigo group-hover:translate-y-[-2px] transition-all"
                >
                  Начать тест
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
