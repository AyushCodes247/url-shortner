import { Link } from "react-router";
import { motion } from "motion/react";
import { Link2, UserCircle2 } from "lucide-react";

interface DashboardNavbarProps {
  name: string;
  email: string;
}

const DashNav = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-2 transition hover:opacity-90"
        >
          <Link2 size={28} className="text-blue-500" />

          <h1 className="text-2xl font-bold tracking-tight text-white">
            MicroLink
          </h1>
        </Link>
      </div>
    </motion.nav>
  );
};

export default DashNav;
