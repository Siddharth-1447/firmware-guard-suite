import { useState, useCallback } from 'react';
import { Upload, File as FileIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface FileUploadProps {
  onFileAnalyzed: (analysis: any) => void;
}

export const FileUpload = ({ onFileAnalyzed }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const analyzeFile = async (file: File) => {
    setIsAnalyzing(true);
    
    // Simulate firmware analysis with mock detection
    const text = await file.text();
    const algorithms = [];
    
    // Detect algorithms based on keywords
    if (text.toLowerCase().includes('aes') || text.toLowerCase().includes('advanced encryption')) {
      algorithms.push({ name: 'AES-256', strength: 'Secure', risk: 'Low' });
    }
    if (text.toLowerCase().includes('rsa')) {
      algorithms.push({ name: 'RSA-2048', strength: 'Secure', risk: 'Low' });
    }
    if (text.toLowerCase().includes('sha1') || text.toLowerCase().includes('sha-1')) {
      algorithms.push({ name: 'SHA-1', strength: 'Weak', risk: 'High' });
    }
    if (text.toLowerCase().includes('sha256') || text.toLowerCase().includes('sha-256')) {
      algorithms.push({ name: 'SHA-256', strength: 'Secure', risk: 'Low' });
    }
    if (text.toLowerCase().includes('md5')) {
      algorithms.push({ name: 'MD5', strength: 'Broken', risk: 'Critical' });
    }
    if (text.toLowerCase().includes('des') && !text.toLowerCase().includes('3des')) {
      algorithms.push({ name: 'DES', strength: 'Obsolete', risk: 'Critical' });
    }

    // If no algorithms detected, add some random ones for demo
    if (algorithms.length === 0) {
      algorithms.push(
        { name: 'AES-256', strength: 'Secure', risk: 'Low' },
        { name: 'SHA-256', strength: 'Secure', risk: 'Low' },
        { name: 'RSA-2048', strength: 'Secure', risk: 'Low' }
      );
    }

    // Calculate safety score
    const secureCount = algorithms.filter(a => a.risk === 'Low').length;
    const safetyPercentage = Math.round((secureCount / algorithms.length) * 100);

    const analysis = {
      fileName: file.name,
      fileSize: (file.size / 1024).toFixed(2) + ' KB',
      uploadDate: new Date().toLocaleDateString(),
      safetyPercentage,
      algorithms,
      note: `Detected ${algorithms.length} cryptographic algorithm${algorithms.length > 1 ? 's' : ''} in firmware.`
    };

    setTimeout(() => {
      setIsAnalyzing(false);
      sessionStorage.setItem('firmwareAnalysis', JSON.stringify(analysis));
      onFileAnalyzed(analysis);
      toast.success('Firmware analysis complete!');
      navigate('/results');
    }, 2000);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.name.endsWith('.bin') || file.name.endsWith('.img') || file.type === 'text/plain') {
        analyzeFile(file);
      } else {
        toast.error('Please upload a .bin, .img, or text file');
      }
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      analyzeFile(files[0]);
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-12 transition-all duration-300 ${
        isDragging
          ? 'border-primary bg-primary/10 shadow-glow-strong'
          : 'border-border bg-card/50 hover:border-primary/50'
      } ${isAnalyzing ? 'pointer-events-none opacity-50' : ''}`}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept=".bin,.img,.txt"
        onChange={handleFileInput}
        disabled={isAnalyzing}
      />
      
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
              <p className="text-lg font-semibold text-primary">Analyzing Firmware...</p>
              <p className="text-sm text-muted-foreground">Detecting cryptographic algorithms</p>
            </>
          ) : (
            <>
              <Upload className={`w-16 h-16 ${isDragging ? 'text-primary animate-glow-pulse' : 'text-muted-foreground'}`} />
              <div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  Drop your firmware file here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supported formats: .bin, .img files
                </p>
              </div>
              <div className="flex items-center gap-2 mt-4 px-6 py-3 bg-secondary rounded-lg border border-border">
                <FileIcon className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">Select Firmware File</span>
              </div>
            </>
          )}
        </div>
      </label>
    </div>
  );
};
