import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, TrendingUp, TrendingDown, ExternalLink, Globe, RefreshCw } from "lucide-react";
import { SiX, SiGithub } from "react-icons/si";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import elyraLogoUrl from "@assets/akakakaka_1767418288626.png";
import elizaLogoUrl from "@assets/https___gmgn.ai_external-res_8ec28ada60c00c30e749b13ea98d2242_1767420667190.webp";

interface TokenData {
  price: string;
  priceChange24h: number;
  liquidity: number;
  fdv: number;
  marketCap: number;
  volume24h: number;
  txns24h: number;
}

const tokens = [
  {
    id: "elyra",
    name: "ElyraOS",
    symbol: "$ELYRA",
    logo: elyraLogoUrl,
    contractAddress: null,
    chainId: null,
    borderClass: "neon-border-pink",
    glowClass: "hover:neon-glow-pink",
    isLaunched: false,
    socialLinks: {
      x: "https://x.com/elyraos",
      github: "https://github.com/elyraos",
      pumpfun: "https://pump.fun",
    },
  },
  {
    id: "elizaos",
    name: "ElizaOS",
    symbol: "$ELIZAOS",
    logo: elizaLogoUrl,
    contractAddress: "DuMbhu7mvQvqQHGcnikDgb4XegXJRyhUBfdU22uELiZA",
    chainId: "solana",
    borderClass: "neon-border-purple",
    glowClass: "hover:neon-glow-purple",
    isLaunched: true,
    socialLinks: {
      x: "https://x.com/ai16zdao",
      github: "https://github.com/elizaos",
      website: "https://elizaos.ai",
    },
  },
];

function formatNumber(num: number): string {
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
  return `$${num.toFixed(2)}`;
}

function formatPrice(price: string | number): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (num < 0.01) return `$${num.toFixed(6)}`;
  return `$${num.toFixed(4)}`;
}

