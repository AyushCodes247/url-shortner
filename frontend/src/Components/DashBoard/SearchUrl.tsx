import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Search, LoaderCircle } from "lucide-react";

interface SearchForm {
  urlId: string;
}

interface SearchUrlProps {
  onSubmit: (data: SearchForm) => Promise<void> | void;
}

const SearchUrl = ({ onSubmit }: SearchUrlProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SearchForm>({
    mode: "onBlur",
    defaultValues: {
      urlId: "",
    },
  });

  const submitHandler = async (data: SearchForm) => {
    await onSubmit(data);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl"
    >
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">Search URL</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Search a URL using its unique ID.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-4 lg:flex-row"
      >
        <div className="flex-1">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Enter URL ID..."
              className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all ${
                errors.urlId
                  ? "border-red-500"
                  : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              }`}
              {...register("urlId", {
                required: "URL ID is required.",
              })}
            />
          </div>

          {errors.urlId && (
            <p className="mt-2 text-sm text-red-400">{errors.urlId.message}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg hover:shadow-blue-500/20 disabled:cursor-not-allowed disabled:opacity-60 lg:min-w-[170px]"
        >
          {isSubmitting && <LoaderCircle size={18} className="animate-spin" />}

          {isSubmitting ? "Searching..." : "Search URL"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SearchUrl;
