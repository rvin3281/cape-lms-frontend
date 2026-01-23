export default function Loading() {
  return (
    <div className="p-4">
      <div className="h-10 w-64 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 space-y-3">
        <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-24 w-full animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}
