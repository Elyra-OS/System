import { useState } from "react";
import { Link } from "wouter";
import { Terminal, Wallet, Twitter, ArrowLeft, X, Loader2 } from "lucide-react";
import videoUrl from "@assets/grok-video-bdb820a5-3e89-467b-be22-790cd7df50cb_1767421832788.mp4";
import logoUrl from "@assets/akakakaka_1767418288626.png";
import elizaOSIconUrl from "@assets/https___gmgn.ai_external-res_8ec28ada60c00c30e749b13ea98d2242_1767422353344.webp";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  external?: boolean;
  onClick?: () => void;
}

function MenuItem({ icon, title, href, external, onClick }: MenuItemProps) {
  const content = (
    <div
      className="group flex flex-col items-center justify-center gap-3 p-6 cursor-pointer
                 hover:scale-110 transition-all duration-300"
      data-testid={`menu-item-${title.toLowerCase().replace(/\s/g, "-")}`}
    >
      <div className="text-white/90 group-hover:text-white transition-colors drop-shadow-lg">
        {icon}
      </div>
      <span className="font-heading font-semibold text-base md:text-lg text-white/90 group-hover:text-white transition-colors drop-shadow-lg">
        {title}
      </span>
    </div>
  );

  if (onClick) {
    return <div onClick={onClick}>{content}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}

function BuildingModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-purple-900/90 via-pink-900/90 to-rose-900/90 
                      backdrop-blur-xl border border-pink-500/30 rounded-2xl p-8 max-w-md w-full
                      shadow-2xl shadow-pink-500/20">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          data-testid="button-close-building"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Icon with animation */}
          <div className="relative">
            <Wallet className="w-16 h-16 text-pink-400" />
            <div className="absolute inset-0 animate-ping">
              <Wallet className="w-16 h-16 text-pink-400/30" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-heading font-bold text-white text-center">
            Privacy Wallet
          </h2>

          {/* Building status */}
          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">Building in progress...</span>
              <span className="text-pink-400 font-mono font-bold">60%</span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-3 bg-gray-800/50 rounded-full overflow-hidden border border-pink-500/20">
              <div 
                className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full
                           relative overflow-hidden"
                style={{ width: "60%" }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent
                               animate-shimmer" />
              </div>
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex items-center gap-3 text-white/60">
            <Loader2 className="w-5 h-5 animate-spin text-pink-400" />
            <span className="text-sm">Compiling smart contracts...</span>
          </div>

          {/* Features being built */}
          <div className="w-full mt-2 space-y-2 text-sm">
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Core wallet infrastructure</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <span>Transaction signing</span>
            </div>
            <div className="flex items-center gap-2 text-yellow-400">
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              <span>Privacy layer integration</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span>Token management</span>
            </div>
            <div className="flex items-center gap-2 text-white/40">
              <span className="w-2 h-2 rounded-full bg-white/40" />
              <span>DeFi connections</span>
            </div>
          </div>

          {/* Coming soon note */}
          <p className="text-xs text-white/50 text-center mt-2">
            This feature is currently under development. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}

export default function OS() {
  const [showBuildingModal, setShowBuildingModal] = useState(false);

  const menuItems = [
    {
      icon: <img src={elizaOSIconUrl} alt="Framework" className="w-12 h-12 md:w-16 md:h-16 rounded-full" />,
      title: "Framework",
      href: "https://docs.elizaos.ai/",
      external: true,
    },
    {
      icon: <img src={logoUrl} alt="My Elyra" className="w-12 h-12 md:w-16 md:h-16 rounded-full" />,
      title: "My Elyra",
      href: "https://www.elizacloud.ai/dashboard/chat?characterId=0bf4c7a2-b8d5-48f8-98dc-fbfbc6e5570c",
      external: true,
    },
    {
      icon: <Terminal className="w-12 h-12 md:w-16 md:h-16" />,
      title: "Terminal",
      href: "/terminal",
      external: false,
    },
    {
      icon: <Wallet className="w-12 h-12 md:w-16 md:h-16" />,
      title: "Privacy Wallet",
      href: "#",
      external: false,
      onClick: () => setShowBuildingModal(true),
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="os-video-background"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-purple-900/20 to-black/40" />

      {/* Back button */}
      <Link href="/">
        <button
          className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 
                     bg-white/10 backdrop-blur-xl border border-white/20 rounded-full
                     text-white/90 hover:bg-white/20 hover:text-white
                     transition-all duration-300"
          data-testid="button-back-home"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
      </Link>

      {/* Social link */}
      <a
        href="https://x.com/ai16zdao"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 z-20 flex items-center gap-2 px-4 py-2 
                   bg-white/10 backdrop-blur-xl border border-white/20 rounded-full
                   text-white/90 hover:bg-white/20 hover:text-white
                   transition-all duration-300"
        data-testid="link-social-twitter"
      >
        <Twitter className="w-4 h-4" />
        <span className="font-medium">Social</span>
      </a>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        {/* Logo and title */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <img
            src={logoUrl}
            alt="ElyraOS"
            className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white/30 animate-pulse-glow"
            data-testid="os-logo"
          />
          <h1 className="text-4xl md:text-5xl font-heading font-bold gradient-text" data-testid="os-title">
            ElyraOS
          </h1>
        </div>

        {/* Menu grid - no cards, just icons and text */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12" data-testid="os-menu-grid">
          {menuItems.map((item) => (
            <MenuItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              href={item.href}
              external={item.external}
              onClick={item.onClick}
            />
          ))}
        </div>
      </div>

      {/* Building Modal */}
      {showBuildingModal && (
        <BuildingModal onClose={() => setShowBuildingModal(false)} />
      )}
    </div>
  );
}
