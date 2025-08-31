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
    "AI Technology": "bg-blue-100 text-blue-800",
    "Collaboration": "bg-green-100 text-green-800",
    "Knowledge Base": "bg-purple-100 text-purple-800",
    "Analytics": "bg-orange-100 text-orange-800",
    "Planning": "bg-indigo-100 text-indigo-800",
    "Ayurveda": "bg-red-100 text-red-800",
    "Security": "bg-gray-100 text-gray-800",
    "Accessibility": "bg-cyan-100 text-cyan-800",
    "Localization": "bg-pink-100 text-pink-800",
    "Performance": "bg-yellow-100 text-yellow-800",
    "Heritage": "bg-emerald-100 text-emerald-800"
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Zap className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">Powerful Features</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how AyurDiet combines traditional Ayurvedic wisdom with cutting-edge technology to deliver personalized wellness solutions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${categoryColors[feature.category as keyof typeof categoryColors]} border-0`}
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
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to Experience AyurDiet?
              </h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of practitioners and patients who are already benefiting from personalized Ayurvedic nutrition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 py-2"
                >
                  Get Started Today
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-6 py-2"
                >
                  Learn More
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}