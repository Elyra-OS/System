import { GlassNavbar } from "@/components/GlassNavbar";
import { HeroSection } from "@/components/HeroSection";
import { CharacterProfile } from "@/components/CharacterProfile";
import { TokenMonitoring } from "@/components/TokenMonitoring";
import { MCPToolsSection } from "@/components/MCPToolsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background" data-testid="page-home">
      <GlassNavbar />
      <main>
        <HeroSection />
        <CharacterProfile />
        <TokenMonitoring />
        <MCPToolsSection />
      </main>
      <Footer />
    </div>
  );
}
