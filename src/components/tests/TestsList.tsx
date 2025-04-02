
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

const tests = [
  {
    id: "personality-type",
    title: "Personality Type Indicator",
    description: "Discover your psychological type based on 16 distinct personalities.",
    duration: "10-15 minutes",
    questions: 30,
    category: "Personality",
    popular: true,
    icon: Brain
  },
  {
    id: "emotional-preference",
    title: "Emotional Anime Preference",
    description: "Find how your emotional responses connect to different anime genres.",
    duration: "5-8 minutes",
    questions: 15,
    category: "Preferences",
    popular: true,
    icon: Heart
  },
  {
    id: "character-affinity",
    title: "Character Affinity Test",
    description: "Discover which types of anime characters you relate to the most.",
    duration: "8-10 minutes",
    questions: 20,
    category: "Affinity",
    popular: false,
    icon: Star
  },
  {
    id: "mood-matcher",
    title: "Current Mood Matcher",
    description: "Get anime recommendations based on your current emotional state.",
    duration: "3-5 minutes",
    questions: 10,
    category: "Mood",
    popular: true,
    icon: Sparkles
  },
  {
    id: "cognitive-style",
    title: "Cognitive Style Analysis",
    description: "Understand how your thinking patterns relate to anime storytelling.",
    duration: "12-15 minutes",
    questions: 25,
    category: "Cognitive",
    popular: false,
    icon: BarChart
  }
];

export function TestsList() {
  const [filter, setFilter] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredTests = filter 
    ? tests.filter(test => test.category.toLowerCase() === filter.toLowerCase())
    : tests;

  const categories = Array.from(new Set(tests.map(test => test.category)));

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="space-y-4 mb-8">
        <h1 className="text-3xl font-bold text-center">Psychological Tests</h1>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto">
          Discover your personality traits and get personalized anime recommendations based on your psychological profile.
        </p>
        
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <Button
            variant={filter === null ? "default" : "outline"}
            className={filter === null ? "bg-anime-purple hover:bg-anime-indigo" : ""}
            onClick={() => setFilter(null)}
          >
            All Tests
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={filter === category.toLowerCase() ? "default" : "outline"}
              className={filter === category.toLowerCase() ? "bg-anime-purple hover:bg-anime-indigo" : ""}
              onClick={() => setFilter(category.toLowerCase())}
            >
              {category}
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
                      Popular
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
                    <span>{test.duration}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Brain className="mr-2 h-4 w-4" />
                    <span>{test.questions} questions</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => navigate(`/tests/${test.id}`)}
                  className="w-full bg-anime-purple hover:bg-anime-indigo group-hover:translate-y-[-2px] transition-all"
                >
                  Start Test
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
