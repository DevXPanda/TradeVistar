"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-trade-navy text-on-primary pt-s-xl pb-s-md px-s-md">
      <div className="max-w-s-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-s-lg mb-s-xl">
          {/* Brand Info */}
          <div className="space-y-s-md col-span-1 md:col-span-2">
            <Image
              alt="TradeVistar Logo"
              className="h-12 w-auto"
              src="/logo/tradevistar.png"
              width={42}
              height={48}
            />
            <p className="text-on-primary-container text-sm leading-relaxed">
              The global trade operating system for modern enterprises. Built to secure, simplify, and scale international B2B commerce.
            </p>
            <div className="flex gap-s-sm flex-wrap items-center">
              {/* Instagram */}
              <Link
                className="transition-transform hover:scale-110 active:scale-95"
                href="#"
                aria-label="Instagram"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <radialGradient id="ig-grad" cx="0.2" cy="0.8" r="1.2">
                    <stop offset="0%" stopColor="#FED976" />
                    <stop offset="50%" stopColor="#FD2F7A" />
                    <stop offset="100%" stopColor="#9C27B0" />
                  </radialGradient>
                  <rect width="24" height="24" rx="6" fill="url(#ig-grad)" />
                  <path d="M12 7C9.24 7 7 9.24 7 12c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.76-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm4.5-8.25c0 .41-.34.75-.75.75s-.75-.34-.75-.75.34-.75.75-.75.75.34.75.75z" fill="#FFF" />
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="#FFF" strokeWidth="1.5" />
                </svg>
              </Link>
              {/* Facebook */}
              <Link
                className="transition-transform hover:scale-110 active:scale-95"
                href="#"
                aria-label="Facebook"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#1877F2" />
                  <path d="M14.5 12H12.5V17.5H10V12H8.5V9.5H10V8C10 6.5 11 5 13 5H15.5V7.5H14C13.5 7.5 13.2 7.8 13.2 8.3V9.5H15.5L14.5 12Z" fill="#FFF" />
                </svg>
              </Link>
              {/* X */}
              <Link
                className="transition-transform hover:scale-110 active:scale-95"
                href="#"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#000" />
                  <path d="M16 7h1.8l-3.9 4.5L18.5 17h-3.6l-2.8-3.7L8.9 17H7.1l4.2-4.8L7.4 7h3.7l2.6 3.4L16 7zm-.6 8.9h1L10.3 8H9.2l6.2 7.9z" fill="#FFF" />
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link
                className="transition-transform hover:scale-110 active:scale-95"
                href="#"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="4" fill="#0077B5" />
                  <path d="M6 19H8.5V10.5H6V19ZM7.25 7.25C6.42 7.25 5.75 6.58 5.75 5.75C5.75 4.92 6.42 4.25 7.25 4.25C8.08 4.25 8.75 4.92 8.75 5.75C8.75 6.58 8.08 7.25 7.25 7.25ZM10.5 19H13V14C13 13 13.5 12 14.75 12C16 12 16 13.25 16 14.5V19H18.5V13.5C18.5 11 17.5 9.5 15.5 9.5C14 9.5 13.25 10.25 12.75 11H12.5V9.75H10.5V19Z" fill="#FFF" />
                </svg>
              </Link>
              {/* YouTube */}
              <Link
                className="transition-transform hover:scale-110 active:scale-95"
                href="#"
                aria-label="YouTube"
              >
                <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" rx="12" fill="#FF0000" />
                  <path d="M17.8 8.8C18 9.5 18 12 18 12C18 12 18 14.5 17.8 15.2C17.7 15.7 17.3 16.1 16.8 16.2C16.1 16.4 12 16.4 12 16.4C12 16.4 7.9 16.4 7.2 16.2C6.7 16.1 6.3 15.7 6.2 15.2C6 14.5 6 12 6 12C6 12 6 9.5 6.2 8.8C6.3 8.3 6.7 7.9 7.2 7.8C7.9 7.6 12 7.6 12 7.6C12 7.6 16.1 7.6 16.8 7.8C17.3 7.9 17.7 8.3 17.8 8.8ZM10.5 14.3L14.5 12L10.5 9.7V14.3Z" fill="#FFF" />
                </svg>
              </Link>
              {/* WhatsApp */}
              <Link
                className="transition-transform hover:scale-110 active:scale-95"
                href="#"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 16 16" className="w-8 h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="8" cy="8" r="8" fill="#25D366" />
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" fill="#FFF" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Platform Column */}
          <div className="space-y-s-md md:col-start-4">
            <h5 className="font-label-caps text-trade-orange">Platform</h5>
            <ul className="space-y-s-sm text-sm text-on-primary-container">
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Solutions
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Verified Suppliers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Trade Assurance
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Logistics Infrastructure
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Pricing Models
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-s-md">
            <h5 className="font-label-caps text-trade-orange">Company</h5>
            <ul className="space-y-s-sm text-sm text-on-primary-container">
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  About Us
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Our Vision
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Compliance &amp; KYC
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-s-md">
            <h5 className="font-label-caps text-trade-orange">Support</h5>
            <ul className="space-y-s-sm text-sm text-on-primary-container">
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Documentation
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  API Reference
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Global Trade Assurance
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" href="#">
                  Contact Expert
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Payment Badges */}
        <div className="border-t border-white/10 pt-s-md mt-s-xl mb-s-md flex flex-col md:flex-row justify-between items-center gap-s-md flex-wrap">
          {/* Trust Badges */}
          <div className="w-full md:w-auto flex flex-wrap items-center justify-center md:justify-start gap-s-sm text-xs text-on-primary-container">
            <div className="flex items-center gap-s-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium text-white">GST Verified</span>
            </div>
            <div className="flex items-center gap-s-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-white">KYC Verified</span>
            </div>
            <div className="flex items-center gap-s-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-4 h-4 text-trade-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="font-medium text-white">Trade Assurance</span>
            </div>
            <div className="flex items-center gap-s-xs bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
              <svg className="w-4 h-4 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-medium text-white">SSL Secured</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="w-full md:w-auto flex flex-wrap items-center justify-center md:justify-start gap-s-sm mt-s-sm md:mt-0">
            {/* UPI */}
            <div className="h-8 w-14 bg-white px-2 py-1 rounded flex items-center justify-center shadow-sm">
              <svg className="h-5 w-auto" viewBox="0 0 333334 199007" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg">
                <path d="M44732 130924h1856l-1738 7215c-265 1061-206 1885 147 2415 354 530 1001 795 1973 795 942 0 1737-265 2356-795 618-531 1031-1355 1296-2415l1737-7215h1885l-1767 7392c-383 1590-1060 2798-2061 3593-972 795-2268 1208-3858 1208s-2680-383-3269-1179c-589-795-707-2002-324-3592l1767-7421zm223507 11868l2826-11868h6449l-383 1649h-4564l-706 2974h4564l-413 1679h-4564l-913 3827h4565l-412 1738h-6449zm-177-8982c-413-470-913-824-1443-1031-531-235-1119-353-1797-353-1266 0-2385 412-3386 1237s-1649 1915-1973 3239c-295 1267-177 2327 413 3181 559 824 1442 1237 2620 1237 677 0 1355-118 2031-383 678-235 1356-619 2062-1119l-530 2179c-589 382-1207 648-1856 825-648 176-1296 265-2002 265-883 0-1679-148-2356-443-678-294-1236-736-1679-1324-441-560-706-1237-824-2002-117-766-88-1590 148-2474 206-883 559-1680 1031-2445 471-766 1089-1443 1796-2002 706-589 1472-1030 2297-1325 824-294 1648-441 2503-441 677 0 1295 88 1885 294 559 207 1089 500 1560 913l-500 1972zm-18317 4300h3209l-530-2710c-29-176-59-383-59-589-30-235-30-471-30-736-118 265-235 500-383 736-118 235-235 442-353 619l-1855 2680zm4093 4682l-589-3062h-4594l-2062 3062h-1972l8539-12338 2650 12338h-1972zm-15548 0l2827-11868h6449l-383 1649h-4565l-706 2945h4563l-412 1679h-4564l-1325 5565h-1885v30zm-5566-6832h353c1001 0 1679-118 2062-354 382-236 648-648 795-1267 146-648 88-1119-207-1384-293-265-913-413-1855-413h-354l-795 3417zm-471 1502l-1267 5300h-1767l2828-11867h2621c766 0 1354 59 1737 148 411 89 736 265 971 500 295 295 471 648 559 1119 89 443 59 943-59 1502-235 943-619 1709-1207 2238-589 530-1326 854-2209 972l2680 5387h-2121l-2562-5300h-206zm-11632 5330l2828-11868h6478l-382 1649h-4565l-706 2974h4564l-411 1679h-4565l-912 3827h4564l-413 1738h-6479zm-2031-10248l-2444 10218h-1884l2444-10218h-3063l383-1649h8010l-382 1649h-3063zm-19170 10248l2945-12338 5595 7244c148 206 294 413 441 648s295 501 471 794l1974-8216h1737l-2945 12310-5713-7392c-147-206-295-412-441-619-147-235-265-442-354-707l-1972 8245h-1737v30zm-4594 0l2827-11868h1884l-2827 11868h-1884zm-13870-2385l1678-707c29 530 176 942 501 1207 324 265 765 413 1354 413 559 0 1031-148 1443-471 412-324 678-736 795-1266 177-707-235-1326-1236-1855-147-89-235-148-325-177-1119-648-1825-1207-2120-1737-294-530-354-1149-176-1884 235-972 736-1738 1530-2356 796-589 1679-913 2740-913 854 0 1530 177 2031 500 501 325 766 825 854 1444l-1648 766c-148-383-325-648-560-825-235-176-530-265-884-265-501 0-942 147-1295 412-354 265-589 619-707 1090-176 707 325 1383 1472 2002 89 59 147 89 207 117 1001 530 1678 1061 1972 1591 295 529 354 1148 178 1943-266 1119-825 2002-1680 2680-853 647-1855 1002-3033 1002-971 0-1737-237-2267-708-589-471-854-1149-824-2002zm-1973-7863l-2444 10218h-1884l2444-10218h-3062l381-1649h8010l-383 1649h-3062zm-19170 10248l2944-12338 5596 7244c147 206 295 413 442 648 146 235 294 501 471 794l1973-8216h1737l-2944 12310-5713-7392c-148-206-294-412-442-619-147-235-265-442-353-707l-1973 8245h-1737v30zm-8599 0l2827-11868h6449l-383 1649h-4564l-707 2974h4564l-412 1679h-4564l-913 3827h4565l-413 1738h-6449zm-3121-5860c0-88 29-354 88-766 30-353 59-618 89-854-118 266-236 530-383 824-147 266-324 560-530 825l-4535 6331-1472-6448c-59-265-118-530-148-766-29-235-59-500-59-736-59 236-147 500-235 794-89 266-206 560-354 855l-2650 5831h-1737l5683-12368 1620 7479c29 118 59 324 89 589 29 266 88 619 147 1031 206-353 471-765 825-1296 88-146 176-235 206-324l5124-7479-177 12368h-1737l148-5890zm-17933 5860l1296-5418-2356-6420h1972l1472 4035c30 117 59 235 118 411 59 178 89 354 147 530 118-176 236-353 354-530 118-176 236-324 353-471l3446-3975h1884l-5506 6390-1296 5417h-1885v30zm-8746-4682h3209l-530-2710c-30-176-59-383-59-589-30-235-30-471-30-736-118 265-236 500-383 736-118 235-235 442-354 619l-1855 2680zm4063 4682l-589-3062h-4594l-2061 3062h-1973l8540-12338 2650 12338h-1973zm-11808-6920h471c1031 0 1767-118 2179-354 412-235 677-647 825-1237 146-618 58-1089-236-1324-324-265-972-383-1943-383h-471l-825 3299zm-501 1590l-1266 5330h-1767l2827-11868h2856c854 0 1443 59 1826 147s678 236 913 471c294 265 500 648 589 1119 88 472 59 972-59 1531-147 560-353 1090-677 1561s-707 854-1119 1119c-353 206-736 382-1148 471-412 88-1060 148-1885 148h-1089v-30zm-17580 3563h1590c854 0 1531-59 2003-176 471-117 883-324 1266-589 530-383 972-854 1325-1443 354-560 619-1237 795-2002 176-766 235-1414 147-1972-88-561-294-1061-648-1444-265-294-589-471-1030-589-442-118-1119-176-2091-176h-1354l-2003 8392zm-2297 1767l2828-11868h2532c1649 0 2798 88 3415 265 619 177 1148 442 1561 854 530 530 884 1208 1031 2002 147 825 88 1767-147 2798-266 1060-648 1972-1178 2796-530 825-1207 1473-2002 2003-589 413-1237 678-1944 854-677 177-1708 265-3063 265h-3033v30zm-8628 0l2827-11868h6449l-383 1649h-4565l-707 2974h4565l-412 1679h-4565l-913 3827h4565l-413 1738h-6449zm-4565 0l2827-11868h1884l-2827 11868h-1885zm-8540 0l2827-11868h6449l-383 1649h-4564l-707 2945h4564l-412 1679h-4565l-1325 5565h-1885v30zm-4565 0l2827-11868h1884l-2827 11868h-1885zm-13015 0l2944-12338 5595 7244c147 206 294 413 442 648 147 235 294 501 471 794l1973-8216h1737l-2944 12310-5713-7392c-147-206-294-412-442-619-147-235-265-442-353-707l-1973 8245h-1737v30z" fill="#3a3734" />
                <path d="M233961 120588h-12927l17963-64873h12927l-17963 64873zm-107424-4064c-707 2562-3063 4358-5713 4358H54185c-1826 0-3180-619-4064-1855-883-1238-1089-2769-559-4594l16255-58541h12928l-14518 52298h51710l14517-52298h12928l-16844 60632zm100710-58777c-883-1237-2268-1855-4152-1855h-71027l-3504 12721h64608l-3769 13576h-51680v-30h-12927l-10719 38724h12927l7185-25973h58100c1826 0 3534-619 5124-1855 1590-1237 2651-2768 3151-4594l7185-25972c559-1943 383-3504-501-4741z" fill="#716d6a" />
                <path d="M274245 55833l16344 32510-34365 32510 4087-14747 18794-17763-8941-17785z" fill="#0e8635" />
                <path d="M262762 55833l16343 32510-34395 32510z" fill="#e97208" />
              </svg>
            </div>
            {/* Visa */}
            <div className="h-8 w-14 bg-white px-2 py-1 rounded flex items-center justify-center shadow-sm">
              <svg className="h-4 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z" fill="#1A1F71" />
              </svg>
            </div>
            {/* Mastercard */}
            <div className="h-8 w-14 bg-white px-2 py-1 rounded flex items-center justify-center shadow-sm">
              <svg className="h-5 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="10" fill="#EB001B" />
                <circle cx="22" cy="10" r="10" fill="#F79E1B" fillOpacity="0.8" />
                <path d="M16 3.1c1.8 1.8 2.9 4.3 2.9 6.9s-1.1 5.1-2.9 6.9c-1.8-1.8-2.9-4.3-2.9-6.9S14.2 4.9 16 3.1z" fill="#FF5F00" />
              </svg>
            </div>
            {/* RuPay */}
            <div className="h-8 w-14 bg-white px-2 py-1 rounded flex items-center justify-center shadow-sm">
              <svg className="h-5 w-auto" viewBox="0 0 333334 199007" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" xmlns="http://www.w3.org/2000/svg">
                <path d="M214088 83928h13199v20970l11418-20970h12113l-24422 42395s-2267 3556-5079 5437c-2310 1547-5151 1477-6019 1540-4824-42-10643-55-10643-55l2807-10106 4542-8s2079-212 2882-1237c765-977 1156-1954 1156-3387 0-2148-1954-34580-1954-34580zM76939 88116c-1837 4256-7533 3772-7533 3772l-6632-31 2421-9013s5933 22 8843 22c3115 0 4088 2502 2902 5249zm15073-6142c1129-8943-6741-11201-15250-11201H54402l-13199 48105h14208l4436-16333 7970 65s3289-191 3354 2898c69 3295-2442 9345-2280 13370h14596l-32-1281s-1213-322-1078-2026c56-709 839-2953 1864-5979 618-1334 1550-4499 1464-7076-107-3217-2126-4710-5037-5754 9074-2128 11342-14787 11343-14787zm3224 1954h12959l-5337 20533s-1331 4579 2952 4932c3384 280 5902-3758 6727-6493 1084-3592 5296-18973 5296-18973h13351l-10159 34950h-11657l1432-4993s-5947 7252-14783 6382c-7854-771-8531-6468-7170-13575 668-3489 6389-22763 6389-22763zm66557 4298c-1849 5158-6944 4550-6944 4550l-6956 2 2746-10220s4403 23 7311 23c3560 0 4852 2828 3843 5644zm14609-4776c1130-8944-5687-12678-14197-12678h-22359l-13198 48105h14208l3995-14831 11320 69s17530 742 20232-20665zm11945 28307c-2220 563-4912 869-5446-1148-1466-5527 11474-7145 11474-7145 88 5036-4325 7859-6029 8293zm19575-10116c1707-5814 3865-11319 2128-14370-2660-4670-7468-5080-14502-5080-7771 0-17365 1476-20492 11810h12937s1179-3892 6035-3647c4298 217 4063 3174 2479 4809-2778 2865-10450 1276-18947 4224-7424 2576-10022 12338-8409 16234 1563 3778 4474 4259 8401 4645 6307 620 11143-2897 13394-4961 0 2292 60 3572 60 3572h13614l-33-1281s-1213-322-1078-2026c98-1248 2450-7252 4412-13929z" fill="#382a8d" />
                <path d="M267751 75852l-15239 53011 28524-26506z" fill="#1d8546" />
                <path d="M257982 75852l-15239 53011 28525-26506z" fill="#ec6b00" />
                <path d="M286355 66228c-2896 0-5254 2357-5254 5254 0 2896 2357 5253 5254 5253 2896 0 5253-2357 5253-5253 0-2898-2357-5254-5253-5254zm-81 7409v-4095h817l968 2899c90 270 154 472 197 606 46-149 118-368 218-657l980-2848h728v4095h-522v-3428l-1190 3428h-488l-1185-3486v3486h-523zm-2721 0v-3611h-1348v-483h3245v483h-1354v3611h-543zm2802 3618c-3185 0-5774-2590-5774-5774s2590-5775 5774-5775c3183 0 5774 2591 5774 5775 0 3183-2591 5774-5774 5774z" fill="#382a8d" />
              </svg>
            </div>
            {/* Razorpay */}
            <div className="h-8 w-14 bg-white px-2 py-1 rounded flex items-center justify-center shadow-sm">
              <svg className="h-5 w-auto" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24z" fill="#3395FF" />
                <path d="M14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z" fill="#0C2651" />
              </svg>
            </div>
            {/* Cashfree */}
            <div className="h-8 w-14 bg-white px-2 py-1 rounded flex items-center justify-center shadow-sm">
              <span className="font-bold text-[9px] text-[#0D1C2F] tracking-tight flex items-center gap-0.5">
                <span>cash</span>
                <span className="text-teal-500">free</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-s-md border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-s-md">
          <p className="text-xs text-on-primary-container">
            © 2026 TradeVistar Global Infrastructure. All rights reserved.
          </p>
          <div className="flex gap-s-md text-xs text-on-primary-container">
            <Link className="hover:text-white" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:text-white" href="#">
              Terms of Service
            </Link>
            <Link className="hover:text-white" href="#">
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
