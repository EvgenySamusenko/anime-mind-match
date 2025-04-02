
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Heart, 
  Edit, 
  Clock, 
  Sparkles, 
  Film, 
  Brain,
  Settings,
  TrendingUp
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface UserProfile {
  username: string;
  age: number;
  gender: string;
  bio: string;
  avatar: string;
  favoriteGenres: string[];
  created: string;
}

interface User {
  email: string;
  name?: string;
  profile?: UserProfile;
  favorites?: string[];
  testResults?: any[];
}

export function ProfileView() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
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

  if (!user || !user.profile) {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Profile Not Found</h2>
        <p className="text-muted-foreground mb-6">You need to create a profile first.</p>
        <Button 
          onClick={() => navigate("/profile/create")}
          className="bg-anime-purple hover:bg-anime-indigo"
        >
          Create Profile
        </Button>
      </div>
    );
  }

  const { profile } = user;
  const joinDate = new Date(profile.created).toLocaleDateString();
  
  // Mock data for profile completeness
  const profileCompleteness = 80; 
  
  // Mock data for personality traits
  const personalityTraits = [
    { name: "Introvert", score: 75 },
    { name: "Empathetic", score: 60 },
    { name: "Analytical", score: 85 },
    { name: "Creative", score: 65 },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your personal information</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-anime-purple">
                <AvatarImage src={profile.avatar} alt={profile.username} />
                <AvatarFallback className="bg-anime-purple text-white text-xl">
                  {profile.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h3 className="text-xl font-bold">{profile.username}</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Joined {joinDate}</span>
              </div>
              
              <div className="w-full">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile completeness</span>
                  <span>{profileCompleteness}%</span>
                </div>
                <Progress value={profileCompleteness} className="h-2" />
              </div>
              
              <Button 
                variant="outline" 
                onClick={() => navigate("/profile/edit")}
                className="w-full flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <p className="text-muted-foreground">{profile.bio || "No bio provided yet."}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Age</h4>
                <p>{profile.age}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Gender</h4>
                <p className="capitalize">{profile.gender}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2">Favorite Genres</h4>
              <div className="flex flex-wrap gap-2">
                {profile.favoriteGenres && profile.favoriteGenres.length > 0 ? (
                  profile.favoriteGenres.map((genre, index) => (
                    <Badge key={index} variant="secondary" className="bg-muted">
                      {genre}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No favorite genres added yet.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="personality" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="personality" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            <span className="hidden sm:inline">Personality</span>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favorites</span>
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Activity</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="personality">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Personality Traits
              </CardTitle>
              <CardDescription>
                Based on your test results, these are your dominant personality traits
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.testResults && user.testResults.length > 0 ? (
                <div className="space-y-6">
                  {personalityTraits.map((trait, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{trait.name}</span>
                        <span className="text-sm text-muted-foreground">{trait.score}%</span>
                      </div>
                      <Progress value={trait.score} className="h-2" />
                    </div>
                  ))}
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/tests")}
                      className="flex items-center gap-2"
                    >
                      <Brain className="h-4 w-4" />
                      Take New Test
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={() => navigate("/tests/results")}
                      className="flex items-center gap-2"
                    >
                      View Full Results
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Brain className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Test Results Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Take a personality test to get personalized anime recommendations.
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
        </TabsContent>
        
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Favorite Anime
              </CardTitle>
              <CardDescription>
                Anime series and movies you've added to your favorites
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user.favorites && user.favorites.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Would map through favorites here */}
                  <div className="text-center py-6">
                    <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Your favorites will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <Heart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Favorites Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start adding anime to your favorites to see them here.
                  </p>
                  <Button 
                    onClick={() => navigate("/anime")}
                    className="bg-anime-purple hover:bg-anime-indigo"
                  >
                    Browse Anime
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Personalized Recommendations
              </CardTitle>
              <CardDescription>
                Anime recommended based on your personality and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Recommendations Coming Soon</h3>
                <p className="text-muted-foreground mb-4">
                  Take personality tests to get personalized recommendations.
                </p>
                <Button 
                  onClick={() => navigate("/tests")}
                  className="bg-anime-purple hover:bg-anime-indigo"
                >
                  Take a Personality Test
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your recent interactions and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Recent Activity</h3>
                <p className="text-muted-foreground mb-4">
                  Your activity history will appear here as you use the platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
