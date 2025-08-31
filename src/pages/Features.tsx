import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Users,
  Heart,
  Shield,
  Brain,
  Calendar,
  ChefHat,
  BarChart3,
  Smartphone,
  Globe,
  Lock,
  Zap
} from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diet Plans",
      description: "Generate personalized Ayurvedic diet recommendations using advanced AI algorithms that consider individual doshas, constitution, and health goals.",
      category: "AI Technology"
    },
    {
      icon: Users,
      title: "Practitioner-Patient Portal",
      description: "Seamless connection between Ayurvedic practitioners and patients with dedicated dashboards and communication tools.",
      category: "Collaboration"
    },
    {
      icon: ChefHat,
      title: "Comprehensive Food Database",
      description: "Extensive database of foods with detailed Ayurvedic properties including rasas, virya, vipaka, and dosha effects.",
      category: "Knowledge Base"
    },
    {
      icon: BarChart3,
      title: "Progress Tracking",
      description: "Monitor patient progress, adherence to diet plans, and health outcomes with detailed analytics and reporting.",
      category: "Analytics"
    },
    {
      icon: Calendar,
      title: "Meal Planning",
      description: "Create detailed meal schedules with seasonal considerations and personalized nutritional targets.",
      category: "Planning"
    },
    {
      icon: Heart,
      title: "Dosha Balancing",
      description: "Specialized algorithms to balance Vata, Pitta, and Kapha doshas through targeted dietary recommendations.",
      category: "Ayurveda"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "Enterprise-grade security with encrypted data storage and HIPAA-compliant patient information handling.",
      category: "Security"
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Access your diet plans and patient information anywhere with our fully responsive web application.",
      category: "Accessibility"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Support for multiple languages with traditional Sanskrit terminology and modern translations.",
      category: "Localization"
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant synchronization of diet plan changes and patient updates across all devices.",
      category: "Performance"
    },
    {
      icon: Lock,
      title: "Role-Based Access",
      description: "Secure role-based access control ensuring patients and practitioners see only relevant information.",
      category: "Security"
    },
    {
      icon: Leaf,
      title: "Traditional Wisdom",
      description: "Rooted in authentic Ayurvedic principles while embracing modern nutritional science and technology.",
      category: "Heritage"
    }
  ];

  const categoryColors = {
    "AI Technology": "bg-primary/10 text-primary border-primary/20",
    "Collaboration": "bg-accent/10 text-accent-foreground border-accent/20",
    "Knowledge Base": "bg-forest-100 text-forest-800 border-forest-200",
    "Analytics": "bg-ayur-kapha/10 text-ayur-kapha border-ayur-kapha/20",
    "Planning": "bg-forest-200 text-forest-900 border-forest-300",
    "Ayurveda": "bg-ayur-pitta/10 text-ayur-pitta border-ayur-pitta/20",
    "Security": "bg-muted text-muted-foreground border-border",
    "Accessibility": "bg-forest-50 text-forest-700 border-forest-100",
    "Localization": "bg-ayur-vata/10 text-ayur-vata border-ayur-vata/20",
    "Performance": "bg-accent/20 text-accent-foreground border-accent/30",
    "Heritage": "bg-primary/20 text-primary border-primary/30"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12 relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center shadow-lg">
              <Zap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Powerful Features</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AyurDiet combines traditional Ayurvedic wisdom with cutting-edge technology to deliver personalized wellness solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge
                      variant="outline"
                      className={`${categoryColors[feature.category as keyof typeof categoryColors]} font-medium`}
                    >
                      {feature.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm shadow-lg">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Experience AyurDiet?
              </h2>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-4"></div>
              <p className="text-muted-foreground mb-6">
                Join thousands of practitioners and patients who are already benefiting from personalized Ayurvedic nutrition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:from-primary-glow hover:to-primary shadow-lg hover:shadow-xl hover:scale-105 h-12 px-8 py-3"
                >
                  Get Started Today
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-primary/20 bg-background/50 hover:bg-accent/20 hover:text-accent-foreground backdrop-blur-sm h-12 px-8 py-3"
                >
                  Learn More
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}