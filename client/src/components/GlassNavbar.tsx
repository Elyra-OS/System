import { useState, useEffect } from "react";
import { Menu, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoUrl from "@assets/akakakaka_1767418288626.png";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#mcp-tools" },
  { label: "Tokens", href: "#tokens" },
];

export function GlassNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass-navbar neon-glow-pink"
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a
            href="#"
            className="flex items-center gap-3 group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            data-testid="link-logo"
          >
            <img
              src={logoUrl}
              alt="ElyraOS"
              className="h-10 w-10 rounded-full object-cover border-2 border-white/30 group-hover:border-neon-pink transition-colors"
              data-testid="img-navbar-logo"
            />
            <span className="font-heading font-bold text-xl gradient-text hidden sm:block">
              ElyraOS
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-terminal text-sm px-4 py-2 rounded-full text-foreground/80 hover:text-foreground hover:bg-pink-100/50 transition-all"
                data-testid={`link-nav-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="font-terminal border-pink-400 text-pink-600 hover:bg-pink-50 rounded-full ml-2"
              data-testid="link-api-docs"
            >
              <Code className="w-4 h-4 mr-1" />
              API Docs
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass-navbar border-t border-white/10" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left font-terminal text-sm py-2 px-4 rounded-md hover:bg-white/10 transition-colors"
                data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
