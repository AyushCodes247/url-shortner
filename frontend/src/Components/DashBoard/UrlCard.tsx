import { motion } from "motion/react";
import {
  Copy,
  Pencil,
  Trash2,
  ExternalLink,
  MousePointerClick,
  Share2,
  BadgeCheck,
  BadgeX,
} from "lucide-react";

interface UrlCardProps {
  url: {
    urlId: string;
    title: string | null;
    shortCode: string;
    shortUrl: string;
    originalUrl: string;
    clickCount: number;
    shareCount: number;
    isActive: boolean;
  };

  onCopy: (shortUrl: string) => void;
  onEdit: (urlId: string) => void;
  onDelete: (urlId: string) => void;
}

const UrlCard = ({ url, onCopy, onEdit, onDelete }: UrlCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -2,
        borderColor: "#3b82f6",
      }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-lg backdrop-blur"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold text-white">
              {url.title || "Untitled Link"}
            </h2>

            <div
              className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs ${
                url.isActive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              {url.isActive ? <BadgeCheck size={14} /> : <BadgeX size={14} />}

              {url.isActive ? "Active" : "Inactive"}
            </div>
          </div>

          <p className="text-xs text-zinc-500">ID: {url.urlId}</p>

          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Short URL
            </p>

            <a
              href={url.shortUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex items-center gap-2 break-all font-medium text-blue-400 hover:text-blue-300"
            >
              {url.shortUrl}

              <ExternalLink size={15} />
            </a>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-zinc-500">
              Original URL
            </p>

            <p className="mt-1 line-clamp-2 break-all text-sm text-zinc-300">
              {url.originalUrl}
            </p>
          </div>

          <div className="text-sm text-zinc-400">
            Alias :
            <span className="ml-2 font-semibold text-white">
              {url.shortCode}
            </span>
          </div>
        </div>

        {/* Right */}

        <div className="flex flex-col gap-5 lg:w-72">
          {/* Stats */}

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 text-center">
              <MousePointerClick className="mx-auto text-blue-400" size={18} />

              <p className="mt-2 text-xs text-zinc-500">Clicks</p>

              <h3 className="text-2xl font-bold text-white">
                {url.clickCount}
              </h3>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 text-center">
              <Share2 className="mx-auto text-indigo-400" size={18} />

              <p className="mt-2 text-xs text-zinc-500">Shares</p>

              <h3 className="text-2xl font-bold text-white">
                {url.shareCount}
              </h3>
            </div>
          </div>

          {/* Actions */}

          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCopy(url.shortUrl)}
              className="rounded-xl bg-blue-600 p-3 text-white transition hover:bg-blue-500"
            >
              <Copy className="mx-auto" size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(url.urlId)}
              className="rounded-xl bg-amber-600 p-3 text-white transition hover:bg-amber-500"
            >
              <Pencil className="mx-auto" size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(url.urlId)}
              className="rounded-xl bg-red-600 p-3 text-white transition hover:bg-red-500"
            >
              <Trash2 className="mx-auto" size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UrlCard;
