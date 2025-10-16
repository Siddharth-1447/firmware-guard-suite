import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Cyra, your CryptoFinder AI Assistant. I can help you understand cryptographic algorithms, firmware security, and best practices. What would you like to know?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getResponse = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes('aes')) {
      return 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for secure data transmission. AES-256 uses a 256-bit key and is considered highly secure for most applications. It\'s fast, efficient, and approved by the NSA for top-secret information.';
    }
    if (q.includes('rsa')) {
      return 'RSA is an asymmetric cryptographic algorithm used for secure data transmission and digital signatures. RSA-2048 is currently considered secure, though RSA-4096 is recommended for long-term security. It uses public and private key pairs for encryption and decryption.';
    }
    if (q.includes('sha')) {
      return 'SHA (Secure Hash Algorithm) is a family of cryptographic hash functions. SHA-1 is now considered weak and deprecated. SHA-256 and SHA-3 are currently recommended for secure applications. Hash functions are one-way functions used for data integrity verification.';
    }
    if (q.includes('firmware') || q.includes('security')) {
      return 'Firmware security is critical for IoT and embedded devices. Key concerns include: using strong encryption (AES-256), secure boot processes, regular updates, avoiding deprecated algorithms (MD5, SHA-1, DES), and implementing proper authentication mechanisms.';
    }
    if (q.includes('md5')) {
      return 'MD5 is a cryptographic hash function that is now considered broken and unsuitable for security purposes. It has known collision vulnerabilities. Use SHA-256 or SHA-3 instead for secure hashing operations.';
    }
    if (q.includes('encryption') || q.includes('algorithm')) {
      return 'Modern encryption algorithms include: AES (symmetric), RSA/ECC (asymmetric), and ChaCha20 (stream cipher). For hashing, use SHA-256 or SHA-3. Always use well-established algorithms and avoid creating custom cryptography.';
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
      return 'Hello! I\'m here to help you understand cryptographic concepts and firmware security. Feel free to ask me about AES, RSA, SHA, or any other security-related questions!';
    }
    if (q.includes('help')) {
      return 'I can help you with:\n• Cryptographic algorithms (AES, RSA, SHA, etc.)\n• Firmware security best practices\n• Algorithm strength assessment\n• Encryption vs hashing\n• Security recommendations\n\nJust ask me anything about cryptography or security!';
    }
    
    return 'That\'s an interesting question! For specific guidance on cryptographic implementations, I recommend consulting security documentation or analyzing your firmware with our tool. I specialize in common algorithms like AES, RSA, SHA, and general security best practices.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(input);
      const assistantMessage: Message = { role: 'assistant', content: response };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full bg-card/30 rounded-xl border border-border overflow-hidden">
      <div className="bg-secondary px-6 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Bot className="w-6 h-6 text-primary animate-glow-pulse" />
          <div>
            <h3 className="font-semibold text-foreground">Cyra</h3>
            <p className="text-xs text-muted-foreground">CryptoFinder AI Assistant</p>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground'
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div className="bg-secondary text-foreground rounded-xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-border bg-secondary/50">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about cryptography, algorithms, security..."
            className="flex-1 bg-input border-border focus:border-primary"
          />
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 shadow-glow">
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};
