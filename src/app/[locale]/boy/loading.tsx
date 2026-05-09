import { NameGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function BoyLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-boy/10 to-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="mt-2 h-5 w-96" />
        </div>
      </section>
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <NameGridSkeleton count={9} />
        </div>
      </section>
    </div>
  );
}
