import Link from "next/link";
import { ExternalLink, Gamepad2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { PageContainer } from "./page-container";

const productLinks = [
  { label: "Search", href: "/search" },
  { label: "Deals", href: "/deals" },
  { label: "Stores", href: "/stores" },
  { label: "Pricing", href: "/pricing" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Cookie Policy", href: "/cookies" },
];

const socialLinks = [
  { icon: ExternalLink, href: "https://twitter.com", label: "Twitter" },
  { icon: Gamepad2, href: "https://github.com", label: "GitHub" },
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
];

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground/80 mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground/60 hover:text-foreground/80 transition-colors duration-200"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border/30">
      {/* Subtle top gradient */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.304 0.029 284.551 / 40%), transparent)",
        }}
      />

      <PageContainer className="py-14">
        {/* Top section: 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-5">
            <Logo size="lg" />
            <p className="text-sm text-muted-foreground/50 leading-relaxed max-w-xs">
              AI-powered game key price intelligence. Compare prices from 50+
              stores, get smart deal scores, and never overpay for games.
            </p>
            <div className="flex items-center gap-2.5">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    "text-muted-foreground/40 hover:text-foreground/70",
                    "bg-gaming-surface/30 hover:bg-gaming-surface/50",
                    "transition-all duration-200"
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="size-3.5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Product" links={productLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-6 border-t border-border/20">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground/40">
              &copy; {new Date().getFullYear()} GrabKey AI. All rights
              reserved.
            </p>
            <p className="text-xs text-muted-foreground/30">
              Made for gamers who hate overpaying.
            </p>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
