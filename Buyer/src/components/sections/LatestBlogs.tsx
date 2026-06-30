"use client";

import React from "react";

interface BlogArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  readTime: string;
}

export default function LatestBlogs() {
  const blogs: BlogArticle[] = [
    {
      id: "blog-1",
      category: "Procurement Strategy",
      date: "June 25, 2026",
      title: "Optimizing B2B Sourcing Margins: Escrow Logistics Agreements",
      summary: "Understand how secure escrow structures, multi-modal routing networks, and audited logistics clearances can lock in margins for large cement and steel procurement orders.",
      readTime: "5 min read",
    },
    {
      id: "blog-2",
      category: "Compliance & Audit",
      date: "June 18, 2026",
      title: "Corporate Procurement: Navigating GST and MSME Audits",
      summary: "A comprehensive checklist for sourcing officers to verify supplier GST compliance certificates and leverage MSME credit margins under Indian commerce regulations.",
      readTime: "6 min read",
    },
    {
      id: "blog-3",
      category: "Supply Chain Risk",
      date: "June 10, 2026",
      title: "Mitigating Contract Delay Risks with Trade Assurance Arbitration",
      summary: "How modern digital B2B contract clauses and escrow-backed logistics arbitration panels shield corporate buyers from project-critical manufacturing delays.",
      readTime: "4 min read",
    },
  ];

  return (
    <section className="bg-background py-12 px-s-md" id="latest-blogs-section">
      <div className="max-w-s-container-max mx-auto space-y-8">
        
        {/* Title Block */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="font-headline-lg text-[20px] md:text-[24px] text-trade-navy font-black tracking-wide uppercase">
            Latest Industry Insights
          </h2>
          <p className="text-[13px] text-secondary font-medium">
            Read professional supply chain analyses, procurement updates, and B2B market compliance guidelines.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="bg-white border border-outline-variant/20 rounded-xl p-6 flex flex-col justify-between hover:border-trade-orange/40 hover:-translate-y-0.5 transition-all duration-300 shadow-xs group"
            >
              <div className="space-y-4">
                {/* Meta details */}
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-secondary/70">
                  <span className="bg-trade-navy/5 text-trade-navy px-2.5 py-1 rounded">
                    {blog.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    {blog.readTime}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-headline-md text-[14.5px] text-trade-navy font-black leading-tight group-hover:text-trade-orange transition-colors">
                  {blog.title}
                </h3>

                {/* Summary */}
                <p className="text-[11.5px] text-secondary leading-relaxed">
                  {blog.summary}
                </p>
              </div>

              {/* Action */}
              <div className="pt-5 mt-5 border-t border-outline-variant/10 flex items-center justify-between">
                <span className="text-[10px] text-secondary font-bold">{blog.date}</span>
                <button
                  type="button"
                  onClick={() => alert(`Redirecting to article: "${blog.title}" (Mock link)`)}
                  className="text-trade-navy group-hover:text-trade-orange text-xs font-black uppercase tracking-wider flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  Read Article
                  <span className="material-symbols-outlined text-[13px] group-hover:translate-x-0.5 transition-transform">
                    arrow_right_alt
                  </span>
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
