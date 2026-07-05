import { motion } from "motion/react";
import { Link2 } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

const EmptyState = ({
  title = "No URLs Yet",
  description = "Create your first MicroLink and it will appear here.",
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/70 px-8 py-16 text-center"
    >
      <motion.div
        animate={{
          rotate: [0, -8, 8, -8, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
        className="rounded-full bg-blue-500/10 p-5"
      >
        <Link2
          size={40}
          className="text-blue-500"
        />
      </motion.div>

      <h2 className="mt-6 text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
};

export default EmptyState;