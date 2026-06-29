"use client";

import React from "react";
import { Order } from "./OrdersTable";

interface TrackingDrawerProps {
  order: Order | null;
  onClose: () => void;
}

export default function TrackingDrawer({ order, onClose }: TrackingDrawerProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 border-l border-outline-variant/30 flex flex-col justify-between animate-in slide-in-from-right duration-300">
      <div className="p-6 overflow-y-auto space-y-6">
        <div className="flex justify-between items-center border-b border-outline-variant/10 pb-3">
          <div>
            <h3 className="font-display-md text-base text-trade-navy font-bold">
              Freight Logistics Timeline
            </h3>
            <span className="text-[10px] text-secondary font-bold uppercase tracking-wider">
              {order.id} Tracking
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-surface-container rounded-full text-secondary hover:text-trade-navy cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Vertically stacked checkpoints list */}
        <div className="relative pl-6 space-y-6">
          <div className="absolute top-2 left-[11px] bottom-2 w-0.5 bg-outline-variant/30" />
          
          {order.trackingHistory.map((cp, idx) => (
            <div key={idx} className="relative space-y-1">
              <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 bg-trade-orange border-trade-orange shadow-sm" />
              <h4 className="text-xs font-bold text-trade-navy">
                {cp.log}
              </h4>
              <p className="text-[9.5px] text-secondary">{cp.date}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-surface-container-low border-t border-outline-variant/30">
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-trade-navy text-white rounded-lg text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
}
