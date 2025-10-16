import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { FileUpload } from '@/components/FileUpload';
import { AIChatbot } from '@/components/AIChatbot';

export default function Dashboard() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Firmware Analysis Dashboard
          </h1>
          <p className="text-muted-foreground">
            Upload your firmware files for comprehensive cryptographic security analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <FileUpload onFileAnalyzed={setAnalysisData} />
            
            <div className="mt-8 grid md:grid-cols-3 gap-4">
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all">
                <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
                <div className="text-sm text-muted-foreground">Maximum Encryption</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all">
                <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
                <div className="text-sm text-muted-foreground">Analysis Speed</div>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground">Offline Secure</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 h-[600px] animate-fade-in" style={{ animationDelay: '200ms' }}>
            <AIChatbot />
          </div>
        </div>
      </main>
    </div>
  );
}
