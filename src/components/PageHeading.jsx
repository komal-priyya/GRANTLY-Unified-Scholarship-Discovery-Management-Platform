import React from "react";
import { SlidersHorizontal } from "lucide-react";

export default function PageHeading({ page, profile, setModal }) {
  return (
    <>
      <div className="page-heading">
        <div>
          <div className="eyebrow">YOUR PERSONAL SCHOLARSHIP FIELD GUIDE</div>
          <h1>
            {page === "Discover"
              ? "Make room for your next chapter."
              : page === "Overview"
                ? `Good things ahead, ${profile.name || "student"}.`
                : page === "Saved scholarships"
                  ? "Good finds. All in one place."
                  : page === "Applications"
                    ? "Small steps. Real progress."
                    : "Get ready for your next yes."}
          </h1>
          <p>
            {page === "Discover"
              ? "Find scholarships that fit your story. We’ll help you take the next step."
              : page === "Saved scholarships"
                ? "The opportunities you want to come back to."
                : page === "Applications"
                  ? "Keep your deadlines, documents, and next steps together."
                  : page === "Documents"
                    ? "One checklist. Fewer last-minute surprises."
                    : "Your scholarship journey, a little more organized."}
          </p>
        </div>
        <button
          className="outline-button profile-cta"
          onClick={() => setModal({ type: "profile" })}
        >
          <SlidersHorizontal size={16} /> My student profile
        </button>
      </div>
    </>
  );
}
