"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function BuyerDashboardOverview() {
  const kpis = [
    {
      title: "Active RFQs",
      value: "12",
      icon: "description",
      iconColor: "text-trade-orange",
      trend: "+2 this week",
      trendUp: true,
    },
    {
      title: "Pending Orders",
      value: "08",
      icon: "pending_actions",
      iconColor: "text-amber-500",
      trend: "Requiring action",
      trendUp: null,
    },
    {
      title: "Saved Suppliers",
      value: "45",
      icon: "verified_user",
      iconColor: "text-blue-500",
      trend: "5 New vetted",
      trendUp: true,
    },
    {
      title: "Outstanding",
      value: "₹12.4L",
      icon: "payments",
      iconColor: "text-red-500",
      trend: "Due in 15 days",
      trendUp: false,
    },
    {
      title: "Delivered",
      value: "156",
      icon: "local_shipping",
      iconColor: "text-emerald-500",
      trend: "Last 30 days",
      trendUp: null,
    },
    {
      title: "Vol. (Monthly)",
      value: "₹42.8L",
      icon: "analytics",
      iconColor: "text-trade-orange",
      trend: "14.2% growth",
      trendUp: true,
    },
  ];

  const quickActions = [
    { name: "Create RFQ", icon: "post_add", href: "/buyerportal/procurement" },
    { name: "Find Suppliers", icon: "person_search", href: "/buyerportal/suppliers" },
    { name: "Track Shipment", icon: "map", href: "/buyerportal/orders" },
    { name: "Invoices", icon: "receipt_long", href: "/buyerportal/payments" },
  ];

  const activities = [
    {
      title: "New Quote Received",
      desc: "Aero-Core Parts Ltd responded to RFQ-2910",
      time: "2 hours ago",
      icon: "description",
      bg: "bg-trade-navy",
    },
    {
      title: "Shipment Dispatched",
      desc: "Order #99283-A is in transit to Warehouse B",
      time: "5 hours ago",
      icon: "local_shipping",
      bg: "bg-trade-orange",
    },
    {
      title: "Payment Verified",
      desc: "Invoice INV-2024-001 confirmed by finance",
      time: "Yesterday",
      icon: "check_circle",
      bg: "bg-emerald-500",
    },
    {
      title: "RFQ Created",
      desc: "Procurement request for \"Industrial Sensors\"",
      time: "2 days ago",
      icon: "description",
      bg: "bg-trade-navy",
      opacity: "opacity-60",
    },
  ];

  const rfqs = [
    {
      id: "RFQ-2024-9102",
      category: "Hydraulic Systems",
      dateCreated: "12 Oct 2024",
      deadline: "25 Oct 2024",
      status: "Under Review",
      statusBg: "bg-amber-100 text-amber-700",
      suppliers: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCNMQIhnC-NbOtF-sHToSw3wlNZ6Ff69ZBW4qGWf3q-tryUIU27abx1OyHqSZxac07zSLGGen7BA0O3jJKfw5CS90yXGgpCIM9OFbTI0GypEQNsjsB2dXAUBS1ewMa-Ai93ssSKKyGN9Fk9cGvI1g-W7FDhOUkhqaHbt5m-Nqd2QLr5TnduGFQGPaa7R0mGCvnzSTYVOjqKS8DZMtF1bktKJTvywfKxBeTTsOXx1iM81C-PFmZul40QwyqWHH3w8S46D2jRgMgcdENx",
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBzX8vdxXe5GmM6ucxnHuL_vdtWp9pzSfqRmj3Sy-3PviDzmuiYG8RQUNKPfibnet4kZC_iK8Zimh0UJZGwUiKDRm9xRvx6aMkpCcy4hFzDaSWU9W2ZIOqM8DGpSyZ45xpHtbm3MOcYaj2wSlRPTioZM85woRohUzELLcawt-Ax4jZNKs5bGuin8D6d2xtJu36yziOFSTmhplZvPqXt9p0Akr7xh2y9pdbHeAAj_3lAdJfp8r4CZNIHyqNbkWsIIpKIIkyIDjhxux2_",
      ],
      extraSuppliers: 3,
    },
    {
      id: "RFQ-2024-8842",
      category: "Control Panels",
      dateCreated: "10 Oct 2024",
      deadline: "20 Oct 2024",
      status: "Responded",
      statusBg: "bg-emerald-100 text-emerald-700",
      suppliers: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB_YrAwS8thYASqcUKUDnxOJNjdDQTY40d2ex1f7Q0aUodXDUWhNqCeMww02oPEJNtvqr-3fm0EsyblVRM8t8BdH3lSO-_hIkoIXeM06GK3-Yv4bp-G86fLg8a3rjUvpgBe2Jf073Q9xaJG7pwHKeZYXgNI_4emxeoQbMs_Hk8kAyPk6KABTp4OxZTh-yJLMwqr6zIODgedNDyWpdACbUL6gIEYhrHiPl8UPYbOx1jgVVQDzCQrB5L6fGkiBtGQYMC9b8wBO04MOiNe",
      ],
      extraSuppliers: 1,
    },
    {
      id: "RFQ-2024-8711",
      category: "Electronic Components",
      dateCreated: "08 Oct 2024",
      deadline: "15 Oct 2024",
      status: "Pending",
      statusBg: "bg-gray-100 text-gray-700",
      suppliers: [],
      extraSuppliers: 0,
      waiting: true,
    },
  ];

  return (
    <>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-s-md">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-trade-navy tracking-tight">Buyer Dashboard</h1>
          <p className="font-body-md text-secondary mt-1">Welcome back, Rohan. Here&apos;s your trade overview for today.</p>
        </div>
        <div className="flex gap-s-sm">
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-outline-variant rounded-lg font-label-sm text-[12px] text-on-surface hover:bg-surface-container-low transition-all duration-200 active:scale-95 cursor-pointer">
            <span className="material-symbols-outlined text-[16px]">download</span>
            Export Report
          </button>
          <Link
            href="/buyerportal/procurement"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-trade-orange text-white rounded-lg font-label-sm text-[12px] font-bold shadow-lg shadow-trade-orange/20 hover:brightness-110 transition-all duration-200 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Create New RFQ
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-s-sm">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-sm flex flex-col justify-between hover:border-trade-orange/50 shadow-sm hover:shadow-md transition-all duration-200 rounded-lg group cursor-default"
          >
            <div className="flex justify-between items-start">
              <span className="font-label-caps text-[10px] text-secondary/70 uppercase font-medium">{kpi.title}</span>
              <span className={`material-symbols-outlined ${kpi.iconColor} text-lg`}>{kpi.icon}</span>
            </div>
            <div className="mt-4">
              <p className="font-display-lg text-3xl font-bold text-trade-navy">{kpi.value}</p>
              {kpi.trendUp !== null ? (
                <p
                  className={`font-label-sm text-[10px] mt-1 flex items-center gap-0.5 ${
                    kpi.trendUp ? "text-emerald-600" : "text-red-500"
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {kpi.trendUp ? "trending_up" : "trending_down"}
                  </span>{" "}
                  {kpi.trend}
                </p>
              ) : (
                <p className="font-label-sm text-[10px] text-secondary mt-1">{kpi.trend}</p>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Analytics & Activity Section */}
      <section className="grid lg:grid-cols-3 gap-s-md">
        {/* Analytics Chart */}
        <div className="lg:col-span-2 flex flex-col gap-s-md">
          <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md flex flex-col h-full min-h-[400px] rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-s-lg">
              <div>
                <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold">
                  Procurement Spend Analytics
                </h3>
                <p className="font-label-sm text-secondary text-[12px]">Historical spend data vs. Forecasted projections</p>
              </div>
              <select className="font-label-sm text-label-sm border border-outline-variant/50 rounded-lg px-2.5 py-1.5 focus:ring-1 focus:ring-trade-orange outline-none bg-white text-on-surface cursor-pointer text-[12px]">
                <option>Last 6 Months</option>
                <option>Year to Date</option>
              </select>
            </div>

            {/* Visual Bar Chart */}
            <div className="flex-grow flex flex-col gap-s-lg">
              <div className="flex-grow w-full bg-surface-container-lowest/50 border border-outline-variant/30 rounded-lg relative overflow-hidden group min-h-[220px]">
                {/* Y-Axis lines */}
                <div className="absolute inset-x-0 top-1/4 border-b border-dashed border-outline-variant/20 pointer-events-none"></div>
                <div className="absolute inset-x-0 top-2/4 border-b border-dashed border-outline-variant/20 pointer-events-none"></div>
                <div className="absolute inset-x-0 top-3/4 border-b border-dashed border-outline-variant/20 pointer-events-none"></div>

                <div className="absolute inset-0 flex items-end px-s-md gap-s-sm pb-s-sm">
                  {/* May */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                    <div className="w-full bg-trade-navy/5 h-[40%] rounded-t-md hover:bg-trade-navy/15 transition-all duration-300"></div>
                    <span className="font-label-caps text-[9px] text-secondary">MAY</span>
                  </div>
                  {/* Jun */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                    <div className="w-full bg-trade-navy/5 h-[60%] rounded-t-md hover:bg-trade-navy/15 transition-all duration-300"></div>
                    <span className="font-label-caps text-[9px] text-secondary">JUN</span>
                  </div>
                  {/* Jul */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar relative">
                    <div className="w-full bg-trade-orange h-[85%] rounded-t-md relative shadow-md shadow-trade-orange/15 hover:brightness-105 transition-all duration-300">
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 font-label-caps text-[10px] bg-trade-navy text-white px-2 py-1 rounded shadow-md whitespace-nowrap z-10 animate-bounce">
                        ₹14.2L
                      </div>
                    </div>
                    <span className="font-label-caps text-[9px] text-trade-orange font-bold">JUL</span>
                  </div>
                  {/* Aug */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                    <div className="w-full bg-trade-navy/10 h-[70%] rounded-t-md hover:bg-trade-navy/15 transition-all duration-300"></div>
                    <span className="font-label-caps text-[9px] text-secondary">AUG</span>
                  </div>
                  {/* Sep */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                    <div className="w-full bg-trade-navy/10 h-[90%] rounded-t-md hover:bg-trade-navy/15 transition-all duration-300"></div>
                    <span className="font-label-caps text-[9px] text-secondary">SEP</span>
                  </div>
                  {/* Oct */}
                  <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end group/bar">
                    <div className="w-full bg-trade-navy/10 h-[50%] rounded-t-md hover:bg-trade-navy/15 transition-all duration-300"></div>
                    <span className="font-label-caps text-[9px] text-secondary">OCT</span>
                  </div>
                </div>

                {/* Legends */}
                <div className="absolute top-4 right-4 flex items-center gap-4 bg-white/80 p-2 rounded-lg border border-outline-variant/20 backdrop-blur-sm">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-trade-orange"></div>
                    <span className="font-label-sm text-[10px] text-secondary font-medium">Actual Spend</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-trade-navy/20"></div>
                    <span className="font-label-sm text-[10px] text-secondary font-medium">Budget Cap</span>
                  </div>
                </div>
              </div>

              {/* Bottom stats indicators */}
              <div className="grid grid-cols-2 gap-s-md">
                <div className="flex items-center gap-s-md p-s-sm bg-surface-container-low border border-outline-variant/10 rounded-lg">
                  <div className="w-12 h-12 rounded-full border-4 border-emerald-500 border-r-transparent flex items-center justify-center bg-white shadow-sm flex-shrink-0">
                    <span className="font-label-sm font-bold text-trade-navy text-[12px]">84%</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-secondary uppercase text-[10px] tracking-wide">RFQ Conversion Rate</p>
                    <p className="font-body-md text-trade-navy font-bold">Excellent Performance</p>
                  </div>
                </div>
                <div className="flex items-center gap-s-md p-s-sm bg-surface-container-low border border-outline-variant/10 rounded-lg">
                  <div className="w-12 h-12 rounded-full border-4 border-trade-orange border-t-transparent flex items-center justify-center bg-white shadow-sm flex-shrink-0">
                    <span className="font-label-sm font-bold text-trade-navy text-[12px]">₹32L</span>
                  </div>
                  <div>
                    <p className="font-label-sm text-secondary uppercase text-[10px] tracking-wide">Avg Monthly Flow</p>
                    <p className="font-body-md text-trade-navy font-bold">Stable Trend</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Timeline */}
        <div className="flex flex-col gap-s-md">
          {/* Quick Actions */}
          <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md rounded-lg shadow-sm">
            <h3 className="font-label-caps text-label-caps text-secondary mb-s-sm uppercase tracking-wider font-semibold text-[11px]">
              Quick Actions
            </h3>
            {/* Desktop View */}
            <div className="hidden sm:grid grid-cols-2 gap-s-xs">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="flex flex-col items-center justify-center gap-2 p-s-sm border border-outline-variant/40 rounded-lg bg-white/45 hover:border-trade-orange hover:text-trade-orange transition-all duration-200 group text-center"
                >
                  <span className="material-symbols-outlined text-2xl text-secondary group-hover:text-trade-orange transition-colors">
                    {action.icon}
                  </span>
                  <span className="font-label-sm text-[12px] font-medium text-on-surface group-hover:text-trade-orange transition-colors">
                    {action.name}
                  </span>
                </Link>
              ))}
            </div>
            {/* Mobile Carousel View */}
            <div className="flex sm:hidden overflow-x-auto gap-3 pb-1 hide-scrollbar scroll-smooth">
              {quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  href={action.href}
                  className="flex-shrink-0 flex flex-col items-center justify-center w-24 h-24 border border-outline-variant/40 rounded-xl bg-white/60 hover:border-trade-orange active:scale-95 transition-all text-center p-2 shadow-sm"
                >
                  <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center mb-1 flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-trade-navy">{action.icon}</span>
                  </div>
                  <span className="font-label-sm text-[10px] text-on-surface leading-tight font-medium">{action.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/80 backdrop-blur-md border border-outline-variant/30 p-s-md flex-1 rounded-lg shadow-sm flex flex-col justify-between">
            <h3 className="font-label-caps text-label-caps text-secondary mb-s-md uppercase tracking-wider font-semibold text-[11px]">
              Recent Activity
            </h3>
            <div className="flex flex-col gap-s-md relative flex-grow pl-2">
              {/* Vertical line */}
              <div className="absolute left-5.5 top-2 bottom-8 w-px bg-outline-variant/30"></div>

              {activities.map((act, idx) => (
                <div key={idx} className={`flex gap-s-md relative ${act.opacity || ""}`}>
                  <div className={`w-7 h-7 rounded-full ${act.bg} flex items-center justify-center z-10 border border-white shadow-sm flex-shrink-0`}>
                    <span className="material-symbols-outlined text-[13px] text-white font-bold">{act.icon}</span>
                  </div>
                  <div>
                    <p className="font-body-md text-trade-navy font-semibold leading-snug">{act.title}</p>
                    <p className="font-label-sm text-secondary text-[12px] mt-0.5">{act.desc}</p>
                    <span className="font-label-sm text-[10px] text-secondary/60 mt-1 block font-light">{act.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest RFQs & Responses Data Table */}
      <section className="bg-white/80 backdrop-blur-md border border-outline-variant/30 rounded-lg shadow-sm overflow-hidden">
        <div className="px-s-md py-s-sm border-b border-outline-variant/30 flex items-center justify-between bg-white/40">
          <div>
            <h3 className="font-headline-md text-headline-md text-trade-navy font-semibold">Latest RFQs &amp; Responses</h3>
            <p className="font-label-sm text-secondary text-[12px] mt-0.5">Tracking ongoing negotiations and active tenders</p>
          </div>
          <Link href="/buyerportal/procurement" className="text-trade-orange font-label-sm text-[12px] font-bold hover:underline decoration-2">
            View All
          </Link>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/75 border-b border-outline-variant/30">
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">RFQ ID</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Category</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Supplier Status</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Date Created</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Deadline</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider">Status</th>
                <th className="font-label-caps text-[10px] text-secondary p-s-md uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20">
              {rfqs.map((rfq, idx) => (
                <tr key={idx} className="hover:bg-surface-container-lowest transition-colors duration-150 group">
                  <td className="p-s-md font-label-caps text-trade-navy font-bold text-[12px]">{rfq.id}</td>
                  <td className="p-s-md font-body-md text-secondary font-medium">{rfq.category}</td>
                  <td className="p-s-md">
                    {rfq.waiting ? (
                      <span className="font-label-sm text-secondary text-[11px] font-medium italic">Waiting for suppliers...</span>
                    ) : (
                      <div className="flex -space-x-2 items-center">
                        {rfq.suppliers.map((sup, sIdx) => (
                          <div
                            key={sIdx}
                            className="relative w-6 h-6 rounded-full border border-white shadow-sm overflow-hidden"
                          >
                            <Image
                              className="object-cover"
                              alt="Supplier logo"
                              src={sup}
                              fill
                              sizes="24px"
                            />
                          </div>
                        ))}
                        {rfq.extraSuppliers > 0 && (
                          <div className="w-6 h-6 rounded-full bg-surface-container flex items-center justify-center text-[9px] font-bold text-secondary border border-white shadow-sm">
                            +{rfq.extraSuppliers}
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-s-md font-body-md text-secondary text-[13px]">{rfq.dateCreated}</td>
                  <td className="p-s-md font-body-md text-secondary text-[13px]">{rfq.deadline}</td>
                  <td className="p-s-md">
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${rfq.statusBg}`}>
                      {rfq.status}
                    </span>
                  </td>
                  <td className="p-s-md text-right">
                    <Link
                      href="/buyerportal/procurement"
                      className="p-1.5 hover:bg-surface-container rounded-lg text-secondary group-hover:text-trade-orange inline-flex items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-md">chevron_right</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List View */}
        <div className="block md:hidden divide-y divide-outline-variant/20">
          {rfqs.map((rfq, idx) => (
            <div key={idx} className="p-s-md flex flex-col gap-2 hover:bg-surface-container-lowest transition-colors">
              <div className="flex justify-between items-center">
                <span className="font-label-caps text-trade-navy font-bold text-[12px]">{rfq.id}</span>
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${rfq.statusBg}`}>
                  {rfq.status}
                </span>
              </div>
              <p className="font-body-md text-on-surface font-semibold">{rfq.category}</p>
              <div className="flex justify-between items-center text-[12px] text-secondary">
                <span>Created: {rfq.dateCreated}</span>
                <span>Deadline: {rfq.deadline}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-outline-variant/10 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-label-caps text-secondary/70">Suppliers:</span>
                  {rfq.waiting ? (
                    <span className="text-[11px] text-secondary font-medium italic">Waiting...</span>
                  ) : (
                    <div className="flex -space-x-1.5 items-center">
                      {rfq.suppliers.map((sup, sIdx) => (
                        <div key={sIdx} className="relative w-5.5 h-5.5 rounded-full border border-white shadow-sm overflow-hidden">
                          <Image className="object-cover" alt="Supplier logo" src={sup} fill sizes="20px" />
                        </div>
                      ))}
                      {rfq.extraSuppliers > 0 && (
                        <div className="w-5.5 h-5.5 rounded-full bg-surface-container flex items-center justify-center text-[8px] font-bold text-secondary border border-white shadow-sm">
                          +{rfq.extraSuppliers}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Link href="/buyerportal/procurement" className="text-trade-orange font-bold text-[12px] flex items-center gap-0.5">
                  View Detail <span className="material-symbols-outlined text-sm">chevron_right</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
