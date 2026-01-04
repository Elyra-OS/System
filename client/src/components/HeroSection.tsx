import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, ArrowRight } from "lucide-react";
import videoUrl from "@assets/jhdhd_1767419788393.mp4";

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center"
      data-testid="section-hero"
    >
      {/* Video background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="hero-video"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Gradient overlay for smooth transition to page background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-pink-50/80" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-pink-50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        {/* Title */}
        <h1
          className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold mb-8"
          style={{
            background: "linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #a855f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 4px 30px rgba(255, 107, 157, 0.3)",
          }}
          data-testid="hero-title"
        >
          ElyraOS
        </h1>

        {/* Action bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xl mx-auto">
          {/* Be With Me button */}
          <a
            href="https://www.elizacloud.ai/dashboard/chat?characterId=0bf4c7a2-b8d5-48f8-98dc-fbfbc6e5570c"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              variant="outline"
              className="font-terminal border-pink-300 text-pink-600 bg-white/80 backdrop-blur-sm hover:bg-pink-50 min-w-[140px]"
              data-testid="button-be-with-me"
            >
              <Heart className="w-4 h-4 mr-2" />
              BE WITH ME
            </Button>
          </a>

          {/* Coming Soon label */}
          <div
            className="flex-1 flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400/80 via-rose-400/80 to-orange-300/80 backdrop-blur-sm"
            data-testid="coming-soon-bar"
          >
            <span className="font-terminal text-sm text-white font-medium">COMING SOON</span>
          </div>

          {/* Enter ElyraOS button */}
          <Link href="/os">
            <Button
              size="lg"
              className="font-terminal bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white border-0 min-w-[160px]"
              data-testid="button-enter-elyraos"
            >
              ENTER ELYRAOS
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-pink-500/70 hover:text-pink-600 transition-colors animate-bounce z-20"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
