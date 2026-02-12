import Link from "next/link";
import { ExternalLink, Gamepad2, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
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

function FooterLinkGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading font-semibold text-foreground mb-3">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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
    <footer className="bg-gaming-surface border-t border-border">
      <PageContainer className="py-12">
        {/* Top section: 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand column */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered game key price intelligence. Compare prices from 50+
              stores, get smart deal scores, and never overpay for games.
            </p>
            <div className="flex items-center gap-3">
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <ExternalLink className="size-5" />
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Gamepad2 className="size-5" />
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Discord"
              >
                <MessageCircle className="size-5" />
              </Link>
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkGroup title="Product" links={productLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
          <FooterLinkGroup title="Legal" links={legalLinks} />
        </div>

        {/* Bottom section */}
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GrabKey AI. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made for gamers who hate overpaying.
          </p>
        </div>
      </PageContainer>
    </footer>
  );
}
