"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TopNavBar from "@/components/sections/TopNavBar";
import Footer from "@/components/sections/Footer";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import LoginCard from "@/components/auth/LoginCard";

export default function SellerLandingPage() {


  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Success Stories Slider State
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);

  // Sneak Peek Slider State
  const [activePeekIndex, setActivePeekIndex] = useState<number>(0);

  // Support Form State
  const [queryName, setQueryName] = useState<string>("");
  const [queryContact, setQueryContact] = useState<string>("");
  const [queryTopic, setQueryTopic] = useState<string>("");
  const [queryMessage, setQueryMessage] = useState<string>("");
  const [querySuccess, setQuerySuccess] = useState<boolean>(false);



  const peekSlides = [
    {
      title: "The All New Homepage. Personalised just for you!",
      desc: "Our new homepage is personalised for all our exporters starting from a new seller to an evolved corporate enterprise. Experience industry leading wholesale sourcing tools.",
      actionText: "Explore All Features"
    },
    {
      title: "Global RFQ & Live Buyer Negotiation Manager",
      desc: "Chat directly with global procurement managers. Negotiate pricing tiers, container sizes, customized product specifications, and shipping lead times in real-time.",
      actionText: "Open RFQ Manager"
    },
    {
      title: "Secure Escrow Clearing & Settlements",
      desc: "Track incoming deposits from buyers globally. Fund settlement clears directly to your registered bank account automatically within 7 days of shipment dispatch verification.",
      actionText: "Check Escrow Terms"
    }
  ];

  const successStoryList = [
    {
      name: "Raju Lunawath",
      company: "Amazestore B2B",
      image: "/png/story_raju.png",
      quote: "TradeVistar's support & escrow innovation fueled my exponential export growth. I started with 1 category and moved to 6 categories with an astounding 5x Year on Year expansion!",
    },
    {
      name: "Meera Nair",
      company: "IndoTex Creations",
      image: "/png/story_meera.png",
      quote: "Sourcing textiles globally was a bottleneck until we listed on TradeVistar. Within three months, we secured bulk orders from Germany and USA, scaling our workforce by 150%.",
    },
    {
      name: "Vikram Jeet",
      company: "Apex Agro Industries",
      image: "/png/story_raju.png",
      quote: "The automated catalog translation and shipping documentation aid saved us hundreds of compliance hours. We are now exporting premium basmati rice to 12 new European countries.",
    }
  ];

  const successStories = [
    {
      logoText: "ZE",
      company: "Zenith Exports",
      author: "Rajesh Khanna",
      role: "Director",
      country: "India",
      flag: "🇮🇳",
      growth: "+42% Export Growth",
      rating: 5,
      quote: "TradeVistar Escrow completely resolved our credit risk. We scaled manufacturing and exported 200 containers of granite to Germany without a single payment delay.",
    },
    {
      logoText: "AT",
      company: "Apex Tex Global",
      author: "Sarah Jenkins",
      role: "COO",
      country: "Bangladesh",
      flag: "🇧🇩",
      growth: "+68% YoY Revenue",
      rating: 5,
      quote: "The AI catalog translation allowed our textile team to receive RFQs directly from French retail buyers in their language. Lead time negotiation was seamless.",
    },
    {
      logoText: "EP",
      company: "Elixir Pharma Group",
      author: "Dr. Amit Shah",
      role: "VP Exports",
      country: "India",
      flag: "🇮🇳",
      growth: "+55% Sourcing Vol",
      rating: 5,
      quote: "Logistics paperwork is fully automated. TradeVistar generates E-Way logs and custom shipping certificates instantly, saving us hundreds of compliance hours.",
    },
  ];

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    setQuerySuccess(true);
    setQueryName("");
    setQueryContact("");
    setQueryTopic("");
    setQueryMessage("");
    setTimeout(() => setQuerySuccess(false), 5000);
  };

  const faqItems = [
    {
      q: "How do I register?",
      a: "Registration is quick and simple. Enter your 10-digit mobile number in the onboarding card, submit your company's 15-character corporate GSTIN, and connect your bank credentials. A dedicated B2B onboarding specialist will contact you within 2 hours to guide catalog setup.",
    },
    {
      q: "How are payments processed?",
      a: "All bulk order transactions utilize TradeVistar's secure B2B Escrow gateway. The buyer's payment is locked securely upon checkout and released to your bank account automatically once proof-of-delivery is confirmed by logistics tracking, guaranteeing zero defaults.",
    },
    {
      q: "How much commission?",
      a: "TradeVistar charges a flat 2.5% platform transaction fee on completed B2B sales. There are zero listing fees, zero setup costs, and zero monthly subscription fees. You only pay when your transactions are completed.",
    },
    {
      q: "Can I export internationally?",
      a: "Yes, TradeVistar is engineered for global B2B trade. We translate your catalog specs automatically, support multi-currency settlements, and provide pre-integrated customs clearance alongside international air/ocean freight logistics.",
    },
    {
      q: "How long does verification take?",
      a: "Corporate GSTIN and business registration verification runs instantly in real-time. Manual audits of PAN-linked company credentials and KYC documents are processed by our compliance team within 2 business days of file submission.",
    },
    {
      q: "How do I receive inquiries?",
      a: "Buyers submit bulk RFQs (Request for Quotes) directly from your catalog page. You will receive instant notifications in your dashboard message center and can negotiate price tiers, MOQ limits, and lead times directly via live chat.",
    },
  ];

  return (
    <div className="bg-background min-h-screen text-on-surface flex flex-col justify-between">
      <TopNavBar />

      <main className="flex-grow pt-[78px]">
        {/* 1. Hero Section (Flipkart Inspired visual typography) */}
        <section className="relative bg-white py-16 lg:py-20 border-b border-outline-variant/20 px-s-md overflow-hidden" id="hero">

          <div className="max-w-s-container-max mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Content (Flipkart style layout) */}
              <div className="lg:col-span-7 space-y-6 select-none">
                <div className="space-y-1">
                  <span className="font-headline-md text-trade-navy font-bold tracking-tight block text-xl sm:text-2xl">
                    Ab se
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display-lg text-[#034FA6] font-black text-7xl sm:text-9xl leading-none tracking-tighter block">
                      2.5%
                    </span>
                    <div className="flex flex-col">
                      <span className="font-headline-lg text-[#034FA6] font-bold text-2xl sm:text-4xl leading-none tracking-wide">
                        Commission*
                      </span>
                      <span className="text-secondary text-xs font-semibold tracking-wide mt-1">
                        Flat transaction rate
                      </span>
                    </div>
                  </div>
                  <h2 className="font-headline-lg text-trade-navy font-bold text-xl sm:text-3xl tracking-tight leading-tight pt-1">
                    pe zyada becho, grow exports!
                  </h2>
                </div>

                {/* Yellow/Orange Banner Ribbon (like & BIG DROP IN RETURN FEE) */}
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-[#FC9D05] text-trade-navy font-black text-[11px] sm:text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg shadow-sm border border-amber-300">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span>
                  &amp; MAXIMIZE GLOBAL B2B PROFIT MARGINS
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-green animate-pulse"></span>
                  <span className="text-[11px] text-primary-green font-black uppercase tracking-wider">
                    Live Now on TradeVistar
                  </span>
                </div>

                <p className="text-secondary text-xs sm:text-[13.5px] leading-relaxed max-w-lg font-medium">
                  Reach verified enterprise buyers from 190+ countries, receive genuine bulk RFQs, and secure payments with escrow protection.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/seller/register"
                    className="bg-primary-orange hover:bg-orange-600 text-white font-bold text-[12px] sm:text-[13px] px-8 py-3.5 rounded-lg shadow-md hover:shadow-orange-600/10 active:scale-95 transition-all cursor-pointer text-center"
                  >
                    Start Selling
                  </Link>
                  <button
                    onClick={() => {
                      alert("Thank you! Our enterprise sales specialist will contact you on your registered mobile shortly.");
                    }}
                    className="border border-outline-variant hover:bg-slate-50 text-trade-navy bg-white font-bold text-[12px] sm:text-[13px] px-8 py-3.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                  >
                    Book Demo
                  </button>
                </div>
              </div>

              {/* Right Side: Login Card */}
              <div className="lg:col-span-5 relative flex justify-center items-center z-10">
                <LoginCard />
              </div>

            </div>

            {/* 4-Column Overlapping Stats Card at the bottom of the Hero Section */}
            <div className="mt-16 w-full bg-white border border-outline-variant/30 rounded-2xl p-6 shadow-lg relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-outline-variant/15 select-none">
              
              {/* Stat 1 */}
              <div className="flex flex-col items-center justify-center text-center p-2 first:pt-2 pt-6 md:pt-2">
                <span className="text-primary-blue font-black text-3xl sm:text-4xl block tracking-tight">
                  <AnimatedNumber value="50K+" />
                </span>
                <span className="text-[11px] text-secondary font-black uppercase tracking-wider mt-1">Verified Suppliers</span>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2">
                <span className="text-[#034FA6] font-black text-3xl sm:text-4xl block tracking-tight">
                  <AnimatedNumber value="190+" />
                </span>
                <span className="text-[11px] text-secondary font-black uppercase tracking-wider mt-1">Countries Served</span>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2">
                <span className="text-primary-green font-black text-3xl sm:text-4xl block tracking-tight">
                  <AnimatedNumber value="1M+" />
                </span>
                <span className="text-[11px] text-secondary font-black uppercase tracking-wider mt-1">Products Listed</span>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col items-center justify-center text-center p-2 pt-6 md:pt-2">
                <span className="text-primary-orange font-black text-3xl sm:text-4xl block tracking-tight">
                  24×7
                </span>
                <span className="text-[11px] text-secondary font-black uppercase tracking-wider mt-1">Seller Support</span>
              </div>

            </div>

          </div>
        </section>


        {/* 1.7. Why Sellers Love TradeVistar Section */}
        <section className="bg-white py-20 px-s-md border-b border-outline-variant/10" id="why-sell">
          <div className="max-w-s-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column - Headline, Subtitle, and 4 Cards Grid */}
              <div className="lg:col-span-8 space-y-8 select-none">
                <div className="space-y-4">
                  <h2 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold tracking-tight leading-tight">
                    Why do <span className="text-[#034FA6] relative after:absolute after:bottom-1 after:left-0 after:right-0 after:h-1.5 after:bg-[#0399ED]/10 after:-z-10">sellers love</span> selling on TradeVistar?
                  </h2>
                  <p className="text-secondary text-[13.5px] leading-relaxed max-w-2xl font-medium">
                    Millions of global buyers across the world trust TradeVistar to be their premier B2B sourcing destination. It is no surprise that thousands of verified manufacturers and exporters trust their catalogs to be available 24x7 on TradeVistar.
                  </p>
                </div>

                {/* 4 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Card 1: Opportunity */}
                  <div className="bg-slate-50/50 border border-outline-variant/15 p-5 rounded-2xl space-y-3 hover:border-trade-orange/30 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] font-bold">visibility</span>
                      </div>
                      <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                        Opportunity
                      </h4>
                    </div>
                    <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                      Verified buyers from 190+ countries, access to international trade fairs, global buying festivals, and genuine RFQs.
                    </p>
                  </div>

                  {/* Card 2: Ease of Doing Business */}
                  <div className="bg-slate-50/50 border border-outline-variant/15 p-5 rounded-2xl space-y-3 hover:border-trade-orange/30 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] font-bold">touch_app</span>
                      </div>
                      <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                        Ease of Doing Business
                      </h4>
                    </div>
                    <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                      Create your TradeVistar seller store in under 10 minutes with just 1 product and a valid corporate GSTIN.
                    </p>
                  </div>

                  {/* Card 3: Growth */}
                  <div className="bg-slate-50/50 border border-outline-variant/15 p-5 rounded-2xl space-y-3 hover:border-trade-orange/30 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] font-bold">insights</span>
                      </div>
                      <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                        Growth
                      </h4>
                    </div>
                    <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                      Exporters see an average 2.8X spike in sourcing volumes, 2.3X more visibility, and up to 5X revenue growth during Peak Export Seasons.
                    </p>
                  </div>

                  {/* Card 4: Additional Support */}
                  <div className="bg-slate-50/50 border border-outline-variant/15 p-5 rounded-2xl space-y-3 hover:border-trade-orange/30 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px] font-bold">headset_mic</span>
                      </div>
                      <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                        Additional Support
                      </h4>
                    </div>
                    <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                      Escrow dispute resolution, automatic catalog translation, shipping documentation aid, and catalog photoshoot support.
                    </p>
                  </div>

                </div>
              </div>

              {/* Right Column - Generated Business Woman Standing Image */}
              <div className="lg:col-span-4 relative flex justify-center items-center">
                <div className="relative w-full aspect-[4/5] max-w-[340px] md:max-w-[380px] rounded-3xl overflow-hidden bg-slate-50/50 border border-outline-variant/10 shadow-lg group">
                  <Image
                    src="/png/professional_woman.png"
                    alt="Professional TradeVistar Business Woman"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  
                  {/* Subtle decorative bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 1.9. Seller Success Stories Slider Section */}
        <section className="bg-gradient-to-br from-white via-sky-50/15 to-slate-50/30 py-20 px-s-md border-b border-outline-variant/10">
          <div className="max-w-s-container-max mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Heading and Call-to-action */}
              <div className="lg:col-span-5 space-y-6 select-none text-center lg:text-left">
                <div className="space-y-4">
                  <h2 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold tracking-tight leading-tight">
                    <span className="text-[#034FA6]">Seller Success</span> Stories
                  </h2>
                  <p className="text-secondary text-[14px] leading-relaxed font-semibold max-w-sm mx-auto lg:mx-0">
                    50K+ verified global sellers trust TradeVistar for their international export business.
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border border-[#034FA6] hover:bg-sky-50/30 text-[#034FA6] bg-white font-bold text-[13px] px-6 py-2.5 rounded-lg transition-all active:scale-95 cursor-pointer shadow-2xs"
                >
                  See All Stories
                </button>
              </div>

              {/* Right Column: Interactive Testimonial Slider Card */}
              <div className="lg:col-span-7 flex flex-col items-center">
                <div className="relative w-full px-4 select-none">
                  
                  {/* Testimonial Card Frame */}
                  <div className="bg-white border border-outline-variant/20 rounded-3xl p-8 md:p-10 shadow-md relative min-h-[300px] flex flex-col justify-between transition-all duration-300">
                    
                    {/* Inner Content */}
                    <div className="space-y-4">
                      
                      {/* Circle Profile Portrait with Amber border */}
                      <div className="relative w-20 h-20 rounded-full border-[3px] border-amber-400 p-0.5 mx-auto overflow-hidden shadow-sm bg-slate-50">
                        <Image
                          src={successStoryList[activeStoryIndex].image}
                          alt={successStoryList[activeStoryIndex].name}
                          fill
                          className="rounded-full object-cover"
                          priority
                        />
                      </div>

                      {/* Exporter Details */}
                      <div className="text-center">
                        <span className="text-trade-navy font-bold text-md block leading-tight tracking-tight">
                          {successStoryList[activeStoryIndex].name}
                        </span>
                        <span className="text-secondary text-[11px] font-black uppercase tracking-wider block mt-1">
                          {successStoryList[activeStoryIndex].company}
                        </span>
                      </div>

                      {/* Quote symbol */}
                      <span className="text-primary-blue/20 text-5xl font-black block text-center font-serif leading-none mt-2">
                        “
                      </span>

                      {/* Testimonial text */}
                      <p className="text-secondary font-medium text-[13px] leading-relaxed text-center italic max-w-sm mx-auto">
                        {successStoryList[activeStoryIndex].quote}
                      </p>

                    </div>

                  </div>

                  {/* Absolute navigation arrows overlapping borders */}
                  <button
                    onClick={() => {
                      setActiveStoryIndex((prev) => (prev === 0 ? successStoryList.length - 1 : prev - 1));
                    }}
                    className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 bg-white border border-outline-variant/20 rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all cursor-pointer z-10 text-trade-navy"
                    aria-label="Previous story"
                  >
                    <span className="material-symbols-outlined text-[18px] font-bold">chevron_left</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveStoryIndex((prev) => (prev === successStoryList.length - 1 ? 0 : prev + 1));
                    }}
                    className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 bg-white border border-outline-variant/20 rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all cursor-pointer z-10 text-trade-navy"
                    aria-label="Next story"
                  >
                    <span className="material-symbols-outlined text-[18px] font-bold">chevron_right</span>
                  </button>

                </div>

                {/* Dots pagination indicator */}
                <div className="flex justify-center gap-1.5 mt-6">
                  {successStoryList.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStoryIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        activeStoryIndex === index ? "bg-[#034FA6] w-6" : "bg-slate-300 w-2"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* 1.95. Your Journey on TradeVistar */}
        <section className="bg-white py-20 px-s-md border-b border-outline-variant/10" id="journey">
          <div className="max-w-s-container-max mx-auto space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3 select-none">
              <h2 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold tracking-tight leading-tight">
                Your Journey on <span className="text-[#034FA6]">TradeVistar</span>
              </h2>
              <p className="text-secondary text-[13.5px] font-semibold max-w-xl mx-auto">
                Starting your online export business with TradeVistar is easy. Thousands of exporters trust TradeVistar with their business.
              </p>
            </div>

            {/* 5 Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              
              {/* Card 1: Create */}
              <div className="group space-y-4 text-center sm:text-left">
                <div className="bg-gradient-to-b from-[#EBF6FF] to-white border border-outline-variant/10 rounded-2xl h-[180px] flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all duration-300">
                  {/* Phone Graphic shape */}
                  <div className="w-18 h-28 bg-white border border-slate-200 rounded-lg relative flex flex-col p-2 shadow-xs transform group-hover:rotate-2 transition-transform duration-300">
                    <div className="w-4 h-1 bg-slate-200 rounded-full mx-auto mb-1.5"></div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 rounded-full bg-[#EBF6FF] text-[#034FA6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                      </div>
                      <div className="w-8 h-1 bg-slate-200 rounded"></div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-4 h-4 rounded-full bg-[#EBF6FF] text-[#034FA6] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] font-bold">check</span>
                      </div>
                      <div className="w-10 h-15 bg-slate-100 rounded p-1">
                        <div className="w-full h-0.5 bg-slate-200 mb-0.5"></div>
                        <div className="w-2/3 h-0.5 bg-slate-200"></div>
                      </div>
                    </div>
                  </div>
                  {/* Floating User avatar */}
                  <div className="absolute bottom-2 left-6 bg-[#034FA6] text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[14px]">person</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline-md text-[15px] text-trade-navy font-bold tracking-wide">
                    Create
                  </h4>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Register in just 10 mins with valid GST, address, &amp; bank details.
                  </p>
                </div>
              </div>

              {/* Card 2: List */}
              <div className="group space-y-4 text-center sm:text-left">
                <div className="bg-gradient-to-b from-[#EBF6FF] to-white border border-outline-variant/10 rounded-2xl h-[180px] flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all duration-300">
                  {/* Desktop monitor shape */}
                  <div className="w-28 h-18 bg-white border border-slate-200 rounded-lg relative flex flex-col p-1.5 shadow-xs transform group-hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-1 mb-1.5">
                      <div className="w-8 h-1 bg-slate-200 rounded"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1">
                      <div className="aspect-square bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-[8px] text-[#034FA6]">inventory_2</span>
                      </div>
                      <div className="aspect-square bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-[8px] text-[#034FA6]">inventory_2</span>
                      </div>
                      <div className="aspect-square bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
                        <span className="material-symbols-outlined text-[8px] text-[#034FA6]">inventory_2</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-6 h-4 bg-slate-300 absolute bottom-5"></div>
                  <div className="w-12 h-0.5 bg-slate-400 absolute bottom-5"></div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline-md text-[15px] text-trade-navy font-bold tracking-wide">
                    List
                  </h4>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    List your products (min 1 no.) that you want to sell on TradeVistar.
                  </p>
                </div>
              </div>

              {/* Card 3: Orders */}
              <div className="group space-y-4 text-center sm:text-left">
                <div className="bg-gradient-to-b from-[#EBF6FF] to-white border border-outline-variant/10 rounded-2xl h-[180px] flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all duration-300">
                  {/* Browser and Box shape */}
                  <div className="w-26 h-18 bg-white border border-slate-200 rounded-t-lg relative flex flex-col p-1.5 shadow-xs transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-1 bg-slate-100 rounded-sm mb-1.5"></div>
                    <div className="w-12 h-1 bg-slate-200 rounded mb-1"></div>
                    <div className="w-16 h-1 bg-slate-200 rounded mb-1.5"></div>
                    <div className="w-8 h-2.5 bg-[#034FA6] rounded-xs"></div>
                  </div>
                  {/* Overlapping cardboard boxes */}
                  <div className="absolute right-6 bottom-4 w-10 h-10 bg-amber-100 border border-amber-300 rounded flex items-center justify-center rotate-6 shadow-xs">
                    <span className="material-symbols-outlined text-[16px] text-amber-700">package_2</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline-md text-[15px] text-trade-navy font-bold tracking-wide">
                    Orders
                  </h4>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Receive orders from over 45 crore+ TradeVistar global buyers.
                  </p>
                </div>
              </div>

              {/* Card 4: Shipment */}
              <div className="group space-y-4 text-center sm:text-left">
                <div className="bg-gradient-to-b from-[#EBF6FF] to-white border border-outline-variant/10 rounded-2xl h-[180px] flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all duration-300">
                  {/* Map route and Delivery courier */}
                  <div className="w-16 h-28 bg-white border border-slate-200 rounded-lg relative flex flex-col p-1 shadow-xs transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full bg-[#EBF6FF] rounded relative flex items-center justify-center overflow-hidden">
                      {/* Map lines */}
                      <div className="absolute w-[120%] h-0.5 bg-slate-300 rotate-12"></div>
                      <div className="absolute w-[120%] h-0.5 bg-slate-300 -rotate-45"></div>
                      <span className="material-symbols-outlined text-[16px] text-[#034FA6] relative z-10">pin_drop</span>
                    </div>
                  </div>
                  {/* Delivery package */}
                  <div className="absolute bottom-5 left-4 bg-emerald-50 border border-emerald-300 rounded px-2 py-1 shadow-md flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[12px] text-emerald-600">local_shipping</span>
                    <span className="text-[7px] font-black text-emerald-700 uppercase">Shipped</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline-md text-[15px] text-trade-navy font-bold tracking-wide">
                    Shipment
                  </h4>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    TradeVistar ensures stress free delivery and tracking of your products.
                  </p>
                </div>
              </div>

              {/* Card 5: Payment */}
              <div className="group space-y-4 text-center sm:text-left">
                <div className="bg-gradient-to-b from-[#EBF6FF] to-white border border-outline-variant/10 rounded-2xl h-[180px] flex items-center justify-center relative overflow-hidden group-hover:shadow-inner transition-all duration-300">
                  {/* Banking screen and cash shapes */}
                  <div className="w-18 h-28 bg-white border border-slate-200 rounded-lg relative flex flex-col p-2 shadow-xs transform group-hover:translate-x-1 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-2">
                      <span className="material-symbols-outlined text-[10px] text-slate-400">account_balance</span>
                      <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full mb-1">
                      <div className="w-3/4 h-full bg-emerald-400 rounded-full"></div>
                    </div>
                    <div className="w-10 h-1 bg-slate-200 rounded mb-3"></div>
                    <span className="material-symbols-outlined text-[20px] text-emerald-500 mx-auto">monetization_on</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="font-headline-md text-[15px] text-trade-navy font-bold tracking-wide">
                    Payment
                  </h4>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Receive payment 7 days* from the date of dispatch of your order.
                  </p>
                </div>
              </div>

            </div>

            {/* Launch Kit Download Button */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  alert("Your TradeVistar Seller Launch Kit is preparing for download... Start scaling your exports!");
                }}
                className="border border-[#034FA6] hover:bg-sky-50/30 text-[#034FA6] bg-white font-bold text-[13px] px-8 py-3 rounded-lg transition-all active:scale-95 cursor-pointer shadow-2xs"
              >
                Download Launch Kit
              </button>
            </div>

          </div>
        </section>

        {/* 1.97. Access our tools to grow faster on TradeVistar */}
        <section className="bg-[#F8FAFC] py-20 px-s-md border-b border-outline-variant/10 relative overflow-hidden" id="seller-tools">
          
          {/* Giant watermark background text */}
          <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 text-[90px] sm:text-[160px] font-black text-primary-blue/3 select-none pointer-events-none uppercase tracking-widest whitespace-nowrap z-0">
            5x Growth
          </div>

          <div className="max-w-s-container-max mx-auto relative z-10 space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3 select-none">
              <h2 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold tracking-tight leading-tight">
                Access our tools to <span className="text-[#034FA6]">grow faster</span> on TradeVistar
              </h2>
              <p className="text-secondary text-[13.5px] font-semibold max-w-2xl mx-auto">
                We understand that your international trade operations may require additional support from time to time, and we&apos;ve got you covered. With your TradeVistar account, you gain access to a range of tools designed to help grow your export business.
              </p>
            </div>

            {/* 6 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1: Fulfilment */}
              <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">warehouse</span>
                    </div>
                    <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                      Fulfilment by TradeVistar
                    </h4>
                  </div>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Worried about international warehousing, custom clearance, logistics, and delivery? Let TradeVistar do it all for you.
                  </p>
                </div>
                <button
                  onClick={() => alert("Learn more about Fulfilment by TradeVistar. Our logistics specialist will guide you through international warehousing setup.")}
                  className="text-[#034FA6] hover:text-[#0399ED] font-bold text-[12px] tracking-wide mt-5 flex items-center gap-1 group/btn w-fit cursor-pointer bg-transparent border-none p-0 align-baseline"
                >
                  Learn More
                  <span className="material-symbols-outlined text-[14px] transform group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>

              {/* Card 2: Ads */}
              <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">campaign</span>
                    </div>
                    <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                      TradeVistar B2B Ads
                    </h4>
                  </div>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Curious how your industrial catalog will stand out from global competitors and gain maximum buyer visibility?
                  </p>
                </div>
                <button
                  onClick={() => alert("Learn more about TradeVistar B2B Ads. Launch sponsored products to premium wholesale importers.")}
                  className="text-[#034FA6] hover:text-[#0399ED] font-bold text-[12px] tracking-wide mt-5 flex items-center gap-1 group/btn w-fit cursor-pointer bg-transparent border-none p-0 align-baseline"
                >
                  Learn More
                  <span className="material-symbols-outlined text-[14px] transform group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>

              {/* Card 3: Shopping Festivals */}
              <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
                    </div>
                    <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                      Global Sourcing Fairs
                    </h4>
                  </div>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Get access to the world&apos;s biggest digital B2B sourcing events, wholesale trade festivals, and buyer-seller meets.
                  </p>
                </div>
                <button
                  onClick={() => alert("Learn more about Global Sourcing Fairs. Apply for pre-registration in our next Middle-East Sourcing Expo.")}
                  className="text-[#034FA6] hover:text-[#0399ED] font-bold text-[12px] tracking-wide mt-5 flex items-center gap-1 group/btn w-fit cursor-pointer bg-transparent border-none p-0 align-baseline"
                >
                  Learn More
                  <span className="material-symbols-outlined text-[14px] transform group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>

              {/* Card 4: Learning Center */}
              <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">school</span>
                    </div>
                    <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                      Seller Learning Center
                    </h4>
                  </div>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Personalized export learning modules, foreign trade webinars, market entry guides, and compliance videos.
                  </p>
                </div>
                <button
                  onClick={() => alert("Learn more about Seller Learning Center. Explore guides on letters of credit, customs, and global logistics.")}
                  className="text-[#034FA6] hover:text-[#0399ED] font-bold text-[12px] tracking-wide mt-5 flex items-center gap-1 group/btn w-fit cursor-pointer bg-transparent border-none p-0 align-baseline"
                >
                  Learn More
                  <span className="material-symbols-outlined text-[14px] transform group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>

              {/* Card 5: Account Management */}
              <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">support_agent</span>
                    </div>
                    <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                      Account Management
                    </h4>
                  </div>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Improve product selection, product pricing, business insights, and more with our expert in-house account managers.
                  </p>
                </div>
                <button
                  onClick={() => alert("Learn more about TradeVistar Account Management. Assign an enterprise account specialist to your store.")}
                  className="text-[#034FA6] hover:text-[#0399ED] font-bold text-[12px] tracking-wide mt-5 flex items-center gap-1 group/btn w-fit cursor-pointer bg-transparent border-none p-0 align-baseline"
                >
                  Learn More
                  <span className="material-symbols-outlined text-[14px] transform group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>

              {/* Card 6: Mobile App */}
              <div className="bg-white border border-outline-variant/15 p-6 rounded-2xl shadow-xs hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-blue/5 text-[#034FA6] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">smartphone</span>
                    </div>
                    <h4 className="font-headline-md text-[14px] text-trade-navy font-bold tracking-wide">
                      Seller Mobile App
                    </h4>
                  </div>
                  <p className="text-secondary text-[12px] leading-relaxed font-semibold">
                    Manage your wholesale RFQs and talk to buyers 24x7 with TradeVistar Seller Hub App. Available on all iOS &amp; Android devices.
                  </p>
                </div>
                <button
                  onClick={() => alert("Learn more about TradeVistar Mobile App. Download link has been sent to your registered mobile.")}
                  className="text-[#034FA6] hover:text-[#0399ED] font-bold text-[12px] tracking-wide mt-5 flex items-center gap-1 group/btn w-fit cursor-pointer bg-transparent border-none p-0 align-baseline"
                >
                  Learn More
                  <span className="material-symbols-outlined text-[14px] transform group-hover/btn:translate-x-0.5 transition-transform">arrow_forward</span>
                </button>
              </div>

            </div>

          </div>
        </section>

        {/* 1.99. Take a sneak peek into our platform */}
        <section className="bg-white py-20 px-s-md border-b border-outline-variant/10 relative overflow-hidden">
          <div className="max-w-s-container-max mx-auto space-y-12">
            
            {/* Header */}
            <div className="text-center space-y-3 select-none">
              <h2 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold tracking-tight leading-tight">
                Take a sneak peek 👀 into <span className="text-[#034FA6]">our platform</span>
              </h2>
            </div>

            {/* Slider Container Box */}
            <div className="relative w-full px-4 select-none">
              
              {/* White Slider Card Frame */}
              <div className="bg-white border border-outline-variant/20 rounded-3xl p-8 md:p-12 shadow-md flex flex-col lg:flex-row items-center gap-12 relative min-h-[380px]">
                
                {/* Left Content Side */}
                <div className="flex-1 space-y-6 text-center lg:text-left">
                  <div className="space-y-4">
                    <h3 className="font-display-lg text-2xl md:text-3xl text-[#034FA6] font-bold leading-tight tracking-tight">
                      {peekSlides[activePeekIndex].title}
                    </h3>
                    <p className="text-secondary text-xs sm:text-[13.5px] leading-relaxed max-w-md mx-auto lg:mx-0 font-medium">
                      {peekSlides[activePeekIndex].desc}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => {
                      document.getElementById("register")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border-2 border-[#034FA6] hover:bg-sky-50/30 text-[#034FA6] bg-white font-bold text-[13px] px-8 py-3 rounded-lg transition-all active:scale-95 cursor-pointer shadow-2xs"
                  >
                    {peekSlides[activePeekIndex].actionText}
                  </button>
                </div>

                {/* Right Interactive Laptop + Phone Mockup Graphic Side */}
                <div className="flex-1 flex justify-center items-center">
                  <div className="relative w-full aspect-[16/10] max-w-[440px] flex items-center justify-center">
                    
                    {/* Simplified Laptop Mockup */}
                    <div className="w-[300px] sm:w-[350px] aspect-[16/10] bg-slate-900 border-[6px] border-slate-800 rounded-t-xl overflow-hidden relative shadow-lg flex flex-col">
                      {/* Top Bar */}
                      <div className="h-2 bg-slate-200 flex items-center px-1 gap-0.5 flex-shrink-0">
                        <div className="w-1 h-1 rounded-full bg-red-400"></div>
                        <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                        <div className="w-1 h-1 rounded-full bg-green-400"></div>
                      </div>
                      {/* Inner Workspace */}
                      <div className="flex-grow bg-white flex p-1 gap-1">
                        {/* Sidebar */}
                        <div className="w-10 bg-slate-900 rounded p-1 flex flex-col gap-1 flex-shrink-0">
                          <div className="h-1.5 w-full bg-white/20 rounded"></div>
                          <div className="h-1.5 w-2/3 bg-white/20 rounded"></div>
                          <div className="h-1.5 w-3/4 bg-white/20 rounded"></div>
                        </div>
                        {/* Dashboard Body */}
                        <div className="flex-grow flex flex-col gap-1">
                          <div className="h-3 w-1/3 bg-slate-100 rounded"></div>
                          <div className="grid grid-cols-3 gap-1">
                            <div className="h-6 bg-slate-50 border border-slate-100 rounded p-0.5">
                              <div className="h-1 w-full bg-[#034FA6]/20 rounded mb-0.5"></div>
                              <div className="h-1.5 w-2/3 bg-trade-navy rounded"></div>
                            </div>
                            <div className="h-6 bg-slate-50 border border-slate-100 rounded p-0.5">
                              <div className="h-1 w-full bg-[#034FA6]/20 rounded mb-0.5"></div>
                              <div className="h-1.5 w-2/3 bg-trade-navy rounded"></div>
                            </div>
                            <div className="h-6 bg-slate-50 border border-slate-100 rounded p-0.5">
                              <div className="h-1 w-full bg-[#034FA6]/20 rounded mb-0.5"></div>
                              <div className="h-1.5 w-2/3 bg-trade-navy rounded"></div>
                            </div>
                          </div>
                          <div className="flex-grow bg-slate-50 border border-slate-100 rounded p-1 flex items-end justify-between">
                            <div className="w-2.5 h-full bg-[#034FA6]/10 rounded-t"></div>
                            <div className="w-2.5 h-2/3 bg-[#034FA6]/15 rounded-t"></div>
                            <div className="w-2.5 h-1/2 bg-[#034FA6]/20 rounded-t"></div>
                            <div className="w-2.5 h-3/4 bg-[#FC9D05]/80 rounded-t"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Keyboard deck base */}
                    <div className="w-[340px] sm:w-[390px] h-[6px] bg-slate-400 rounded-b-xl absolute bottom-[15px] sm:bottom-[10px] shadow-md"></div>
                    <div className="w-[60px] h-[2px] bg-slate-600 rounded-b absolute bottom-[13px] sm:bottom-[8px]"></div>

                    {/* Smartphone Mockup (Overlaps Laptop on the right!) */}
                    <div className="absolute right-[10px] sm:right-[15px] bottom-[15px] sm:bottom-[10px] w-[80px] sm:w-[95px] aspect-[9/19] bg-slate-950 border-[3.5px] border-slate-900 rounded-2xl overflow-hidden shadow-2xl z-20 flex flex-col">
                      <div className="h-1.5 bg-slate-900 flex items-center justify-center flex-shrink-0">
                        <div className="w-6 h-1 bg-slate-800 rounded-full"></div>
                      </div>
                      <div className="flex-grow bg-white flex flex-col">
                        <div className="h-5 bg-[#034FA6] p-1 flex items-center justify-between flex-shrink-0">
                          <div className="w-3 h-3 rounded-full bg-white/20"></div>
                          <div className="w-8 h-1 bg-white/30 rounded"></div>
                        </div>
                        <div className="p-1 flex-grow flex flex-col gap-1">
                          <div className="h-1.5 w-1/2 bg-slate-200 rounded"></div>
                          <div className="h-8 bg-slate-50 border border-slate-100 rounded p-1 flex flex-col justify-between">
                            <div className="w-4 h-1 bg-[#FC9D05] rounded"></div>
                            <div className="w-8 h-1.5 bg-trade-navy rounded"></div>
                          </div>
                          <div className="flex-grow flex items-end gap-0.5 justify-between px-1">
                            <div className="w-1 h-[10px] bg-[#034FA6]/30 rounded-t"></div>
                            <div className="w-1 h-[15px] bg-[#034FA6]/50 rounded-t"></div>
                            <div className="w-1 h-[25px] bg-[#034FA6] rounded-t"></div>
                            <div className="w-1 h-[18px] bg-[#034FA6]/65 rounded-t"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Absolute overlay navigation arrows */}
                <button
                  onClick={() => {
                    setActivePeekIndex((prev) => (prev === 0 ? peekSlides.length - 1 : prev - 1));
                  }}
                  className="absolute left-[-8px] top-1/2 transform -translate-y-1/2 bg-white border border-outline-variant/20 rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all cursor-pointer z-30 text-trade-navy"
                  aria-label="Previous slide"
                >
                  <span className="material-symbols-outlined text-[18px] font-bold">chevron_left</span>
                </button>

                <button
                  onClick={() => {
                    setActivePeekIndex((prev) => (prev === peekSlides.length - 1 ? 0 : prev + 1));
                  }}
                  className="absolute right-[-8px] top-1/2 transform -translate-y-1/2 bg-white border border-outline-variant/20 rounded-full w-10 h-10 shadow-md flex items-center justify-center hover:bg-slate-50 active:scale-90 transition-all cursor-pointer z-30 text-trade-navy"
                  aria-label="Next slide"
                >
                  <span className="material-symbols-outlined text-[18px] font-bold">chevron_right</span>
                </button>

              </div>

              {/* Dots pagination indicator */}
              <div className="flex justify-center gap-1.5 mt-6">
                {peekSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActivePeekIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      activePeekIndex === index ? "bg-[#034FA6] w-6" : "bg-slate-300 w-2"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* 2.7. B2B Industry Categories Grid */}
        <section className="bg-slate-50 py-16 border-b border-outline-variant/10 px-s-md">
          <div className="max-w-s-container-max mx-auto space-y-12">
            
            {/* Title Block */}
            <div className="text-center space-y-3">
              <h2 className="font-headline-lg text-trade-navy font-bold tracking-tight">
                Supported B2B Categories
              </h2>
              <p className="text-secondary text-[13.5px] font-semibold max-w-xl mx-auto">
                List bulk catalogs and trade directly with procurement teams in major industrial sectors.
              </p>
            </div>

            {/* Grid container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              
              {/* Category 1 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">grass</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Agriculture
                </h4>
              </div>

              {/* Category 2 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">dry_cleaning</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Textiles
                </h4>
              </div>

              {/* Category 3 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">memory</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Electronics
                </h4>
              </div>

              {/* Category 4 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">chair</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Furniture
                </h4>
              </div>

              {/* Category 5 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">science</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Chemicals
                </h4>
              </div>

              {/* Category 6 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">precision_manufacturing</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Machinery
                </h4>
              </div>

              {/* Category 7 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">medical_services</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Healthcare
                </h4>
              </div>

              {/* Category 8 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">construction</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Construction
                </h4>
              </div>

              {/* Category 9 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">restaurant</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Food
                </h4>
              </div>

              {/* Category 10 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-primary-blue/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-center text-center space-y-3 group cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="material-symbols-outlined text-[24px]">directions_car</span>
                </div>
                <h4 className="font-bold text-[13px] text-trade-navy group-hover:text-primary-blue transition-colors">
                  Automotive
                </h4>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Premium Features (Why Sellers Choose TradeVistar) */}
        <section className="bg-white py-16 border-b border-outline-variant/20 px-s-md" id="why-sell">
          <div className="max-w-s-container-max mx-auto space-y-12">
            
            {/* Title Block */}
            <div className="text-center space-y-3">
              <h2 className="font-headline-lg text-trade-navy font-bold tracking-tight">
                Why Sellers Choose TradeVistar
              </h2>
              <p className="text-secondary text-[13.5px] font-semibold max-w-xl mx-auto">
                Everything you need to grow your business globally.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">how_to_reg</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    Verified Global Buyers
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    Connect with authenticated corporate clients, retail buyers, and procurement teams looking for certified B2B partners.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    AI Product Promotion
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    Boost listing search ranks and translate B2B catalog specs across international markets with our recommendation engine.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">security</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    Secure Payments
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    Eliminate payment defaults. Secure bulk purchase funds in TradeVistar&apos;s escrow until deliveries are verified.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">public</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    Export Assistance
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    Streamline customs clearance, manage tax files, and automate ocean/air cargo logs directly in your dashboard.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">analytics</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    Business Analytics
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    Track export volumes, monitor incoming RFQ conversions, and refine pricing margins with real-time analytics.
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="bg-white border border-outline-variant/20 rounded-xl p-5 hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col items-start space-y-3 group shadow-xs">
                <div className="w-10 h-10 rounded-lg bg-trade-navy/5 text-trade-navy flex items-center justify-center group-hover:bg-trade-navy group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-[20px]">support_agent</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-headline-md text-[13.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                    Dedicated Support
                  </h3>
                  <p className="text-[11.5px] text-secondary leading-relaxed">
                    Access customized B2B advice, catalog setups, and KYC assistance from our enterprise account managers.
                  </p>
                </div>
              </div>

            </div>

        </div>
        </section>

        {/* 5. How It Works (Horizontal Timeline) */}
        <section className="bg-white py-16 border-b border-outline-variant/20 px-s-md" id="how-it-works">
          <div className="max-w-s-container-max mx-auto space-y-12">
            
            {/* Title Block */}
            <div className="text-center space-y-3">
              <h2 className="font-headline-lg text-trade-navy font-bold tracking-tight">
                7 Steps to Start B2B Selling
              </h2>
              <p className="text-secondary text-[13.5px] font-semibold max-w-xl mx-auto">
                Onboard in minutes and manage your global export cycle seamlessly.
              </p>
            </div>

            {/* Timeline Container */}
            <div className="relative">
              
              {/* Connecting line for desktop (flowing gradient) */}
              <div className="absolute top-[32px] left-[7%] right-[7%] h-[3px] bg-slate-100 hidden lg:block rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-blue via-primary-orange to-primary-green animate-flow-line"
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />
              </div>

              {/* Grid of steps */}
              <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-8 text-center">
                
                {/* Step 1 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">person_add</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">1</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Create Account
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Verify mobile and establish your B2B enterprise workspace.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">assignment_ind</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">2</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Complete KYC
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Submit GSTIN and corporate account for direct payouts.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">3</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Upload Products
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Add product catalog with bulk price tiers and MOQs.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">forward_to_inbox</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">4</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Receive RFQs
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Get bulk purchase inquiries from verified buyers.
                    </p>
                  </div>
                </div>

                {/* Step 5 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">handshake</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">5</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Negotiate
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Discuss lead times and price quotes in real-time.
                    </p>
                  </div>
                </div>

                {/* Step 6 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">payments</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">6</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Get Paid
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Funds settle to your bank directly via secure escrow.
                    </p>
                  </div>
                </div>

                {/* Step 7 */}
                <div className="flex flex-col items-center space-y-3 relative z-10 group">
                  <div className="w-16 h-16 rounded-full bg-white border-2 border-primary-blue text-primary-blue flex items-center justify-center font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300 relative">
                    <span className="material-symbols-outlined text-[24px]">public</span>
                    <span className="absolute -top-1 -right-1 bg-primary-blue text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black border border-white">7</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-trade-navy font-bold text-[13.5px] tracking-wider">
                      Ship Globally
                    </h4>
                    <p className="text-secondary text-[11px] leading-relaxed max-w-[150px] mx-auto">
                      Fulfill orders with integrated freight logistics loaders.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* 6. Success Stories / Testimonials (Horizontal Scroll Slider) */}
        <section className="bg-slate-50 py-16 border-b border-outline-variant/20 px-s-md" id="testimonials">
          <div className="max-w-s-container-max mx-auto space-y-12">
            
            {/* Title Block */}
            <div className="text-center space-y-3">
              <h2 className="font-headline-lg text-trade-navy font-bold tracking-tight">
                Voices of the Network
              </h2>
              <p className="text-secondary text-[13.5px] font-semibold max-w-xl mx-auto">
                Discover how leading manufacturers and exporters are scaling global sales with TradeVistar.
              </p>
            </div>

            {/* Testimonials Slider */}
            <div className="flex gap-5 overflow-x-auto pb-8 snap-x scroll-smooth hide-scrollbar">
              {successStories.map((t, idx) => (
                <div
                  key={idx}
                  className="min-w-[320px] md:min-w-[360px] flex-1 snap-center p-6 bg-white border border-outline-variant/20 rounded-2xl space-y-5 shadow-sm flex flex-col justify-between hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="space-y-4">
                    {/* Top Row: Logo & Revenue Growth Badge */}
                    <div className="flex justify-between items-center">
                      <div className="w-10 h-10 rounded-lg bg-trade-navy/5 flex items-center justify-center font-black text-trade-navy text-sm">
                        {t.logoText}
                      </div>
                      <span className="text-[9px] font-black uppercase bg-primary-green/10 text-primary-green px-2.5 py-1 rounded-full">
                        {t.growth}
                      </span>
                    </div>

                    {/* Five Star Rating */}
                    <div className="flex text-trade-orange gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <span key={i} className="material-symbols-outlined text-[18px]">
                          star
                        </span>
                      ))}
                    </div>

                    {/* Review quote */}
                    <p className="text-[12.5px] text-secondary italic leading-relaxed font-medium">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>

                  {/* Bottom Row: Exporter details */}
                  <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                    <div className="w-10 h-10 rounded-full bg-primary-blue/5 flex items-center justify-center font-black text-primary-blue text-xs border border-primary-blue/10">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="font-bold text-[12.5px] text-trade-navy leading-none">{t.author}</p>
                        <span className="text-xs leading-none">{t.flag}</span>
                      </div>
                      <p className="text-[10px] text-secondary font-semibold uppercase tracking-wider mt-1">
                        {t.role} • {t.company} • {t.country}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 7. FAQs */}
        <section className="bg-white py-16 border-b border-outline-variant/20 px-s-md" id="faq">
          <div className="max-w-s-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Header */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="font-headline-lg text-trade-navy font-bold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-secondary text-[13px] font-semibold leading-relaxed">
                Have questions about registration, payouts, or logistics? Find answers here, or contact our B2B onboarding support line.
              </p>
              <Link
                href="/seller/register"
                className="text-primary-blue hover:text-secondary-blue font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer w-fit"
              >
                Start Registration
                <span className="material-symbols-outlined text-[15px]">arrow_right_alt</span>
              </Link>
            </div>

            {/* Right Accordions */}
            <div className="lg:col-span-7 space-y-4">
              {faqItems.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="border border-outline-variant/20 rounded-xl overflow-hidden bg-slate-50/30"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-5 py-4 flex justify-between items-center text-left text-[14px] font-bold text-trade-navy hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className={`material-symbols-outlined text-[18px] transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        keyboard_arrow_down
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 text-[12.5px] leading-relaxed text-secondary border-t border-outline-variant/10 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* 1.995. We are happy to help you contact section */}
        <section className="bg-white py-20 px-s-md border-b border-outline-variant/10 relative overflow-hidden" id="help-contact">
          <div className="max-w-s-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Form Block */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header */}
              <div className="space-y-3 select-none">
                <h2 className="font-display-lg text-3xl md:text-4xl text-trade-navy font-bold tracking-tight leading-tight">
                  We are happy to <span className="text-[#034FA6]">help you</span> 😇
                </h2>
                <p className="text-secondary text-[13px] sm:text-[13.5px] leading-relaxed font-semibold">
                  Still have questions or queries that are left unanswered? Share your thoughts below which will help us improve your website experience.
                </p>
              </div>

              {/* Form container */}
              {querySuccess ? (
                <div className="bg-green-50 border border-green-200 text-green-800 rounded-lg p-6 text-center space-y-3">
                  <span className="material-symbols-outlined text-[36px] text-primary-green">mark_email_read</span>
                  <h4 className="font-bold text-[14px]">Query Submitted Successfully!</h4>
                  <p className="text-[12px] leading-relaxed text-green-700 font-semibold">
                    Thank you, {queryName}. An expert support executive has been assigned to your query and will contact you via {queryContact} shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSendQuery} className="space-y-4 max-w-lg">
                  
                  {/* Full Name */}
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Full Name *"
                      value={queryName}
                      onChange={(e) => setQueryName(e.target.value)}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:border-primary-blue text-trade-navy font-semibold"
                      required
                    />
                  </div>

                  {/* Contact Info */}
                  <div>
                    <input
                      type="text"
                      placeholder="Enter Mobile Number / Email ID *"
                      value={queryContact}
                      onChange={(e) => setQueryContact(e.target.value)}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:border-primary-blue text-trade-navy font-semibold"
                      required
                    />
                  </div>

                  {/* Topic Dropdown */}
                  <div>
                    <select
                      value={queryTopic}
                      onChange={(e) => setQueryTopic(e.target.value)}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:border-primary-blue text-trade-navy font-semibold cursor-pointer"
                      required
                    >
                      <option value="" disabled hidden>Select A Topic</option>
                      <option value="kyc">KYC &amp; Verification</option>
                      <option value="catalog">Catalog &amp; Product Upload</option>
                      <option value="payments">Escrow &amp; Payout Settlements</option>
                      <option value="shipping">Logistics &amp; Customs Clearance</option>
                      <option value="other">General Support Inquiry</option>
                    </select>
                  </div>

                  {/* Message box */}
                  <div>
                    <textarea
                      placeholder="Type Your Message *"
                      rows={4}
                      value={queryMessage}
                      onChange={(e) => setQueryMessage(e.target.value)}
                      className="w-full px-4 py-3 border border-outline-variant rounded-lg text-sm bg-slate-50/50 focus:outline-none focus:border-primary-blue text-trade-navy font-semibold resize-none"
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      className="bg-[#034FA6] hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-sm transition-all active:scale-95 cursor-pointer text-xs"
                    >
                      Send Query
                    </button>
                  </div>

                </form>
              )}

            </div>

            {/* Right Graphic Illustration Block */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative">
                <Image
                  src="/png/support_agent.png"
                  alt="TradeVistar Support Specialist"
                  width={360}
                  height={360}
                  className="max-w-[300px] sm:max-w-[360px] h-auto object-contain hover:scale-105 transition-transform duration-300 pointer-events-none select-none relative z-10"
                />
              </div>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
