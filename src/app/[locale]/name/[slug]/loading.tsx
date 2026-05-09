import { Skeleton } from "@/components/ui/Skeleton";

export default function NameDetailLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/10 to-background py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <Skeleton className="mx-auto h-32 w-48 rounded-2xl" />
          <Skeleton className="mx-auto mt-6 h-8 w-32 rounded-xl" />
          <div className="mt-6 flex justify-center gap-3">
            <Skeleton className="h-10 w-24 rounded-xl" />
            <Skeleton className="h-10 w-24 rounded-xl" />
          </div>
        </div>
      </section>
      <section className="flex-1 py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-32 w-full rounded-2xl" />
              <Skeleton className="h-24 w-full rounded-2xl" />
            </div>
            <div className="space-y-6">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}