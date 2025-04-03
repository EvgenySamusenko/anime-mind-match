
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
    title: {
      en: "Personality Type Indicator",
      ru: "Индикатор типа личности"
    },
    description: {
      en: "Discover your psychological type based on 16 distinct personalities.",
      ru: "Откройте свой психологический тип на основе 16 различных личностей."
    },
    duration: "10-15",
    questions: 30,
    category: "Personality",
    popular: true,
    icon: Brain
  },
  {
    id: "emotional-preference",
    title: {
      en: "Emotional Anime Preference",
      ru: "Эмоциональные предпочтения аниме"
    },
    description: {
      en: "Find how your emotional responses connect to different anime genres.",
      ru: "Узнайте, как ваши эмоциональные реакции связаны с разными жанрами аниме."
    },
    duration: "5-8",
    questions: 15,
    category: "Preferences",
    popular: true,
    icon: Heart
  },
  {
    id: "character-affinity",
    title: {
      en: "Character Affinity Test",
      ru: "Тест на сходство с персонажами"
    },
    description: {
      en: "Discover which types of anime characters you relate to the most.",
      ru: "Узнайте, с какими типами аниме-персонажей у вас больше всего сходства."
    },
    duration: "8-10",
    questions: 20,
    category: "Affinity",
    popular: false,
    icon: Star
  },
  {
    id: "mood-matcher",
    title: {
      en: "Current Mood Matcher",
      ru: "Подбор аниме по настроению"
    },
    description: {
      en: "Get anime recommendations based on your current emotional state.",
      ru: "Получите рекомендации аниме на основе вашего текущего эмоционального состояния."
    },
    duration: "3-5",
    questions: 10,
    category: "Mood",
    popular: true,
    icon: Sparkles
  },
  {
    id: "cognitive-style",
    title: {
      en: "Cognitive Style Analysis",
      ru: "Анализ когнитивного стиля"
    },
    description: {
      en: "Understand how your thinking patterns relate to anime storytelling.",
      ru: "Поймите, как ваши мыслительные паттерны связаны с повествованием в аниме."
    },
    duration: "12-15",
    questions: 25,
    category: "Cognitive",
    popular: false,
    icon: BarChart
  }
];

export function TestsList() {
  const [filter, setFilter] = useState<string | null>(null);
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const filteredTests = filter 
    ? tests.filter(test => test.category.toLowerCase() === filter.toLowerCase())
    : tests;

  const categories = Array.from(new Set(tests.map(test => test.category)));

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-center">{t("tests", "title")}</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          {t("tests", "description")}
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button
            variant={filter === null ? "default" : "outline"}
            className={filter === null ? "bg-anime-purple hover:bg-anime-indigo" : ""}
            onClick={() => setFilter(null)}
          >
            {t("tests", "allTests")}
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category.toLowerCase() ? "default" : "outline"}
              className={filter === category.toLowerCase() ? "bg-anime-purple hover:bg-anime-indigo" : ""}
              onClick={() => setFilter(category.toLowerCase())}
            >
              {t("categories", category)}
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
                      {t("tests", "popular")}
                    </Badge>
                  )}
                </div>
                <CardTitle className="mt-2">{test.title[language]}</CardTitle>
                <CardDescription>{test.description[language]}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{test.duration} {t("tests", "duration")}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Brain className="mr-2 h-4 w-4" />
                    <span>{test.questions} {t("tests", "questions")}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate(`/tests/${test.id}`)}
                  className="w-full bg-anime-purple hover:bg-anime-indigo group-hover:translate-y-[-2px] transition-all"
                >
                  {t("tests", "startTest")}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
