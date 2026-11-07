import React from "react";
import {
  Bookmark,
  Search,
  LayoutDashboard,
  GraduationCap,
  FolderCheck,
  FileText,
  ChevronDown,
} from "lucide-react";

export default function Navigation({
  page,
  setPage,
  saved,
  applications,
  profile,
  setModal,
}) {
  return (
    <>
      <aside className="sidebar">
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setPage("Discover");
          }}
        >
          <span className="brand-icon">
            <GraduationCap size={24} />
          </span>
          grantly<span className="brand-dot">.</span>
        </a>
        <nav>
          {[
            ["Overview", LayoutDashboard],
            ["Discover", Search],
            ["Saved scholarships", Bookmark],
            ["Applications", FolderCheck],
            ["Documents", FileText],
          ].map(([name, Icon]) => (
            <button
              key={name}
              className={page === name ? "nav active" : "nav"}
              aria-current={page === name ? "page" : undefined}
              onClick={() => {
                setPage(name);
              }}
            >
              <Icon size={19} />
              {name}
              {name === "Saved scholarships" && saved.length > 0 && (
                <span className="nav-count">{saved.length}</span>
              )}
              {name === "Applications" && applications.length > 0 && (
                <span className="nav-count">{applications.length}</span>
              )}
            </button>
          ))}
        </nav>
        <button
          className="profile-chip"
          aria-label="Edit student profile"
          onClick={() => setModal({ type: "profile" })}
        >
          <span className="avatar">{profile.name?.[0] || "S"}</span>
          <span>
            <strong>{profile.name || "Student"}</strong>
            <small>Student account</small>
          </span>
          <ChevronDown size={16} />
        </button>
      </aside>
    </>
  );
}
