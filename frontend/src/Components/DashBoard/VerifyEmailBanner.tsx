import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ShieldAlert, ArrowRight } from "lucide-react";

const VerifyEmailBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.45,
      }}
      className="mx-auto mt-8 max-w-7xl px-6"
    >
      <div className="overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent shadow-xl backdrop-blur-xl">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          {/* Left */}

          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-amber-500/20 p-3">
              <ShieldAlert
                size={28}
                className="text-amber-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Verify your email
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                Your account hasn't been verified yet. Verify your email
                address to unlock all MicroLink features and keep your account
                secure.
              </p>
            </div>
          </div>

          {/* Button */}

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.96,
            }}
            onClick={() => navigate("/verify")}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:from-blue-500 hover:to-indigo-500"
          >
            Verify Email

            <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default VerifyEmailBanner;