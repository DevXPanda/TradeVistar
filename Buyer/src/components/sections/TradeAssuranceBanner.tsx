"use client";

import React from "react";

export default function TradeAssuranceBanner() {
  return (
    <section className="bg-background py-10 px-s-md animate-fade-in" id="trade-assurance-banner-section">
      <div className="max-w-s-container-max mx-auto">
        <div className="relative bg-gradient-to-r from-slate-900 via-trade-navy to-slate-950 text-white rounded-2xl p-8 md:p-12 border border-outline-variant/10 shadow-lg overflow-hidden">
          
          {/* Engineering grid texture */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          {/* Decorative glowing gradient blur */}
          <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute left-10 top-0 w-64 h-64 rounded-full bg-trade-orange/5 blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Column: Heading and Badge */}
            <div className="lg:col-span-5 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                <span className="material-symbols-outlined text-[12px] fill-emerald-400">shield</span>
                Escrow Covered
              </div>
              <h2 className="font-headline-lg text-[22px] md:text-[28px] font-black uppercase tracking-wide leading-tight">
                TradeVistar <br className="hidden lg:inline" />
                <span className="text-emerald-400">Trade Assurance</span>
              </h2>
              <p className="text-[12.5px] text-white/70 leading-relaxed font-semibold max-w-md mx-auto lg:mx-0">
                Protect your enterprise bulk orders from payment dispatch to final factory arrival. Covered under our secure arbitration standard.
              </p>
            </div>

            {/* Right Column: Three Features Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Feature 1 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">lock</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-xs font-black text-white uppercase tracking-wider">Escrow Security</h3>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Payments are held securely in escrow and released only upon delivery verification.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-xs font-black text-white uppercase tracking-wider">Refund Protection</h3>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Claim full or partial refunds if product parameters fail compliance standards.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-3 hover:border-emerald-500/40 transition-colors">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-xs font-black text-white uppercase tracking-wider">Shipping Guarantee</h3>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Automatic logistics tracking with verified shipping schedules and delay payouts.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
