import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wrench, Clock, Cloud, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

const mcpTools = [
  {
    id: "elizaos-cloud",
    name: "ElizaOS Cloud MCP",
    version: "v1.0.0",
    tools: "20 tools",
    status: "ACTIVE",
    description: "Core ElizaOS Cloud platform MCP with credit management, AI generation, memory, conversations, and agent interaction capabilities.",
    features: ["Credit Management", "AI Text Generation", "Image Generation", "+2 more"],
    pricing: "Pay-per-use with credits",
    icon: Cloud,
  },
  {
    id: "time-date",
    name: "Time & Date MCP",
    version: "v1.0.0",
    tools: "4 tools",
    status: "ACTIVE",
    description: "Get current time, timezone conversions, and date calculations. Perfect for scheduling and time-aware applications.",
    features: ["Current Time", "Timezone Conversion", "Date Formatting", "+1 more"],
    pricing: "1 credit per request",
    icon: Clock,
  },
  {
    id: "weather",
    name: "Weather MCP",
    version: "v1.0.0",
    tools: "3 tools",
    status: "ACTIVE",
    description: "Real-time weather data, forecasts, and alerts. Supports both credits and x402 micropayments.",
    features: ["Current Weather", "5-Day Forecast", "Weather Alerts"],
    pricing: "1-3 credits per request (or x402)",
    icon: Cloud,
  },
  {
    id: "crypto-price",
    name: "Crypto Price MCP",
    version: "v1.0.0",
    tools: "5 tools",
    status: "ACTIVE",
    description: "Real-time cryptocurrency prices, market data, and historical charts. Supports both credits and x402 payments.",
    features: ["Live Prices", "Market Cap Data", "Price History", "+2 more"],
    pricing: "1-3 credits per request (or x402)",
    icon: Coins,
  },
];

export function MCPToolsSection() {
  return (
    <section id="mcp-tools" className="py-20 px-4 sm:px-6 lg:px-8" data-testid="section-mcp-tools">
      <div className="max-w-7xl mx-auto">
        <h2 
          className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center gradient-text"
          data-testid="text-mcp-section-title"
        >
          ElyraOS MCP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mcpTools.map((tool) => (
            <div key={tool.id} className="relative group h-full">
              {/* Rotating neon border effect wrapper */}
              <div className="absolute -inset-[1px] rounded-xl gradient-border opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
              
              <Card 
                className={cn(
                  "relative glass-card border-none h-full flex flex-col transition-all duration-300",
                  "hover:translate-y-[-4px] hover:neon-glow-pink font-mono overflow-visible"
                )}
                data-testid={`card-mcp-tool-${tool.id}`}
              >
                <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0 pb-4">
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-xl font-heading flex items-center gap-2">
                      <tool.icon className="w-5 h-5 text-neon-pink" />
                      <span data-testid={`text-tool-name-${tool.id}`}>{tool.name}</span>
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span data-testid={`text-tool-version-${tool.id}`}>{tool.version}</span>
                      <span>•</span>
                      <span data-testid={`text-tool-count-${tool.id}`}>{tool.tools}</span>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-green-500/10 text-green-500 border-green-500/50 neon-glow-green"
                    data-testid={`status-badge-${tool.id}`}
                  >
                    {tool.status}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4 flex-grow">
                  <p 
                    className="text-sm text-muted-foreground terminal-text"
                    data-testid={`text-tool-description-${tool.id}`}
                  >
                    {tool.description}
                  </p>

                  <ul className="space-y-2">
                    {tool.features.map((feature, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-center gap-2 text-xs terminal-text"
                        data-testid={`text-tool-feature-${tool.id}-${idx}`}
                      >
                        <Wrench className="w-3 h-3 text-neon-purple" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pricing:</span>
                    <span 
                      className="text-xs font-bold text-neon-cyan"
                      data-testid={`text-tool-pricing-${tool.id}`}
                    >
                      {tool.pricing}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}