export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 animate-pulse">
      {/* Banner Skeleton */}
      <div className="h-80 w-full rounded-3xl bg-slate-200 dark:bg-slate-800/70 border border-cyan-500/20" />

      {/* Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="h-96 rounded-2xl bg-slate-200 dark:bg-slate-800/70 border border-cyan-500/20 p-5 flex flex-col justify-between"
          >
            <div className="h-44 w-full rounded-xl bg-slate-300 dark:bg-slate-700/70" />
            <div className="space-y-3">
              <div className="h-5 w-3/4 rounded bg-slate-300 dark:bg-slate-700/70" />
              <div className="h-4 w-full rounded bg-slate-300 dark:bg-slate-700/70" />
              <div className="h-10 w-full rounded-xl bg-slate-300 dark:bg-slate-700/70 mt-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
