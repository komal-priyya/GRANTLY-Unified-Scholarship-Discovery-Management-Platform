import React from "react";
import { ArrowRight, FolderCheck, Download } from "lucide-react";
import { scholarships, docs } from "../data/scholarships";
import { money } from "../utils/format";

export default function ApplicationsPage({
  page,
  applications,
  exportPlan,
  setPage,
  updateApp,
  checked,
  setChecked,
  setModal,
}) {
  return (
    <>
      {page === "Applications" && (
        <section>
          <div className="section-heading">
            <h2>
              Your application workspace <span>{applications.length}</span>
            </h2>
            <button className="outline-button" onClick={exportPlan}>
              <Download size={16} /> Export CSV
            </button>
          </div>
          <div className="application-summary">
            {["Preparing", "Submitted", "Awarded"].map((status) => (
              <div key={status}>
                <span className={"status-dot " + status} />
                <strong>
                  {applications.filter((a) => a.status === status).length}
                </strong>
                <span>{status}</span>
              </div>
            ))}
          </div>
          {applications.length === 0 ? (
            <div className="empty">
              <FolderCheck size={36} />
              <h3>Your next chapter starts here.</h3>
              <p>
                Open a scholarship and select “Start application” to build your
                plan.
              </p>
              <button
                className="primary-button"
                onClick={() => setPage("Discover")}
              >
                Find an opportunity <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            applications.map((a) => {
              const s = scholarships.find((s) => s.id === a.id);
              return (
                <article className="application-card" key={a.id}>
                  <div className="application-head">
                    <span className={"org-logo " + s.color}>{s.logo}</span>
                    <div>
                      <small>{s.org}</small>
                      <h3>{s.name}</h3>
                      <p>
                        {money(s.amount)} / year · Deadline {s.date}
                      </p>
                    </div>
                    <select
                      aria-label={"Application status for " + s.name}
                      value={a.status}
                      onChange={(e) =>
                        updateApp(a.id, "status", e.target.value)
                      }
                    >
                      {[
                        "Preparing",
                        "Submitted",
                        "Awarded",
                        "Not selected",
                      ].map((x) => (
                        <option key={x}>{x}</option>
                      ))}
                    </select>
                  </div>
                  <div className="application-body">
                    <div>
                      <h4>Document readiness</h4>
                      {docs.map((d) => (
                        <label className="checkline" key={d}>
                          <input
                            type="checkbox"
                            checked={!!checked[d]}
                            onChange={(e) =>
                              setChecked((c) => ({
                                ...c,
                                [d]: e.target.checked,
                              }))
                            }
                          />
                          {d}
                        </label>
                      ))}
                    </div>
                    <label className="notes">
                      My notes & next steps
                      <textarea
                        placeholder="Add a reminder, question, or next step…"
                        value={a.notes}
                        onChange={(e) =>
                          updateApp(a.id, "notes", e.target.value)
                        }
                      />
                      <small>Saved automatically on this device.</small>
                    </label>
                  </div>
                  <div className="application-foot">
                    <span>
                      Prototype tracker. No application is sent to a provider.
                    </span>
                    <button
                      onClick={() => setModal({ type: "remove", id: a.id })}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              );
            })
          )}
        </section>
      )}
    </>
  );
}
