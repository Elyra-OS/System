import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Sparkles } from "lucide-react";
import logoUrl from "@assets/akakakaka_1767418288626.png";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "error";
  content: string;
}

const HELP_TEXT = `
╔═══════════════════════════════════════════════════════════════╗
║  ELYRAOS INTELLIGENCE TERMINAL v1.0                           ║
║  ═══════════════════════════════════════════════════════════  ║
║  High-End Analysis Engine | Powered by ElizaOS                ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  MARKET ANALYSIS                                              ║
║  ─────────────────                                            ║
║  trending             Trending tokens on DexScreener          ║
║  newpairs             Recently launched tokens                ║
║  sol                  SOL price & network info                ║
║                                                               ║
║  TOKEN INTELLIGENCE                                           ║
║  ─────────────────────                                        ║
║  scan <CA>            Advanced intelligence scan              ║
║  analyze <CA>         Basic token analysis                    ║
║                                                               ║
║  AI INTELLIGENCE                                              ║
║  ─────────────────                                            ║
║  ask "<question>"     AI-powered analysis (natural lang)      ║
║  ask "<question>" <CA> AI analysis with token context         ║
║                                                               ║
║  UTILITIES                                                    ║
║  ────────────                                                 ║
║  status               System status                           ║
║  about                About Elyra                             ║
║  clear                Clear terminal                          ║
║  help                 Show this menu                          ║
║                                                               ║
║  Example: scan DuMbhu7mvQvqQHGcnikDgb4XegXJRyhUBfdU22uELiZA   ║
║  Example: ask "is this token safe?" <CA>                      ║
╚═══════════════════════════════════════════════════════════════╝`;

const ABOUT_TEXT = `ElyraOS v1.0.0
Your on-chain companion with DeFi expertise,
smart contract architecture insights,
and cryptocurrency token monitoring.

Built with love using ElizaOS framework.`;

const STATUS_TEXT = `
╔═══════════════════════════════════════════╗
║  ELYRAOS SYSTEM STATUS                    ║
╠═══════════════════════════════════════════╣
║  System:      ONLINE                      ║
║  API:         CONNECTED                   ║
║  ElizaOS:     v1.0.0                      ║
║  Network:     Solana Mainnet              ║
╚═══════════════════════════════════════════╝`;

