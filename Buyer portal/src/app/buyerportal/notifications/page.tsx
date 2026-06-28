"use client";

import React, { useState } from "react";

export default function NotificationsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [orderUpdates, setOrderUpdates] = useState(true);
  const [quoteUpdates, setQuoteUpdates] = useState(true);

  const handleSaveSettings = () => {
    alert("Alert settings saved!");
  };

  return (
    <div className="flex flex-col gap-s-lg">
      {/* Page Header */}
      <div>
        <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Notification Channels</h1>
        <p className="font-body-md text-secondary mt-1">Configure automated mail alerts, SMS notifications, and system dispatch warnings.</p>
      </div>

      {/* Settings Panel */}
      <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm max-w-2xl">
        <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold mb-s-md">Notification Channels</h3>
        
        <div className="divide-y divide-outline-variant/20">
          <div className="py-4 flex items-center justify-between">
            <div>
              <p className="font-body-md text-trade-navy font-semibold">Email Alerts</p>
              <p className="text-[12px] text-secondary">Receive daily digests of quotes and order delivery logs.</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-[#0f172a] focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <p className="font-body-md text-trade-navy font-semibold">SMS Alerts</p>
              <p className="text-[12px] text-secondary">Receive instant text alerts for dispatch status and payment clearance.</p>
            </div>
            <input
              type="checkbox"
              checked={smsAlerts}
              onChange={(e) => setSmsAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-[#0f172a] focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <p className="font-body-md text-trade-navy font-semibold">Order Status Tenders</p>
              <p className="text-[12px] text-secondary">Receive alerts for new order creations, packing lists, and bill confirmations.</p>
            </div>
            <input
              type="checkbox"
              checked={orderUpdates}
              onChange={(e) => setOrderUpdates(e.target.checked)}
              className="w-5 h-5 rounded text-[#0f172a] focus:ring-0 cursor-pointer"
            />
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <p className="font-body-md text-trade-navy font-semibold">Supplier RFQ Responses</p>
              <p className="text-[12px] text-secondary">Receive notifications when a seller submits a proposal quote for open RFQs.</p>
            </div>
            <input
              type="checkbox"
              checked={quoteUpdates}
              onChange={(e) => setQuoteUpdates(e.target.checked)}
              className="w-5 h-5 rounded text-[#0f172a] focus:ring-0 cursor-pointer"
            />
          </div>
        </div>

        <button
          onClick={handleSaveSettings}
          className="mt-6 px-6 py-2.5 bg-trade-navy hover:bg-trade-orange hover:shadow-md hover:shadow-trade-orange/10 text-white font-bold rounded-lg transition-all active:scale-95 text-label-sm text-[12px] cursor-pointer"
        >
          Save Channels Settings
        </button>
      </div>
    </div>
  );
}
