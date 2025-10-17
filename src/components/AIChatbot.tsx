import { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'cyra_chat_history';

export const AIChatbot = () => {
  // Load chat history from localStorage
  const loadHistory = (): Message[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
    return [
      {
        role: 'assistant',
        content: 'Hello! I\'m Cyra, your CryptoFinder AI Assistant. I can help you understand cryptographic algorithms, firmware security, and best practices. What would you like to know?'
      }
    ];
  };

  const [messages, setMessages] = useState<Message[]>(loadHistory());
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error('Failed to save chat history:', error);
    }
  }, [messages]);

  const getResponses = (question: string): string[] => {
    const responses: string[] = [];
    const q = question.toLowerCase();
    
    // Knowledge base with keywords and responses
    const knowledgeBase = [
      {
        keywords: ['aes', 'advanced encryption standard'],
        response: 'AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for secure data transmission. AES-256 uses a 256-bit key and is considered highly secure for most applications. It\'s fast, efficient, and approved by the NSA for top-secret information.'
      },
      {
        keywords: ['rsa'],
        response: 'RSA is an asymmetric cryptographic algorithm used for secure data transmission and digital signatures. RSA-2048 is currently considered secure, though RSA-4096 is recommended for long-term security. It uses public and private key pairs for encryption and decryption.'
      },
      {
        keywords: ['sha', 'secure hash'],
        response: 'SHA (Secure Hash Algorithm) is a family of cryptographic hash functions. SHA-1 is now considered weak and deprecated. SHA-256 and SHA-3 are currently recommended for secure applications. Hash functions are one-way functions used for data integrity verification.'
      },
      {
        keywords: ['ecc', 'elliptic curve'],
        response: 'ECC (Elliptic Curve Cryptography) provides the same level of security as RSA but with smaller key sizes, making it more efficient. ECC-256 is equivalent to RSA-3072 in terms of security. It\'s widely used in modern applications and mobile devices.'
      },
      {
        keywords: ['firmware', 'iot', 'embedded'],
        response: 'Firmware security is critical for IoT and embedded devices. Key concerns include: using strong encryption (AES-256), secure boot processes, regular updates, avoiding deprecated algorithms (MD5, SHA-1, DES), and implementing proper authentication mechanisms.'
      },
      {
        keywords: ['md5'],
        response: 'MD5 is a cryptographic hash function that is now considered broken and unsuitable for security purposes. It has known collision vulnerabilities where two different inputs can produce the same hash. Use SHA-256 or SHA-3 instead for secure hashing operations.'
      },
      {
        keywords: ['des', 'data encryption standard'],
        response: 'DES (Data Encryption Standard) is an obsolete encryption algorithm that uses a 56-bit key, which is too short by modern standards. It can be broken in hours with modern computing power. Use AES instead. 3DES is slightly better but still being phased out.'
      },
      {
        keywords: ['encryption', 'cipher'],
        response: 'Modern encryption algorithms include: AES (symmetric), RSA/ECC (asymmetric), and ChaCha20 (stream cipher). For hashing, use SHA-256 or SHA-3. Always use well-established algorithms and avoid creating custom cryptography.'
      },
      {
        keywords: ['hello', 'hi', 'hey', 'greetings'],
        response: 'Hello! I\'m here to help you understand cryptographic concepts and firmware security. Feel free to ask me about AES, RSA, SHA, ECC, or any other security-related questions!'
      },
      {
        keywords: ['help', 'what can you do'],
        response: 'I can help you with:\n• Cryptographic algorithms (AES, RSA, SHA, ECC, etc.)\n• Firmware security best practices\n• Algorithm strength assessment\n• Encryption vs hashing\n• Security recommendations\n• Vulnerability analysis\n\nJust ask me anything about cryptography or security!'
      },
      {
        keywords: ['weak', 'vulnerable', 'insecure'],
        response: 'Weak or deprecated algorithms include: MD5, SHA-1, DES, RC4, and RSA-1024. These should be avoided in production systems. Replace them with: SHA-256/SHA-3 for hashing, AES-256 for symmetric encryption, and RSA-2048/4096 or ECC for asymmetric encryption.'
      },
      {
        keywords: ['strong', 'secure', 'safe', 'recommended'],
        response: 'Strong, currently recommended algorithms include: AES-256 for symmetric encryption, RSA-2048/4096 or ECC-256+ for asymmetric encryption, and SHA-256/SHA-3 for hashing. Always use well-tested libraries and keep them updated.'
      }
    ];
    
    // Check each keyword pattern
    knowledgeBase.forEach(item => {
      if (item.keywords.some(keyword => q.includes(keyword))) {
        responses.push(item.response);
      }
    });
    
    // If no matches found, return a default response
    if (responses.length === 0) {
      responses.push('That\'s an interesting question! For specific guidance on cryptographic implementations, I recommend consulting security documentation or analyzing your firmware with our tool. I specialize in common algorithms like AES, RSA, SHA, ECC, and general security best practices.');
    }
    
    return responses;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      // Get multiple responses for potentially multiple questions
      const responses = getResponses(input);
      
      // Combine responses if multiple matches found
      const combinedResponse = responses.join('\n\n');
      
      const assistantMessage: Message = { role: 'assistant', content: combinedResponse };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 800);
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
