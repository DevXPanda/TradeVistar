"use client";

export default function TrustBar() {
  return (
    <section className="bg-trade-orange py-2.5 px-s-md">
      <div className="max-w-s-container-max mx-auto flex flex-row flex-nowrap overflow-x-auto justify-between items-center gap-s-md hide-scrollbar w-full text-white">
        {/* Fast Delivery */}
        <div className="flex items-center gap-s-sm shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            local_shipping
          </span>
          <span className="text-label-caps text-white font-semibold whitespace-nowrap">Fast Delivery</span>
        </div>

        {/* Competitive Pricing */}
        <div className="flex items-center gap-s-sm shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            scale
          </span>
          <span className="text-label-caps text-white font-semibold whitespace-nowrap">Competitive Pricing</span>
        </div>

        {/* Bulk Order Placement */}
        <div className="flex items-center gap-s-sm shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            inventory
          </span>
          <span className="text-label-caps text-white font-semibold whitespace-nowrap">Bulk Order Placement</span>
        </div>

        {/* Secure Transactions */}
        <div className="flex items-center gap-s-sm shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            shield
          </span>
          <span className="text-label-caps text-white font-semibold whitespace-nowrap">Secure Transactions</span>
        </div>

        {/* Dedicated Support */}
        <div className="flex items-center gap-s-sm shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            support_agent
          </span>
          <span className="text-label-caps text-white font-semibold whitespace-nowrap">Dedicated Support</span>
        </div>

        {/* Higher Profit Margins */}
        <div className="flex items-center gap-s-sm shrink-0">
          <span
            className="material-symbols-outlined text-white"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            trending_up
          </span>
          <span className="text-label-caps text-white font-semibold whitespace-nowrap">Higher Profit Margins</span>
        </div>
      </div>
    </section>
  );
}
