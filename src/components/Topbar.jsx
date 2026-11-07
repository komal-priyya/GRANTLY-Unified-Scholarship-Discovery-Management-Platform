import React from "react";
import { Bell } from "lucide-react";

export default function Topbar({ page, profile, setModal }) {
  return (
    <>
      <header className="topbar">
        <div className="breadcrumb">
          <span>Your workspace</span>
          <span className="slash">/</span>
          <strong>{page}</strong>
        </div>
        <div className="top-actions">
          <button
            className="guide-button"
            onClick={() => setModal({ type: "help" })}
          >
            How it works
          </button>
          <span className="demo-pill">
            <span /> Interactive demo
          </span>
          <button
            className="icon-button"
            aria-label="View reminders"
            onClick={() => setModal({ type: "notifications" })}
          >
            <Bell size={19} />
            <i />
          </button>
          <button
            className="small-avatar"
            onClick={() => setModal({ type: "profile" })}
            aria-label="Edit profile"
          >
            {profile.name?.[0] || "S"}
          </button>
        </div>
      </header>
    </>
  );
}
