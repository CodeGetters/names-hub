import { Skeleton } from "@/components/ui/Skeleton";

export default function LocaleLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Skeleton className="mx-auto h-14 w-2/3 max-w-xl" />
          <Skeleton className="mx-auto mt-6 h-5 w-3/4 max-w-2xl" />
          <Skeleton className="mx-auto mt-12 h-96 w-full max-w-2xl rounded-2xl" />
        </div>
      </section>
    </div>
  );
}
