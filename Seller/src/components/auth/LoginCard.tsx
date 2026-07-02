"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FieldErrors {
  identifier?: string;
  password?: string;
}

export default function LoginCard() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: FieldErrors = {};
    if (!identifier.trim()) errors.identifier = "Enter your email or mobile number.";
    if (!password) errors.password = "Enter your password.";
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setFormError("We couldn't sign you in. Please check your credentials and try again.");
    }, 900);
  };

  return (
    <div className="bg-white border border-outline-variant/20 rounded-3xl shadow-xl p-7 sm:p-8 w-full max-w-[420px]">
      <div className="text-center space-y-1.5 mb-6">
        <h2 className="font-headline-md text-trade-navy font-bold text-[19px]">Welcome Back</h2>
        <p className="text-secondary text-[12.5px]">Log in to manage your seller account and orders.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <Label htmlFor="hero-login-identifier">Email or Mobile Number</Label>
          <Input
            id="hero-login-identifier"
            type="text"
            placeholder="you@company.com or 9876543210"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            aria-invalid={!!fieldErrors.identifier}
          />
          {fieldErrors.identifier && (
            <p className="text-red-600 text-[11.5px] font-semibold mt-1.5">{fieldErrors.identifier}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="hero-login-password" className="mb-0">
              Password
            </Label>
            <Link href="#" className="text-primary-blue text-[11px] font-bold hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="hero-login-password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pr-11"
              aria-invalid={!!fieldErrors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary hover:text-trade-navy transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {showPassword ? "visibility_off" : "visibility"}
              </span>
            </button>
          </div>
          {fieldErrors.password && (
            <p className="text-red-600 text-[11.5px] font-semibold mt-1.5">{fieldErrors.password}</p>
          )}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none w-fit">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-outline-variant text-primary-blue focus:ring-primary-blue/30 cursor-pointer"
          />
          <span className="text-[12px] text-secondary font-semibold">Remember Me</span>
        </label>

        {formError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5">
            <span className="material-symbols-outlined text-[16px] text-red-600 flex-shrink-0">error</span>
            <p className="text-red-700 text-[11.5px] font-semibold leading-relaxed">{formError}</p>
          </div>
        )}

        <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={loading}>
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Logging in
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 h-px bg-outline-variant/30" />
        <span className="text-[11px] text-secondary font-semibold">New to TradeVistar?</span>
        <div className="flex-1 h-px bg-outline-variant/30" />
      </div>

      <Link href="/seller/register">
        <Button type="button" variant="outline" size="lg" className="w-full">
          Create Seller Account
        </Button>
      </Link>
    </div>
  );
}
