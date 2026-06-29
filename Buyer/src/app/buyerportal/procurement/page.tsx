"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Interface for RFQ items
interface RFQ {
  id: string;
  title: string;
  category: string;
  productName: string;
  description: string;
  quantity: number;
  unit: string;
  targetBudget: number;
  location: string;
  deliveryDate: string;
  incoterms: string;
  supplierType: string;
  verifiedOnly: boolean;
  dateCreated: string;
  deadline: string;
  quotes: number;
  status: string;
  statusBg: string;
  avatars?: string[];
  plusCount?: number;
  attachments?: { name: string; size: string }[];
}

function ProcurementPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const action = searchParams.get("action");
  const tab = searchParams.get("tab") || "all";

  // Database of RFQs aligned with the Stitch mockups
  const [rfqs, setRfqs] = useState<RFQ[]>([
    {
      id: "RFQ-2024-9102",
      title: "Precision Bearing Units (Bulk Order)",
      category: "Industrial Hardware",
      productName: "Precision Bearings",
      description: "Bulk procurement of double-row cylindrical roller bearings with tight tolerances for heavy machinery drivetrain.",
      quantity: 2500,
      unit: "Pieces (pcs)",
      targetBudget: 75000,
      location: "Rotterdam Port Terminal 4",
      deliveryDate: "2026-09-15",
      incoterms: "FOB - Free On Board",
      supplierType: "Manufacturer",
      verifiedOnly: true,
      dateCreated: "12 Oct 2024",
      deadline: "Oct 24, 2024",
      quotes: 12,
      status: "Open for Quotes",
      statusBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDGMUMZHdTBClslqg2sKHNC1tcznGFVgVUkU-JUOMOIGyTDtM8_uoqpRZPne_n9bgVnJCJOmhOaUPmW3dzt07l2y-u7K57MDZhkurPSkXkFIzqYUjg3QPjTcfyvJKiWUyQ9qCn2miN_LrRkeObKmFjKmkEGlYChk8kMreqVbWvKFmdAYEn5zGmXGlgmI9quQ0HatjT-yWQud7nAyLRRYQk-_kyJ-knjfjfByAzEpi9dUQL5LCTtI4FIpC__MNaLW_ZKszdUacuwyX14",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCebIw-gsD7JXCBMIws0qiY-SH3WVc9h56lMGgg_TBs-AUxXPYVLbnm7ktrxFb_Y4xFo8QbEGxv3vw-xJN0GW5pgbVmzTO-WoMzn4VidjC2bpTXag4ucBs_R9Ep7hQVUdYkFw-eLN_MfVqqSCrgJhQ2A0HYJy9vTv31y-meraD4OTrp11AIqzNrAPYGty7tjR5dr17qmUTXKlOtOaXRDVIXxiJBepPQp20OEMlABx43k7HhbzOBsRpKdlBkKMUlPb0-1tK9wG3RqTEY"
      ],
      plusCount: 10
    },
    {
      id: "RFQ-2024-8841",
      title: "Precision Lathe Assemblies",
      category: "Machinery",
      productName: "Lathe Drivetrains",
      description: "Sub-assembly packages of computer numerical control lathe components including spindle head and servo mounting brackets.",
      quantity: 15,
      unit: "Pieces (pcs)",
      targetBudget: 42000,
      location: "Warehouse B, Chennai",
      deliveryDate: "2026-08-30",
      incoterms: "CIF - Cost, Insurance, Freight",
      supplierType: "Manufacturer",
      verifiedOnly: true,
      dateCreated: "10 Oct 2024",
      deadline: "Nov 02, 2024",
      quotes: 28,
      status: "Under Review",
      statusBg: "bg-amber-50 text-amber-700 border-amber-100",
      avatars: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCPyGu34tEZbR-1JghqC35gibmfF27zkWkJt4T3CjKkaQe1Cz_lFfA7n5LnGoy-kPFYxw8eHU0QbMWYOOBIExBWRQ6ZgBfm2xYyx7ZYDQJM4RudiTLA9aab0N090exE87Gs46Z_qdL7WVn0h8jhY1b4JeDrrpIL72J9CV_1y0Tszghx55WzYbz1Ge7jNMAcIqXx-qjEqkVBo3hE4_xD_b1xHMNdKcr_9oOLPKn5BTo57cRbhAIONv3c7GeVO_gCd9wvSt_P9qfaq8sT"
      ],
      plusCount: 27
    },
    {
      id: "RFQ-2024-7729",
      title: "Logistics Terminal Flooring",
      category: "Construction",
      productName: "Epoxy Resin Coatings",
      description: "Heavy-duty wear-resistant flooring solution for high-volume automated distribution warehouse.",
      quantity: 12000,
      unit: "Pieces (pcs)",
      targetBudget: 95000,
      location: "Logistics Hub, Pune",
      deliveryDate: "2026-11-01",
      incoterms: "DDP - Delivered Duty Paid",
      supplierType: "Any Verified Entity",
      verifiedOnly: false,
      dateCreated: "08 Oct 2024",
      deadline: "Dec 15, 2024",
      quotes: 4,
      status: "Draft",
      statusBg: "bg-gray-100 text-gray-700 border-gray-200",
    },
    {
      id: "RFQ-2024-6120",
      title: "Sustainable Raw Polymer",
      category: "Chemicals",
      productName: "Polymer Pellets",
      description: "Bio-based recycled polyethylene pellets for consumer packaging manufacturing line.",
      quantity: 50,
      unit: "Metric Tons (mt)",
      targetBudget: 60000,
      location: "Warehouse A, Mumbai",
      deliveryDate: "2026-06-30",
      incoterms: "EXW - Ex Works",
      supplierType: "Trading Company",
      verifiedOnly: true,
      dateCreated: "01 Oct 2024",
      deadline: "Sep 12, 2024",
      quotes: 98,
      status: "Closed",
      statusBg: "bg-red-50 text-red-700 border-red-100",
    },
    {
      id: "RFQ-2024-8501",
      title: "Custom HVAC Components",
      category: "Infrastructure",
      productName: "HVAC Units",
      description: "Multi-zone climate control packages for commercial office tower integration.",
      quantity: 8,
      unit: "Pieces (pcs)",
      targetBudget: 110000,
      location: "Bandra Office, Mumbai",
      deliveryDate: "2026-05-15",
      incoterms: "CIF - Cost, Insurance, Freight",
      supplierType: "Any Verified Entity",
      verifiedOnly: true,
      dateCreated: "15 Sep 2024",
      deadline: "Oct 10, 2024",
      quotes: 4,
      status: "Expired",
      statusBg: "bg-gray-100 text-gray-500 border-gray-200",
    }
  ]);

  // Sub-filtering tabs state (Active, Draft, Closed, Expired)
  const [subTab, setSubTab] = useState("Active");
  // Mobile performance overview drawer toggle state
  const [mobileStatsOpen, setMobileStatsOpen] = useState(true);

  // Form states for Create RFQ
  const [rfqTitle, setRfqTitle] = useState("");
  const [productCategory, setProductCategory] = useState("Electronics & Components");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("Pieces (pcs)");
  const [targetBudget, setTargetBudget] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [incoterms, setIncoterms] = useState("FOB - Free On Board");
  const [supplierType, setSupplierType] = useState("Manufacturer");
  const [verifiedOnly, setVerifiedOnly] = useState(true);

  // File upload state
  const [attachments, setAttachments] = useState<{ name: string; size: string }[]>([
    { name: "standard_requirements_v2.pdf", size: "1.4 MB" },
  ]);

  // Success Modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdRfqId, setCreatedRfqId] = useState("");

  // Calculate dynamic progress for form
  const getProgress = () => {
    let filled = 0;
    const total = 10;
    if (rfqTitle.trim()) filled++;
    if (productCategory) filled++;
    if (productName.trim()) filled++;
    if (productDescription.trim()) filled++;
    if (quantity) filled++;
    if (unit) filled++;
    if (targetBudget) filled++;
    if (deliveryLocation.trim()) filled++;
    if (deliveryDate) filled++;
    if (incoterms) filled++;
    return Math.round((filled / total) * 100);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileList = Array.from(e.target.files);
      const newAttachments = fileList.map((file) => ({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rfqTitle.trim() || !productName.trim() || !quantity || !deliveryLocation.trim()) {
      alert("Please fill in the required fields (RFQ Title, Product Name, Quantity, and Delivery Location).");
      return;
    }

    const newId = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + 14);
    const formattedDeadline = deadlineDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const newRfq: RFQ = {
      id: newId,
      title: rfqTitle,
      category: productCategory,
      productName: productName,
      description: productDescription,
      quantity: Number(quantity),
      unit: unit,
      targetBudget: Number(targetBudget) || 0,
      location: deliveryLocation,
      deliveryDate: deliveryDate,
      incoterms: incoterms,
      supplierType: supplierType,
      verifiedOnly: verifiedOnly,
      dateCreated: today,
      deadline: formattedDeadline,
      quotes: 0,
      status: "Open for Quotes",
      statusBg: "bg-emerald-50 text-emerald-700 border-emerald-100",
      attachments: attachments,
    };

    setRfqs([newRfq, ...rfqs]);
    setCreatedRfqId(newId);
    setShowSuccessModal(true);

    // Reset Form
    setRfqTitle("");
    setProductName("");
    setProductDescription("");
    setQuantity("");
    setTargetBudget("");
    setDeliveryLocation("");
    setDeliveryDate("");
    setAttachments([{ name: "standard_requirements_v2.pdf", size: "1.4 MB" }]);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    // Return to list
    router.push("/buyerportal/procurement");
  };

  // Filter local state list by SubTab
  const getFilteredRfqs = () => {
    if (subTab === "Active") {
      return rfqs.filter(r => r.status === "Open for Quotes" || r.status === "Under Review");
    }
    if (subTab === "Draft") {
      return rfqs.filter(r => r.status === "Draft");
    }
    if (subTab === "Closed") {
      return rfqs.filter(r => r.status === "Closed");
    }
    if (subTab === "Expired") {
      return rfqs.filter(r => r.status === "Expired");
    }
    return rfqs;
  };

  const isCreateMode = action === "create";

  return (
    <div className="flex flex-col gap-s-lg w-full max-w-[1440px] mx-auto">
      {/* Breadcrumbs & Header (Desktop Only) */}
      <div className="hidden lg:block">
        <nav className="flex items-center gap-1 text-[11px] text-secondary font-medium mb-1">
          <span className="cursor-pointer hover:text-trade-orange transition-colors" onClick={() => router.push("/buyerportal")}>Dashboard</span>
          <span className="material-symbols-outlined text-[12px] text-secondary/50">chevron_right</span>
          <span className="cursor-pointer hover:text-trade-orange transition-colors" onClick={() => router.push("/buyerportal/procurement")}>Procurement</span>
          <span className="material-symbols-outlined text-[12px] text-secondary/50">chevron_right</span>
          <span className="text-trade-navy font-semibold">{isCreateMode ? "Create RFQ" : "My RFQs"}</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight font-bold">
              {isCreateMode ? "Create New RFQ" : "Procurement Workspace"}
            </h1>
            <p className="font-body-md text-secondary mt-1">
              {isCreateMode
                ? "Draft technical parameters and issue your procurement requirements to international trade markets."
                : "Manage your active Requests for Quotes, compare incoming tender quotes, and contract with verified suppliers."}
            </p>
          </div>
          {!isCreateMode && (
            <button
              onClick={() => router.push("/buyerportal/procurement?action=create")}
              className="px-4 py-2.5 bg-trade-orange text-white font-bold rounded-lg hover:shadow-md hover:shadow-trade-orange/10 active:scale-95 transition-all text-[12px] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create New RFQ
            </button>
          )}
        </div>
      </div>

      {/* Mobile Header (Mobile Only) */}
      <div className="lg:hidden">
        {isCreateMode ? (
          <div className="flex flex-col mb-2">
            <p className="font-label-caps text-[10px] text-trade-orange font-bold uppercase tracking-widest leading-none">
              Global Procurement
            </p>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-trade-navy font-bold tracking-tight mt-1.5">
              Create RFQ
            </h1>
            <p className="font-body-md text-secondary mt-1 text-[13px]">
              Drafting internal request ID: RFQ-2024-00892
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-trade-navy font-bold tracking-tight">
                My RFQs
              </h1>
              <p className="font-body-md text-secondary mt-1 text-[13px] leading-relaxed">
                Manage your active and historical procurement requests.
              </p>
            </div>
            <button
              onClick={() => router.push("/buyerportal/procurement?action=create")}
              className="w-full py-3 bg-trade-navy hover:bg-trade-orange text-white font-semibold rounded-lg shadow-md active:scale-95 transition-all text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Create New RFQ
            </button>
          </div>
        )}
      </div>

      {/* Tabs Subnavigation (only visible when not in create RFQ workspace - Desktop Only) */}
      {!isCreateMode && (
        <div className="hidden lg:flex border-b border-outline-variant/30 overflow-x-auto no-scrollbar scroll-smooth gap-4">
          <button
            onClick={() => router.push("/buyerportal/procurement?tab=all")}
            className={`pb-3 text-sm font-semibold transition-all relative px-1 cursor-pointer whitespace-nowrap ${
              tab === "all" ? "text-trade-orange border-b-2 border-trade-orange" : "text-secondary hover:text-trade-navy"
            }`}
          >
            My RFQs ({rfqs.length})
          </button>
          <button
            onClick={() => router.push("/buyerportal/procurement?tab=quotes")}
            className={`pb-3 text-sm font-semibold transition-all relative px-1 cursor-pointer whitespace-nowrap ${
              tab === "quotes" ? "text-trade-orange border-b-2 border-trade-orange" : "text-secondary hover:text-trade-navy"
            }`}
          >
            Received Quotations
          </button>
          <button
            onClick={() => router.push("/buyerportal/procurement?tab=compare")}
            className={`pb-3 text-sm font-semibold transition-all relative px-1 cursor-pointer whitespace-nowrap ${
              tab === "compare" ? "text-trade-orange border-b-2 border-trade-orange" : "text-secondary hover:text-trade-navy"
            }`}
          >
            Compare Quotes
          </button>
          <button
            onClick={() => router.push("/buyerportal/procurement?tab=samples")}
            className={`pb-3 text-sm font-semibold transition-all relative px-1 cursor-pointer whitespace-nowrap ${
              tab === "samples" ? "text-trade-orange border-b-2 border-trade-orange" : "text-secondary hover:text-trade-navy"
            }`}
          >
            Sample Requests
          </button>
        </div>
      )}

      {/* WORKSPACE VIEW: CREATE RFQ */}
      {isCreateMode ? (
        <form onSubmit={handlePublish} className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          
          {/* Mobile Only Header Summary Card */}
          <div className="col-span-1 lg:hidden">
            <div className="bg-trade-navy text-white rounded-xl p-5 shadow-md flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <h3 className="font-label-caps text-[11px] text-white/70 tracking-widest font-bold">RFQ OVERVIEW</h3>
                <span className="material-symbols-outlined text-[20px] text-white/50">analytics</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-[10px] font-medium">ESTIMATED REACH</p>
                  <p className="text-xl font-bold text-trade-orange">1,240+</p>
                  <p className="text-[10px] text-white/40">Verified Suppliers</p>
                </div>
                <div>
                  <p className="text-white/60 text-[10px] font-medium">PROJECTED QUOTES</p>
                  <p className="text-xl font-bold text-white">12 - 18</p>
                  <p className="text-[10px] text-white/40">Within 48 hours</p>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-white/60 font-semibold uppercase">Market Confidence</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-3 bg-trade-orange rounded-full"></div>
                  <div className="w-1.5 h-3 bg-trade-orange rounded-full"></div>
                  <div className="w-1.5 h-3 bg-trade-orange rounded-full"></div>
                  <div className="w-1.5 h-3 bg-white/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Left / Main form section */}
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
            
            {/* 01 Basic Information */}
            <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant/30 flex items-center">
                <h2 className="font-label-caps text-[12px] text-trade-navy uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">info</span>
                  01 Basic Information
                </h2>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">RFQ Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={rfqTitle}
                    onChange={(e) => setRfqTitle(e.target.value)}
                    placeholder="e.g. Bulk Purchase of High-Performance Semiconductors - Q4 2026"
                    className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-sm text-[12px] text-secondary font-bold">Product Category</label>
                    <div className="relative">
                      <select
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md appearance-none"
                      >
                        <option>Electronics & Components</option>
                        <option>Industrial Machinery</option>
                        <option>Raw Materials</option>
                        <option>Logistics Services</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">unfold_more</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-sm text-[12px] text-secondary font-bold">Product Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Specify technical model if known"
                      className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">Product Description</label>
                  <textarea
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    placeholder="Enter detailed specifications, tolerances, and performance requirements..."
                    rows={4}
                    className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md resize-none"
                  />
                </div>
              </div>
            </div>

            {/* 02 Quantity & Pricing */}
            <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant/30 flex items-center">
                <h2 className="font-label-caps text-[12px] text-trade-navy uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">payments</span>
                  02 Quantity &amp; Pricing
                </h2>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">Quantity <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    min="1"
                    className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">Unit</label>
                  <div className="relative">
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md appearance-none"
                    >
                      <option>Pieces (pcs)</option>
                      <option>Kilograms (kg)</option>
                      <option>Metric Tons (mt)</option>
                      <option>Liters (l)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">unfold_more</span>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">Target Budget</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-secondary">USD</span>
                    <input
                      type="number"
                      value={targetBudget}
                      onChange={(e) => setTargetBudget(e.target.value)}
                      placeholder="0.00"
                      className="w-full pl-12 pr-10 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md"
                    />
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 text-sm cursor-help" title="Target budget helps suppliers customize quotes.">info</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 03 Delivery Information */}
            <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant/30 flex items-center">
                <h2 className="font-label-caps text-[12px] text-trade-navy uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  03 Delivery Information
                </h2>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">Delivery Location <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">location_on</span>
                    <input
                      type="text"
                      value={deliveryLocation}
                      onChange={(e) => setDeliveryLocation(e.target.value)}
                      placeholder="Enter delivery warehouse address or terminal code..."
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-sm text-[12px] text-secondary font-bold">Required Delivery Date</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-label-sm text-[12px] text-secondary font-bold">Incoterms</label>
                    <div className="relative">
                      <select
                        value={incoterms}
                        onChange={(e) => setIncoterms(e.target.value)}
                        className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md appearance-none"
                      >
                        <option>FOB - Free On Board</option>
                        <option>CIF - Cost, Insurance, Freight</option>
                        <option>DDP - Delivered Duty Paid</option>
                        <option>EXW - Ex Works</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">unfold_more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 04 Supplier Preferences */}
            <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant/30 flex items-center">
                <h2 className="font-label-caps text-[12px] text-trade-navy uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  04 Supplier Preferences
                </h2>
              </div>
              <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-label-sm text-[12px] text-secondary font-bold">Preferred Supplier Type</label>
                  <div className="relative">
                    <select
                      value={supplierType}
                      onChange={(e) => setSupplierType(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-outline-variant rounded-lg focus:border-trade-orange focus:ring-0 outline-none text-body-md appearance-none"
                    >
                      <option>Manufacturer</option>
                      <option>Authorized Distributor</option>
                      <option>Trading Company</option>
                      <option>Any Verified Entity</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">unfold_more</span>
                  </div>
                </div>
                
                {/* Verified Switcher Toggle */}
                <div className="flex items-center justify-between p-3 border border-outline-variant/60 rounded-lg bg-surface-container-low">
                  <div>
                    <h4 className="font-label-sm text-[12px] text-trade-navy font-bold">Verified Suppliers Only</h4>
                    <p className="text-[10px] text-secondary">Limit response to TradeVistar Platinum members</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={verifiedOnly}
                      onChange={(e) => setVerifiedOnly(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-outline-variant/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-trade-orange"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* 05 Attachments */}
            <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-surface-container-low px-5 py-4 border-b border-outline-variant/30 flex items-center">
                <h2 className="font-label-caps text-[12px] text-trade-navy uppercase tracking-wider font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">attachment</span>
                  05 Attachments
                </h2>
              </div>
              <div className="p-5 flex flex-col gap-4">
                <div className="border-2 border-dashed border-outline-variant hover:border-trade-orange hover:bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-12 h-12 bg-surface-container-high rounded-full flex items-center justify-center mb-3 text-secondary">
                    <span className="material-symbols-outlined text-2xl">upload_file</span>
                  </div>
                  <h3 className="font-label-sm text-[12px] font-bold text-trade-navy">Drop technical specifications or product images here</h3>
                  <p className="text-[10px] text-secondary mt-1">Accepted formats: PDF, DWG, PNG, JPEG (Max 25MB per file)</p>
                  <button type="button" className="mt-4 px-4 py-2 border border-outline-variant text-[11px] text-trade-navy font-bold rounded-lg hover:bg-white transition-colors">
                    Select Files
                  </button>
                </div>

                {/* Uploaded Files List */}
                {attachments.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-surface-container-low border border-outline-variant/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-trade-orange">picture_as_pdf</span>
                          <div>
                            <p className="text-[13px] font-semibold text-trade-navy leading-none">{file.name}</p>
                            <p className="text-[10px] text-secondary mt-0.5">{file.size} • Uploaded</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-secondary hover:text-red-500 transition-colors p-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar (Desktop view) */}
          <aside className="hidden lg:block col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              
              {/* Overview Card */}
              <div className="bg-trade-navy text-white rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <h3 className="font-label-caps text-[11px] text-white/70 tracking-widest font-bold">RFQ OVERVIEW</h3>
                  <span className="material-symbols-outlined text-[20px] text-white/50">analytics</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-white/60 uppercase">Status</span>
                    <span className="text-[9px] px-1.5 py-0.5 bg-white/15 rounded font-bold text-white tracking-wider">DRAFT</span>
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <span className="text-[10px] text-white/60 uppercase">Estimated Reach</span>
                    <div className="text-right">
                      <p className="text-xl font-bold text-trade-orange leading-none">1,240+</p>
                      <p className="text-[9px] text-white/40 mt-0.5">Verified Suppliers</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pt-1">
                    <span className="text-[10px] text-white/60 uppercase">Projected Quotes</span>
                    <div className="text-right">
                      <p className="text-lg font-bold">12 - 18</p>
                      <p className="text-[9px] text-white/40 mt-0.5">Within 48 hours</p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="pt-3 border-t border-white/10 space-y-1.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/60">Completion Progress</span>
                    <span className="font-bold">{getProgress()}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-trade-orange transition-all duration-300"
                      style={{ width: `${getProgress()}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Insights Card */}
              <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl p-5 shadow-sm space-y-4">
                <h3 className="font-label-sm text-[12px] font-bold text-trade-navy">Supplier Matching</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-trade-navy shrink-0">
                      <span className="material-symbols-outlined text-[18px]">public</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-trade-navy">Global Reach</p>
                      <p className="text-[10px] text-secondary leading-normal">Visible to manufacturing nodes in China, Germany, India, and USA.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-trade-navy shrink-0">
                      <span className="material-symbols-outlined text-[18px]">speed</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-trade-navy">Fast Tracking</p>
                      <p className="text-[10px] text-secondary leading-normal">Institutional tenders receive priority routing in vendor feeds.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Actions */}
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/buyerportal/procurement")}
                  className="w-full py-2.5 border border-outline-variant hover:bg-surface-container text-[12px] text-trade-navy font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="w-full py-3 bg-trade-orange text-white font-bold rounded-lg hover:shadow-md hover:shadow-trade-orange/10 active:scale-95 transition-all text-[12px] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Publish RFQ</span>
                  <span className="material-symbols-outlined text-[16px]">rocket_launch</span>
                </button>
                <p className="text-[9px] text-center text-secondary px-2 leading-relaxed">
                  By publishing, you agree to TradeVistar&apos;s Institutional Terms of Procurement and Sourcing Policies.
                </p>
              </div>
            </div>
          </aside>

          {/* Sticky Bottom Actions Bar (Mobile only) */}
          <footer className="fixed bottom-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-t border-outline-variant/30 shadow-lg px-4 py-3 pb-safe lg:hidden">
            <div className="max-w-[780px] mx-auto flex gap-2">
              <button
                type="button"
                onClick={() => router.push("/buyerportal/procurement")}
                className="flex-1 py-3 font-semibold text-xs border border-outline-variant text-trade-navy rounded-lg hover:bg-surface-container transition-all active:scale-95 cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="flex-[2] py-3 font-semibold text-xs bg-trade-orange text-white rounded-lg hover:opacity-95 transition-all active:scale-95 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Publish RFQ
                <span className="material-symbols-outlined text-[16px]">send</span>
              </button>
            </div>
          </footer>
        </form>
      ) : (
        /* WORKSPACE VIEW: MAIN RFQ LIST & OPERATIONS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Collapsible Performance Overview (Mobile only) */}
            <div className="lg:hidden bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setMobileStatsOpen(!mobileStatsOpen)}
                className="w-full flex items-center justify-between p-4 border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-trade-orange">analytics</span>
                  <span className="font-headline-md text-sm font-bold text-trade-navy">Performance Overview</span>
                </div>
                <span className={`material-symbols-outlined transition-transform duration-200 ${mobileStatsOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>
              {mobileStatsOpen && (
                <div className="p-4 grid grid-cols-2 gap-4 animate-in fade-in duration-250">
                  <div className="flex flex-col gap-1 bg-surface-container-low/60 p-3 rounded-lg border border-outline-variant/10 animate-in slide-in-from-top-2 duration-200">
                    <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Avg. Response Time</span>
                    <div className="flex items-end gap-1 mt-1">
                      <span className="text-xl font-bold text-trade-navy">2.4</span>
                      <span className="text-xs text-secondary mb-0.5">Days</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 bg-surface-container-low/60 p-3 rounded-lg border border-outline-variant/10 animate-in slide-in-from-top-2 duration-200">
                    <span className="text-[10px] text-secondary font-semibold uppercase tracking-wider">Total Quotes</span>
                    <div className="flex items-end gap-1 mt-1">
                      <span className="text-xl font-bold text-trade-navy">142</span>
                      <span className="text-xs text-secondary mb-0.5">Received</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Filter Tabs / Pills (Mobile vs Desktop) */}
            
            {/* Mobile Pills Scrollable */}
            <div className="flex lg:hidden overflow-x-auto no-scrollbar gap-2 py-1 border-b border-outline-variant/20">
              {["Active", "Draft", "Closed", "Expired"].map((pill) => {
                const active = subTab === pill;
                return (
                  <button
                    key={pill}
                    type="button"
                    onClick={() => setSubTab(pill)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      active
                        ? "bg-trade-navy text-white border-trade-navy shadow-sm"
                        : "bg-white text-secondary border-outline-variant/60 hover:bg-surface-container-low"
                    }`}
                  >
                    {pill}
                  </button>
                );
              })}
            </div>

            {/* Desktop Tabs */}
            <div className="hidden lg:flex gap-6 border-b border-outline-variant/30 mt-2">
              {["Active", "Draft", "Closed", "Expired"].map((tabName) => {
                const active = subTab === tabName;
                return (
                  <button
                    key={tabName}
                    type="button"
                    onClick={() => setSubTab(tabName)}
                    className={`pb-2.5 text-sm font-semibold transition-all relative px-1 cursor-pointer whitespace-nowrap ${
                      active
                        ? "text-trade-orange border-b-2 border-trade-orange font-bold"
                        : "text-secondary hover:text-trade-navy"
                    }`}
                  >
                    {tabName}
                  </button>
                );
              })}
            </div>

            {/* Mobile Card List View (Mobile only) */}
            <div className="flex flex-col gap-4 lg:hidden">
              {getFilteredRfqs().length > 0 ? (
                getFilteredRfqs().map((rfq) => (
                  <div
                    key={rfq.id}
                    onClick={() => router.push(`/buyerportal/procurement?action=view&id=${rfq.id}`)}
                    className={`bg-white/80 backdrop-blur-md p-4 rounded-xl border border-outline-variant/30 shadow-sm flex flex-col gap-3 relative cursor-pointer hover:border-trade-orange/35 transition-all active:scale-[0.99] ${
                      rfq.status === "Expired" ? "opacity-80" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0 flex flex-col">
                        <span className="font-label-caps text-secondary text-[10px] tracking-wider font-semibold">{rfq.id}</span>
                        <h3 className="font-body-md font-bold text-trade-navy leading-tight mt-0.5 break-words">{rfq.title}</h3>
                      </div>
                      <span className={`shrink-0 px-2.5 py-0.5 text-[8px] font-bold rounded-full uppercase tracking-wider border ${
                        rfq.status === "Open for Quotes" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                        rfq.status === "Under Review" ? "bg-amber-50 text-amber-700 border-amber-100" :
                        rfq.status === "Draft" ? "bg-gray-100 text-gray-700 border-gray-200" :
                        rfq.status === "Closed" ? "bg-red-50 text-red-700 border-red-100" :
                        "bg-gray-150 text-gray-500 border-gray-300"
                      }`}>
                        {rfq.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 border-t border-outline-variant/10 pt-3 text-[12px]">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-secondary">Category</span>
                        <span className="font-medium text-trade-navy mt-0.5">{rfq.category}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] text-secondary font-medium">
                          {rfq.status === "Open for Quotes" ? "Closing In" : rfq.status === "Expired" ? "Result" : "Last Update"}
                        </span>
                        <span className={`mt-0.5 font-bold ${rfq.status === "Open for Quotes" ? "text-trade-orange" : "text-trade-navy"}`}>
                          {rfq.status === "Open for Quotes" ? "48 Hours" : rfq.status === "Expired" ? "No Award" : "2 Hours Ago"}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-1 pt-2 border-t border-outline-variant/10">
                      <div className="flex items-center gap-1.5 bg-surface-container-low px-2 py-0.5 rounded-lg border border-outline-variant/20">
                        <span className="material-symbols-outlined text-[14px] text-secondary">sensors</span>
                        <span className="text-[10px] font-bold text-trade-navy">{rfq.quotes} Offer{rfq.quotes !== 1 && "s"}</span>
                      </div>
                      
                      {rfq.avatars && rfq.avatars.length > 0 && (
                        <div className="flex -space-x-1.5 items-center">
                          {rfq.avatars.map((url, i) => (
                            <div key={i} className="w-5 h-5 rounded-full border border-white bg-slate-200 overflow-hidden shadow-sm">
                              <img className="w-full h-full object-cover" src={url} alt="Vendor" />
                            </div>
                          ))}
                          {rfq.plusCount && (
                            <div className="w-5 h-5 rounded-full border border-white bg-trade-navy flex items-center justify-center shadow-sm">
                              <span className="text-[8px] font-bold text-white">+{rfq.plusCount}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center bg-white/80 border border-outline-variant/30 rounded-xl text-secondary text-xs">
                  No RFQs found in the &apos;{subTab}&apos; folder.
                </div>
              )}

              {/* Mobile View Historical Archive Button */}
              <button
                type="button"
                className="w-full py-3 text-secondary font-bold text-xs flex items-center justify-center gap-1.5 border border-dashed border-outline-variant/60 rounded-xl hover:bg-surface-container-low transition-all cursor-pointer mb-6"
              >
                <span>View Historical Archive</span>
                <span className="material-symbols-outlined text-[16px]">history</span>
              </button>
            </div>

            {/* Desktop Data Table Container (Desktop only) */}
            <div className="hidden lg:flex flex-col bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm">
              <div className="px-5 py-4 border-b border-outline-variant/30 bg-surface-container-low flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md text-trade-navy font-bold">Active Tender Operations</h3>
                <span className="text-[10px] bg-trade-navy text-white px-2.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  {getFilteredRfqs().length} Total
                </span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant/30">
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider">RFQ Number</th>
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider">Suppliers Invited</th>
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider">Quotations Received</th>
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider">Created Date</th>
                      <th className="px-6 py-3 font-label-caps text-[10px] text-secondary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {getFilteredRfqs().length > 0 ? (
                      getFilteredRfqs().map((rfq) => (
                        <tr key={rfq.id} className="hover:bg-surface-container-low/40 transition-colors group">
                          <td className="px-6 py-4 font-label-caps text-trade-navy font-bold text-[12px]">{rfq.id}</td>
                          <td className="px-6 py-4 font-body-md text-trade-navy font-bold">{rfq.productName}</td>
                          <td className="px-6 py-4 text-secondary text-[13px]">{rfq.quotes + 5} Suppliers</td>
                          <td className="px-6 py-4 font-body-md text-trade-navy font-bold">{rfq.quotes} Quotations</td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider border ${
                              rfq.status === "Open for Quotes" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                              rfq.status === "Under Review" ? "bg-amber-50 text-amber-700 border-amber-100" :
                              rfq.status === "Draft" ? "bg-gray-100 text-gray-700 border-gray-250" :
                              rfq.status === "Closed" ? "bg-red-50 text-red-700 border-red-100" :
                              "bg-gray-150 text-gray-500 border-gray-200"
                            }`}>
                              {rfq.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[12px] text-secondary font-medium">{rfq.dateCreated}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button
                                type="button"
                                onClick={() => router.push(`/buyerportal/procurement?action=view&id=${rfq.id}`)}
                                className="p-1 hover:bg-surface-container rounded text-secondary hover:text-trade-navy transition-colors cursor-pointer"
                                title="View"
                              >
                                <span className="material-symbols-outlined text-[18px]">visibility</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => router.push(`/buyerportal/procurement?action=edit&id=${rfq.id}`)}
                                className="p-1 hover:bg-surface-container rounded text-secondary hover:text-trade-navy transition-colors cursor-pointer"
                                title="Edit"
                              >
                                <span className="material-symbols-outlined text-[18px]">edit</span>
                              </button>
                              <button
                                type="button"
                                className="p-1 hover:bg-surface-container rounded text-secondary hover:text-trade-navy transition-colors cursor-pointer"
                                title="More"
                              >
                                <span className="material-symbols-outlined text-[18px]">more_vert</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-6 py-12 text-center text-secondary text-xs bg-white">
                          No active RFQs found in the &apos;{subTab}&apos; folder.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Desktop Pagination */}
              <div className="px-6 py-3.5 bg-surface-container-low flex justify-between items-center border-t border-outline-variant/30">
                <span className="text-[11px] text-secondary font-medium">Showing 1-{getFilteredRfqs().length} of {getFilteredRfqs().length} RFQs</span>
                <div className="flex gap-2">
                  <button type="button" className="p-1 border border-outline-variant/50 rounded bg-white text-secondary hover:text-trade-navy disabled:opacity-40 cursor-pointer" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button type="button" className="p-1 border border-outline-variant/50 rounded bg-white text-secondary hover:text-trade-navy disabled:opacity-40 cursor-pointer" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Right Sidebar: Analytics (Desktop only) */}
          <aside className="hidden lg:block col-span-1">
            <div className="sticky top-24 flex flex-col gap-6">
              
              <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-xl p-5 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                  <span className="material-symbols-outlined text-trade-navy">analytics</span>
                  <h3 className="font-headline-md text-sm font-bold text-trade-navy">RFQ Performance</h3>
                </div>

                {/* Metric 1 */}
                <div className="p-3 bg-surface-container-low/50 border border-outline-variant/10 rounded-lg">
                  <p className="font-label-caps text-[9px] text-secondary uppercase tracking-wider">Avg. Response Time</p>
                  <div className="flex items-end justify-between mt-1">
                    <span className="text-2xl font-black text-trade-navy">2.4 <span className="text-xs font-semibold text-secondary">Days</span></span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">trending_down</span> 12%
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-3 bg-surface-container-low/50 border border-outline-variant/10 rounded-lg">
                  <p className="font-label-caps text-[9px] text-secondary uppercase tracking-wider">Total Quotes Received</p>
                  <div className="flex items-end justify-between mt-1">
                    <span className="text-2xl font-black text-trade-navy">142</span>
                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[10px]">trending_up</span> 8.4%
                    </span>
                  </div>
                </div>

                {/* Quote Trends Bar Chart */}
                <div className="p-3 bg-surface-container-low/50 border border-outline-variant/10 rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-label-caps text-[9px] text-secondary uppercase tracking-wider">Quote Trends</p>
                    <span className="text-[9px] text-secondary uppercase">Last 7 Days</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-16 pt-2">
                    <div className="flex-1 bg-outline-variant/40 rounded-t-sm hover:bg-trade-orange transition-colors" style={{ height: "40%" }} title="Mon: 12"></div>
                    <div className="flex-1 bg-outline-variant/40 rounded-t-sm hover:bg-trade-orange transition-colors" style={{ height: "65%" }} title="Tue: 22"></div>
                    <div className="flex-1 bg-outline-variant/40 rounded-t-sm hover:bg-trade-orange transition-colors" style={{ height: "50%" }} title="Wed: 18"></div>
                    <div className="flex-1 bg-outline-variant/40 rounded-t-sm hover:bg-trade-orange transition-colors" style={{ height: "85%" }} title="Thu: 30"></div>
                    <div className="flex-1 bg-trade-orange rounded-t-sm" style={{ height: "95%" }} title="Fri: 35 (Active)"></div>
                    <div className="flex-1 bg-outline-variant/40 rounded-t-sm hover:bg-trade-orange transition-colors" style={{ height: "60%" }} title="Sat: 20"></div>
                    <div className="flex-1 bg-outline-variant/40 rounded-t-sm hover:bg-trade-orange transition-colors" style={{ height: "75%" }} title="Sun: 25"></div>
                  </div>
                  <div className="flex justify-between text-[8px] font-label-caps text-secondary uppercase">
                    <span>Mon</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-3 bg-trade-navy text-white rounded-lg border border-white/5 space-y-2 shadow-md">
                  <p className="font-label-caps text-[9px] text-white/60 uppercase tracking-wider">Market Interest</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-white">High Intensity</span>
                    <span className="material-symbols-outlined text-trade-orange text-sm animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-trade-orange h-full w-[88%] rounded-full shadow-[0_0_6px_#f97316]"></div>
                  </div>
                  <p className="text-[9px] text-white/50 italic leading-none">Matching 92% of market availability.</p>
                </div>

                {/* Pro Tip Box */}
                <div className="p-3.5 bg-surface-container-low border border-outline-variant/30 rounded-lg">
                  <p className="text-[11px] text-secondary leading-relaxed">
                    <strong>Pro Tip:</strong> RFQs with detailed technical specifications receive 40% faster responses on the TradeVistar network.
                  </p>
                </div>

              </div>

            </div>
          </aside>

        </div>
      )}

      {/* Success Broadcast Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeSuccessModal}></div>
          <div className="bg-white border border-outline-variant/40 rounded-2xl max-w-md w-full p-6 shadow-2xl z-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
              <span className="material-symbols-outlined text-3xl">rocket_launch</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-trade-navy font-bold">RFQ Tender Broadcasted!</h3>
            <p className="text-xs text-secondary mt-2 leading-relaxed">
              Your procurement request <strong>{createdRfqId}</strong> has been validated and successfully broadcast to the global trade network. Matching suppliers will submit bids within 48 hours.
            </p>
            <div className="w-full bg-surface-container-low p-3 rounded-lg border border-outline-variant/20 my-4 text-left">
              <div className="flex justify-between items-center text-[11px]">
                <span className="text-secondary">Expected Reach:</span>
                <span className="font-bold text-trade-navy">1,240+ Platinum Suppliers</span>
              </div>
              <div className="flex justify-between items-center text-[11px] mt-1.5">
                <span className="text-secondary">First Bids Expected:</span>
                <span className="font-bold text-emerald-600">Within 12 Hours</span>
              </div>
            </div>
            <button
              onClick={closeSuccessModal}
              className="w-full py-2.5 bg-trade-navy hover:bg-trade-orange hover:shadow-md hover:shadow-trade-orange/10 text-white font-bold rounded-lg transition-all active:scale-95 text-label-sm text-[12px] cursor-pointer"
            >
              Done, Return to Workspace
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProcurementPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-secondary">Loading Procurement Workspace...</div>}>
      <ProcurementPageContent />
    </Suspense>
  );
}
