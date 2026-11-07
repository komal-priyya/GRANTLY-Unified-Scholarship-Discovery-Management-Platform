import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Bookmark,
  Search,
  SlidersHorizontal,
  Check,
  X,
  CalendarDays,
  CircleHelp,
} from "lucide-react";
import { evaluate } from "../utils/eligibility";
import { money } from "../utils/format";

export default function DiscoverPage({
  page,
  list,
  sort,
  setSort,
  query,
  setQuery,
  eligible,
  setEligible,
  profile,
  setModal,
  notify,
  filter,
  setFilter,
  saved,
  toggle,
  setPage,
}) {
  return (
    <>
      {["Discover", "Saved scholarships"].includes(page) && (
        <section className="discovery">
          <div className="section-heading">
            <div>
              <h2>
                {page === "Saved scholarships"
                  ? "Your shortlist"
                  : "Opportunities for you"}{" "}
                <span>{list.length}</span>
              </h2>
              <p>Pick a possibility. Understand the fit. Make your move.</p>
            </div>
            <label className="sort">
              Sort by:{" "}
              <select
                aria-label="Sort scholarships"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Recommended</option>
                <option>Closing soon</option>
                <option>Highest amount</option>
              </select>
            </label>
          </div>
          <div className="search-row">
            <label className="search-box">
              <Search size={18} />
              <input
                placeholder="Search by scholarship, organization, or keyword…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button aria-label="Clear search" onClick={() => setQuery("")}>
                  <X size={15} />
                </button>
              )}
            </label>
            <button
              className={
                eligible ? "outline-button filter-on" : "outline-button"
              }
              onClick={() => {
                if (!profile.income || !profile.marks) {
                  setModal({ type: "profile" });
                  notify("Add your details to check eligibility");
                } else setEligible(!eligible);
              }}
            >
              <SlidersHorizontal size={17} />
              {eligible ? "Eligible only" : "Check eligibility"}
            </button>
          </div>
          <div className="tabs">
            {[
              "All scholarships",
              "Merit-based",
              "Need-based",
              "Women in STEM",
              "Creative arts",
            ].map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={filter === c ? "selected" : ""}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="card-grid">
            {list.map((s) => {
              const match = evaluate(s, profile);
              return (
                <article className="scholarship-card" key={s.id}>
                  <div className="card-top">
                    <span className={"org-logo " + s.color}>{s.logo}</span>
                    <button
                      className={
                        saved.includes(s.id) ? "bookmark saved" : "bookmark"
                      }
                      aria-label={
                        saved.includes(s.id)
                          ? "Remove saved scholarship"
                          : "Save scholarship"
                      }
                      onClick={() => toggle(s.id)}
                    >
                      <Bookmark
                        size={20}
                        fill={saved.includes(s.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                  <div className="org-name">{s.org}</div>
                  <h3>{s.name}</h3>
                  <p className="card-desc">{s.desc}</p>
                  <div className="tags">
                    {s.tags.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="amount-row">
                    <div>
                      <small>Scholarship amount</small>
                      <strong>
                        {money(s.amount)}
                        <span> / year</span>
                      </strong>
                    </div>
                    <span className={match.fail ? "match neutral" : "match"}>
                      <span />
                      {match.fail
                        ? "Check criteria"
                        : match.unknown
                          ? "Potential match"
                          : "You meet criteria"}
                    </span>
                  </div>
                  <div className="card-footer">
                    <span>
                      <CalendarDays size={14} />
                      {new Date(s.date + "T12:00:00").toLocaleDateString(
                        "en-IN",
                        { day: "numeric", month: "short" },
                      )}
                    </span>
                    <button
                      onClick={() => setModal({ type: "scholarship", s })}
                    >
                      View scholarship <ArrowUpRight size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
          {list.length === 0 && (
            <div className="empty">
              <Search size={30} />
              <h3>
                {page === "Saved scholarships"
                  ? "Your shortlist is waiting"
                  : "No scholarships found"}
              </h3>
              <p>
                {page === "Saved scholarships"
                  ? "Tap the bookmark on any scholarship to save it here."
                  : "Try another keyword or clear your filters."}
              </p>
              <button
                className="primary-button"
                onClick={() => {
                  setQuery("");
                  setFilter("All scholarships");
                  setEligible(false);
                  setPage("Discover");
                }}
              >
                Explore scholarships <ArrowRight size={16} />
              </button>
            </div>
          )}
          <div className="data-note">
            <CircleHelp size={15} />
            <span>
              Demo opportunities for this prototype. Names, amounts, and
              deadlines are illustrative, not live scholarship listings.
            </span>
          </div>
        </section>
      )}
    </>
  );
}
