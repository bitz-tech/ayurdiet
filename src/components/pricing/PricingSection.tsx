import { Check, Star, Crown, Users, Stethoscope } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PricingSectionProps {
  onGetStarted: () => void;
}

export function PricingSection({ onGetStarted }: PricingSectionProps) {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      description: "Perfect for getting started with Ayurvedic wellness",
      icon: Users,
      badge: null,
      features: [
        "Basic dosha assessment",
        "Access to food database (500+ items)",
        "Simple diet recommendations",
        "Community support",
        "Basic progress tracking",
        "Educational content library"
      ],
      cta: "Get Started Free",
      popular: false,
      available: true
    },
    {
      name: "Professional",
      price: "₹99",
      period: "month",
      description: "Advanced tools for serious practitioners and patients",
      icon: Crown,
      badge: "Coming Soon",
      features: [
        "Everything in Free plan",
        "AI-powered personalized meal plans",
        "Advanced dosha analysis",
        "Patient management (for practitioners)",
        "Custom recipe creation",
        "Detailed progress analytics",
        "Priority support",
        "Integration with health devices",
        "Consultation scheduling",
        "Professional certification tracking"
      ],
      cta: "Join Waitlist",
      popular: true,
      available: false
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "tailored",
      description: "Comprehensive solution for clinics and healthcare institutions",
      icon: Stethoscope,
      badge: "Coming Soon",
      features: [
        "Everything in Professional plan",
        "Multi-practitioner management",
        "Advanced patient analytics",
        "Custom branding",
        "API access",
        "Dedicated account manager",
        "Custom integrations",
        "Compliance reporting",
        "Training and onboarding",
        "24/7 premium support"
      ],
      cta: "Contact Sales",
      popular: false,
      available: false
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-background via-muted/10 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                <Star className="h-6 w-6 text-primary" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Choose Your Wellness Journey
            </h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Start your Ayurvedic journey with our free plan, or unlock advanced features for comprehensive wellness management
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={plan.name}
                  className={`relative group transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                    plan.popular
                      ? 'border-primary/50 shadow-lg shadow-primary/10 scale-105'
                      : 'border-border hover:border-primary/30'
                  } ${!plan.available ? 'opacity-90' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground border-0 px-4 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {plan.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-accent/10 text-accent-foreground border border-accent/20">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <div className="flex justify-center mb-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                        plan.popular
                          ? 'bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30'
                          : 'bg-gradient-to-br from-muted/50 to-card/50 border border-muted'
                      }`}>
                        <IconComponent className={`h-8 w-8 ${plan.popular ? 'text-primary' : 'text-muted-foreground'}`} />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>

                    <div className="mb-4">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        {plan.period !== "tailored" && (
                          <span className="text-muted-foreground ml-1">/{plan.period}</span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent text-primary-foreground'
                          : plan.available
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            : 'bg-muted hover:bg-muted/80 text-muted-foreground'
                      } transition-all duration-300 hover:scale-105 shadow-lg`}
                      disabled={!plan.available}
                      size="lg"
                      onClick={plan.name === "Free" ? onGetStarted : undefined}
                    >
                      {plan.cta}
                    </Button>

                    {!plan.available && (
                      <p className="text-xs text-muted-foreground text-center mt-3">
                        Be the first to know when this becomes available
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">For Patients</h4>
                  <p className="text-sm text-muted-foreground">
                    Start your wellness journey with personalized Ayurvedic guidance, completely free
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Stethoscope className="h-8 w-8 text-accent mx-auto mb-4" />
                  <h4 className="font-semibold text-foreground mb-2">For Practitioners</h4>
                  <p className="text-sm text-muted-foreground">
                    Enhance your practice with AI-powered tools and comprehensive patient management
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}