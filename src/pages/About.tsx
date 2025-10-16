import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Zap, Users, Code, CheckCircle } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: 'Advanced Algorithm Detection',
      description: 'Automatically identifies AES, RSA, SHA, MD5, DES, and other cryptographic algorithms in firmware binaries.'
    },
    {
      icon: <Lock className="w-8 h-8 text-primary" />,
      title: 'Security Risk Assessment',
      description: 'Evaluates algorithm strength and provides risk ratings to help you identify vulnerabilities.'
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Real-time Analysis',
      description: 'Fast, efficient scanning that processes firmware files in seconds, not hours.'
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: 'AI-Powered Assistant',
      description: 'Cyra, your AI assistant, provides instant answers about cryptography and security best practices.'
    },
    {
      icon: <Code className="w-8 h-8 text-primary" />,
      title: '100% Offline & Secure',
      description: 'All analysis happens locally on your device. Your firmware never leaves your system.'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-primary" />,
      title: 'Detailed Reports',
      description: 'Generate comprehensive PDF reports with algorithm breakdowns and security recommendations.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="w-20 h-20 text-primary animate-glow-pulse" />
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              About CryptoFinder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your trusted partner in firmware security analysis and cryptographic assessment
            </p>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow mb-12">
            <CardHeader>
              <CardTitle className="text-2xl">What is CryptoFinder?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                CryptoFinder is a free, offline AI-powered tool designed to analyze firmware binaries and detect 
                cryptographic algorithms used within them. Built for developers, security researchers, and students, 
                it helps strengthen the security of IoT and embedded systems.
              </p>
              <p>
                In today's connected world, firmware security is more critical than ever. Many embedded devices 
                still use outdated or weak encryption methods that leave them vulnerable to attacks. CryptoFinder 
                helps you identify these weaknesses before attackers do.
              </p>
              <p>
                Our tool analyzes binary files (.bin, .img) and provides detailed reports on detected algorithms, 
                their strength ratings, and security recommendations. With Cyra, our AI assistant, you can also 
                get instant answers about cryptographic concepts and best practices.
              </p>
            </CardContent>
          </Card>

          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="bg-card/50 backdrop-blur-sm border-border hover:shadow-glow transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow">
            <CardHeader>
              <CardTitle className="text-2xl">Who Should Use CryptoFinder?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Security Researchers</h3>
                <p>Analyze firmware samples to identify cryptographic implementations and potential vulnerabilities.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Embedded Systems Developers</h3>
                <p>Validate that your firmware uses strong, modern encryption algorithms before deployment.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">IoT Device Manufacturers</h3>
                <p>Ensure your products meet security standards and use up-to-date cryptographic methods.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Students & Educators</h3>
                <p>Learn about cryptographic algorithms and security analysis in a hands-on, practical environment.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
