import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Globe, Pencil, Link2, LoaderCircle } from "lucide-react";

interface CreateUrlForm {
  title: string;
  customAlias: string;
  originalUrl: string;
}

interface CreateUrlCardProps {
  onSubmit: (data: CreateUrlForm) => Promise<void> | void;
}

const CreateUrlCard = ({ onSubmit }: CreateUrlCardProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateUrlForm>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      customAlias: "",
      originalUrl: "",
    },
  });

  const submitHandler = async (data: CreateUrlForm) => {
    await onSubmit(data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{
        borderColor: "rgb(63 63 70)",
      }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-xl shadow-blue-500/5 backdrop-blur-xl"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white">Create Short URL</h2>

        <p className="mt-2 text-sm text-zinc-500">
          Create and manage branded MicroLinks in seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        {/* Title & Alias */}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Title */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Title
            </label>

            <div className="relative">
              <Pencil
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="Portfolio Website"
                className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all ${
                  errors.title
                    ? "border-red-500"
                    : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                }`}
                {...register("title")}
              />
            </div>

            {errors.title && (
              <p className="mt-2 text-sm text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Alias */}

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Custom Alias
            </label>

            <div className="relative">
              <Link2
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                placeholder="portfolio"
                className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all ${
                  errors.customAlias
                    ? "border-red-500"
                    : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                }`}
                {...register("customAlias", {
                  pattern: {
                    value: /^[A-Za-z0-9_-]{3,20}$/,
                    message:
                      "Alias must be 3-20 characters and contain only letters, numbers, '-' and '_'.",
                  },
                })}
              />
            </div>

            {errors.customAlias && (
              <p className="mt-2 text-sm text-red-400">
                {errors.customAlias.message}
              </p>
            )}
          </div>
        </div>

        {/* Original URL */}

        <div>
          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Original URL
          </label>

          <div className="relative">
            <Globe
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="url"
              placeholder="https://example.com"
              className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all ${
                errors.originalUrl
                  ? "border-red-500"
                  : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              }`}
              {...register("originalUrl", {
                required: "URL is required.",
                pattern: {
                  value: /^https?:\/\/.+/i,
                  message: "Please enter a valid URL.",
                },
              })}
            />
          </div>

          {errors.originalUrl && (
            <p className="mt-2 text-sm text-red-400">
              {errors.originalUrl.message}
            </p>
          )}
        </div>

        {/* Submit */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting && <LoaderCircle size={18} className="animate-spin" />}

          {isSubmitting ? "Creating..." : "Create Short URL"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateUrlCard;
