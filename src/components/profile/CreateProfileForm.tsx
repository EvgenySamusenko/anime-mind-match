
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle } from "lucide-react";

export function CreateProfileForm() {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Get the existing user data
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    
    // Add profile information
    const updatedUser = {
      ...userData,
      profile: {
        username,
        age: parseInt(age),
        gender,
        bio,
        avatar: avatar || "https://i.pravatar.cc/150?img=" + Math.floor(Math.random() * 70),
        favoriteGenres: favoriteGenres.split(",").map(genre => genre.trim()),
        created: new Date().toISOString()
      }
    };
    
    // Save to local storage (would be a database in production)
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile created!",
        description: "Your profile has been set up successfully.",
      });
      
      setIsLoading(false);
      navigate("/tests");
    }, 1500);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto animate-fade-in shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Create Your Profile</CardTitle>
        <CardDescription className="text-center">
          Tell us about yourself to get personalized anime recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={avatar || "https://i.pravatar.cc/150?img=1"} alt="Avatar" />
                <AvatarFallback className="bg-anime-purple text-white text-xl">
                  {username ? username.charAt(0).toUpperCase() : "?"}
                </AvatarFallback>
              </Avatar>
              <label 
                htmlFor="avatar-upload" 
                className="absolute bottom-0 right-0 bg-anime-purple text-white rounded-full p-1 cursor-pointer"
              >
                <PlusCircle className="h-5 w-5" />
              </label>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                onChange={() => {
                  // In a real app, this would upload the image
                  // For now, we'll just set a random avatar
                  const randomNum = Math.floor(Math.random() * 70);
                  setAvatar(`https://i.pravatar.cc/150?img=${randomNum}`);
                }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="13"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender} required>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select your gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="non-binary">Non-binary</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              placeholder="Tell us a bit about yourself..."
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="favorite-genres">Favorite Anime Genres</Label>
            <Textarea
              id="favorite-genres"
              placeholder="Action, Adventure, Romance, Comedy, etc. (comma-separated)"
              value={favoriteGenres}
              onChange={(e) => setFavoriteGenres(e.target.value)}
              rows={2}
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-anime-purple hover:bg-anime-indigo transition-colors" 
            disabled={isLoading}
          >
            {isLoading ? "Creating profile..." : "Complete Profile Setup"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          You can edit your profile anytime from your account settings.
        </p>
      </CardFooter>
    </Card>
  );
}
