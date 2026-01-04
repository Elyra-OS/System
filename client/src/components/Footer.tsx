import logoUrl from "@assets/akakakaka_1767418288626.png";

export function Footer() {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10 gradient-bg"
      data-testid="footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src={logoUrl}
              alt="ElyraOS"
              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
              data-testid="img-footer-logo"
            />
            <span className="font-heading font-bold text-lg gradient-text">
              ElyraOS
            </span>
          </div>

          <div className="flex items-center gap-6 font-terminal text-sm text-muted-foreground">
            <a
              href="#about"
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-about"
            >
              About
            </a>
            <a
              href="#tokens"
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-tokens"
            >
              Tokens
            </a>
            <a
              href="#mcp-tools"
              className="hover:text-foreground transition-colors"
              data-testid="link-footer-mcp"
            >
              MCP Tools
            </a>
          </div>

          <div className="font-terminal text-xs text-muted-foreground">
            <span data-testid="text-copyright">
              © 2026 ElyraOS. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
