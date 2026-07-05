import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Link2, ShieldCheck, LoaderCircle, TriangleAlert } from "lucide-react";

interface VerifyOtpForm {
  otp: string;
}

const VerifyOtp = () => {
  document.title = "MicroLink | Verify OTP";

  // TODO: Replace with API error state
  const [apiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpForm>({
    mode: "onBlur",
    defaultValues: {
      otp: "",
    },
  });

  const submitHandler = async (data: VerifyOtpForm) => {
    console.log(data);

    // TODO: Verify OTP API

    reset();
  };

  return (
    <div className="h-screen overflow-hidden bg-zinc-950 bg-[radial-gradient(circle_at_top,rgba(37,99,235,.15),transparent_60%)] text-white">
      {/* Navbar */}

      <nav className="h-16 border-b border-zinc-800 backdrop-blur">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <div className="flex items-center gap-2">
            <Link2 className="text-blue-500" size={28} />
            <h1 className="text-2xl font-bold tracking-tight">MicroLink</h1>
          </div>
        </div>
      </nav>

      {/* Verify OTP */}

      <main className="flex h-[calc(100vh-64px)] items-center justify-center px-5">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700">
          <h2 className="text-3xl font-bold">Verify Your Email</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Enter the 6-digit verification code sent to your email.
          </p>

          {apiError && (
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
              <TriangleAlert size={18} />
              <p className="text-sm">{apiError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit(submitHandler)}
            className="mt-8 space-y-7"
          >
            {/* OTP */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Verification Code
              </label>

              <div className="relative">
                <ShieldCheck
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="text"
                  maxLength={6}
                  autoComplete="one-time-code"
                  placeholder="Enter OTP"
                  className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-4 text-center text-xl tracking-[0.6em] text-white placeholder:text-zinc-500 outline-none transition-all duration-200 ${
                    errors.otp
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                  }`}
                  {...register("otp", {
                    required: "OTP is required.",
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: "OTP must contain exactly 6 digits.",
                    },
                  })}
                />
              </div>

              {errors.otp && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.otp.message}
                </p>
              )}
            </div>

            {/* Verify */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold transition-all duration-200 hover:scale-[1.02] hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <LoaderCircle size={18} className="animate-spin" />
              )}

              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <p className="mt-7 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-400">
            Wrong account?{" "}
            <Link
              to="/"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default VerifyOtp;
