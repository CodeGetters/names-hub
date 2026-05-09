import { NameGridSkeleton, Skeleton } from "@/components/ui/Skeleton";

export default function GirlLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-girl/10 to-background py-16">
        <div className="mx-auto max-w-6xl px-4">
          <Skeleton className="h-12 w-64 rounded-xl" />
          <Skeleton className="mt-3 h-6 w-96 rounded-lg" />
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