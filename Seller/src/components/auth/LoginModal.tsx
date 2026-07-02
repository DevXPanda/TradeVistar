"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FieldErrors {
  identifier?: string;
  password?: string;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset state whenever the modal transitions from closed to open.
  // Adjusted during render (not in an effect) per React's guidance for
  // resetting state in response to a prop change.
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);
  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setIdentifier("");
      setPassword("");
      setShowPassword(false);
      setRememberMe(false);
      setLoading(false);
      setFormError("");
      setFieldErrors({});
    }
  }

  // Lock background scroll while open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  // Focus first field on open
  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => clearTimeout(t);
  }, [isOpen]);

  // ESC to close + focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

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
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-trade-navy/40 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-white w-full max-w-[400px] rounded-2xl shadow-2xl p-7 sm:p-8 max-h-[90vh] overflow-y-auto"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close login"
              className="absolute top-4 right-4 text-secondary hover:text-trade-navy transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[22px]">close</span>
            </button>

            <div className="flex flex-col items-center text-center space-y-1.5 mb-6">
              <Image
                alt="TradeVistar Logo"
                src="/logo/tradevistar.png"
                width={140}
                height={34}
                className="h-8 w-auto object-contain"
              />
              <h2 id="login-modal-title" className="font-headline-md text-trade-navy font-bold text-[19px] pt-2">
                Welcome Back
              </h2>
              <p className="text-secondary text-[12.5px]">
                Log in to manage your seller account and orders.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <Label htmlFor="login-identifier">Email or Mobile Number</Label>
                <Input
                  id="login-identifier"
                  ref={firstFieldRef}
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
                  <Label htmlFor="login-password" className="mb-0">
                    Password
                  </Label>
                  <Link href="#" className="text-primary-blue text-[11px] font-bold hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="login-password"
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

            <Link href="/seller/register" onClick={onClose}>
              <Button type="button" variant="outline" size="lg" className="w-full">
                Create Seller Account
              </Button>
            </Link>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
