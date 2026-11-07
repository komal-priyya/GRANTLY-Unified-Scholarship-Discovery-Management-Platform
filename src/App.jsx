import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { scholarships, docs } from "./data/scholarships";
import { useSaved } from "./hooks/useSaved";
import { evaluate } from "./utils/eligibility";
import Navigation from "./components/Navigation";
import Topbar from "./components/Topbar";
import PageHeading from "./components/PageHeading";
import JourneyBoard from "./components/JourneyBoard";
import DiscoverPage from "./pages/DiscoverPage";
import OverviewPage from "./pages/OverviewPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import DocumentsPage from "./pages/DocumentsPage";
import WorkspaceDialog from "./components/WorkspaceDialog";
import Footer from "./components/Footer";

export default function App() {
  const [page, setPage] = useState("Discover");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All scholarships");
  const [sort, setSort] = useState("Recommended");
  const [saved, setSaved] = useSaved("saved", []);
  const [profile, setProfile] = useSaved("profile", {
    name: "Komal",
    course: "Undergraduate",
    state: "",
    income: "",
    marks: "",
    gender: "",
  });
  const [applications, setApplications] = useSaved("applications", []);
  const [checked, setChecked] = useSaved("documents", {});
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");
  const [eligible, setEligible] = useState(false);
  function notify(msg) {
    setToast(msg);
    setTimeout(() => setToast(""), 3200);
  }
  function toggle(id) {
    setSaved((x) => (x.includes(id) ? x.filter((i) => i !== id) : [...x, id]));
  }
  function apply(s) {
    if (!applications.some((a) => a.id === s.id)) {
      setApplications((a) => [
        ...a,
        { id: s.id, status: "Preparing", notes: "" },
      ]);
      notify("Added to your application workspace");
    }
    setModal(null);
    setPage("Applications");
  }
  function updateApp(id, field, value) {
    setApplications((a) =>
      a.map((x) => (x.id === id ? { ...x, [field]: value } : x)),
    );
  }
  function exportPlan() {
    const rows = [
      ["Scholarship", "Amount", "Deadline", "Status"],
      ...applications.map((a) => {
        let s = scholarships.find((s) => s.id === a.id);
        return [s.name, s.amount, s.date, a.status];
      }),
    ];
    const blob = new Blob([rows.map((r) => r.join(",")).join("\n")], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "grantly-applications.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }
  const list = scholarships
    .filter(
      (s) =>
        (page !== "Saved scholarships" || saved.includes(s.id)) &&
        (filter === "All scholarships" || s.category === filter) &&
        `${s.name} ${s.org} ${s.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase()) &&
        (!eligible ||
          (!evaluate(s, profile).fail && !evaluate(s, profile).unknown)),
    )
    .sort((a, b) =>
      sort === "Highest amount"
        ? b.amount - a.amount
        : sort === "Closing soon"
          ? a.date.localeCompare(b.date)
          : evaluate(b, profile).pass / evaluate(b, profile).total -
            evaluate(a, profile).pass / evaluate(a, profile).total,
    );
  const ready = docs.filter((d) => checked[d]).length;
  return (
    <div className="app">
      <Navigation
        page={page}
        setPage={setPage}
        saved={saved}
        applications={applications}
        profile={profile}
        setModal={setModal}
      />
      <div className="main-shell">
        <Topbar page={page} profile={profile} setModal={setModal} />
        <main>
          <PageHeading page={page} profile={profile} setModal={setModal} />
          <JourneyBoard
            page={page}
            profile={profile}
            saved={saved}
            applications={applications}
            ready={ready}
            setModal={setModal}
            setPage={setPage}
          />
          <DiscoverPage
            page={page}
            list={list}
            sort={sort}
            setSort={setSort}
            query={query}
            setQuery={setQuery}
            eligible={eligible}
            setEligible={setEligible}
            profile={profile}
            setModal={setModal}
            notify={notify}
            filter={filter}
            setFilter={setFilter}
            saved={saved}
            toggle={toggle}
            setPage={setPage}
          />
          <OverviewPage
            page={page}
            saved={saved}
            ready={ready}
            setModal={setModal}
            setPage={setPage}
          />
          <ApplicationsPage
            page={page}
            applications={applications}
            exportPlan={exportPlan}
            setPage={setPage}
            updateApp={updateApp}
            checked={checked}
            setChecked={setChecked}
            setModal={setModal}
          />
          <DocumentsPage
            page={page}
            ready={ready}
            checked={checked}
            setChecked={setChecked}
          />
          <Footer />
        </main>
      </div>
      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 size={18} />
          {toast}
        </div>
      )}
      <WorkspaceDialog
        modal={modal}
        setModal={setModal}
        profile={profile}
        setProfile={setProfile}
        notify={notify}
        applications={applications}
        setApplications={setApplications}
        saved={saved}
        toggle={toggle}
        apply={apply}
        ready={ready}
      />
    </div>
  );
}
