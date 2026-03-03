import { useState } from "react";
import { Eye, EyeOff, Check, Star, Loader2, Apple } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { ThemeToggle } from "../components/ui/Badges";

export default function LoginPage({ onLogin }) {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim()) e.lastName = true;
    if (!form.email.includes("@")) e.email = true;
    if (form.password.length < 8) e.password = true;
    if (!agreed) e.agreed = true;
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 900);
  };

  const handleChange = (field, val) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: false }));
  };

  const isDark = theme === "dark";

  return (
    <div
      className={`min-h-screen flex relative overflow-hidden ${isDark ? "bg-[#0d1117]" : "bg-[#f0f2f5]"}`}
    >
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div
        className="flex-1 flex flex-col justify-between p-12 relative overflow-hidden"
        style={{
          background: isDark
            ? "radial-gradient(ellipse at 20% 50%, #0a2f28 0%, #0d1117 50%), radial-gradient(ellipse at 80% 80%, #3d1a0a 0%, transparent 60%)"
            : "radial-gradient(ellipse at 20% 50%, #003d30 0%, #1a2a1a 50%), radial-gradient(ellipse at 80% 80%, #5c2a0a 0%, transparent 60%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="flex items-center gap-2.5 animate-fade-in">
          <div className="w-8 h-8 rounded-full bg-[#0CC8A8] flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-white" />
          </div>
          <span className="font-800 text-2xl text-white tracking-tight font-bold">
            aps
          </span>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl  font-bold font-700 text-white leading-tight mb-6 max-w-md">
            Expert level Cybersecurity in
            <span className="text-[#0CC8A8]"> hours</span> not weeks.
          </h1>

          <p className="text-white text-sm font-500 mb-5 font-bold">
            What's included
          </p>
          <ul className="space-y-3.5 font-semi-bold">
            {[
              "Effortlessly spider and map targets to uncover hidden security flaws",
              "Deliver high-quality, validated findings in hours, not weeks.",
              "Generate professional, enterprise-grade security reports automatically.",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-[#0CC8A8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check
                    size={8}
                    strokeWidth={2.5}
                    className="text-[#0CC8A8]"
                  />
                </div>
                <span className="text-white text-sm leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex gap-0.5">
              {[...Array(1)].map((_, i) => (
                <Star
                  key={i}
                  size={13}
                  fill="#0CC8A8"
                  className="text-[#0CC8A8]"
                />
              ))}
            </div>
            <span className="text-sm font-600 text-white">Trustpilot</span>
          </div>
          <p className="text-zinc-400 text-[13px]">
            <span className="text-white font-600">Rated 4.5/5.0</span>{" "}
            <span className="text-zinc-500">(100k+ reviews)</span>
          </p>
        </div>
      </div>

      <div
        className="flex items-center justify-center w-full max-w-[650px] p-8 animate-fade-in"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="w-full max-w-md rounded-2xl p-8 shadow-2xl bg-white">
          <h2 className="text-4xl font-700 font-bold text-gray-900 text-center mb-1">
            Sign up
          </h2>
          <p className="text-center text-gray-500 text-sm mb-7 font-bold">
            Already have an account?{" "}
            <button className="text-[#0CC8A8] font-500 hover:underline">
              Log in
            </button>
          </p>

          <div className="space-y-3.5">
            <input
              type="text"
              placeholder="First name*"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all
                ${errors.firstName ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/10"}`}
            />
            <input
              type="text"
              placeholder="Last name*"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all
                ${errors.lastName ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/10"}`}
            />
            <input
              type="email"
              placeholder="Email address*"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all
                ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/10"}`}
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password (8+ characters)*"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`w-full px-4 py-3 pr-12 rounded-xl border text-sm text-gray-900 placeholder-gray-400 outline-none transition-all
                  ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 bg-white focus:border-[#0CC8A8] focus:ring-2 focus:ring-[#0CC8A8]/10"}`}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? (
                  <EyeOff size={18} strokeWidth={1.5} />
                ) : (
                  <Eye size={18} strokeWidth={1.5} />
                )}
              </button>
            </div>

            <label
              className={`flex items-start gap-3 cursor-pointer ${errors.agreed ? "text-red-500" : ""}`}
            >
              <div
                onClick={() => {
                  setAgreed((a) => !a);
                  setErrors((e) => ({ ...e, agreed: false }));
                }}
                className={`w-4 h-4 mt-0.5 rounded shrink-0 border-2 flex items-center justify-center transition-all cursor-pointer
                  ${agreed ? "bg-[#0CC8A8] border-[#0CC8A8]" : errors.agreed ? "border-red-400" : "border-gray-300"}`}
              >
                {agreed && (
                  <Check size={9} strokeWidth={2.5} className="text-white" />
                )}
              </div>
              <span className="text-xs text-gray-500 leading-relaxed">
                I agree to Aps's{" "}
                <button className="text-[#0CC8A8] hover:underline">
                  Terms & Conditions
                </button>{" "}
                and acknowledge the{" "}
                <button className="text-[#0CC8A8] hover:underline">
                  Privacy Policy
                </button>
              </span>
            </label>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#0CC8A8] text-white font-600 text-sm transition-all hover:bg-[#09a98d] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </button>

            <div className="grid grid-cols-3 gap-2.5 pt-1">
              <button className="flex items-center justify-center gap-2 py-3 rounded-3xl bg-black text-white text-xs font-500 hover:bg-zinc-800 transition-colors">
                <svg
                  width="20"
                  height="25"
                  viewBox="0 0 384 512"
                  fill="currentColor"
                >
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-111.4-60.5-139.5zM222.2 73.3c21.9-25.9 19.6-61.6 19-73.3-24.2 1-48.5 14.9-62.8 33.3-14.2 18.2-22.9 44.1-20.1 69.3 25.1 1.9 49.1-11.6 63.9-29.3z" />
                </svg>
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-3xl bg-gray-50 border border-gray-200 text-gray-700 text-xs font-500 hover:bg-gray-100 transition-colors">
                <svg width="20" height="25" viewBox="0 0 14 14">
                  <path
                    d="M13.5 7.15c0-.5-.04-1-.13-1.48H7v2.8h3.65c-.16.85-.63 1.56-1.35 2.04v1.7h2.18c1.28-1.18 2.02-2.92 2.02-5.06z"
                    fill="#4285F4"
                  />
                  <path
                    d="M7 14c1.83 0 3.37-.6 4.48-1.64l-2.18-1.7c-.6.4-1.38.64-2.3.64-1.77 0-3.27-1.2-3.8-2.8H.96v1.75C2.06 12.42 4.38 14 7 14z"
                    fill="#34A853"
                  />
                  <path
                    d="M3.2 8.5c-.14-.4-.21-.82-.21-1.25s.07-.85.21-1.25V4.25H.96C.35 5.44 0 6.68 0 7.25s.35 1.8.96 3l2.24-1.75z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M7 2.79c1 0 1.9.34 2.6 1.02l1.95-1.95C10.37.74 8.83 0 7 0 4.38 0 2.06 1.58.96 3.87L3.2 5.62C3.73 4 5.23 2.79 7 2.79z"
                    fill="#EA4335"
                  />
                </svg>
                
              </button>
              <button className="flex items-center justify-center gap-2 py-3 rounded-3xl bg-blue-600 text-white text-xs font-500 hover:bg-blue-700 transition-colors">
                <img src="./meta.svg" alt="" className="w-6" />
               
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
