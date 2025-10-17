import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { FileUpload } from '@/components/FileUpload';
import { AIChatbot } from '@/components/AIChatbot';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { History, Clock, FileText } from 'lucide-react';

export default function Dashboard() {
  const [analysisData, setAnalysisData] = useState(null);
  const [history, setHistory] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load analysis history
    const stored = localStorage.getItem('analysisHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const viewHistoryItem = (item: any) => {
    sessionStorage.setItem('firmwareAnalysis', JSON.stringify(item));
    navigate('/results');
  };

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
          <div className="lg:col-span-2 space-y-8">
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <FileUpload onFileAnalyzed={setAnalysisData} />
              
              <div className="mt-8 grid md:grid-cols-3 gap-4">
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-primary mb-2">256-bit</div>
                  <div className="text-sm text-muted-foreground">Maximum Encryption</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
                  <div className="text-sm text-muted-foreground">Analysis Speed</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:shadow-glow transition-all duration-300 cursor-pointer">
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Offline Secure</div>
                </div>
              </div>
            </div>

            {/* Analysis History */}
            {history.length > 0 && (
              <Card className="bg-card/50 backdrop-blur-sm border-border animate-fade-in" style={{ animationDelay: '300ms' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <History className="w-5 h-5 text-primary" />
                    Recent Analysis History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {history.slice(0, 5).map((item, index) => (
                      <div
                        key={item.id}
                        onClick={() => viewHistoryItem(item)}
                        className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border hover:border-primary hover:shadow-glow transition-all duration-300 cursor-pointer animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{item.fileName}</p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.uploadDate} • {item.fileSize}
                            </p>
                          </div>
                        </div>
                        <div className={`text-2xl font-bold ${
                          item.safetyPercentage >= 80 ? 'text-green-500' :
                          item.safetyPercentage >= 50 ? 'text-yellow-500' :
                          'text-red-500'
                        }`}>
                          {item.safetyPercentage}%
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="lg:col-span-1 h-[600px] animate-fade-in" style={{ animationDelay: '200ms' }}>
            <AIChatbot />
          </div>
        </div>
      </main>
    </div>
  );
}
