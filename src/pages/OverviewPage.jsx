import React from "react";
import { ArrowUpRight, ArrowRight, Leaf } from "lucide-react";
import { docs } from "../data/scholarships";

export default function OverviewPage({
  page,
  saved,
  ready,
  setModal,
  setPage,
}) {
  return (
    <>
      {page === "Overview" && (
        <section className="overview-grid">
          <div className="panel">
            <div className="section-heading">
              <h2>Your next steps</h2>
              <Leaf size={22} />
            </div>
            {[
              [
                "Complete your student profile",
                "Get clearer eligibility results",
                () => setModal({ type: "profile" }),
              ],
              [
                "Build your scholarship shortlist",
                `${saved.length} opportunities saved`,
                () => setPage("Discover"),
              ],
              [
                "Prepare your documents",
                `${ready} of ${docs.length} documents ready`,
                () => setPage("Documents"),
              ],
            ].map(([a, b, fn], i) => (
              <button className="step-row" key={a} onClick={fn}>
                <span className="step-num">0{i + 1}</span>
                <span>
                  <strong>{a}</strong>
                  <small>{b}</small>
                </span>
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <div className="panel green-panel">
            <span className="eyebrow">YOUR READINESS</span>
            <h2>A little prep goes a long way.</h2>
            <div className="progress">
              <span style={{ width: (ready / docs.length) * 100 + "%" }} />
            </div>
            <p>
              {ready} of {docs.length} essential documents ready
            </p>
            <button
              className="outline-button"
              onClick={() => setPage("Documents")}
            >
              Open checklist <ArrowRight size={16} />
            </button>
          </div>
        </section>
      )}
    </>
  );
}
