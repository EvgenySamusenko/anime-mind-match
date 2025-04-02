
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, RefreshCw, Sparkles, Clock } from "lucide-react";

interface TestResult {
  id: string;
  date: string;
  results: Record<string, number>;
}

interface User {
  testResults?: TestResult[];
}

// Category descriptions for result interpretation
const categoryDescriptions: Record<string, { description: string, animeTraits: string[] }> = {
  extraversion: {
    description: "How outgoing and sociable you are versus being reserved and solitary.",
    animeTraits: ["Character-driven stories", "Ensemble casts", "Slice of life"]
  },
  openness: {
    description: "Your curiosity and willingness to explore new ideas versus preferring familiarity.",
    animeTraits: ["Experimental narratives", "Philosophical themes", "Unconventional art styles"]
  },
  empathy: {
    description: "Your capacity to understand and share the feelings of others.",
    animeTraits: ["Emotional character arcs", "Relationship-focused", "Drama"]
  },
  complexity: {
    description: "Your preference for intricate, layered narratives versus straightforward ones.",
    animeTraits: ["Mystery elements", "Non-linear storytelling", "Psychological themes"]
  },
  darkness: {
    description: "Your comfort with exploring difficult, challenging, or dark themes.",
    animeTraits: ["Psychological horror", "Seinen/Josei demographic", "Tragedy"]
  },
  immersion: {
    description: "Your tendency to become deeply absorbed in fictional worlds.",
    animeTraits: ["World-building focused", "Fantasy/sci-fi genres", "Long-running series"]
  },
  realism: {
    description: "Your preference for realistic versus idealized or fantastical narratives.",
    animeTraits: ["Slice of life", "Coming-of-age stories", "Historical settings"]
  },
  analytical: {
    description: "Your tendency to analyze and find meaning in what you consume.",
    animeTraits: ["Symbolism-rich", "Thematically complex", "Open to interpretation"]
  },
  surprise: {
    description: "Your enjoyment of unexpected twists and subverted expectations.",
    animeTraits: ["Plot twists", "Deconstruction of genres", "Unconventional endings"]
  },
  "mood-matching": {
    description: "Your preference for content that aligns with your current emotional state.",
    animeTraits: ["Varied emotional tones", "Cathartic narratives", "Strong atmospheric elements"]
  }
};

export function TestResults() {
  const [user, setUser] = useState<User | null>(null);
  const [latestResult, setLatestResult] = useState<TestResult | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.testResults && parsedUser.testResults.length > 0) {
        // Get the latest result
        const latest = parsedUser.testResults[parsedUser.testResults.length - 1];
        setLatestResult(latest);
      }
    }
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString();
  };

  if (!user || !latestResult) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">No Test Results Found</h2>
        <p className="text-muted-foreground mb-6">
          You haven't completed any personality tests yet.
        </p>
        <Button 
          onClick={() => navigate("/tests")}
          className="bg-anime-purple hover:bg-anime-indigo"
        >
          Take a Test
        </Button>
      </div>
    );
  }

  // Get top traits (highest scoring categories)
  const sortedTraits = Object.entries(latestResult.results)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="container max-w-4xl mx-auto animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Personality Profile</h1>
        <p className="text-muted-foreground">
          Completed on {formatDate(latestResult.date)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sortedTraits.map(([trait, score], index) => (
          <Card key={trait} className={`border-t-4 ${index === 0 ? 'border-t-anime-purple' : 'border-t-anime-pink'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="capitalize">{trait.replace('-', ' ')}</CardTitle>
              <CardDescription>
                {index === 0 ? 'Primary trait' : index === 1 ? 'Secondary trait' : 'Tertiary trait'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Strength</span>
                  <span className="text-sm text-muted-foreground">{score}%</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
              <p className="text-sm text-muted-foreground">
                {categoryDescriptions[trait]?.description || "How this trait influences your anime preferences."}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Personality Breakdown
          </CardTitle>
          <CardDescription>
            How your personality traits influence your anime preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="traits">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="traits">Personality Traits</TabsTrigger>
              <TabsTrigger value="recommendations">What This Means</TabsTrigger>
            </TabsList>
            <TabsContent value="traits" className="space-y-4 pt-4">
              {Object.entries(latestResult.results)
                .sort((a, b) => b[1] - a[1])
                .map(([trait, score]) => (
                  <div key={trait}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{trait.replace('-', ' ')}</span>
                      <span className="text-sm text-muted-foreground">{score}%</span>
                    </div>
                    <Progress value={score} className="h-2 mb-1" />
                    <p className="text-xs text-muted-foreground mb-3">
                      {categoryDescriptions[trait]?.description || "How this trait influences your anime preferences."}
                    </p>
                  </div>
                ))}
            </TabsContent>
            <TabsContent value="recommendations" className="pt-4">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Your Anime Personality</h3>
                  <p className="text-muted-foreground">
                    Based on your test results, you tend to enjoy anime with these characteristics:
                  </p>
                  <ul className="mt-4 space-y-2">
                    {sortedTraits.flatMap(([trait]) => 
                      categoryDescriptions[trait]?.animeTraits.map((item, i) => (
                        <li key={`${trait}-${i}`} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-anime-purple"></div>
                          <span>{item}</span>
                        </li>
                      )) || []
                    )}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">What's Next?</h3>
                  <p className="text-muted-foreground">
                    Explore our personalized anime recommendations based on your psychological profile,
                    or take additional tests to refine your results.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <Button 
                      onClick={() => navigate("/recommendations")}
                      className="flex items-center gap-2 bg-anime-purple hover:bg-anime-indigo"
                    >
                      <Sparkles className="h-4 w-4" />
                      View Recommendations
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/tests")}
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Take Another Test
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t pt-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Results are valid for 30 days</span>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.print()}
            className="text-sm"
          >
            Print Results
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
