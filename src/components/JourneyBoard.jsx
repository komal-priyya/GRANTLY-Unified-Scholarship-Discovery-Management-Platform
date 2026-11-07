import React from "react";
import {
  ArrowUpRight,
  Bookmark,
  GraduationCap,
  FolderCheck,
  Check,
} from "lucide-react";
import { scholarships, docs } from "../data/scholarships";

export default function JourneyBoard({
  page,
  profile,
  saved,
  applications,
  ready,
  setModal,
  setPage,
}) {
  return (
    <>
      {(page === "Discover" || page === "Overview") && (
        <>
          <section className="journey-hero">
            <div className="journey-intro">
              <span className="journey-label">
                THE SCHOLARSHIP FIELD GUIDE / 01
              </span>
              <h2>
                Your ambition.
                <br />A plan to <em>fund it.</em>
              </h2>
              <p>
                Turn a list of possibilities into a next step you can actually
                take.
              </p>
              <div className="journey-stamp">
                <GraduationCap size={28} />
                <span>
                  LESS GUESSWORK
                  <br />
                  <strong>MORE GOING FOR IT.</strong>
                </span>
              </div>
            </div>
            <div className="next-step-panel">
              <span className="journey-label">YOUR NEXT MOVE</span>
              <span className="next-step-number">
                {!profile.income || !profile.marks
                  ? "01"
                  : !saved.length
                    ? "02"
                    : !applications.length
                      ? "03"
                      : "04"}
              </span>
              <h3>
                {!profile.income || !profile.marks
                  ? "Start with your story."
                  : !saved.length
                    ? "Find your first possibility."
                    : !applications.length
                      ? "Turn a bookmark into a plan."
                      : ready < docs.length
                        ? "Get your paperwork ready."
                        : "You are ready for the next step."}
              </h3>
              <p>
                {!profile.income || !profile.marks
                  ? "Add your study level, marks, and income to understand which opportunities fit."
                  : !saved.length
                    ? "Explore the opportunities below and bookmark one that fits your goals."
                    : !applications.length
                      ? "Open a saved scholarship and start your personal application checklist."
                      : ready < docs.length
                        ? `${docs.length - ready} documents still need preparation. Work through your checklist before applying.`
                        : "Review your application notes and update your tracker after applying through the provider."}
              </p>
              <button
                onClick={() => {
                  if (!profile.income || !profile.marks)
                    setModal({ type: "profile" });
                  else if (!saved.length) {
                    setPage("Discover");
                    document
                      .querySelector(".discovery")
                      ?.scrollIntoView({ behavior: "smooth" });
                  } else if (!applications.length)
                    setPage("Saved scholarships");
                  else
                    setPage(ready < docs.length ? "Documents" : "Applications");
                }}
              >
                {!profile.income || !profile.marks
                  ? "Build my profile"
                  : !saved.length
                    ? "Explore opportunities"
                    : !applications.length
                      ? "Open my shortlist"
                      : ready < docs.length
                        ? "Prepare documents"
                        : "Open my tracker"}
                <ArrowUpRight size={18} />
              </button>
              <div className="readiness-caption">
                <span>DOCUMENT READINESS</span>
                <strong>
                  {ready}/{docs.length}
                </strong>
              </div>
              <div className="journey-progress">
                <span style={{ width: (ready / docs.length) * 100 + "%" }} />
              </div>
            </div>
          </section>
          <section
            className="journey-rail"
            aria-label="Your scholarship journey"
          >
            {[
              ["01", "Discover", "Find your possibilities", "Discover"],
              ["02", "Check your fit", "Understand every criterion", "profile"],
              ["03", "Prepare", "Get your documents ready", "Documents"],
              ["04", "Track", "Keep your next steps close", "Applications"],
            ].map(([n, title, desc, destination]) => (
              <button
                key={n}
                onClick={() =>
                  destination === "profile"
                    ? setModal({ type: "profile" })
                    : setPage(destination)
                }
              >
                <span>{n}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{desc}</small>
                </div>
                <ArrowUpRight size={17} />
              </button>
            ))}
          </section>
          <section className="stats">
            <div>
              <span className="stat-icon mint">
                <GraduationCap size={21} />
              </span>
              <div>
                <strong>
                  {scholarships.length}
                  <small>curated opportunities</small>
                </strong>
                <p>Explore your possibilities</p>
              </div>
            </div>
            <div>
              <span className="stat-icon peach">
                <Bookmark size={20} />
              </span>
              <div>
                <strong>
                  {saved.length}
                  <small>saved scholarships</small>
                </strong>
                <p>A shortlist that’s yours</p>
              </div>
            </div>
            <div>
              <span className="stat-icon lilac">
                <FolderCheck size={21} />
              </span>
              <div>
                <strong>
                  {applications.length}
                  <small>applications started</small>
                </strong>
                <p>Every small step counts</p>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
