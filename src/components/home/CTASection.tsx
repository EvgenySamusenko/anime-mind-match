
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Brain, Sparkles } from "lucide-react";

export function CTASection() {
  const navigate = useNavigate();
  
  return (
    <section className="py-20">
      <div className="anime-container">
        <div className="max-w-4xl mx-auto rounded-xl overflow-hidden relative bg-anime-gradient">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560972550-aba3456b5564?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
          <div className="p-8 md:p-12 text-center text-white relative z-10">
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-anime-pink" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Discover Your Perfect Anime Match?
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
              Take the personality test now and unlock personalized anime recommendations tailored to your unique psychological profile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate("/register")}
                className="text-base py-6 px-8 bg-white text-anime-purple hover:bg-white/90"
              >
                Create Free Account
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/tests")}
                className="text-base py-6 px-8 bg-transparent text-white border-white/50 hover:bg-white/10"
              >
                <Brain className="mr-2 h-5 w-5" />
                Try a Test First
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