function formatNumber(num: number): string {
  if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
  if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
  if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: "w1", type: "system", content: "╔═══════════════════════════════════════════╗" },
    { id: "w2", type: "system", content: "║     Welcome to ElyraOS Terminal v1.0     ║" },
    { id: "w3", type: "system", content: "║   Your cute on-chain companion awaits!   ║" },
    { id: "w4", type: "system", content: "╚═══════════════════════════════════════════╝" },
    { id: "w5", type: "output", content: "Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const addLine = (type: TerminalLine["type"], content: string) => {
    setLines((prev) => [...prev, { id: Date.now().toString() + Math.random(), type, content }]);
  };

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    addLine("input", `elyra@os:~$ ${cmd}`);

    const parts = trimmedCmd.split(" ");
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "help") {
      addLine("output", HELP_TEXT);
      return;
    }

    if (command === "about") {
      addLine("output", ABOUT_TEXT);
      return;
    }

    if (command === "status") {
      addLine("output", STATUS_TEXT);
      return;
    }

    setIsLoading(true);

    try {
      if (command === "trending") {
        const response = await fetch("/api/terminal/trending");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        let output = "\nTOP TRENDING TOKENS\n─────────────────────\n";
        if (data.tokens && data.tokens.length > 0) {
          data.tokens.forEach((t: any, i: number) => {
            output += `${i + 1}. ${t.symbol || t.name} (${t.chain})\n`;
          });
        } else {
          output += "No trending tokens found.\n";
        }
        addLine("output", output);
      }
      else if (command === "newpairs") {
        const response = await fetch("/api/terminal/newpairs");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        let output = "\nRECENTLY LAUNCHED TOKENS\n─────────────────────────\n";
        if (data.pairs && data.pairs.length > 0) {
          data.pairs.forEach((p: any, i: number) => {
            output += `${i + 1}. ${p.address}... (${p.chain})\n`;
          });
        } else {
          output += "No new pairs found.\n";
        }
        addLine("output", output);
      }
      else if (command === "sol") {
        const response = await fetch("/api/terminal/sol");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        const changeSymbol = data.priceChange24h >= 0 ? "+" : "";
        const output = `
SOL NETWORK STATUS
─────────────────────
Price:      $${parseFloat(data.price).toFixed(2)} (${changeSymbol}${data.priceChange24h?.toFixed(2)}%)
Volume 24h: ${formatNumber(data.volume24h || 0)}
Liquidity:  ${formatNumber(data.liquidity || 0)}`;
        addLine("output", output);
      }
      else if (command === "scan" || command === "analyze") {
        if (args.length === 0) {
          addLine("error", "Usage: scan <contract_address>");
          setIsLoading(false);
          return;
        }
        
        const tokenAddress = args[0];
        addLine("output", `Scanning token ${tokenAddress.slice(0, 8)}...`);
        
        const response = await fetch(`/api/terminal/scan/${tokenAddress}`);
        if (!response.ok) {
          if (response.status === 404) {
            addLine("error", "Token not found. Please check the contract address.");
          } else {
            throw new Error("Failed to fetch");
          }
          setIsLoading(false);
          return;
        }
        
        const data = await response.json();
        const change1h = data.priceChange1h >= 0 ? `+${data.priceChange1h}` : data.priceChange1h;
        const change24h = data.priceChange24h >= 0 ? `+${data.priceChange24h}` : data.priceChange24h;
        
        let output = `
╔═══════════════════════════════════════════════════════╗
║  TOKEN INTELLIGENCE SCAN                              ║
╠═══════════════════════════════════════════════════════╣
║  Name:       ${(data.name || "Unknown").padEnd(40)}║
║  Symbol:     ${(data.symbol || "???").padEnd(40)}║
║  Chain:      ${(data.chain || "unknown").padEnd(40)}║
║  DEX:        ${(data.dex || "unknown").padEnd(40)}║
╠═══════════════════════════════════════════════════════╣
║  PRICE DATA                                           ║
║  ───────────                                          ║
║  Price:      $${data.price?.padEnd(39)}║
║  1h Change:  ${String(change1h + "%").padEnd(40)}║
║  24h Change: ${String(change24h + "%").padEnd(40)}║
╠═══════════════════════════════════════════════════════╣
║  MARKET DATA                                          ║
║  ───────────                                          ║
║  Market Cap: ${formatNumber(data.marketCap || 0).padEnd(40)}║
║  FDV:        ${formatNumber(data.fdv || 0).padEnd(40)}║
║  Liquidity:  ${formatNumber(data.liquidity || 0).padEnd(40)}║
║  Volume 24h: ${formatNumber(data.volume24h || 0).padEnd(40)}║
╠═══════════════════════════════════════════════════════╣
║  TRADING ACTIVITY                                     ║
║  ────────────────                                     ║
║  Buys 24h:   ${String(data.buys24h || 0).padEnd(40)}║
║  Sells 24h:  ${String(data.sells24h || 0).padEnd(40)}║
╠═══════════════════════════════════════════════════════╣
║  RISK ASSESSMENT: ${data.riskScore?.padEnd(34)}║`;
        
        if (data.riskFactors && data.riskFactors.length > 0) {
          data.riskFactors.forEach((factor: string) => {
            output += `\n║  - ${factor.padEnd(48)}║`;
          });
        }
        
        output += "\n╚═══════════════════════════════════════════════════════╝";
        addLine("output", output);
      }
      else if (command === "ask") {
        const fullArgs = trimmedCmd.slice(4).trim();
        
        // Parse question and optional token address
        let question = fullArgs;
        let tokenAddress = "";
        
        // Check if there's a quoted question followed by an address
        const quoteMatch = fullArgs.match(/^["'](.+?)["']\s*(.*)$/);
        if (quoteMatch) {
          question = quoteMatch[1];
          tokenAddress = quoteMatch[2].trim();
        }
        
        if (!question) {
          addLine("error", 'Usage: ask "<your question>" [contract_address]');
          setIsLoading(false);
          return;
        }
        
        addLine("output", "Elyra is thinking...");
        
        const response = await fetch("/api/terminal/ask", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, tokenAddress }),
        });
        
        if (!response.ok) throw new Error("Failed to get AI response");
        
        const data = await response.json();
        addLine("output", `\nElyra: ${data.answer}`);
      }
      else {
        addLine("error", `Command not found: ${command}. Type 'help' for available commands.`);
      }
    } catch (error) {
      console.error("Command error:", error);
      addLine("error", "An error occurred. Please try again.");
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleCommand(input);
      setInput("");
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-4">
        <Link href="/os">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white/90 hover:bg-white/20 hover:text-white transition-all duration-300"
            data-testid="button-back-os"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to OS</span>
          </button>
        </Link>
      </div>

      {/* Terminal Window */}
      <div className="max-w-4xl mx-auto">
        {/* Terminal Header */}
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-t-2xl p-1">
          <div className="bg-gray-900 rounded-t-xl px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 flex items-center justify-center gap-2">
              <img src={logoUrl} alt="Elyra" className="w-5 h-5 rounded-full" />
              <span className="text-white/80 font-mono text-sm">ElyraOS Terminal</span>
              <Sparkles className="w-4 h-4 text-pink-400" />
            </div>
            <div className="w-16" />
          </div>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalRef}
          onClick={handleTerminalClick}
          className="bg-gray-900/95 backdrop-blur-xl border-x border-b border-pink-500/30 rounded-b-2xl p-4 h-[60vh] overflow-y-auto cursor-text font-mono text-sm"
          data-testid="terminal-body"
        >
          {lines.map((line) => (
            <div
              key={line.id}
              className={`whitespace-pre-wrap mb-1 ${
                line.type === "input"
                  ? "text-cyan-400"
                  : line.type === "system"
                  ? "text-pink-400"
                  : line.type === "error"
                  ? "text-red-400"
                  : "text-gray-300"
              }`}
              data-testid={`terminal-line-${line.id}`}
            >
              {line.content}
            </div>
          ))}

          {/* Input Line */}
          <div className="flex items-center text-cyan-400">
            <span>elyra@os:~$&nbsp;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-white caret-pink-400"
              disabled={isLoading}
              autoFocus
              data-testid="terminal-input"
            />
            {isLoading ? (
              <span className="text-pink-400 animate-pulse">Loading...</span>
            ) : (
              <span className="w-2 h-5 bg-pink-400 animate-pulse" />
            )}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="mt-4 flex justify-center gap-2">
          <span className="text-pink-400/60 text-xs font-mono">Powered by ElizaOS</span>
          <span className="text-white/40">|</span>
          <span className="text-purple-400/60 text-xs font-mono">v1.0.0</span>
        </div>
      </div>
    </div>
  );
}
