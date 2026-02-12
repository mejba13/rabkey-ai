import { PageContainer } from "@/components/layout/page-container";

export default function Loading() {
  return (
    <PageContainer className="py-20">
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="size-12 rounded-full border-4 border-gaming-orange/20 border-t-gaming-orange animate-spin" />
        <p className="text-muted-foreground font-heading">Loading...</p>
      </div>
    </PageContainer>
  );
}
