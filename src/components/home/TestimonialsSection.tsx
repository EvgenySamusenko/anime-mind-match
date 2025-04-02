
import { useState } from "react";
import { ArrowLeft, ArrowRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Yuki Tanaka",
    role: "Anime Enthusiast",
    avatar: "https://i.pravatar.cc/150?img=32",
    rating: 5,
    quote: "AnimeMind Match completely changed how I discover anime. The personality test was spot-on, and the recommendations I received introduced me to shows I would have never found otherwise but absolutely love."
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Psychology Student",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    quote: "As a psychology student, I was skeptical about the science behind this, but I'm amazed at how accurately the platform matched my personality to anime I ended up enjoying. The psychological insights are fascinating!"
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Casual Viewer",
    avatar: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    quote: "I was tired of scrolling through endless anime options without knowing what to watch. AnimeMind Match takes the guesswork out of finding shows I'll enjoy based on my actual preferences and personality."
  },
  {
    id: 4,
    name: "Hiroshi Nakamura",
    role: "Anime Blogger",
    avatar: "https://i.pravatar.cc/150?img=67",
    rating: 5,
    quote: "In my 10 years of reviewing anime, I've never seen such an innovative approach to recommendations. The mood-based suggestions are especially impressive when I can't decide what to watch."
  }
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };
  
  const currentTestimonial = testimonials[activeIndex];

  return (
    <section className="py-20 bg-anime-gradient text-white">
      <div className="anime-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Discover how AnimeMind Match has transformed the anime watching experience for our community.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 rounded-lg bg-white/5 backdrop-blur-sm animate-fade-in">
            <div className="absolute -top-5 -left-5 h-12 w-12 rounded-full bg-anime-purple flex items-center justify-center">
              <Quote className="h-6 w-6 text-white" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                <Avatar className="h-20 w-20 mb-4 border-2 border-anime-purple">
                  <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
                  <AvatarFallback>{currentTestimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{currentTestimonial.name}</h3>
                <p className="text-sm text-white/70 mb-2">{currentTestimonial.role}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="w-full md:w-2/3">
                <blockquote className="text-lg italic">
                  "{currentTestimonial.quote}"
                </blockquote>
              </div>
            </div>
            
            <div className="flex justify-center md:justify-end gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="bg-white/10 text-white border-white/20 hover:bg-white/20"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button 
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === activeIndex ? "w-8 bg-anime-purple" : "w-2 bg-white/30"
                  }`}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
