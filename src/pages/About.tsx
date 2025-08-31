import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Heart, Shield, Target, Globe } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Leaf className="h-10 w-10 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground">About AyurDiet</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging ancient Ayurvedic wisdom with modern technology to create personalized diet plans that promote optimal health and wellness.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower Ayurvedic practitioners and patients with intelligent tools that make personalized diet planning accessible, effective, and rooted in traditional wisdom while embracing modern nutritional science.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become the global leader in Ayurvedic health technology, helping millions achieve balanced wellness through personalized nutrition that honors individual constitution and promotes sustainable health practices.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team BitZ */}
        <div className="text-center mb-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Team BitZ</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are a passionate team of developers, health enthusiasts, and Ayurvedic practitioners dedicated to creating innovative solutions that bridge traditional healing with modern technology.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">Our Core Values</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Holistic Wellness</h3>
                <p className="text-sm text-muted-foreground">
                  We believe in treating the whole person, not just symptoms, through balanced nutrition and lifestyle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                  Your health data is sacred. We maintain the highest standards of privacy and security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Community Focus</h3>
                <p className="text-sm text-muted-foreground">
                  Building bridges between practitioners and patients to create a supportive wellness community.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">Traditional Wisdom</h3>
                <p className="text-sm text-muted-foreground">
                  Honoring ancient Ayurvedic principles while embracing modern technological innovations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Story */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-4">
                  AyurDiet was born from a simple observation: while Ayurveda offers profound wisdom about personalized nutrition, many practitioners and patients struggle with the complexity of creating and managing individualized diet plans.
                </p>
                <p className="mb-4">
                  Team BitZ recognized the opportunity to bridge this gap by creating an intelligent platform that honors traditional Ayurvedic principles while leveraging modern technology to make personalized nutrition accessible to everyone.
                </p>
                <p>
                  Today, AyurDiet serves practitioners and patients worldwide, helping them discover the power of personalized nutrition based on individual constitution, seasonal considerations, and holistic wellness principles.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}