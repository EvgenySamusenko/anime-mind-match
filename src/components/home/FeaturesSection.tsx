
import { 
  Brain, 
  Sparkles, 
  Heart, 
  Film, 
  Smile, 
  BarChart,
  Zap,
  Settings
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Psychological Profiling",
    description: "Take personality tests to discover your unique psychological traits and preferences."
  },
  {
    icon: Sparkles,
    title: "Tailored Recommendations",
    description: "Get anime suggestions that perfectly match your personality type and preferences."
  },
  {
    icon: Heart,
    title: "Favorite Collections",
    description: "Save your favorite anime to curated collections based on your mood and interests."
  },
  {
    icon: Film,
    title: "Comprehensive Database",
    description: "Explore our extensive collection of anime with detailed information and reviews."
  },
  {
    icon: Smile,
    title: "Mood-Based Matching",
    description: "Find anime to watch based on your current emotional state and desired feelings."
  },
  {
    icon: BarChart,
    title: "Detailed Analytics",
    description: "Visualize your personality traits and see how they influence your anime preferences."
  },
  {
    icon: Zap,
    title: "Quick Recommendations",
    description: "Get instant anime suggestions based on your current mood and available time."
  },
  {
    icon: Settings,
    title: "Customizable Experience",
    description: "Adjust recommendation algorithms to perfectly match your viewing preferences."
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="anime-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">How AnimeMind Match Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our unique approach combines psychological profiling with anime preferences to create a personalized viewing experience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={index} 
                className="flex flex-col items-center text-center p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-12 w-12 rounded-full flex items-center justify-center bg-anime-purple/10 text-anime-purple mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
