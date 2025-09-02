import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Leaf, Users, Stethoscope, Heart, Shield, Brain, Zap, Target, ArrowRight, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PricingSection } from "@/components/pricing/PricingSection";

// Counter Animation Component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [end, isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span id={`counter-${end}`} className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Home() {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"practitioner" | "patient">("practitioner");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        // Force a brief delay to ensure auth state is fully updated
        await new Promise(resolve => setTimeout(resolve, 100));

        // Get fresh user data after the delay
        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;

        // Always prioritize user_metadata role as it's the source of truth
        const userRole = user?.user_metadata?.role;

        toast({
          title: "Welcome back!",
          description: "Successfully signed in to your account.",
        });

        // Redirect based on role from user metadata
        if (userRole === 'patient') {
          navigate('/patient-dashboard');
        } else {
          navigate('/dashboard');
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role: role,
            }
          }
        });

        if (error) throw error;

        // Since email confirmation is disabled, user is automatically signed in
        if (data.user) {
          // Get the role from the user metadata that was just set
          const userRole = data.user.user_metadata?.role || role;

          toast({
            title: "Account created!",
            description: "Welcome to AyurDiet! Redirecting you now.",
          });

          // Redirect based on role from user metadata
          if (userRole === 'patient') {
            navigate('/patient-dashboard');
          } else {
            navigate('/dashboard');
          }
        }
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onLoginClick={() => setShowAuthDialog(true)} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/hero-ayurveda.jpg)',
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/85" />
        {/* Additional green tint overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-forest-500/5" />
        <div className="container mx-auto px-6 py-16 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Hero Content */}
            <div className="text-center space-y-12">
              <div className="space-y-8">
                {/* Logo/Icon */}
                <div className="flex justify-center">
                  <div className="relative animate-fade-in">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl flex items-center justify-center backdrop-blur-md border border-primary/20 shadow-lg">
                      <Leaf className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-accent to-accent/90 rounded-full flex items-center justify-center shadow-lg">
                      <Zap className="h-4 w-4 text-accent-foreground" />
                    </div>
                  </div>
                </div>

                {/* Heading */}
                <div className="space-y-6 animate-fade-in">
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[0.9] tracking-tight">
                      AyurDiet
                    </h1>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
                    <p className="text-lg md:text-xl lg:text-2xl font-light text-primary/80 leading-relaxed">
                      Ancient Wisdom, Modern Science
                    </p>
                  </div>

                  <div className="max-w-xl mx-auto">
                    <h2 className="text-base md:text-lg text-muted-foreground font-normal leading-relaxed">
                      Personalized Ayurvedic diet plans powered by artificial intelligence
                    </h2>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-in">
                  <Button
                    size="lg"
                    className="group relative overflow-hidden bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-primary-foreground border-0 px-8 py-3 h-auto text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => setShowAuthDialog(true)}
                  >
                    <span className="relative z-10 flex items-center">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-muted-foreground hover:text-foreground px-6 py-3 h-auto text-sm font-normal rounded-full transition-all duration-300 hover:bg-muted/50"
                    onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 animate-fade-in">
              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/70 backdrop-blur-md hover:bg-card/90 hover:-translate-y-1 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Stethoscope className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-lg">For Practitioners</h3>
                  <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <div>• Manage patients efficiently</div>
                    <div>• Create personalized diet charts</div>
                    <div>• AI-powered recommendations</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/70 backdrop-blur-md hover:bg-card/90 hover:-translate-y-1 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-accent-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-lg">For Patients</h3>
                  <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <div>• Access personalized diet plans</div>
                    <div>• Track wellness progress</div>
                    <div>• Connect with practitioners</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/70 backdrop-blur-md hover:bg-card/90 hover:-translate-y-1 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-ayur-kapha/10 to-ayur-kapha/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Brain className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-lg">AI-Powered</h3>
                  <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <div>• Intelligent recommendations</div>
                    <div>• Advanced dosha analysis</div>
                    <div>• Continuously learning</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border-0 bg-card/70 backdrop-blur-md hover:bg-card/90 hover:-translate-y-1 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-ayur-pitta/10 to-ayur-pitta/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Shield className="h-8 w-8 text-foreground" />
                  </div>
                  <h3 className="font-bold text-foreground mb-3 text-lg">Secure & Private</h3>
                  <div className="text-sm text-muted-foreground space-y-2 leading-relaxed">
                    <div>• Bank-level encryption</div>
                    <div>• HIPAA compliant</div>
                    <div>• Your data stays yours</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection onGetStarted={() => setShowAuthDialog(true)} />

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-br from-muted/20 to-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Trusted by Healthcare Professionals
              </h2>
              <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-3 group">
                <AnimatedCounter end={500} suffix="+" />
                <div className="text-lg font-semibold text-foreground">Practitioners</div>
                <div className="text-muted-foreground">Using AyurDiet daily</div>
              </div>
              <div className="space-y-3 group">
                <AnimatedCounter end={10000} suffix="+" />
                <div className="text-lg font-semibold text-foreground">Patients</div>
                <div className="text-muted-foreground">Benefiting from personalized plans</div>
              </div>
              <div className="space-y-3 group">
                <AnimatedCounter end={95} suffix="%" />
                <div className="text-lg font-semibold text-foreground">Satisfaction</div>
                <div className="text-muted-foreground">User satisfaction rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              {isLogin ? "Welcome Back" : "Get Started"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required={!isLogin}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">I am a</Label>
                  <Select value={role} onValueChange={(value: "practitioner" | "patient") => setRole(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="practitioner">Ayurvedic Practitioner</SelectItem>
                      <SelectItem value="patient">Patient</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLogin ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : "Already have an account? Sign in"}
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}