
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Brain, ArrowLeft, ArrowRight, Check } from "lucide-react";

// Sample questions for the personality test
const testQuestions = [
  {
    id: 1,
    question: "You find it easy to approach others and start conversations.",
    category: "extraversion"
  },
  {
    id: 2,
    question: "You often spend time thinking about philosophical questions that may never be answered.",
    category: "openness"
  },
  {
    id: 3,
    question: "You feel emotionally connected to characters in stories.",
    category: "empathy"
  },
  {
    id: 4,
    question: "You prefer stories with complex, layered plots rather than straightforward narratives.",
    category: "complexity"
  },
  {
    id: 5,
    question: "You enjoy media that explores dark or difficult themes.",
    category: "darkness"
  },
  {
    id: 6,
    question: "You often find yourself getting so absorbed in a show that you lose track of time.",
    category: "immersion"
  },
  {
    id: 7,
    question: "You prefer shows with realistic characters over those with larger-than-life heroes.",
    category: "realism"
  },
  {
    id: 8,
    question: "You tend to analyze the meaning and symbolism in shows you watch.",
    category: "analytical"
  },
  {
    id: 9,
    question: "You enjoy being surprised by unexpected plot twists.",
    category: "surprise"
  },
  {
    id: 10,
    question: "You prefer watching shows that match your current mood.",
    category: "mood-matching"
  }
];

// Mock options for answers
const options = [
  { value: "1", label: "Strongly Disagree" },
  { value: "2", label: "Disagree" },
  { value: "3", label: "Neutral" },
  { value: "4", label: "Agree" },
  { value: "5", label: "Strongly Agree" }
];

export function PersonalityTest() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const progress = ((currentQuestion + 1) / testQuestions.length) * 100;
  
  const handleAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [testQuestions[currentQuestion].id]: value
    });
  };
  
  const handleNext = () => {
    if (currentQuestion < testQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  const handleSubmit = () => {
    if (Object.keys(answers).length < testQuestions.length) {
      toast({
        title: "Please answer all questions",
        description: `You've answered ${Object.keys(answers).length} of ${testQuestions.length} questions.`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // In a real app, we'd send this to an API
    setTimeout(() => {
      // Mock results processing - would be done on server
      const categories: Record<string, number> = {};
      
      // Calculate scores for each category
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = testQuestions.find(q => q.id === parseInt(questionId));
        if (question) {
          if (!categories[question.category]) {
            categories[question.category] = 0;
          }
          categories[question.category] += parseInt(answer);
        }
      });
      
      // Normalize scores to percentages
      const results: Record<string, number> = {};
      Object.entries(categories).forEach(([category, score]) => {
        // Count questions in this category
        const questionsInCategory = testQuestions.filter(q => q.category === category).length;
        // Max possible score is 5 (strongly agree) * number of questions
        const maxScore = questionsInCategory * 5;
        // Calculate percentage
        results[category] = Math.round((score / maxScore) * 100);
      });
      
      // Save results to localStorage (would be saved to database in production)
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const testResults = user.testResults || [];
      
      testResults.push({
        id: "personality-type",
        date: new Date().toISOString(),
        results: results
      });
      
      localStorage.setItem("user", JSON.stringify({
        ...user,
        testResults
      }));
      
      setIsSubmitting(false);
      
      toast({
        title: "Test completed!",
        description: "Your results are ready to view.",
      });
      
      navigate("/tests/results");
    }, 2000);
  };

  return (
    <div className="container max-w-3xl mx-auto animate-fade-in">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-anime-purple" />
            <h2 className="text-xl font-bold">Personality Type Indicator</h2>
          </div>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {testQuestions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <Card className="mb-6 border-t-4 border-t-anime-purple animate-scale-in">
        <CardHeader>
          <CardTitle className="text-xl">
            {testQuestions[currentQuestion].question}
          </CardTitle>
          <CardDescription>
            Select the option that best describes you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={answers[testQuestions[currentQuestion].id] || ""}
            onValueChange={handleAnswer}
            className="space-y-3"
          >
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                <RadioGroupItem value={option.value} id={`option-${option.value}`} />
                <Label htmlFor={`option-${option.value}`} className="flex-grow cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>
          
          {currentQuestion < testQuestions.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!answers[testQuestions[currentQuestion].id]}
              className="flex items-center gap-2 bg-anime-purple hover:bg-anime-indigo"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !answers[testQuestions[currentQuestion].id]}
              className="flex items-center gap-2 bg-anime-purple hover:bg-anime-indigo"
            >
              {isSubmitting ? "Submitting..." : "Complete Test"}
              <Check className="h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>
          Your answers will be used to generate personalized anime recommendations.
          You can retake this test at any time.
        </p>
      </div>
    </div>
  );
}
