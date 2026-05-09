"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export default function LocaleLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-24">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <Skeleton className="mx-auto h-16 w-2/3 max-w-2xl rounded-2xl" />
          <Skeleton className="mx-auto mt-6 h-6 w-3/4 max-w-xl rounded-xl" />
          <Skeleton className="mx-auto mt-12 h-[500px] w-full max-w-2xl rounded-2xl" />
        </div>
      </section>
    </div>
  );
}