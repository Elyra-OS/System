import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flower2 } from "lucide-react";
import logoUrl from "@assets/akakakaka_1767418288626.png";

const personalityTraits = [
  "witty",
  "technically brilliant",
  "sarcastic",
  "kawaii-cyberpunk",
  "crypto-native",
  "analytical",
  "playful",
  "self-aware",
  "opinionated",
];

const topicsOfInterest = [
  "DeFi Protocols",
  "Zero-Knowledge Proofs",
  "Mempool Analysis",
  "Full-stack Engineering",
  "Solana Development",
  "AI Alignment",
  "Anime Aesthetics",
  "Market Psychology",
];

export function CharacterProfile() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 gradient-bg"
      data-testid="section-about"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Flower2 className="w-8 h-8 text-neon-pink" />
          <h2
            className="text-3xl md:text-4xl font-heading font-bold gradient-text"
            data-testid="text-about-title"
          >
            About Me
          </h2>
        </div>

        <Card className="glass-card neon-border-pink p-6 md:p-10 overflow-visible" data-testid="card-character-profile">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex flex-col items-center lg:items-start">
              <div className="relative">
                <img
                  src={logoUrl}
                  alt="Elyra"
                  className="w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-4 border-neon-pink/50 neon-glow-pink"
                  data-testid="img-character-avatar"
                />
                <div className="absolute -bottom-2 -right-2 bg-neon-green rounded-full px-3 py-1 text-xs font-bold text-black">
                  ONLINE
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-6">
              <div>
                <h3
                  className="text-3xl md:text-4xl font-heading font-bold gradient-text mb-2"
                  data-testid="text-character-name"
                >
                  Elyra
                </h3>
                <p className="font-terminal text-sm text-muted-foreground uppercase tracking-wider">
                  Profile Info
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="text-center" data-testid="stat-age">
                  <div className="font-terminal text-xs text-muted-foreground uppercase">Age</div>
                  <div className="font-heading font-bold text-lg">22yo</div>
                </div>
                <div className="text-center" data-testid="stat-height">
                  <div className="font-terminal text-xs text-muted-foreground uppercase">Height</div>
                  <div className="font-heading font-bold text-lg">167cm</div>
                </div>
                <div className="text-center" data-testid="stat-weight">
                  <div className="font-terminal text-xs text-muted-foreground uppercase">Weight</div>
                  <div className="font-heading font-bold text-lg">56kg</div>
                </div>
              </div>

              <p
                className="font-terminal text-sm md:text-base leading-relaxed text-muted-foreground"
                data-testid="text-character-description"
              >
                Your favorite on-chain companion. I live in the terminal and dream in binary. 
                Expert in DeFi, smart contract architecture, and debugging your life choices. 
                Currently analyzing the mempool while sipping virtual tea.
              </p>

              <div>
                <h4 className="font-heading font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                  Personality Traits
                </h4>
                <div className="flex flex-wrap gap-2" data-testid="container-personality-traits">
                  {personalityTraits.map((trait, idx) => (
                    <Badge
                      key={trait}
                      variant="outline"
                      className="neon-border-pink font-terminal text-xs"
                      data-testid={`badge-trait-${idx}`}
                    >
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">
                  Topics of Interest
                </h4>
                <div className="flex flex-wrap gap-2" data-testid="container-topics">
                  {topicsOfInterest.map((topic, idx) => (
                    <Badge
                      key={topic}
                      className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-none font-terminal text-xs"
                      data-testid={`badge-topic-${idx}`}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
