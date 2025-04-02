
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, ArrowRight } from "lucide-react";

export function HeroSection() {
  const navigate = useNavigate();
  
  return (
    <section className="hero-section">
      <div 
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-25"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" 
        }}
      />
      <div className="anime-container relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-lg">
          Discover Anime That Matches <span className="text-anime-purple">Your Mind</span>
        </h1>
        <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow">
          Find the perfect anime for your personality type, mood, and psychological preferences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate("/register")}
            className="text-base sm:text-lg py-6 px-8 bg-anime-purple hover:bg-anime-indigo"
          >
            Get Started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/tests")}
            className="text-base sm:text-lg py-6 px-8 bg-white/10 text-white border-white/20 hover:bg-white/20"
          >
            <Brain className="mr-2 h-5 w-5" />
            Take a Personality Test
          </Button>
        </div>
      </div>
    </section>
  );
}
