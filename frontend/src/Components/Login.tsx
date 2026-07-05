import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  LoaderCircle,
  Link2,
  TriangleAlert,
} from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
    document.title = "MicroLink | Login"
  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  // TODO: Replace with API error state
  const [apiError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: LoginForm) => {
    console.log(data);

    // await login mutation

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

      {/* Login */}

      <main className="flex h-[calc(100vh-64px)] items-center justify-center px-5">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/90 p-8 shadow-2xl shadow-blue-500/5 backdrop-blur-xl transition-all duration-300 hover:border-zinc-700">
          <h2 className="text-3xl font-bold">Welcome Back</h2>

          <p className="mt-1 text-sm text-zinc-500">
            Sign in to your MicroLink account.
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
            {/* Email */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-4 text-white placeholder:text-zinc-500 outline-none transition-all duration-200 ${
                    errors.email
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                  }`}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email.",
                    },
                  })}
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
                  className={`w-full rounded-xl border bg-zinc-800 py-3 pl-11 pr-12 text-white placeholder:text-zinc-500 outline-none transition-all duration-200 ${
                    errors.password
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                  }`}
                  {...register("password", {
                    required: "Password is required.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters.",
                    },
                  })}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {capsLock && (
                <p className="mt-2 text-sm text-yellow-400">Caps Lock is ON</p>
              )}

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold transition-all duration-200 hover:scale-[1.02] hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting && (
                <LoaderCircle size={18} className="animate-spin" />
              )}

              {isSubmitting ? "Signing In..." : "Continue"}
            </button>
          </form>

          <p className="mt-7 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 transition hover:text-blue-300"
            >
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;
