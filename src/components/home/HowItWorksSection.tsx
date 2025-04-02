
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  List, 
  Filter, 
  Sparkles
} from "lucide-react";

const steps = [
  {
    icon: Brain,
    title: "Take a Personality Test",
    description: "Complete our psychological assessment to identify your personality traits, preferences, and emotional responses.",
    color: "bg-anime-purple"
  },
  {
    icon: List,
    title: "Create Your Profile",
    description: "Build your anime profile by adding your favorites, rating shows you've watched, and setting genre preferences.",
    color: "bg-anime-pink"
  },
  {
    icon: Filter,
    title: "Customize Your Preferences",
    description: "Fine-tune your recommendation settings based on mood, content preferences, and viewing habits.",
    color: "bg-anime-blue"
  },
  {
    icon: Sparkles,
    title: "Discover Perfect Matches",
    description: "Receive personalized anime recommendations that align with your psychological profile and preferences.",
    color: "bg-anime-indigo"
  }
];

export function HowItWorksSection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <div className="anime-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Your Journey to Perfect Anime</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to discover anime that resonates with your unique psychology.
          </p>
        </div>
        
        <div className="relative">
          {/* Progress Line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2 z-0"></div>
          
          <div className="space-y-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className="relative">
                  {/* Step Number (mobile) */}
                  <div className="md:hidden flex items-center gap-4 mb-4">
                    <div className={`h-10 w-10 rounded-full ${step.color} flex items-center justify-center text-white font-bold`}>
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                  </div>
                  
                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-7 items-center">
                    {/* Left content */}
                    <div className={`col-span-3 ${isEven ? 'text-right pr-10' : 'order-last text-left pl-10'}`}>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                    
                    {/* Center icon */}
                    <div className="flex justify-center col-span-1">
                      <div className={`h-16 w-16 rounded-full ${step.color} flex items-center justify-center text-white shadow-lg relative animate-pulse-glow`}>
                        <Icon className="h-8 w-8" />
                      </div>
                    </div>
                    
                    {/* Right content */}
                    <div className={`col-span-3 ${isEven ? 'order-last text-left pl-10' : 'text-right pr-10'}`}>
                      {isEven ? (
                        <div className="text-3xl font-bold text-anime-purple/20">
                          Step {index + 1}
                        </div>
                      ) : (
                        <p className="italic text-muted-foreground">
                          {index === 1 ? "Express your anime taste" : 
                           index === 3 ? "Find your perfect match" : "Customize your experience"}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Mobile content */}
                  <div className="md:hidden pl-14">
                    <p className="text-muted-foreground mb-4">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <Button 
            onClick={() => navigate("/register")}
            className="text-base py-6 px-8 bg-anime-purple hover:bg-anime-indigo"
          >
            Start Your Anime Journey
          </Button>
        </div>
      </div>
    </section>
  );
}
