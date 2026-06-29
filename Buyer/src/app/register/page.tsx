"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role");
  const [prevRoleParam, setPrevRoleParam] = useState<string | null>(roleParam);
  const [role, setRole] = useState<"buyer" | "supplier">(
    roleParam === "supplier" ? "supplier" : "buyer"
  );

  if (roleParam !== prevRoleParam) {
    setPrevRoleParam(roleParam);
    setRole(roleParam === "supplier" ? "supplier" : "buyer");
  }

  const [showPassword, setShowPassword] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // Supplier fields
  const [businessType, setBusinessType] = useState("");
  const [industry, setIndustry] = useState("");
  const [yearEst, setYearEst] = useState("");
  const [employees, setEmployees] = useState("1-10");
  const [turnover, setTurnover] = useState("Under ₹1Cr");
  const [primaryProduct, setPrimaryProduct] = useState("");

  const [isVerifyingGst, setIsVerifyingGst] = useState(false);
  const [gstVerified, setGstVerified] = useState(false);

  const handleVerifyGst = () => {
    if (!gstNumber) return;
    setIsVerifyingGst(true);
    setTimeout(() => {
      setIsVerifyingGst(false);
      setGstVerified(true);
      alert("GST Verification successful for: " + gstNumber);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Account registration submitted for role: ${role}`);
  };

  const getPasswordStrength = () => {
    if (!password) return { label: "None", color: "bg-surface-container", width: "w-0" };
    if (password.length < 6) return { label: "Weak", color: "bg-primary", width: "w-1/3" };
    if (password.length < 10) return { label: "Medium", color: "bg-primary", width: "w-2/3" };
    return { label: "Strong", color: "bg-primary", width: "w-full" };
  };

  const strength = getPasswordStrength();

  return (
    <>
      {/* ========================================================================= */}
      {/* MOBILE-ONLY VIEW (< md)                                                   */}
      {/* ========================================================================= */}
      <div className="md:hidden min-h-screen flex flex-col bg-[#fcf8fa] font-body-md text-[#1b1b1d] antialiased">
        {/* Top App Bar */}
        <header className="fixed top-0 w-full z-50 bg-[#fcf8fa]/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-4 py-3 h-16 shadow-sm">
          <Link href="/" className="p-2 hover:bg-surface-container-low transition-colors rounded-full active:opacity-75">
            <span className="material-symbols-outlined text-primary">close</span>
          </Link>
          <div className="font-label-caps text-label-caps tracking-[0.2em] text-primary">TRADEVISTAR</div>
          <div className="w-10"></div>
        </header>

        <main className="flex-grow pt-24 pb-12 px-4 max-w-md mx-auto flex flex-col gap-8">
          {/* Hero Section */}
          <section className="flex flex-col gap-1">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-semibold">
              Create Business Account
            </h1>
            <p className="font-body-lg text-on-surface-variant">
              Start your journey with <span className="text-trade-orange">India&apos;s</span> trusted B2B infrastructure.
            </p>
          </section>

          {/* Role Selection */}
          <section className="flex flex-col gap-3">
            <h2 className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
              Select Your Role
            </h2>
            <div className="flex flex-col gap-3">
              {/* Buyer Card */}
              <label
                onClick={() => setRole("buyer")}
                className={`cursor-pointer block group rounded-xl border transition-all duration-300 shadow-sm bg-white ${role === "buyer" ? "border-black bg-slate-50/50 ring-1 ring-black" : "border-outline-variant/50"
                  }`}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role === "buyer" ? "bg-black text-white" : "bg-secondary-container text-primary"
                      }`}>
                      <span className="material-symbols-outlined">shopping_cart</span>
                    </div>
                    <div>
                      <div className="font-headline-md text-headline-md text-primary">Buyer</div>
                      <div className="font-body-md text-on-surface-variant">Sourcing goods &amp; services</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${role === "buyer" ? "border-black" : "border-outline-variant"
                    }`}>
                    {role === "buyer" && <div className="w-3 h-3 rounded-full bg-black"></div>}
                  </div>
                </div>
              </label>

              {/* Supplier Card */}
              <label
                onClick={() => setRole("supplier")}
                className={`cursor-pointer block group rounded-xl border transition-all duration-300 shadow-sm bg-white ${role === "supplier" ? "border-black bg-slate-50/50 ring-1 ring-black" : "border-outline-variant/50"
                  }`}
              >
                <div className="flex items-center justify-between p-4 pb-3">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${role === "supplier" ? "bg-black text-white" : "bg-secondary-container text-primary"
                      }`}>
                      <span className="material-symbols-outlined">factory</span>
                    </div>
                    <div>
                      <div className="font-headline-md text-headline-md text-primary">Supplier</div>
                      <div className="font-body-md text-on-surface-variant">Providing infrastructure &amp; supply</div>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${role === "supplier" ? "border-black" : "border-outline-variant"
                    }`}>
                    {role === "supplier" && <div className="w-3 h-3 rounded-full bg-black"></div>}
                  </div>
                </div>
                {/* Badges if active */}
                {role === "supplier" && (
                  <div className="flex flex-wrap gap-1 px-4 pb-4 pt-2 border-t border-outline-variant/20">
                    <div className="flex items-center gap-1 px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-caps uppercase tracking-wider text-on-surface">
                      <span className="material-symbols-outlined text-[14px]">factory</span> Factory
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-caps uppercase tracking-wider text-on-surface">
                      <span className="material-symbols-outlined text-[14px]">hub</span> Network
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-surface-container-highest rounded text-[10px] font-label-caps uppercase tracking-wider text-on-surface">
                      <span className="material-symbols-outlined text-[14px]">assignment</span> RFQs
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-tertiary-fixed rounded text-[10px] font-label-caps uppercase tracking-wider text-on-tertiary-fixed-variant">
                      <span className="material-symbols-outlined text-[14px]">verified</span> Growth
                    </div>
                  </div>
                )}
              </label>
            </div>
          </section>

          {/* Form Section */}
          <section className="flex flex-col gap-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Company Name */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant px-1">Company Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-black transition-all font-body-lg"
                  placeholder="Acme Logistics Pvt Ltd"
                />
              </div>

              {/* GST Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant px-1">GST Number</label>
                <div className="relative flex gap-2">
                  <input
                    type="text"
                    value={gstNumber}
                    onChange={(e) => setGstNumber(e.target.value)}
                    required
                    className="flex-grow bg-white border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-black transition-all font-label-caps uppercase"
                    placeholder="22AAAAA0000A1Z5"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyGst}
                    className="bg-primary text-on-primary px-4 py-3.5 rounded-xl font-label-caps text-xs active:scale-95 transition-transform"
                  >
                    {isVerifyingGst ? "VERIFYING..." : gstVerified ? "VERIFIED" : "VERIFY"}
                  </button>
                </div>
              </div>

              {/* Business Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant px-1">Business Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 focus:outline-none focus:border-black transition-all font-body-lg"
                  placeholder="procurement@acme.com"
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant px-1">Mobile Number</label>
                <div className="flex bg-white border border-outline-variant rounded-xl overflow-hidden focus-within:border-black transition-all">
                  <div className="flex items-center gap-1 px-3 border-r border-outline-variant bg-surface-container-low text-on-surface-variant font-label-caps">
                    <span>+91</span>
                    <span className="material-symbols-outlined text-[16px]">keyboard_arrow_down</span>
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                    className="w-full border-none px-4 py-3.5 focus:ring-0 font-body-lg outline-none"
                    placeholder="98765 43210"
                  />
                </div>
              </div>

              {/* Supplier-specific Sub-Form */}
              {role === "supplier" && (
                <div className="flex flex-col gap-4 pt-4 border-t border-outline-variant/30 transition-all duration-500">
                  <h4 className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
                    Supplier Onboarding
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block font-label-sm text-on-surface-variant">Business Type</label>
                      <select
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        required
                        className="w-full h-12 px-3 rounded-lg border border-outline-variant bg-white focus:border-black transition-all text-body-md outline-none"
                      >
                        <option value="">Select</option>
                        <option>Manufacturer</option>
                        <option>Wholesaler</option>
                        <option>Distributor</option>
                        <option>Exporter</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block font-label-sm text-on-surface-variant">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        required
                        className="w-full h-12 px-3 rounded-lg border border-outline-variant bg-white focus:border-black transition-all text-body-md outline-none"
                      >
                        <option value="">Select</option>
                        <option>Electronics</option>
                        <option>Textiles</option>
                        <option>Automotive</option>
                        <option>Healthcare</option>
                        <option>Chemicals</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-4 bg-surface-container-low rounded-xl border border-outline-variant/30">
                    <p className="font-label-caps text-[10px] text-on-secondary-fixed-variant mb-3">
                      ADDITIONAL SUPPLIER INFO
                    </p>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center py-1.5 border-b border-outline-variant/20">
                        <span className="font-body-md text-on-surface">Year Established</span>
                        <input
                          type="number"
                          value={yearEst}
                          onChange={(e) => setYearEst(e.target.value)}
                          className="w-24 h-10 px-2 text-right border-none bg-transparent focus:ring-0 font-label-caps outline-none"
                          placeholder="2010"
                        />
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-outline-variant/20">
                        <span className="font-body-md text-on-surface">Employees</span>
                        <select
                          value={employees}
                          onChange={(e) => setEmployees(e.target.value)}
                          className="h-10 border-none bg-transparent focus:ring-0 font-label-caps outline-none text-right cursor-pointer"
                        >
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>51-200</option>
                          <option>201-500</option>
                          <option>500+</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-outline-variant/20">
                        <span className="font-body-md text-on-surface">Annual Turnover</span>
                        <select
                          value={turnover}
                          onChange={(e) => setTurnover(e.target.value)}
                          className="h-10 border-none bg-transparent focus:ring-0 font-label-caps outline-none text-right cursor-pointer"
                        >
                          <option>Under ₹1Cr</option>
                          <option>₹1Cr - ₹10Cr</option>
                          <option>₹10Cr - ₹50Cr</option>
                          <option>₹50Cr - ₹100Cr</option>
                          <option>Above ₹100Cr</option>
                        </select>
                      </div>
                      <div className="flex justify-between items-center py-1.5">
                        <span className="font-body-md text-on-surface">Primary Category</span>
                        <input
                          type="text"
                          value={primaryProduct}
                          onChange={(e) => setPrimaryProduct(e.target.value)}
                          className="w-32 h-10 px-2 text-right border-none bg-transparent focus:ring-0 font-label-caps outline-none"
                          placeholder="Semiconductors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-on-surface-variant px-1">Security Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-white border border-outline-variant rounded-xl px-4 py-3.5 pr-12 focus:outline-none focus:border-black transition-all font-body-lg"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant active:opacity-50 transition-opacity"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {/* Strength Meter */}
                {password && (
                  <div className="space-y-1 mt-1">
                    <div className="h-1 w-full bg-surface-container-low rounded-full overflow-hidden">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
                    </div>
                    <p className={`font-label-sm ${strength.label === "Weak" ? "text-red-500" : strength.label === "Medium" ? "text-yellow-600" : "text-green-600"
                      }`}>
                      {strength.label} password
                    </p>
                  </div>
                )}
              </div>

              {/* Create Account Buttons */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full bg-trade-orange text-white py-4 rounded-xl font-headline-md hover:bg-trade-orange/90 active:scale-[0.98] transition-all shadow-md"
                >
                  Create Account
                </button>
                <div className="flex items-center gap-4 py-2">
                  <div className="h-[1px] flex-grow bg-outline-variant"></div>
                  <span className="font-label-caps text-on-surface-variant">OR</span>
                  <div className="h-[1px] flex-grow bg-outline-variant"></div>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 bg-white border border-outline-variant py-4 rounded-xl font-headline-md text-primary hover:bg-surface-container-low active:scale-[0.98] transition-all"
                >
                  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="font-body-md text-on-surface-variant">
                  Already have a business account?{" "}
                  <Link href="/login" className="text-primary font-bold underline">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </section>

          {/* Trust Indicators */}
          <section className="flex flex-col gap-3 py-4">
            <div className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/50">
              <span className="material-symbols-outlined text-on-tertiary-container">verified_user</span>
              <div>
                <h4 className="font-headline-md text-sm text-primary font-semibold">GST Verified</h4>
                <p className="font-body-md text-xs text-on-surface-variant">Instantly linked with government databases</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/50">
              <span className="material-symbols-outlined text-on-tertiary-container">security</span>
              <div>
                <h4 className="font-headline-md text-sm text-primary font-semibold">KYC Secured</h4>
                <p className="font-body-md text-xs text-on-surface-variant">Enterprise-level identity verification</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl border border-outline-variant/30 bg-surface-container-low/50">
              <span className="material-symbols-outlined text-on-tertiary-container">lock</span>
              <div>
                <h4 className="font-headline-md text-sm text-primary font-semibold">AES-256 Encrypted</h4>
                <p className="font-body-md text-xs text-on-surface-variant">Military-grade protection</p>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-surface-container-highest w-full py-6 px-4 flex flex-col items-start gap-3 border-t border-outline-variant mb-16">
          <div className="font-label-caps text-label-caps text-primary">TRADEVISTAR INFRASTRUCTURE</div>
          <p className="font-body-md text-on-surface opacity-70 text-xs">© 2024 TradeVistar Infrastructure. Global Trade Backbone.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs">
            <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Privacy Protocol</Link>
            <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Terms of Service</Link>
            <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Compliance</Link>
            <Link className="font-body-md text-on-surface-variant hover:text-primary transition-colors cursor-pointer" href="#">Support</Link>
          </div>
        </footer>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 w-full z-50 bg-white/90 backdrop-blur-md border-t border-outline-variant/20 shadow-lg flex justify-around items-center h-16 px-4 pb-safe">
          <div className="flex flex-col items-center justify-center text-primary scale-110 cursor-pointer">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-sm text-label-sm">Dashboard</span>
          </div>
          <div className="flex flex-col items-center justify-center text-on-secondary-container/60 cursor-pointer">
            <span className="material-symbols-outlined">local_shipping</span>
            <span className="font-label-sm text-label-sm">Shipments</span>
          </div>
          <div className="flex flex-col items-center justify-center text-on-secondary-container/60 cursor-pointer">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-sm text-label-sm">Orders</span>
          </div>
          <div className="flex flex-col items-center justify-center text-on-secondary-container/60 cursor-pointer">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-sm text-label-sm">Settings</span>
          </div>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP-ONLY VIEW (>= md)                                                 */}
      {/* ========================================================================= */}
      <div className="hidden md:grid min-h-screen grid-cols-[45%_55%] bg-[#fcf8fa] font-body-md text-[#1b1b1d] selection:bg-primary/10">
        {/* Left Side: Visual & Narrative */}
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

          <div className="relative z-10 space-y-8">
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
            <div className="max-w-md space-y-6">
              <h1 className="font-display-lg text-display-lg text-white leading-tight font-bold">
                Build Your Business Infrastructure
              </h1>
              <p className="font-body-lg text-body-lg text-[#c6c6cd] opacity-80 leading-relaxed">
                Join 85,000+ verified businesses scaling their trade operations through <span className="text-trade-orange">India&apos;s</span> trusted B2B network.
              </p>
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

        {/* Right Side: Registration Form */}
        <section className="flex flex-col items-center justify-center p-16 bg-white overflow-y-auto">
          <div className="w-full max-w-lg space-y-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-1">Create Business Account</h2>
              <p className="font-body-md text-body-md text-secondary">Start your journey with <span className="text-trade-orange">India&apos;s</span> trusted B2B infrastructure.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div className="space-y-2">
                <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">I am joining as a</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`flex flex-col items-start p-4 border rounded-xl transition-all duration-200 text-left ${role === "buyer" ? "border-black bg-slate-50 ring-1 ring-black" : "border-outline-variant hover:border-on-surface"
                      }`}
                  >
                    <span className={`material-symbols-outlined mb-2 ${role === "buyer" ? "text-black" : "text-secondary"}`}>shopping_cart</span>
                    <span className="font-body-md font-semibold text-on-surface">Buyer</span>
                    <span className="font-label-sm text-secondary text-xs mt-1">Sourcing goods &amp; services</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("supplier")}
                    className={`flex flex-col items-start p-4 border rounded-xl transition-all duration-200 text-left ${role === "supplier" ? "border-black bg-slate-50 ring-1 ring-black" : "border-outline-variant hover:border-on-surface"
                      }`}
                  >
                    <span className={`material-symbols-outlined mb-2 ${role === "supplier" ? "text-black" : "text-secondary"}`}>factory</span>
                    <span className="font-body-md font-semibold text-on-surface">Supplier</span>
                    <span className="font-label-sm text-secondary text-xs mt-1">Manufacturing &amp; trade</span>
                  </button>
                </div>
              </div>

              {/* Business Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="company-desktop">Company Name</label>
                  <input
                    id="company-desktop"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required
                    className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none transition-all placeholder:text-outline"
                    placeholder="Enter legal company name"
                  />
                </div>
                <div className="flex flex-col gap-1.5 relative">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="gst-desktop">GST Number</label>
                  <div className="relative">
                    <input
                      id="gst-desktop"
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none transition-all placeholder:text-outline uppercase font-label-caps"
                      placeholder="22AAAAA0000A1Z5"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyGst}
                      className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/5 text-black font-label-caps text-[10px] rounded border border-black/10 hover:bg-black/10 transition-colors"
                    >
                      {isVerifyingGst ? "VERIFYING" : gstVerified ? "VERIFIED" : "VERIFY"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Supplier specific details */}
              {role === "supplier" && (
                <div className="space-y-4 pt-4 border-t border-outline-variant/30 transition-all duration-300">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="type-desktop">Business Type</label>
                      <select
                        id="type-desktop"
                        value={businessType}
                        onChange={(e) => setBusinessType(e.target.value)}
                        required
                        className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-body-md"
                      >
                        <option value="">Select Type</option>
                        <option>Manufacturer</option>
                        <option>Wholesaler</option>
                        <option>Distributor</option>
                        <option>Exporter</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="industry-desktop">Industry</label>
                      <select
                        id="industry-desktop"
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        required
                        className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-body-md"
                      >
                        <option value="">Select Industry</option>
                        <option>Electronics</option>
                        <option>Textiles</option>
                        <option>Chemicals</option>
                        <option>Construction</option>
                        <option>Automotive</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-surface-container/30 p-6 rounded-xl space-y-4">
                    <h3 className="font-label-caps text-label-caps text-primary tracking-widest font-semibold">ADDITIONAL SUPPLIER INFO</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="year-desktop">Year Established</label>
                        <input
                          id="year-desktop"
                          type="number"
                          value={yearEst}
                          onChange={(e) => setYearEst(e.target.value)}
                          className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                          placeholder="e.g. 1995"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="emp-desktop">Number of Employees</label>
                        <select
                          id="emp-desktop"
                          value={employees}
                          onChange={(e) => setEmployees(e.target.value)}
                          className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-body-md"
                        >
                          <option>1-10</option>
                          <option>11-50</option>
                          <option>51-200</option>
                          <option>201-500</option>
                          <option>500+</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="turnover-desktop">Annual Turnover</label>
                        <select
                          id="turnover-desktop"
                          value={turnover}
                          onChange={(e) => setTurnover(e.target.value)}
                          className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition-all text-body-md"
                        >
                          <option>Under ₹1Cr</option>
                          <option>₹1Cr - ₹10Cr</option>
                          <option>₹10Cr - ₹50Cr</option>
                          <option>₹50Cr - ₹100Cr</option>
                          <option>Above ₹100Cr</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="product-desktop">Primary Product Category</label>
                        <input
                          id="product-desktop"
                          type="text"
                          value={primaryProduct}
                          onChange={(e) => setPrimaryProduct(e.target.value)}
                          className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-black focus:border-black outline-none transition-all"
                          placeholder="e.g. Valves"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="email-desktop">Business Email</label>
                  <input
                    id="email-desktop"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none transition-all placeholder:text-outline"
                    placeholder="name@company.com"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="mobile-desktop">Mobile Number</label>
                  <div className="flex border border-outline-variant rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-black">
                    <span className="flex items-center px-3 bg-surface-container border-r border-outline-variant text-secondary font-label-sm">+91</span>
                    <input
                      id="mobile-desktop"
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className="w-full px-4 py-3 bg-white border-none outline-none transition-all placeholder:text-outline"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant" htmlFor="password-desktop-reg">Security Password</label>
                <div className="relative">
                  <input
                    id="password-desktop-reg"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-white border border-outline-variant rounded-lg focus:ring-1 focus:ring-[#0f172a] focus:border-[#0f172a] outline-none transition-all placeholder:text-outline"
                    placeholder="Min. 8 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-[#0f172a] transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                {/* Strength Indicator */}
                {password && (
                  <div className="flex gap-1.5 mt-1 items-center">
                    <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden max-w-[200px]">
                      <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`}></div>
                    </div>
                    <span className="font-label-sm text-outline text-xs">{strength.label}</span>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="space-y-4 pt-4">
                <button
                  type="submit"
                  className="w-full py-4 bg-trade-orange text-white font-headline-md font-semibold rounded-lg shadow-sm hover:bg-trade-orange/90 active:scale-[0.98] transition-all duration-150"
                >
                  Create Account
                </button>
                <div className="relative flex items-center justify-center py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-outline-variant"></div>
                  </div>
                  <span className="relative px-4 bg-white text-outline font-label-sm">OR</span>
                </div>
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-outline-variant text-[#1b1b1d] font-body-lg rounded-lg hover:bg-surface-container-low transition-all"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  Continue with Google
                </button>
              </div>

              <p className="text-center font-body-md text-secondary pt-4">
                Already have a business account?{" "}
                <Link href="/login" className="text-black font-semibold hover:underline">
                  Login
                </Link>
              </p>
            </form>

            <div className="mt-8 flex justify-center gap-6 text-xs text-outline">
              <span className="hover:text-black cursor-pointer">Privacy Policy</span>
              <span className="hover:text-black cursor-pointer">Terms of Service</span>
              <span className="hover:text-black cursor-pointer">Cookie Policy</span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#fcf8fa] font-label-caps text-xs">LOADING INFRASTRUCTURE...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
