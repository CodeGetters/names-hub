import { Skeleton } from "@/components/ui/Skeleton";

export default function NameDetailLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Skeleton className="mx-auto h-16 w-32" />
          <Skeleton className="mx-auto mt-4 h-8 w-24" />
          <Skeleton className="mx-auto mt-4 h-7 w-40 rounded-full" />
        </div>
      </section>
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-48 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
