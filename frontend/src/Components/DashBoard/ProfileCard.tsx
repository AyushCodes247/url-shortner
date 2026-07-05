import { motion } from "motion/react";
import {
  UserCircle2,
  BadgeCheck,
  ShieldAlert,
  Mail,
  CalendarDays,
  Link2,
} from "lucide-react";

interface ProfileCardProps {
  name: string;
  email: string;
  isVerified: boolean;
  joinedAt: string;
  totalUrls: number;
}

const ProfileCard = ({
  name,
  email,
  isVerified,
  joinedAt,
  totalUrls,
}: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-zinc-800 bg-zinc-900/90 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl"
    >
      {/* Avatar */}

      <div className="flex flex-col items-center">
        <div className="rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-5 shadow-lg">
          <UserCircle2 size={72} className="text-white" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-white text-center">
          {name}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
          <Mail size={15} />
          <span className="truncate">{email}</span>
        </div>

        <div className="mt-4">
          {isVerified ? (
            <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
              <BadgeCheck size={15} />
              Verified
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
              <ShieldAlert size={15} />
              Not Verified
            </div>
          )}
        </div>
      </div>

      {/* Divider */}

      <div className="my-6 border-t border-zinc-800" />

      {/* Stats */}

      <div className="space-y-4">
        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/50 p-4"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <CalendarDays size={18} />
            <span>Joined</span>
          </div>

          <span className="font-semibold text-white">{joinedAt}</span>
        </motion.div>

        <motion.div
          whileHover={{ x: 3 }}
          className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/50 p-4"
        >
          <div className="flex items-center gap-2 text-zinc-400">
            <Link2 size={18} />
            <span>URLs</span>
          </div>

          <span className="text-xl font-bold text-blue-400">{totalUrls}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
