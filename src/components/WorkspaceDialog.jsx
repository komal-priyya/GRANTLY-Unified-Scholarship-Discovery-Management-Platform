import React from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Bookmark,
  Search,
  FileText,
  Check,
  X,
  CalendarDays,
  Clock,
} from "lucide-react";
import { scholarships, docs } from "../data/scholarships";
import { evaluate } from "../utils/eligibility";
import { money } from "../utils/format";

export default function WorkspaceDialog({
  modal,
  setModal,
  profile,
  setProfile,
  notify,
  applications,
  setApplications,
  saved,
  toggle,
  apply,
  ready,
}) {
  return (
    <>
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={
              modal.type === "scholarship" ? modal.s.name : "Grantly workspace"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              aria-label="Close dialog"
              onClick={() => setModal(null)}
            >
              <X size={21} />
            </button>
            {modal.type === "profile" ? (
              <>
                <span className="eyebrow">LET’S MAKE THIS PERSONAL</span>
                <h2>Your story. Your opportunities.</h2>
                <p>
                  These details help check the demo scholarship criteria.
                  Everything stays in your browser.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    notify("Profile saved. Your matches are updated.");
                    setModal(null);
                  }}
                >
                  <div className="form-grid">
                    <label>
                      Name
                      <input
                        required
                        maxLength="40"
                        value={profile.name}
                        onChange={(e) =>
                          setProfile({ ...profile, name: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Study level
                      <select
                        value={profile.course}
                        onChange={(e) =>
                          setProfile({ ...profile, course: e.target.value })
                        }
                      >
                        <option>Undergraduate</option>
                        <option>Postgraduate</option>
                      </select>
                    </label>
                    <label>
                      Annual family income (₹)
                      <input
                        type="number"
                        min="0"
                        max="100000000"
                        placeholder="e.g. 250000"
                        value={profile.income}
                        onChange={(e) =>
                          setProfile({ ...profile, income: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      Academic percentage
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
                        placeholder="e.g. 82"
                        value={profile.marks}
                        onChange={(e) =>
                          setProfile({ ...profile, marks: e.target.value })
                        }
                      />
                    </label>
                    <label>
                      State
                      <select
                        value={profile.state}
                        onChange={(e) =>
                          setProfile({ ...profile, state: e.target.value })
                        }
                      >
                        <option value="">Select state</option>
                        {[
                          "Bihar",
                          "Uttar Pradesh",
                          "Jharkhand",
                          "Delhi",
                          "Maharashtra",
                          "Karnataka",
                          "Tamil Nadu",
                          "West Bengal",
                          "Rajasthan",
                          "Gujarat",
                          "Other",
                        ].map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Gender (optional)
                      <select
                        value={profile.gender}
                        onChange={(e) =>
                          setProfile({ ...profile, gender: e.target.value })
                        }
                      >
                        <option value="">Prefer not to say</option>
                        <option>Woman</option>
                        <option>Man</option>
                        <option>Non-binary</option>
                      </select>
                    </label>
                  </div>
                  <button className="primary-button full" type="submit">
                    Save & discover my matches <ArrowRight size={17} />
                  </button>
                </form>
              </>
            ) : modal.type === "scholarship" ? (
              (() => {
                const s = modal.s;
                const m = evaluate(s, profile);
                return (
                  <>
                    <span className={"org-logo " + s.color}>{s.logo}</span>
                    <p className="org-name">
                      {s.org} · Illustrative opportunity
                    </p>
                    <h2>{s.name}</h2>
                    <p>{s.desc}</p>
                    <div className="detail-highlight">
                      <strong>
                        {money(s.amount)}
                        <small> per year</small>
                      </strong>
                      <span>
                        <CalendarDays size={16} /> Apply by {s.date}
                      </span>
                    </div>
                    <h3>Does this fit your story?</h3>
                    <p className="small-text">
                      Transparent checks based on your profile. This is a
                      criteria check, not an award guarantee.
                    </p>
                    <div className="criteria">
                      {m.rules.map(([label, value, pass]) => (
                        <div key={label}>
                          <span
                            className={
                              !value
                                ? "criteria-unknown"
                                : pass
                                  ? "criteria-pass"
                                  : "criteria-fail"
                            }
                          >
                            {!value ? (
                              "?"
                            ) : pass ? (
                              <Check size={14} />
                            ) : (
                              <X size={14} />
                            )}
                          </span>
                          <div>
                            <strong>{label}</strong>
                            <small>
                              {label === "Annual family income"
                                ? `Up to ${money(s.income)}`
                                : label === "Academic score"
                                  ? `At least ${s.marks}%`
                                  : label === "Study level"
                                    ? s.course
                                    : label === "Gender"
                                      ? s.gender
                                      : s.states.join(", ")}
                            </small>
                          </div>
                          <em>
                            {!value
                              ? "Add details"
                              : pass
                                ? "Meets criteria"
                                : "Doesn’t meet"}
                          </em>
                        </div>
                      ))}
                    </div>
                    <button
                      className="text-button"
                      onClick={() => setModal({ type: "profile" })}
                    >
                      Update my profile <ArrowUpRight size={15} />
                    </button>
                    <h3>What you’ll need</h3>
                    <div className="detail-docs">
                      {docs.map((d) => (
                        <span key={d}>
                          <FileText size={14} />
                          {d}
                        </span>
                      ))}
                    </div>
                    <div className="modal-actions">
                      <button
                        className="outline-button"
                        onClick={() => toggle(s.id)}
                      >
                        <Bookmark size={17} />
                        {saved.includes(s.id) ? "Saved" : "Save for later"}
                      </button>
                      <button
                        className="primary-button"
                        onClick={() => apply(s)}
                      >
                        {applications.some((a) => a.id === s.id)
                          ? "Open application"
                          : "Start application"}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </>
                );
              })()
            ) : modal.type === "help" ? (
              <>
                <span className="eyebrow">A SIMPLER SCHOLARSHIP JOURNEY</span>
                <h2>
                  From “where do I start?”
                  <br />
                  to your next step.
                </h2>
                {[
                  [
                    "1",
                    "Tell us about yourself",
                    "Add your study level, income, and marks to see transparent eligibility checks.",
                  ],
                  [
                    "2",
                    "Find your possibilities",
                    "Search, filter, and save scholarships. Each detail view explains the criteria.",
                  ],
                  [
                    "3",
                    "Keep moving forward",
                    "Start a local application plan, check documents, and track your status.",
                  ],
                ].map(([n, t, p]) => (
                  <div className="help-step" key={n}>
                    <span className="step-num">{n}</span>
                    <div>
                      <h3>{t}</h3>
                      <p>{p}</p>
                    </div>
                  </div>
                ))}
                <div className="notice">
                  This is a frontend prototype with illustrative scholarships.
                  There is no authentication, live funding feed, or provider
                  submission. Browser data persists on this device.
                </div>
              </>
            ) : modal.type === "remove" ? (
              <>
                <h2>Remove this application?</h2>
                <p>
                  Your notes and status for this application will be removed.
                  Your saved scholarship and document checklist will remain.
                </p>
                <div className="modal-actions">
                  <button
                    className="outline-button"
                    onClick={() => setModal(null)}
                  >
                    Keep application
                  </button>
                  <button
                    className="primary-button"
                    onClick={() => {
                      setApplications((a) =>
                        a.filter((x) => x.id !== modal.id),
                      );
                      setModal(null);
                      notify("Application removed");
                    }}
                  >
                    Remove application
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="eyebrow">YOUR GENTLE REMINDERS</span>
                <h2>A little heads-up.</h2>
                <div className="help-step">
                  <Clock />
                  <div>
                    <h3>First Step Education Grant</h3>
                    <p>
                      Illustrative deadline: 12 November. Prepare your income
                      certificate before you begin.
                    </p>
                  </div>
                </div>
                <div className="help-step">
                  <FileText />
                  <div>
                    <h3>{docs.length - ready} documents to prepare</h3>
                    <p>Visit Documents to finish your readiness checklist.</p>
                  </div>
                </div>
                <p className="notice">
                  In-app demo reminders only. No email or push notifications are
                  scheduled.
                </p>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
