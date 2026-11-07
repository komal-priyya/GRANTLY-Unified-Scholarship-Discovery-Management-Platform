import React from "react";
import { FolderCheck, FileText, Check } from "lucide-react";
import { docs } from "../data/scholarships";

export default function DocumentsPage({ page, ready, checked, setChecked }) {
  return (
    <>
      {page === "Documents" && (
        <section className="document-layout">
          <div className="panel">
            <div className="section-heading">
              <h2>Your essential checklist</h2>
              <span>
                {ready}/{docs.length} ready
              </span>
            </div>
            {docs.map((d, i) => (
              <label
                className={"document-row " + (checked[d] ? "done" : "")}
                key={d}
              >
                <span className="document-icon">
                  <FileText size={22} />
                </span>
                <span>
                  <strong>{d}</strong>
                  <small>
                    {
                      [
                        "A government-issued identification document",
                        "Your most recent semester or board results",
                        "Current family income proof, if applicable",
                        "An enrollment letter or student ID",
                      ][i]
                    }
                  </small>
                </span>
                <input
                  type="checkbox"
                  checked={!!checked[d]}
                  onChange={(e) =>
                    setChecked((c) => ({ ...c, [d]: e.target.checked }))
                  }
                />
              </label>
            ))}
          </div>
          <div className="panel green-panel">
            <FolderCheck size={32} />
            <h2>Prepared feels better.</h2>
            <p>
              Check off documents you already have. Your checklist is shared
              across your applications.
            </p>
            <div className="progress">
              <span style={{ width: (ready / docs.length) * 100 + "%" }} />
            </div>
            <p>{Math.round((ready / docs.length) * 100)}% ready</p>
            <small>
              This demo tracks readiness only. No personal documents are
              uploaded or stored.
            </small>
          </div>
        </section>
      )}
    </>
  );
}
