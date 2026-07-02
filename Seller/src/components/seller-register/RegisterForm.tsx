"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import RegisterProgress, { RegisterStep } from "./RegisterProgress";
import OtpInput from "./OtpInput";

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 24 : -24 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -24 : 24 }),
};

const RESEND_SECONDS = 30;

export default function RegisterForm() {
  const [step, setStep] = useState<RegisterStep>("account");
  const [direction, setDirection] = useState(1);

  // Mobile verification
  const [mobile, setMobile] = useState("");
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileVerifying, setMobileVerifying] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileTimer, setMobileTimer] = useState(0);
  const [mobileOtpResetKey, setMobileOtpResetKey] = useState(0);
  const [mobileError, setMobileError] = useState("");

  // Email verification
  const [email, setEmail] = useState("");
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerifying, setEmailVerifying] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailTimer, setEmailTimer] = useState(0);
  const [emailOtpResetKey, setEmailOtpResetKey] = useState(0);
  const [emailError, setEmailError] = useState("");

  // Password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Business details
  const [companyName, setCompanyName] = useState("");
  const [gstin, setGstin] = useState("");
  const [country, setCountry] = useState("");
  const [category, setCategory] = useState("");
  const [businessError, setBusinessError] = useState("");

  const bothVerified = mobileVerified && emailVerified;

  useEffect(() => {
    if (mobileTimer <= 0) return;
    const t = setTimeout(() => setMobileTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [mobileTimer]);

  useEffect(() => {
    if (emailTimer <= 0) return;
    const t = setTimeout(() => setEmailTimer((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [emailTimer]);

  const goTo = (next: RegisterStep, dir: number) => {
    setDirection(dir);
    setStep(next);
  };

  const handleSendMobileOtp = () => {
    if (mobile.length !== 10) {
      setMobileError("Enter a valid 10-digit mobile number.");
      return;
    }
    setMobileError("");
    setMobileVerified(false);
    setMobileVerifying(false);
    setMobileOtpSent(true);
    setMobileTimer(RESEND_SECONDS);
    setMobileOtpResetKey((k) => k + 1);
  };

  const handleMobileOtpComplete = () => {
    setMobileVerifying(true);
    setTimeout(() => {
      setMobileVerifying(false);
      setMobileVerified(true);
    }, 700);
  };

  const handleSendEmailOtp = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    setEmailError("");
    setEmailVerified(false);
    setEmailVerifying(false);
    setEmailOtpSent(true);
    setEmailTimer(RESEND_SECONDS);
    setEmailOtpResetKey((k) => k + 1);
  };

  const handleEmailOtpComplete = () => {
    setEmailVerifying(true);
    setTimeout(() => {
      setEmailVerifying(false);
      setEmailVerified(true);
    }, 700);
  };

  const handleAccountSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bothVerified) return;
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setPasswordError("");
    goTo("business", 1);
  };

  const handleBusinessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setBusinessError("Company name is required.");
      return;
    }
    if (gstin && gstin.length !== 15) {
      setBusinessError("GSTIN must be exactly 15 alphanumeric characters.");
      return;
    }
    if (!country.trim()) {
      setBusinessError("Please enter your business country.");
      return;
    }
    setBusinessError("");
    goTo("success", 1);
  };

  const canContinue =
    bothVerified && password.length >= 8 && confirmPassword.length > 0 && password === confirmPassword;

  if (step === "success") {
    return (
      <Card glass>
        <CardContent className="text-center space-y-4 py-10">
          <span className="material-symbols-outlined text-[52px] text-primary-green">verified</span>
          <h3 className="font-headline-md text-trade-navy font-bold text-[18px]">
            Registration Submitted!
          </h3>
          <p className="text-secondary text-[13px] leading-relaxed max-w-sm mx-auto">
            Our B2B onboarding specialist will contact you within 2 hours to verify your KYC and set up your seller catalog.
          </p>
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card glass>
      <CardContent>
        <RegisterProgress currentStep={step} />

        <AnimatePresence mode="wait" custom={direction}>
          {step === "account" && (
            <motion.form
              key="account"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              onSubmit={handleAccountSubmit}
              className="space-y-5"
            >
              {/* Mobile Number */}
              <div>
                <div
                  className={`flex items-end justify-between gap-3 border rounded-lg px-4 py-2.5 transition-colors ${
                    mobileVerified
                      ? "border-primary-green/40 bg-primary-green/5"
                      : "border-outline-variant focus-within:border-primary-blue focus-within:ring-1 focus-within:ring-primary-blue/30"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <Label htmlFor="reg-mobile" className="mb-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="reg-mobile"
                      type="tel"
                      maxLength={10}
                      placeholder="Enter 10-digit phone number"
                      value={mobile}
                      disabled={mobileOtpSent}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      className="w-full text-sm font-bold text-trade-navy bg-transparent focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  {mobileVerified ? (
                    <span className="flex items-center gap-1 text-primary-green font-bold text-[12.5px] whitespace-nowrap flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Verified
                    </span>
                  ) : mobileVerifying ? (
                    <span className="flex items-center gap-1.5 text-secondary font-bold text-[12.5px] whitespace-nowrap flex-shrink-0">
                      <span className="w-3.5 h-3.5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                      Verifying
                    </span>
                  ) : mobileOtpSent && mobileTimer > 0 ? (
                    <span className="text-secondary text-[11.5px] font-semibold whitespace-nowrap flex-shrink-0">
                      Resend in {mobileTimer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendMobileOtp}
                      className="text-primary-blue hover:text-secondary-blue font-bold text-[12.5px] whitespace-nowrap flex-shrink-0 cursor-pointer"
                    >
                      {mobileOtpSent ? "Resend OTP" : "Get OTP"}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {mobileOtpSent && !mobileVerified && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] text-secondary font-semibold mt-3 mb-2">
                        Enter the OTP sent to your mobile number
                      </p>
                      <OtpInput
                        resetKey={mobileOtpResetKey}
                        disabled={mobileVerifying}
                        onComplete={handleMobileOtpComplete}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {mobileError && (
                  <p className="text-red-600 text-[11.5px] font-semibold mt-1.5">{mobileError}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <div
                  className={`flex items-end justify-between gap-3 border rounded-lg px-4 py-2.5 transition-colors ${
                    emailVerified
                      ? "border-primary-green/40 bg-primary-green/5"
                      : "border-outline-variant focus-within:border-primary-blue focus-within:ring-1 focus-within:ring-primary-blue/30"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <Label htmlFor="reg-email" className="mb-1">
                      Email ID <span className="text-red-500">*</span>
                    </Label>
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      disabled={emailOtpSent}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full text-sm font-bold text-trade-navy bg-transparent focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed"
                    />
                  </div>

                  {emailVerified ? (
                    <span className="flex items-center gap-1 text-primary-green font-bold text-[12.5px] whitespace-nowrap flex-shrink-0">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      Verified
                    </span>
                  ) : emailVerifying ? (
                    <span className="flex items-center gap-1.5 text-secondary font-bold text-[12.5px] whitespace-nowrap flex-shrink-0">
                      <span className="w-3.5 h-3.5 border-2 border-primary-blue border-t-transparent rounded-full animate-spin" />
                      Verifying
                    </span>
                  ) : emailOtpSent && emailTimer > 0 ? (
                    <span className="text-secondary text-[11.5px] font-semibold whitespace-nowrap flex-shrink-0">
                      Resend in {emailTimer}s
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSendEmailOtp}
                      className="text-primary-blue hover:text-secondary-blue font-bold text-[12.5px] whitespace-nowrap flex-shrink-0 cursor-pointer"
                    >
                      {emailOtpSent ? "Resend OTP" : "Get OTP"}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {emailOtpSent && !emailVerified && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -6 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[11px] text-secondary font-semibold mt-3 mb-2">
                        Enter the OTP sent to your email
                      </p>
                      <OtpInput
                        resetKey={emailOtpResetKey}
                        disabled={emailVerifying}
                        onComplete={handleEmailOtpComplete}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                {emailError && (
                  <p className="text-red-600 text-[11.5px] font-semibold mt-1.5">{emailError}</p>
                )}
              </div>

              {/* Password fields — enabled once both mobile & email are verified */}
              <motion.div
                animate={{ opacity: bothVerified ? 1 : 0.5 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <Label htmlFor="reg-password">
                    Create Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder={bothVerified ? "Minimum 8 characters" : "Verify mobile & email first"}
                    value={password}
                    disabled={!bothVerified}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div>
                  <Label htmlFor="reg-confirm-password">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="reg-confirm-password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    disabled={!bothVerified}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </motion.div>

              {passwordError && (
                <p className="text-red-600 text-[11.5px] font-semibold">{passwordError}</p>
              )}

              <p className="text-[11px] text-secondary leading-normal">
                By continuing, I agree to TradeVistar&apos;s{" "}
                <Link href="#" className="text-primary-blue font-bold hover:underline">
                  Terms of Use
                </Link>{" "}
                &amp;{" "}
                <Link href="#" className="text-primary-blue font-bold hover:underline">
                  Privacy Policy
                </Link>
              </p>

              <Button type="submit" variant="secondary" size="lg" className="w-full" disabled={!canContinue}>
                Continue
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Button>
            </motion.form>
          )}

          {step === "business" && (
            <motion.form
              key="business"
              custom={direction}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeOut" }}
              onSubmit={handleBusinessSubmit}
              className="space-y-5"
            >
              <div>
                <Label htmlFor="reg-company">
                  Company Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reg-company"
                  type="text"
                  placeholder="Enter registered business name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="reg-gstin">GSTIN (Optional)</Label>
                <Input
                  id="reg-gstin"
                  type="text"
                  maxLength={15}
                  placeholder="e.g. 29AAAAA1111A1Z1"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value.toUpperCase())}
                  className="uppercase"
                />
              </div>

              <div>
                <Label htmlFor="reg-category">Business Category (Optional)</Label>
                <Input
                  id="reg-category"
                  type="text"
                  placeholder="e.g. Textiles, Electronics, Agriculture"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="reg-country">
                  Business Country <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="reg-country"
                  type="text"
                  placeholder="e.g. India"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </div>

              {businessError && (
                <p className="text-red-600 text-[11.5px] font-semibold">{businessError}</p>
              )}

              <div className="flex items-center gap-4">
                <Button type="button" variant="ghost" onClick={() => goTo("account", -1)}>
                  Back
                </Button>
                <Button type="submit" variant="primary" size="lg" className="flex-1">
                  Complete Registration
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
