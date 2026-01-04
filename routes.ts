import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

interface DexScreenerPair {
  chainId: string;
  dexId: string;
  pairAddress: string;
  baseToken: {
    address: string;
    name: string;
    symbol: string;
  };
  quoteToken: {
    symbol: string;
  };
  priceUsd: string;
  priceChange: {
    h1?: number;
    h24: number;
  };
  liquidity: {
    usd: number;
  };
  fdv: number;
  marketCap: number;
  volume: {
    h24: number;
  };
  txns: {
    h24: {
      buys: number;
      sells: number;
    };
  };
}

interface DexScreenerResponse {
  pairs: DexScreenerPair[];
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // API endpoint to fetch token data from DexScreener
  app.get("/api/token/:tokenAddress", async (req, res) => {
    const { tokenAddress } = req.params;
    
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      
      if (!response.ok) {
        throw new Error(`DexScreener API returned ${response.status}`);
      }
      
      const data: DexScreenerResponse = await response.json();
      
      if (!data.pairs || data.pairs.length === 0) {
        return res.status(404).json({ error: "Token not found" });
      }
      
      const pair = data.pairs[0];
      
      res.json({
        name: pair.baseToken?.name || "Unknown",
        symbol: pair.baseToken?.symbol || "???",
        price: pair.priceUsd,
        priceChange24h: pair.priceChange?.h24 || 0,
        liquidity: pair.liquidity?.usd || 0,
        fdv: pair.fdv || 0,
        marketCap: pair.marketCap || 0,
        volume24h: pair.volume?.h24 || 0,
        txns24h: pair.txns?.h24 ? pair.txns.h24.buys + pair.txns.h24.sells : 0,
        buys24h: pair.txns?.h24?.buys || 0,
        sells24h: pair.txns?.h24?.sells || 0,
        chain: pair.chainId || "unknown",
        dex: pair.dexId || "unknown",
      });
    } catch (error) {
      console.error("Error fetching token data:", error);
      res.status(500).json({ error: "Failed to fetch token data" });
    }
  });

  // Terminal: Get trending tokens
  app.get("/api/terminal/trending", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.dexscreener.com/token-boosts/top/v1"
      );
      
      if (!response.ok) {
        throw new Error(`DexScreener API returned ${response.status}`);
      }
      
      const data = await response.json();
      const tokenArray = Array.isArray(data) ? data : [];
      const tokens = tokenArray.slice(0, 10).map((t: any) => ({
        name: t.tokenAddress?.slice(0, 8) || "Unknown",
        symbol: t.description || "???",
        chain: t.chainId || "solana",
        url: t.url || "",
      }));
      
      res.json({ tokens });
    } catch (error) {
      console.error("Error fetching trending:", error);
      res.status(500).json({ error: "Failed to fetch trending tokens" });
    }
  });

  // Terminal: Get latest pairs
  app.get("/api/terminal/newpairs", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.dexscreener.com/token-profiles/latest/v1"
      );
      
      if (!response.ok) {
        throw new Error(`DexScreener API returned ${response.status}`);
      }
      
      const data = await response.json();
      const pairArray = Array.isArray(data) ? data : [];
      const pairs = pairArray.slice(0, 10).map((p: any) => ({
        address: p.tokenAddress?.slice(0, 12) || "Unknown",
        chain: p.chainId || "unknown",
        description: p.description || "",
      }));
      
      res.json({ pairs });
    } catch (error) {
      console.error("Error fetching new pairs:", error);
      res.status(500).json({ error: "Failed to fetch new pairs" });
    }
  });

  // Terminal: Scan token (full analysis)
  app.get("/api/terminal/scan/:tokenAddress", async (req, res) => {
    const { tokenAddress } = req.params;
    
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      
      if (!response.ok) {
        throw new Error(`DexScreener API returned ${response.status}`);
      }
      
      const data: DexScreenerResponse = await response.json();
      
      if (!data.pairs || data.pairs.length === 0) {
        return res.status(404).json({ error: "Token not found" });
      }
      
      const pair = data.pairs[0];
      const liquidity = pair.liquidity?.usd || 0;
      const volume = pair.volume?.h24 || 0;
      const priceChange = pair.priceChange?.h24 || 0;
      
      // Calculate risk score (simplified)
      let riskScore = "LOW";
      let riskFactors: string[] = [];
      
      if (liquidity < 10000) {
        riskScore = "HIGH";
        riskFactors.push("Low liquidity (<$10K)");
      } else if (liquidity < 50000) {
        riskScore = "MEDIUM";
        riskFactors.push("Medium liquidity (<$50K)");
      }
      
      if (Math.abs(priceChange) > 50) {
        riskFactors.push("High volatility (>50% 24h change)");
      }
      
      res.json({
        name: pair.baseToken?.name || "Unknown",
        symbol: pair.baseToken?.symbol || "???",
        address: tokenAddress,
        chain: pair.chainId || "unknown",
        dex: pair.dexId || "unknown",
        price: pair.priceUsd || "0",
        priceChange1h: pair.priceChange?.h1 || 0,
        priceChange24h: priceChange,
        marketCap: pair.marketCap || 0,
        fdv: pair.fdv || 0,
        liquidity: liquidity,
        volume24h: volume,
        buys24h: pair.txns?.h24?.buys || 0,
        sells24h: pair.txns?.h24?.sells || 0,
        riskScore,
        riskFactors,
      });
    } catch (error) {
      console.error("Error scanning token:", error);
      res.status(500).json({ error: "Failed to scan token" });
    }
  });

  // Terminal: AI Ask command
  app.post("/api/terminal/ask", async (req, res) => {
    const { question, tokenAddress } = req.body;
    
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }
    
    try {
      let context = "";
      
      // If token address provided, fetch its data for context
      if (tokenAddress) {
        try {
          const tokenResponse = await fetch(
            `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
          );
          if (tokenResponse.ok) {
            const tokenData: DexScreenerResponse = await tokenResponse.json();
            if (tokenData.pairs && tokenData.pairs.length > 0) {
              const pair = tokenData.pairs[0];
              context = `Token Data for ${pair.baseToken?.symbol || "Unknown"}:
- Price: $${pair.priceUsd}
- 24h Change: ${pair.priceChange?.h24 || 0}%
- Market Cap: $${(pair.marketCap || 0).toLocaleString()}
- Liquidity: $${(pair.liquidity?.usd || 0).toLocaleString()}
- 24h Volume: $${(pair.volume?.h24 || 0).toLocaleString()}
- Chain: ${pair.chainId}
- DEX: ${pair.dexId}
`;
            }
          }
        } catch (e) {
          console.error("Error fetching token context:", e);
        }
      }
      
      const systemPrompt = `You are Elyra, an AI assistant specializing in DeFi, cryptocurrency, and blockchain analysis. 
You are part of the ElyraOS terminal interface.
Be concise, helpful, and technical when appropriate.
If analyzing a token, consider factors like liquidity, volume, price action, and potential risks.
Always remind users that this is not financial advice.
${context ? `\nContext:\n${context}` : ""}`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: question },
        ],
        max_completion_tokens: 500,
      });
      
      const answer = completion.choices[0]?.message?.content || "Unable to process your question.";
      
      res.json({ answer });
    } catch (error) {
      console.error("Error processing AI question:", error);
      res.status(500).json({ error: "Failed to process question" });
    }
  });

  // Terminal: Get SOL price and network status
  app.get("/api/terminal/sol", async (req, res) => {
    try {
      // Fetch SOL price from DexScreener (SOL/USDC pair on Raydium)
      const response = await fetch(
        "https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112"
      );
      
      if (!response.ok) {
        throw new Error(`DexScreener API returned ${response.status}`);
      }
      
      const data: DexScreenerResponse = await response.json();
      const pair = data.pairs?.[0];
      
      res.json({
        price: pair?.priceUsd || "0",
        priceChange24h: pair?.priceChange?.h24 || 0,
        volume24h: pair?.volume?.h24 || 0,
        liquidity: pair?.liquidity?.usd || 0,
      });
    } catch (error) {
      console.error("Error fetching SOL data:", error);
      res.status(500).json({ error: "Failed to fetch SOL data" });
    }
  });

  return httpServer;
}
