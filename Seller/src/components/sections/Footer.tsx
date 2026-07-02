"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#2D2D2D] text-on-primary pt-0 pb-0 px-0">

      {/* Popular Categories Band */}
      <div className="border-b border-white/10 py-8 px-6 lg:px-10">
        <div className="max-w-s-container-max mx-auto">
          <h3 className="text-center text-white font-bold text-[15px] tracking-wide mb-6 uppercase">
            Popular categories to sell globally
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-2">
            {[
              "Sell Agriculture Online", "Sell Shoes Online", "Sell Paintings Online", "Sell Beauty Products Online",
              "Sell Clothes Online", "Sell Jewellery Online", "Sell Watches Online", "Sell Toys Online",
              "Sell Garments Online", "Sell Talents Online", "Sell Books Online", "Sell Appliances Online",
              "Sell Electronics Online", "Sell Furniture Online", "Sell Home Products Online", "Sell Shirts Online",
              "Sell Women Clothes Online", "Sell Makeup Online", "Sell Kurtis Online", "Sell Indian Clothes Online",
            ].map((cat) => (
              <Link
                key={cat}
                href="#"
                className="text-[12px] text-on-primary-container hover:text-trade-orange transition-colors font-medium"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="px-6 lg:px-10 pt-10 pb-6">
        <div className="max-w-s-container-max mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-10">

          {/* Column 1: Sell Online */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-[13px] uppercase tracking-wide">Sell Online</h5>
            <ul className="space-y-2.5 text-[12.5px] text-on-primary-container">
              <li><Link className="hover:text-white transition-colors" href="#journey">Create Account</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#journey">List Products</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#seller-tools">Logistics &amp; Shipping</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#pricing-calculator">Fees &amp; Commission</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#help-contact">Help &amp; Support</Link></li>
            </ul>
          </div>

          {/* Column 2: Grow Your Business */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-[13px] uppercase tracking-wide">Grow Your Business</h5>
            <ul className="space-y-2.5 text-[12.5px] text-on-primary-container">
              <li><Link className="hover:text-white transition-colors" href="#seller-tools">Insights &amp; Tools</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#seller-tools">TradeVistar Ads</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#seller-tools">Fulfilment Services</Link></li>
              <li><Link className="hover:text-trade-orange transition-colors font-semibold text-trade-orange" href="#seller-tools">Global Sourcing Fairs</Link></li>
            </ul>
          </div>

          {/* Column 3: Learn More */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-[13px] uppercase tracking-wide">Learn More</h5>
            <ul className="space-y-2.5 text-[12.5px] text-on-primary-container">
              <li><Link className="hover:text-white transition-colors" href="#faq">FAQs</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#testimonials">Seller Success Stories</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#seller-tools">Seller Blogs</Link></li>
              <li><Link className="hover:text-white transition-colors" href="#seller-tools">Learning Center</Link></li>
            </ul>
          </div>

          {/* Column 4: Download Mobile App */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-[13px] uppercase tracking-wide">Download Mobile App</h5>
            <div className="space-y-3">
              {/* Google Play Badge */}
              <Link
                href="#"
                className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-3 py-2 w-fit hover:border-white/40 transition-colors"
                aria-label="Get it on Google Play"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.18 1C2.77 1.22 2.5 1.65 2.5 2.14v19.72c0 .49.27.92.68 1.14L14 12 3.18 1Z" fill="#EA4335"/>
                  <path d="m14 12 3.5 3.5-11.32 6.36c-.14.08-.29.14-.45.14-.16 0-.32-.05-.45-.14L14 12Z" fill="#FBBC04"/>
                  <path d="M21.5 12c0 .65-.36 1.22-.9 1.53L17.5 15.5 14 12l3.5-3.5 3.1 1.97c.54.31.9.88.9 1.53Z" fill="#4285F4"/>
                  <path d="M14 12 5.73 2.64c.13-.09.29-.14.45-.14.16 0 .31.06.45.14L17.5 8.5 14 12Z" fill="#34A853"/>
                </svg>
                <div>
                  <div className="text-white/60 text-[8px] font-medium uppercase tracking-wide">GET IT ON</div>
                  <div className="text-white text-[13px] font-bold leading-tight">Google Play</div>
                </div>
              </Link>

              {/* App Store Badge */}
              <Link
                href="#"
                className="flex items-center gap-3 bg-black border border-white/20 rounded-lg px-3 py-2 w-fit hover:border-white/40 transition-colors"
                aria-label="Download on App Store"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="white" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98l-.09.06c-.22.13-2.2 1.28-2.18 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.87M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div>
                  <div className="text-white/60 text-[8px] font-medium uppercase tracking-wide">DOWNLOAD ON THE</div>
                  <div className="text-white text-[13px] font-bold leading-tight">App Store</div>
                </div>
              </Link>
            </div>

            {/* Stay Connected */}
            <div className="space-y-2 pt-2">
              <h6 className="font-bold text-white text-[12px] uppercase tracking-wide">Stay Connected</h6>
              <div className="flex gap-2 flex-wrap items-center">
                {/* Facebook */}
                <Link href="#" aria-label="Facebook" className="w-7 h-7 rounded-full bg-[#1877F2] flex items-center justify-center hover:opacity-90 transition-opacity">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 12H12.5V17.5H10V12H8.5V9.5H10V8C10 6.5 11 5 13 5H15.5V7.5H14C13.5 7.5 13.2 7.8 13.2 8.3V9.5H15.5L14.5 12Z" />
                  </svg>
                </Link>
                {/* Instagram */}
                <Link href="#" aria-label="Instagram" className="w-7 h-7 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity" style={{background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)"}}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Link>
                {/* LinkedIn */}
                <Link href="#" aria-label="LinkedIn" className="w-7 h-7 rounded-full bg-[#0077B5] flex items-center justify-center hover:opacity-90 transition-opacity">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19H8.5V10.5H6V19ZM7.25 7.25C6.42 7.25 5.75 6.58 5.75 5.75C5.75 4.92 6.42 4.25 7.25 4.25C8.08 4.25 8.75 4.92 8.75 5.75C8.75 6.58 8.08 7.25 7.25 7.25ZM10.5 19H13V14C13 13 13.5 12 14.75 12C16 12 16 13.25 16 14.5V19H18.5V13.5C18.5 11 17.5 9.5 15.5 9.5C14 9.5 13.25 10.25 12.75 11H12.5V9.75H10.5V19Z" />
                  </svg>
                </Link>
                {/* YouTube */}
                <Link href="#" aria-label="YouTube" className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center hover:opacity-90 transition-opacity">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-2.47 12.35 12.35 0 00-8.64 0A4.83 4.83 0 013.41 6.69 28.1 28.1 0 003 12a28.1 28.1 0 00.41 5.31 4.83 4.83 0 003.77 2.47 12.35 12.35 0 008.64 0 4.83 4.83 0 003.77-2.47A28.1 28.1 0 0021 12a28.1 28.1 0 00-.41-5.31zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                  </svg>
                </Link>
                {/* X/Twitter */}
                <Link href="#" aria-label="X" className="w-7 h-7 rounded-full bg-black flex items-center justify-center hover:opacity-80 transition-opacity border border-white/20">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              alt="TradeVistar Logo"
              className="h-8 w-auto"
              src="/logo/tradevistar.png"
              width={32}
              height={36}
            />
            <span className="text-[12px] font-bold text-white/70 tracking-tight">Seller Hub</span>
          </div>
          <p className="text-xs text-on-primary-container text-center">
            © 2026 TradeVistar Global Infrastructure. All Rights Reserved
          </p>
          <div className="flex gap-4 text-xs text-on-primary-container">
            <Link className="hover:text-white" href="#">Privacy Policy</Link>
            <span className="text-white/20">•</span>
            <Link className="hover:text-white" href="#">Terms of Use</Link>
          </div>
        </div>

        </div>
      </div>
    </footer>
  );
}
