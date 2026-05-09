export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton-clay ${className}`} />;
}

export function NameCardSkeleton() {
  return (
    <div className="card-clay-sm p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-14 rounded-full" />
      </div>
      <Skeleton className="mt-3 h-4 w-full" />
    </div>
  );
}

export function NameGridSkeleton({ count = 9 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <NameCardSkeleton key={i} />
      ))}
    </div>
  );
}