import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, FileText, Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export default function Results() {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem('firmwareAnalysis');
    if (stored) {
      setAnalysisData(JSON.parse(stored));
    }
  }, []);

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'text-green-500';
      case 'medium':
        return 'text-yellow-500';
      case 'high':
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'medium':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'high':
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const downloadPDF = () => {
    if (!analysisData) return;

    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.setTextColor(0, 204, 204);
    doc.text('CryptoFinder Security Report', 20, 20);
    
    // File info
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`File: ${analysisData.fileName}`, 20, 35);
    doc.text(`Size: ${analysisData.fileSize}`, 20, 42);
    doc.text(`Date: ${analysisData.uploadDate}`, 20, 49);
    
    // Safety score
    doc.setFontSize(16);
    doc.setTextColor(0, 204, 204);
    doc.text(`Safety Score: ${analysisData.safetyPercentage}%`, 20, 65);
    
    // Algorithms
    doc.setFontSize(14);
    doc.text('Detected Algorithms:', 20, 80);
    
    doc.setFontSize(10);
    let y = 90;
    analysisData.algorithms.forEach((algo: any) => {
      doc.setTextColor(0, 0, 0);
      doc.text(`• ${algo.name}`, 25, y);
      doc.text(`Strength: ${algo.strength}`, 35, y + 5);
      doc.text(`Risk: ${algo.risk}`, 35, y + 10);
      y += 20;
    });
    
    doc.save(`CryptoFinder_Report_${analysisData.fileName}.pdf`);
    toast.success('Report downloaded successfully!');
  };

  if (!analysisData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 pt-24 pb-12">
          <div className="text-center">
            <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">No Analysis Results</h2>
            <p className="text-muted-foreground mb-6">Upload a firmware file to see analysis results</p>
            <Button onClick={() => navigate('/dashboard')} className="bg-primary hover:bg-primary/90">
              Go to Dashboard
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Analysis Results
            </h1>
            <p className="text-muted-foreground">Comprehensive firmware security assessment</p>
          </div>

          <div className="grid gap-6">
            {/* Summary Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-border shadow-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Firmware Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">File Name</p>
                    <p className="font-semibold">{analysisData.fileName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">File Size</p>
                    <p className="font-semibold">{analysisData.fileSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Upload Date</p>
                    <p className="font-semibold">{analysisData.uploadDate}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold">Safety Score</span>
                    <span className={`text-3xl font-bold ${
                      analysisData.safetyPercentage >= 80 ? 'text-green-500' :
                      analysisData.safetyPercentage >= 50 ? 'text-yellow-500' :
                      'text-red-500'
                    }`}>
                      {analysisData.safetyPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        analysisData.safetyPercentage >= 80 ? 'bg-green-500' :
                        analysisData.safetyPercentage >= 50 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${analysisData.safetyPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{analysisData.note}</p>
                </div>
              </CardContent>
            </Card>

            {/* Algorithms Table */}
            <Card className="bg-card/50 backdrop-blur-sm border-border">
              <CardHeader>
                <CardTitle>Detected Cryptographic Algorithms</CardTitle>
                <CardDescription>Complete breakdown of encryption and hashing algorithms found</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Algorithm</th>
                        <th className="text-left py-3 px-4 font-semibold">Strength</th>
                        <th className="text-left py-3 px-4 font-semibold">Risk Level</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analysisData.algorithms.map((algo: any, index: number) => (
                        <tr key={index} className="border-b border-border hover:bg-secondary/50 transition-colors">
                          <td className="py-4 px-4 font-medium">{algo.name}</td>
                          <td className="py-4 px-4">{algo.strength}</td>
                          <td className={`py-4 px-4 font-semibold ${getRiskColor(algo.risk)}`}>
                            {algo.risk}
                          </td>
                          <td className="py-4 px-4">
                            {getRiskIcon(algo.risk)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              <Button onClick={downloadPDF} className="bg-primary hover:bg-primary/90 shadow-glow">
                <Download className="w-4 h-4 mr-2" />
                Download Report as PDF
              </Button>
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="border-border hover:bg-secondary">
                Analyze Another File
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
