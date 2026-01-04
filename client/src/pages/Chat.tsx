import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoUrl from "@assets/akakakaka_1767418288626.png";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ELYRA_RESPONSES: Record<string, string> = {
  hello: "Hey there! I'm Elyra, your on-chain companion. I specialize in DeFi, smart contracts, and crypto market analysis. How can I help you today?",
  hi: "Hi! Nice to meet you. I'm Elyra, here to help you navigate the world of blockchain and DeFi. What would you like to know?",
  defi: "DeFi (Decentralized Finance) is an ecosystem of financial applications built on blockchain networks. It removes intermediaries like banks, allowing you to lend, borrow, trade, and earn yield directly through smart contracts. Think of it as a 24/7 open financial system where you maintain full control of your assets!",
  solana: "Solana is a high-performance blockchain known for its fast transaction speeds (up to 65,000 TPS) and low fees. It's home to many popular DeFi protocols, NFT marketplaces, and the ElizaOS ecosystem. The native token SOL is used for transactions and staking.",
  ethereum: "Ethereum is the leading smart contract platform and the birthplace of DeFi. It pioneered programmable money and hosts thousands of dApps. While gas fees can be high during congestion, Layer 2 solutions like Arbitrum and Base are making it more accessible.",
  elizaos: "ElizaOS is a TypeScript framework for building autonomous AI agents. It allows you to create agents with unique personalities, equip them with plugins, and deploy them across multiple platforms. The $ELIZA token is part of the ai16z ecosystem.",
  token: "I can help you analyze tokens! Key metrics to consider: market cap, liquidity, trading volume, holder distribution, and smart contract security. Would you like me to check a specific token for you?",
  wallet: "Wallet security is crucial! Here are my top tips:\n\n1. Never share your seed phrase\n2. Use hardware wallets for large holdings\n3. Enable 2FA on exchanges\n4. Verify contract addresses before interacting\n5. Start with small test transactions\n6. Be wary of DMs - most are scams!",
  smart: "Smart contracts are self-executing programs stored on a blockchain. They automatically enforce agreements when conditions are met. For example, a DEX smart contract can swap tokens instantly without a middleman. Always verify contracts are audited before interacting!",
  default: "That's an interesting question! As your on-chain companion, I'm here to help with DeFi protocols, smart contract analysis, token monitoring, and blockchain knowledge. Could you tell me more about what you'd like to know? I'm particularly good with Solana, Ethereum, and the ElizaOS ecosystem."
};

function getElyraResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  for (const [keyword, response] of Object.entries(ELYRA_RESPONSES)) {
    if (keyword !== "default" && lowerMessage.includes(keyword)) {
      return response;
    }
  }
  
  return ELYRA_RESPONSES.default;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey! I'm Elyra, your on-chain companion. I specialize in DeFi, smart contracts, and cryptocurrency analysis. Ask me anything about blockchain, tokens, or the ElizaOS ecosystem!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: getElyraResponse(userMessage.content),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 border-b bg-white/80 backdrop-blur-sm">
        <Link href="/os">
          <Button variant="ghost" size="icon" data-testid="button-back-os">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Elyra"
            className="w-10 h-10 rounded-full border-2 border-pink-300"
          />
          <div>
            <h1 className="font-heading font-bold text-lg text-gray-800" data-testid="chat-title">
              Elyra
            </h1>
            <p className="text-xs text-gray-500">On-chain Companion</p>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-gray-500">Online</span>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4" ref={scrollAreaRef}>
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              data-testid={`message-${message.role}-${message.id}`}
            >
              {message.role === "assistant" && (
                <img
                  src={logoUrl}
                  alt="Elyra"
                  className="w-8 h-8 rounded-full border-2 border-pink-300 flex-shrink-0"
                />
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white"
                    : "bg-white border border-pink-100 text-gray-800 shadow-sm"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-3" data-testid="typing-indicator">
              <img
                src={logoUrl}
                alt="Elyra"
                className="w-8 h-8 rounded-full border-2 border-pink-300 flex-shrink-0"
              />
              <div className="bg-white border border-pink-100 rounded-2xl px-4 py-3 shadow-sm">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto flex gap-2">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Elyra about DeFi, tokens, or blockchain..."
            className="flex-1 border-pink-200 focus-visible:ring-pink-400"
            disabled={isTyping}
            data-testid="input-chat-message"
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
            data-testid="button-send-message"
          >
            {isTyping ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
