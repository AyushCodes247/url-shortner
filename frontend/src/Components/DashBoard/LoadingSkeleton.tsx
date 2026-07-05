import { motion } from "motion/react";

const LoadingSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mx-auto mt-8 grid w-full max-w-7xl gap-6"
    >
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl shadow-blue-500/5"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="h-7 w-52 animate-pulse rounded-lg bg-zinc-800" />
              <div className="h-4 w-40 animate-pulse rounded bg-zinc-800" />
            </div>

            <div className="h-8 w-24 animate-pulse rounded-full bg-zinc-800" />
          </div>

          {/* Short URL */}
          <div className="mt-8 space-y-3">
            <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />
            <div className="h-5 w-full animate-pulse rounded bg-zinc-800" />
          </div>

          {/* Original URL */}
          <div className="mt-6 space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-full animate-pulse rounded bg-zinc-800" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-zinc-800" />
          </div>

          {/* Alias */}
          <div className="mt-6 space-y-3">
            <div className="h-4 w-20 animate-pulse rounded bg-zinc-800" />
            <div className="h-5 w-36 animate-pulse rounded bg-zinc-800" />
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-2xl bg-zinc-800 p-5">
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-700" />
              <div className="mt-4 h-8 w-14 animate-pulse rounded bg-zinc-700" />
            </div>

            <div className="rounded-2xl bg-zinc-800 p-5">
              <div className="h-4 w-20 animate-pulse rounded bg-zinc-700" />
              <div className="mt-4 h-8 w-14 animate-pulse rounded bg-zinc-700" />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-zinc-800" />
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-zinc-800" />
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-zinc-800" />
          </div>
        </div>
      ))}
    </motion.div>
  );
};

export default LoadingSkeleton;
