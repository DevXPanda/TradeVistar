"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identity === "tradevistar@gmail.com" && password === "123456") {
      router.push("/buyerportal");
    } else {
      alert("Invalid credentials. Hint: Use tradevistar@gmail.com and 123456 for testing.");
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE-ONLY VIEW (< md)                                                   */}
      {/* ========================================================================= */}
      <div className="md:hidden min-h-screen flex flex-col bg-[#fcf8fa] font-body-md text-[#1b1b1d] antialiased">
        {/* Header Section */}
        <header className="fixed top-0 w-full z-50 bg-[#fcf8fa]/80 backdrop-blur-xl border-b border-outline-variant/30 px-4 py-3 flex justify-between items-center shadow-sm h-16">
          <Link href="/" className="font-label-caps text-label-caps tracking-[0.2em] text-primary">
            TRADEVISTAR
          </Link>
          <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center overflow-hidden border border-outline-variant/30">
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">enterprise</span>
          </div>
        </header>

        <main className="flex-grow pt-16 flex flex-col">
          {/* High Impact Brand Section */}
          <section className="relative w-full h-[309px] min-h-[260px] overflow-hidden flex flex-col justify-end p-6 pb-14">
            <div className="absolute inset-0 z-0">
              <Image
                alt="Global Logistics twilight"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGZgK35I1HnfXtdEZA0H1L5fNqQaaj6SZ5K33mYeqDGFbZThJDWi_CwuJnuoSUYlilLfSrLHFuJ_s9R4Z5F7nFa8_AlFVUHKX8UFyzSJh3tRpKiEr6E7OzGi-CSg_HBY1vQcb3l-D0zgrdBBIC8F1NWF9qcY-9QS7K7RqFnq1tea5mbmmJxd4KKI1LTZdLvopOw9IMBCyYZzObxBzD7A8XLPh7ET9c9_8UK2mc7xlE0GtoXupOuDDhKpEIGIn9amh9UKtcMTTvyOdB"
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
            </div>
            <div className="relative z-10 space-y-2 max-w-md text-white">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-on-tertiary-container/20 backdrop-blur-md rounded text-tertiary-fixed text-[10px] font-label-caps border border-white/10 uppercase tracking-widest">
                Infrastructure Grade
              </div>
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white leading-tight">
                Access <span className="text-trade-orange">India&apos;s</span> Trusted Trade Network
              </h1>
              <p className="text-white/75 text-body-md max-w-[280px]">
                Secure gateway for verified global trade operations.
              </p>
            </div>
          </section>

          {/* Login Section */}
          <section className="flex-grow -mt-8 relative z-20 px-4 pb-8">
            <div className="glass px-6 py-8 rounded-xl border border-outline-variant/30 flex flex-col gap-6 ambient-plume bg-white/85">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Identity Input */}
                <div className="space-y-1">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant px-1">
                    Business Email / Mobile Number
                  </label>
                  <input
                    type="text"
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    required
                    className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary-container rounded-lg outline-none font-body-md transition-colors"
                    placeholder="name@enterprise.com"
                  />
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant">
                      Password
                    </label>
                    <Link
                      href="#"
                      className="text-label-sm text-on-primary-container font-medium hover:text-primary transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full h-12 px-4 bg-surface-container-low border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary-container rounded-lg outline-none font-body-md transition-colors"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2 px-1">
                  <input
                    id="remember-mobile"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-outline-variant text-[#0f172a] focus:ring-[#0f172a]/20"
                  />
                  <label htmlFor="remember-mobile" className="text-label-sm text-on-surface-variant cursor-pointer">
                    Remember me
                  </label>
                </div>

                {/* Primary CTA */}
                <button
                  type="submit"
                  className="w-full h-14 bg-trade-orange text-white rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all hover:bg-trade-orange/90"
                >
                  Login to TradeVistar
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>

                {/* Divider */}
                <div className="flex items-center gap-2 py-1">
                  <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
                  <span className="text-label-sm text-on-surface-variant/50 font-label-caps">OR</span>
                  <div className="h-[1px] flex-grow bg-outline-variant/30"></div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  className="w-full h-12 border border-outline-variant rounded-lg bg-white flex items-center justify-center gap-3 hover:bg-surface-container-low transition-colors active:opacity-75"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-5.38z"
                      fill="#EA4335"
                    ></path>
                  </svg>
                  <span className="font-body-md text-on-surface">Continue with Google</span>
                </button>

                {/* OTP Login */}
                <button
                  type="button"
                  className="w-full h-12 border border-outline-variant rounded-lg bg-white flex items-center justify-center gap-3 hover:bg-surface-container-low transition-colors active:opacity-75"
                >
                  <span className="material-symbols-outlined text-[20px] text-secondary">sms</span>
                  <span className="font-body-md text-on-surface">Login with OTP</span>
                </button>

                {/* Register Link */}
                <div className="text-center pt-2">
                  <p className="font-body-md text-on-surface-variant">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-primary font-semibold hover:underline decoration-2 underline-offset-4">
                      Create Business Account
                    </Link>
                  </p>
                </div>
              </form>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-outline-variant/30 flex justify-between items-center px-1">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-trade-orange">verified</span>
                  <span className="text-[9px] font-label-caps text-on-surface-variant">GST Verified</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-trade-orange">security</span>
                  <span className="text-[9px] font-label-caps text-on-surface-variant">KYC Secured</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-[20px] text-trade-orange">hub</span>
                  <span className="text-[9px] font-label-caps text-on-surface-variant">Secure Trades</span>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-auto w-full py-6 px-6 bg-surface-container-highest border-t border-outline-variant/30 flex flex-col gap-3">
          <div className="font-label-caps text-[10px] text-primary tracking-widest opacity-60">
            TRADEVISTAR INFRASTRUCTURE
          </div>
          <p className="text-[11px] text-on-surface-variant leading-relaxed">
            © 2026 TradeVistar Infrastructure. Global Trade Backbone. Ensuring seamless cross-border commerce for verified enterprises.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link className="text-[11px] font-medium text-on-surface-variant underline" href="#">
              Privacy Protocol
            </Link>
            <Link className="text-[11px] font-medium text-on-surface-variant underline" href="#">
              Compliance
            </Link>
            <Link className="text-[11px] font-medium text-on-surface-variant underline" href="#">
              Support
            </Link>
          </div>
        </footer>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP-ONLY VIEW (>= md)                                                 */}
      {/* ========================================================================= */}
      <div className="hidden md:grid min-h-screen grid-cols-[45%_55%] bg-[#fcf8fa] font-body-md text-[#1b1b1d] selection:bg-primary-fixed">
        {/* Left Side: Brand Narrative & Visuals */}
        <section className="flex flex-col justify-between p-16 bg-[#0f172a] relative overflow-hidden text-white">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              alt="Global Trade Network Visualization"
              className="w-full h-full object-cover opacity-40"
              src="https://lh3.googleusercontent.com/aida/AP1WRLvHHJBpic0_MmNKL5tXh6-4Ey1_S9K0EpcZ5YCRVnHhOAQsteQ8K_Lw7iRoldIWG-MigNPagVgwlwm5X9VOVyNxHR8RgC9a84GlDg83GFLeAs3DWxUQuZgT8vtdU5u3wHiZ1fUgOLDuTgMvoj4MqqKtN2rm12LovCOJtDTst9k5I6mYGXYgHwcXE4jNYi8hGEvjF5zRfR2Cwigrru9-uhBlyp_y0DhY67fUOeM-VtofnFmWcau2Q7omFjY"
              fill
              sizes="50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0f172a] via-transparent to-transparent"></div>
          </div>

          {/* Logo */}
          <div className="relative z-10">
            <Link href="/">
              <Image
                alt="TradeVistar Logo"
                className="h-10 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AP1WRLsymNWioME4HErS5wWqxRptyfkfLOZXpzA2lBkkOQ_Fb9tWpKfzu3iAgNzx_3CRf2sKOKIyQf7Blv4AmVwsnDMI5i4yJpXsHL0Rl1OgMmK_RKwKFLMu54oNRyj20F-FC8oJr09n1mpvAUN9kbAWD9OfFJX0E-bcWwlYBWAue2CCe7LPwPV-o_ohhRh-ITa8-c1DNtjwg3vKAqc1RnCjfnpLfvwgPyGDEK1iV5J83Z1wpB6ZePeXShuAItPs"
                width={150}
                height={40}
                priority
              />
            </Link>
          </div>

          {/* Main Visual/Narrative */}
          <div className="relative z-10 max-w-xl my-auto space-y-6">
            <h1 className="font-display-lg text-display-lg text-white leading-tight font-bold">
              Access <span className="text-trade-orange">India&apos;s</span> Trusted Trade Network
            </h1>
            <p className="font-body-lg text-body-lg text-[#c6c6cd] opacity-80 leading-relaxed">
              Leverage the power of enterprise-grade logistics and secured trade settlements. Connect with the nation&apos;s premier manufacturing and distribution ecosystem.
            </p>

            {/* Statistics Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 p-6 border border-white/10 rounded-lg bg-white/5">
                <span className="font-headline-md text-headline-md text-white font-semibold">85K+</span>
                <span className="font-label-sm text-label-sm text-[#c6c6cd] uppercase tracking-wider">Verified Suppliers</span>
              </div>
              <div className="flex flex-col gap-2 p-6 border border-white/10 rounded-lg bg-white/5">
                <span className="font-headline-md text-headline-md text-white font-semibold">₹4.2B+</span>
                <span className="font-label-sm text-label-sm text-[#c6c6cd] uppercase tracking-wider">Trade Volume</span>
              </div>
              <div className="flex flex-col gap-2 p-6 border border-white/10 rounded-lg bg-white/5">
                <span className="font-headline-md text-headline-md text-white font-semibold">120+</span>
                <span className="font-label-sm text-label-sm text-[#c6c6cd] uppercase tracking-wider">Active Regions</span>
              </div>
              <div className="flex flex-col gap-2 p-6 border border-white/10 rounded-lg bg-white/5">
                <span className="font-headline-md text-headline-md text-white font-semibold">99.9%</span>
                <span className="font-label-sm text-label-sm text-[#c6c6cd] uppercase tracking-wider">Security Rate</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Bar */}
          <div className="relative z-10 flex items-center gap-6 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/60">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-label-caps text-label-caps text-xs">GST VERIFIED</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span className="material-symbols-outlined text-[18px]">badge</span>
              <span className="font-label-caps text-label-caps text-xs">KYC SECURED</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span className="font-label-caps text-label-caps text-xs">AES-256 ENCRYPTED</span>
            </div>
          </div>
        </section>

        {/* Right Side: Login Form Terminal */}
        <section className="flex-1 flex flex-col items-center justify-center p-16 bg-white">
          <div className="w-full max-w-[440px] space-y-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-[#1b1b1d] mb-1 font-semibold">Welcome Back</h2>
              <p className="font-body-md text-body-md text-secondary">Access your enterprise trade dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Identity */}
              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="identity-desktop">
                  Business Email / Mobile Number
                </label>
                <input
                  id="identity-desktop"
                  type="text"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg text-body-md outline-none transition-all duration-200"
                  placeholder="Enter your business credentials"
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="block font-label-sm text-label-sm text-on-surface" htmlFor="password-desktop">
                    Password
                  </label>
                  <Link href="#" className="font-label-sm text-label-sm text-on-secondary-container hover:underline underline-offset-4">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    id="password-desktop"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-outline-variant focus:border-primary-container focus:ring-1 focus:ring-primary-container rounded-lg text-body-md outline-none transition-all duration-200"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center space-x-2">
                <input
                  id="remember-desktop"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-outline-variant text-[#0f172a] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="remember-desktop" className="font-body-md text-body-md text-on-surface-variant cursor-pointer">
                  Remember this device for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 bg-trade-orange text-white font-label-sm text-label-sm font-semibold rounded-lg hover:bg-trade-orange/90 transition-all duration-200 ambient-plume active:scale-[0.99]"
              >
                Login to TradeVistar
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-outline-variant/30"></div>
                <span className="flex-shrink mx-4 font-label-caps text-label-caps text-outline uppercase">OR</span>
                <div className="flex-grow border-t border-outline-variant/30"></div>
              </div>

              {/* Google Button */}
              <button
                type="button"
                className="w-full py-3 px-4 bg-white border border-outline-variant text-on-surface font-label-sm text-label-sm font-medium rounded-lg hover:bg-surface-container-low transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
                Continue with Google
              </button>
            </form>

            {/* Extra CTA & Links */}
            <div className="text-center space-y-4 pt-4">
              <button className="font-label-sm text-label-sm text-on-secondary-container hover:underline underline-offset-4 font-semibold">
                Login with One-Time Password (OTP)
              </button>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-[#0f172a] font-semibold hover:underline underline-offset-4">
                  Create Business Account
                </Link>
              </p>
            </div>

            {/* Trust Badges */}
            <div className="pt-8 border-t border-outline-variant/30 flex justify-center gap-6">
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                <span className="font-label-caps text-label-caps text-xs">GST VERIFIED</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px] text-secondary">person_check</span>
                <span className="font-label-caps text-label-caps text-xs">KYC SECURED</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-[18px] text-secondary">encrypted</span>
                <span className="font-label-caps text-label-caps text-xs">SECURE TRADES</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
