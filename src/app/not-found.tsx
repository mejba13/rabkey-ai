import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { GamingButton } from "@/components/gaming";

export default function NotFound() {
  return (
    <PageContainer className="py-20">
      <div className="flex flex-col items-center justify-center gap-6 text-center min-h-[50vh]">
        <p className="text-8xl font-heading font-bold text-gaming-orange">404</p>
        <h1 className="text-3xl font-heading font-bold">Page Not Found</h1>
        <p className="text-muted-foreground max-w-md">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex gap-3">
          <Link href="/"><GamingButton variant="primary">Back to Home</GamingButton></Link>
          <Link href="/search"><GamingButton variant="outline">Search Games</GamingButton></Link>
        </div>
      </div>
    </PageContainer>
  );
}
