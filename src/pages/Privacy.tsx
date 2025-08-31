import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Last Updated: August 31, 2025
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle>Introduction</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Team BitZ ("we," "our," or "us") operates the AyurDiet platform ("Service"). This Privacy Policy explains how we collect, use, and protect your personal information when you use our Ayurvedic diet management system.
                </p>
                <p>
                  We are committed to protecting your privacy and maintaining the confidentiality of your health information in accordance with applicable privacy laws and regulations.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Name, email address, and contact information</li>
                    <li>Account credentials and authentication data</li>
                    <li>Professional credentials for practitioners</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Health Information</h3>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Dosha constitution and health assessments</li>
                    <li>Dietary preferences, restrictions, and allergies</li>
                    <li>Medical history relevant to dietary planning</li>
                    <li>Diet plan progress and adherence data</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Usage Information</h3>
                  <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Platform usage patterns and preferences</li>
                    <li>Device information and technical data</li>
                    <li>Communication records within the platform</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* How We Use Information */}
            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li>Provide personalized Ayurvedic diet recommendations</li>
                  <li>Enable communication between practitioners and patients</li>
                  <li>Generate AI-powered diet plans based on individual constitution</li>
                  <li>Track progress and provide insights on dietary adherence</li>
                  <li>Improve our services and develop new features</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Protection */}
            <Card>
              <CardHeader>
                <CardTitle>Data Protection & Security</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We implement industry-standard security measures to protect your personal and health information:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>End-to-end encryption for sensitive health data</li>
                  <li>Secure authentication and access controls</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Limited access to authorized personnel only</li>
                  <li>Secure cloud infrastructure with backup systems</li>
                </ul>
              </CardContent>
            </Card>

            {/* Information Sharing */}
            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>With your authorized Ayurvedic practitioner for treatment purposes</li>
                  <li>With your explicit consent for specific purposes</li>
                  <li>When required by law or legal process</li>
                  <li>To protect the safety and security of our users</li>
                  <li>With trusted service providers who assist in platform operations (under strict confidentiality agreements)</li>
                </ul>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                  <li><strong>Access:</strong> Request copies of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                  <li><strong>Portability:</strong> Export your data in a structured format</li>
                  <li><strong>Restriction:</strong> Limit how we process your information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle>Data Retention</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We retain your personal information only as long as necessary to provide our services and comply with legal obligations. Health information is retained according to applicable medical record retention requirements.
                </p>
                <p>
                  When you delete your account, we will securely delete your personal information within 30 days, except where retention is required by law.
                </p>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact Team BitZ:
                </p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> privacy@teambitZ.com</p>
                  <p><strong>Address:</strong> Salt Lake, Kolkata</p>
                  <p><strong>Phone:</strong> +91 8240816713</p>
                </div>
              </CardContent>
            </Card>

            {/* Updates */}
            <Card>
              <CardHeader>
                <CardTitle>Policy Updates</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices or applicable laws. We will notify you of significant changes through the platform or by email. Continued use of our services after such changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>

            {/* Footer Note */}
            <div className="text-center pt-8 border-t">
              <p className="text-sm text-muted-foreground">
                This Privacy Policy is part of our commitment to protecting your health information and maintaining your trust in the AyurDiet platform developed by Team BitZ.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}