"use client";

import React, { useState } from "react";

export default function ProfilePage() {
  const [companyName, setCompanyName] = useState("Global Logistics Ltd");
  const [gstin, setGstin] = useState("27AAAAA1111A1Z1");
  const [address, setAddress] = useState("402, Trade Tower, Bandra Kurla Complex, Mumbai, MH - 400051");
  const [phone, setPhone] = useState("+91 98765 43210");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile configurations updated successfully!");
  };

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Business Profile</h1>
        <p className="font-body-md text-secondary mt-1">Manage KYC documentation, GSTIN authentication credentials, and dispatch address settings.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-s-lg">
        {/* Verification Status Card */}
        <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm h-fit space-y-4">
          <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold">Verification Badges</h3>
          
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="material-symbols-outlined text-emerald-600 text-3xl">verified</span>
            <div>
              <p className="font-body-md text-emerald-900 font-bold">GST Authenticated</p>
              <p className="text-[11px] text-emerald-700">Verified via GSTIN database</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
            <span className="material-symbols-outlined text-emerald-600 text-3xl">person_check</span>
            <div>
              <p className="font-body-md text-emerald-900 font-bold">KYC Cleared</p>
              <p className="text-[11px] text-emerald-700">Directors & PAN documents verified</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <span className="material-symbols-outlined text-blue-600 text-3xl">shield</span>
            <div>
              <p className="font-body-md text-blue-900 font-bold">Secure Settlement Active</p>
              <p className="text-[11px] text-blue-700">Authorized for credit escrow limit</p>
            </div>
          </div>
        </div>

        {/* Form Settings */}
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm">
          <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold mb-s-md">Enterprise Credentials</h3>
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface">Registered Business Name</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="block font-label-sm text-label-sm text-on-surface">GSTIN Number</label>
                <input
                  type="text"
                  value={gstin}
                  onChange={(e) => setGstin(e.target.value)}
                  className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md font-label-caps"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface">Dispatch Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md resize-none"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-label-sm text-label-sm text-on-surface">Primary Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-outline-variant rounded-lg focus:border-trade-orange outline-none text-body-md"
                required
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-trade-navy hover:bg-trade-orange hover:shadow-md hover:shadow-trade-orange/10 text-white font-bold rounded-lg transition-all active:scale-95 text-label-sm text-[12px] cursor-pointer"
            >
              Save Company Configurations
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