export function TokenMonitoring() {
  const { toast } = useToast();

  // Fetch ElizaOS data from DexScreener
  const { data: elizaData, isLoading: elizaLoading, refetch: refetchEliza } = useQuery<TokenData>({
    queryKey: ["/api/token/DuMbhu7mvQvqQHGcnikDgb4XegXJRyhUBfdU22uELiZA"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const copyToClipboard = (address: string, tokenName: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Copied!",
      description: `${tokenName} contract address copied to clipboard.`,
    });
  };

  const getTokenData = (tokenId: string) => {
    if (tokenId === "elizaos" && elizaData) {
      return {
        price: formatPrice(elizaData.price),
        priceChange: elizaData.priceChange24h,
        marketCap: formatNumber(elizaData.marketCap),
        liquidity: formatNumber(elizaData.liquidity),
        isLoading: elizaLoading,
      };
    }
    return {
      price: "Coming Soon",
      priceChange: null,
      marketCap: "TBA",
      liquidity: "TBA",
      isLoading: false,
    };
  };

  return (
    <section
      id="tokens"
      className="py-20 px-4 sm:px-6 lg:px-8"
      data-testid="section-tokens"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          <h2
            className="text-3xl md:text-4xl font-heading font-bold text-center gradient-text"
            data-testid="text-tokens-title"
          >
            Live Network Monitoring
          </h2>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => refetchEliza()}
            className="rounded-full"
            data-testid="button-refresh-tokens"
          >
            <RefreshCw className={`w-5 h-5 ${elizaLoading ? "animate-spin" : ""}`} />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {tokens.map((token) => {
            const tokenData = getTokenData(token.id);
            
            return (
              <Card
                key={token.id}
                className={`glass-card ${token.borderClass} ${token.glowClass} p-6 transition-all duration-300 hover:translate-y-[-4px] overflow-visible`}
                data-testid={`card-token-${token.id}`}
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={token.logo}
                      alt={token.name}
                      className={`w-14 h-14 rounded-full object-cover border-2 ${token.id === "elyra" ? "border-pink-300" : "border-purple-300"}`}
                      data-testid={`img-token-logo-${token.id}`}
                    />
                    <div>
                      <h3
                        className="font-heading font-bold text-xl"
                        data-testid={`text-token-name-${token.id}`}
                      >
                        {token.name}
                      </h3>
                      <span
                        className="font-terminal text-sm text-muted-foreground"
                        data-testid={`text-token-symbol-${token.id}`}
                      >
                        {token.symbol}
                      </span>
                    </div>
                  </div>

                  {tokenData.priceChange !== null ? (
                    <div
                      className={`flex items-center gap-1 font-terminal text-sm font-bold ${
                        tokenData.priceChange >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                      data-testid={`text-price-change-${token.id}`}
                    >
                      {tokenData.priceChange >= 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {tokenData.priceChange >= 0 ? "+" : ""}
                      {tokenData.priceChange.toFixed(2)}%
                    </div>
                  ) : (
                    <span className="font-terminal text-sm text-pink-500 font-medium">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Contract address for launched tokens */}
                {token.isLaunched && token.contractAddress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                      <div>
                        <div className="font-terminal text-xs text-muted-foreground uppercase mb-1">
                          Contract Address
                        </div>
                        <div
                          className="font-mono text-xs truncate max-w-[200px] sm:max-w-[280px]"
                          data-testid={`text-contract-${token.id}`}
                        >
                          {token.contractAddress}
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(token.contractAddress!, token.name)}
                        data-testid={`button-copy-${token.id}`}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Social links */}
                {token.socialLinks && (
                  <div className="mb-6">
                    <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 flex-wrap">
                      <a
                        href={token.socialLinks.x}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/80 text-white hover:bg-black transition-colors"
                        data-testid={`link-x-${token.id}`}
                      >
                        <SiX className="w-4 h-4" />
                        <span className="font-terminal text-xs">X</span>
                      </a>
                      <a
                        href={token.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                        data-testid={`link-github-${token.id}`}
                      >
                        <SiGithub className="w-4 h-4" />
                        <span className="font-terminal text-xs">GitHub</span>
                      </a>
                      {token.id === "elyra" && "pumpfun" in token.socialLinks && (
                        <a
                          href={token.socialLinks.pumpfun}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:from-pink-600 hover:to-purple-600 transition-colors"
                          data-testid={`link-pumpfun-${token.id}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span className="font-terminal text-xs">PumpFun</span>
                        </a>
                      )}
                      {token.id === "elizaos" && "website" in token.socialLinks && (
                        <a
                          href={token.socialLinks.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 transition-colors"
                          data-testid={`link-website-${token.id}`}
                        >
                          <Globe className="w-4 h-4" />
                          <span className="font-terminal text-xs">Website</span>
                        </a>
                      )}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                    data-testid={`stat-price-${token.id}`}
                  >
                    <div className="font-terminal text-xs text-muted-foreground uppercase mb-1">
                      Price
                    </div>
                    <div className={`font-heading font-bold text-lg ${tokenData.isLoading ? "animate-pulse" : ""}`}>
                      {tokenData.price}
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                    data-testid={`stat-mcap-${token.id}`}
                  >
                    <div className="font-terminal text-xs text-muted-foreground uppercase mb-1">
                      MCap
                    </div>
                    <div className={`font-heading font-bold text-lg ${tokenData.isLoading ? "animate-pulse" : ""}`}>
                      {tokenData.marketCap}
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                    data-testid={`stat-holders-${token.id}`}
                  >
                    <div className="font-terminal text-xs text-muted-foreground uppercase mb-1">
                      Holders
                    </div>
                    <div className="font-heading font-bold text-lg">
                      {token.id === "elizaos" ? "5,590" : "TBA"}
                    </div>
                  </div>
                  <div
                    className="p-3 rounded-lg bg-white/5 border border-white/10"
                    data-testid={`stat-liquidity-${token.id}`}
                  >
                    <div className="font-terminal text-xs text-muted-foreground uppercase mb-1">
                      Liquidity
                    </div>
                    <div className={`font-heading font-bold text-lg ${tokenData.isLoading ? "animate-pulse" : ""}`}>
                      {tokenData.liquidity}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
