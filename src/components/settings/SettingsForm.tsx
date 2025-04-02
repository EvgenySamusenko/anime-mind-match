
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Sparkles, 
  Palette, 
  Bell, 
  Shield, 
  Eye, 
  Moon, 
  Sun,
  Film,
  Heart,
  AlertTriangle
} from "lucide-react";

export function SettingsForm() {
  const [theme, setTheme] = useState("light");
  const [recommendationSettings, setRecommendationSettings] = useState({
    personalityImportance: 70,
    genreImportance: 50,
    popularityImportance: 30,
    includeExplicitContent: false,
    preferredAnimeLength: "any",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    newRecommendations: true,
    systemUpdates: true,
    personalityInsights: true,
    emailNotifications: true,
  });
  const [interfaceSettings, setInterfaceSettings] = useState({
    animationsEnabled: true,
    highContrastMode: false,
    fontSize: "medium",
    colorTheme: "purple",
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, this would be an API call to get user settings
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.settings) {
      setRecommendationSettings(user.settings.recommendations || recommendationSettings);
      setNotificationSettings(user.settings.notifications || notificationSettings);
      setInterfaceSettings(user.settings.interface || interfaceSettings);
      setTheme(user.settings.theme || theme);
    }
  }, []);

  const handleSaveSettings = () => {
    setLoading(true);
    
    // In a real app, this would be an API call to save settings
    setTimeout(() => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      
      localStorage.setItem("user", JSON.stringify({
        ...user,
        settings: {
          recommendations: recommendationSettings,
          notifications: notificationSettings,
          interface: interfaceSettings,
          theme,
        }
      }));
      
      setLoading(false);
      
      toast({
        title: "Settings saved!",
        description: "Your preferences have been updated successfully.",
      });
    }, 1000);
  };

  const handleDeleteAccount = () => {
    // This would show a confirmation dialog in a real app
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    
    if (confirmed) {
      setLoading(true);
      
      // In a real app, this would be an API call to delete the account
      setTimeout(() => {
        localStorage.removeItem("user");
        
        toast({
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
        });
        
        setLoading(false);
        navigate("/");
      }, 1500);
    }
  };

  return (
    <div className="container max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <Tabs defaultValue="recommendations" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Recommendations</span>
          </TabsTrigger>
          <TabsTrigger value="interface" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Interface</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="recommendations">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-anime-purple" />
              Recommendation Preferences
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Personality Importance</Label>
                  <span className="text-sm text-muted-foreground">{recommendationSettings.personalityImportance}%</span>
                </div>
                <Slider
                  value={[recommendationSettings.personalityImportance]}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={(value) => setRecommendationSettings({
                    ...recommendationSettings,
                    personalityImportance: value[0]
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  How much weight to give your personality profile when recommending anime.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Genre Importance</Label>
                  <span className="text-sm text-muted-foreground">{recommendationSettings.genreImportance}%</span>
                </div>
                <Slider
                  value={[recommendationSettings.genreImportance]}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={(value) => setRecommendationSettings({
                    ...recommendationSettings,
                    genreImportance: value[0]
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  How much to prioritize your favorite genres in recommendations.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Popularity Importance</Label>
                  <span className="text-sm text-muted-foreground">{recommendationSettings.popularityImportance}%</span>
                </div>
                <Slider
                  value={[recommendationSettings.popularityImportance]}
                  min={0}
                  max={100}
                  step={10}
                  onValueChange={(value) => setRecommendationSettings({
                    ...recommendationSettings,
                    popularityImportance: value[0]
                  })}
                />
                <p className="text-xs text-muted-foreground">
                  How much to consider an anime's popularity in recommendations.
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="explicit-content">Include Explicit Content</Label>
                  <p className="text-xs text-muted-foreground">
                    Whether to include anime with mature themes in recommendations.
                  </p>
                </div>
                <Switch
                  id="explicit-content"
                  checked={recommendationSettings.includeExplicitContent}
                  onCheckedChange={(checked) => setRecommendationSettings({
                    ...recommendationSettings,
                    includeExplicitContent: checked
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="anime-length">Preferred Anime Length</Label>
                <Select
                  value={recommendationSettings.preferredAnimeLength}
                  onValueChange={(value) => setRecommendationSettings({
                    ...recommendationSettings,
                    preferredAnimeLength: value
                  })}
                >
                  <SelectTrigger id="anime-length">
                    <SelectValue placeholder="Select preferred length" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Length</SelectItem>
                    <SelectItem value="short">Short (1-12 episodes)</SelectItem>
                    <SelectItem value="medium">Medium (13-24 episodes)</SelectItem>
                    <SelectItem value="long">Long (25+ episodes)</SelectItem>
                    <SelectItem value="movie">Movies Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  The length of anime series you prefer to watch.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="interface">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5 text-anime-purple" />
              Interface Settings
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="theme">Dark Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable dark mode for the interface.
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="h-4 w-4 text-muted-foreground" />
                  <Switch
                    id="theme"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                  <Moon className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Interface Animations</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable animations in the user interface.
                  </p>
                </div>
                <Switch
                  id="animations"
                  checked={interfaceSettings.animationsEnabled}
                  onCheckedChange={(checked) => setInterfaceSettings({
                    ...interfaceSettings,
                    animationsEnabled: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Increase contrast for better accessibility.
                  </p>
                </div>
                <Switch
                  id="high-contrast"
                  checked={interfaceSettings.highContrastMode}
                  onCheckedChange={(checked) => setInterfaceSettings({
                    ...interfaceSettings,
                    highContrastMode: checked
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="font-size">Font Size</Label>
                <Select
                  value={interfaceSettings.fontSize}
                  onValueChange={(value) => setInterfaceSettings({
                    ...interfaceSettings,
                    fontSize: value
                  })}
                >
                  <SelectTrigger id="font-size">
                    <SelectValue placeholder="Select font size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                    <SelectItem value="x-large">Extra Large</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Adjust the size of text throughout the application.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="color-theme">Color Theme</Label>
                <Select
                  value={interfaceSettings.colorTheme}
                  onValueChange={(value) => setInterfaceSettings({
                    ...interfaceSettings,
                    colorTheme: value
                  })}
                >
                  <SelectTrigger id="color-theme">
                    <SelectValue placeholder="Select color theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple (Default)</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="pink">Pink</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Change the primary color scheme of the interface.
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-anime-purple" />
              Notification Settings
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="new-recommendations">New Recommendations</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified when we have new anime recommendations for you.
                  </p>
                </div>
                <Switch
                  id="new-recommendations"
                  checked={notificationSettings.newRecommendations}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    newRecommendations: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-updates">System Updates</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications about new features and improvements.
                  </p>
                </div>
                <Switch
                  id="system-updates"
                  checked={notificationSettings.systemUpdates}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    systemUpdates: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="personality-insights">Personality Insights</Label>
                  <p className="text-xs text-muted-foreground">
                    Get notified about new insights based on your psychological profile.
                  </p>
                </div>
                <Switch
                  id="personality-insights"
                  checked={notificationSettings.personalityInsights}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    personalityInsights: checked
                  })}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive notifications via email as well as on the platform.
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({
                    ...notificationSettings,
                    emailNotifications: checked
                  })}
                />
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="account">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-anime-purple" />
              Account Settings
            </h2>
            <div className="space-y-6">
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
                onClick={() => navigate("/change-password")}
              >
                <Shield className="h-4 w-4" />
                Change Password
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Privacy Settings
              </Button>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Data Management</h3>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                  >
                    <Film className="h-4 w-4" />
                    Reset Anime Preferences
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    Clear Favorites
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Reset Personality Tests
                  </Button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2 text-destructive flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Danger Zone
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  These actions are irreversible. Please proceed with caution.
                </p>
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 flex justify-end gap-4">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSaveSettings}
          disabled={loading}
          className="bg-anime-purple hover:bg-anime-indigo"
        >
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
