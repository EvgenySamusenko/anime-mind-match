
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Sparkles, 
  Heart, 
  Clock, 
  Film, 
  TrendingUp,
  RefreshCw,
  User,
  Settings,
  AlertCircle
} from "lucide-react";
import { RecommendationCard } from "@/components/dashboard/RecommendationCard";
import { animeData } from "@/data/animeData";

interface User {
  email: string;
  name?: string;
  profile?: any;
  testResults?: any[];
  favorites?: string[];
  ratings?: Record<string, number>;
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
      
      // Generate random recommendations from our anime data
      // In a real app, this would be based on the user's profile and test results
      const shuffled = [...animeData].sort(() => 0.5 - Math.random());
      setRecommendations(shuffled.slice(0, 6));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse h-8 w-8 rounded-full bg-anime-purple"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-4">Not Logged In</h2>
        <p className="text-muted-foreground mb-6">
          Please log in to access your dashboard.
        </p>
        <Button 
          onClick={() => navigate("/login")}
          className="bg-anime-purple hover:bg-anime-indigo"
        >
          Sign In
        </Button>
      </div>
    );
  }

  const hasProfile = !!user.profile;
  const hasTakenTests = !!user.testResults && user.testResults.length > 0;
  const hasFavorites = !!user.favorites && user.favorites.length > 0;
  
  // Calculate profile completion percentage
  const profileSteps = [
    hasProfile,
    hasTakenTests,
    hasFavorites,
  ];
  
  const completionPercentage = Math.round(
    (profileSteps.filter(Boolean).length / profileSteps.length) * 100
  );

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-anime-purple" />
              Your Recommendations
            </CardTitle>
            <CardDescription>
              Personalized anime suggestions based on your psychological profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            {hasTakenTests ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendations.slice(0, 3).map(anime => (
                  <RecommendationCard 
                    key={anime.id}
                    id={anime.id}
                    title={anime.title}
                    image={anime.image}
                    matchPercentage={Math.floor(70 + Math.random() * 25)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Take a Personality Test</h3>
                <p className="text-muted-foreground mb-4">
                  Complete a psychological profile to get personalized anime recommendations.
                </p>
                <Button 
                  onClick={() => navigate("/tests")}
                  className="bg-anime-purple hover:bg-anime-indigo"
                >
                  Take a Test
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-anime-purple" />
              Profile Completion
            </CardTitle>
            <CardDescription>
              Complete your profile to get better recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
            
            <div className="space-y-4">
              {!hasProfile && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Create your profile</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Add your personal details and preferences
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => navigate("/profile/create")}
                      className="bg-anime-purple hover:bg-anime-indigo"
                    >
                      Complete Profile
                    </Button>
                  </div>
                </div>
              )}
              
              {!hasTakenTests && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Take personality tests</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Discover your psychological profile
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => navigate("/tests")}
                      className="bg-anime-purple hover:bg-anime-indigo"
                    >
                      Take Tests
                    </Button>
                  </div>
                </div>
              )}
              
              {!hasFavorites && (
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Add favorite anime</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Mark shows you like to improve recommendations
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => navigate("/anime")}
                      className="bg-anime-purple hover:bg-anime-indigo"
                    >
                      Browse Anime
                    </Button>
                  </div>
                </div>
              )}
              
              {completionPercentage === 100 && (
                <div className="flex items-start gap-3">
                  <Sparkles className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium">Profile completed!</h4>
                    <p className="text-xs text-muted-foreground">
                      You'll now get the best personalized anime recommendations
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Brain className="h-4 w-4 text-anime-purple" />
              Personality Tests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              {user.testResults?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Tests completed
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/tests")}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Take Another Test
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4 text-anime-purple" />
              Favorites
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              {user.favorites?.length || 0}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Anime in your collection
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/favorites")}
            >
              <Heart className="h-4 w-4 mr-2" />
              View Favorites
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Film className="h-4 w-4 text-anime-purple" />
              Rated Anime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              {Object.keys(user.ratings || {}).length}
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Anime you've rated
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/anime")}
            >
              <Film className="h-4 w-4 mr-2" />
              Rate More Anime
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-anime-purple" />
              Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">
              7
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Days since last activity
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/profile")}
            >
              <Clock className="h-4 w-4 mr-2" />
              View Activity
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Film className="h-5 w-5 text-anime-purple" />
              Recommended Based on Mood
            </CardTitle>
            <CardDescription>
              Anime that matches your current emotional state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {recommendations.slice(3, 6).map(anime => (
                <RecommendationCard 
                  key={anime.id}
                  id={anime.id}
                  title={anime.title}
                  image={anime.image}
                  matchPercentage={Math.floor(70 + Math.random() * 25)}
                  matchType="mood"
                />
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-anime-purple" />
              Quick Settings
            </CardTitle>
            <CardDescription>
              Manage your preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/profile/edit")}
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/settings")}
            >
              <Settings className="h-4 w-4 mr-2" />
              Recommendation Settings
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/settings/notifications")}
            >
              <Bell className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/settings/account")}
            >
              <Shield className="h-4 w-4 mr-2" />
              Account Security
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Import the missing icons
import { Bell, Shield } from "lucide-react";
