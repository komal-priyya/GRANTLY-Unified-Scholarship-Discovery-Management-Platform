# Grantly

### Your ambition. A plan to fund it.

A scholarship discovery and application-planning workspace built with **React and Vite** for **The Outpost frontend challenge**.

Grantly connects four actions: **Discover, Check your fit, Prepare, and Track.** Students can understand scholarship criteria, build a shortlist, and keep their next steps together.

> **Prototype notice:** All six scholarship listings are illustrative. Names, providers, amounts, and deadlines are sample data. Grantly does not submit applications or offer real funding.

## The problem

Finding a scholarship is only the beginning. Students also need to understand eligibility rules, remember deadlines, collect documents, and manage several applications. Those tasks often end up scattered across tabs, bookmarks, and notes.

Grantly brings them into one workspace with transparent criteria checks and a clear next action.

## What makes Grantly useful

### A next step that changes with your progress

The **Your next move** panel responds to the student's progress:

- Missing income or marks? Build the student profile.
- No saved scholarships? Explore opportunities.
- A shortlist without an application? Turn a bookmark into a plan.
- Documents still missing? Prepare the checklist.
- Documents ready? Review the application tracker.

### Eligibility you can understand

Each scholarship explains its supported criteria separately: study level, family income, academic percentage, and any applicable state or gender requirement. Checks distinguish **Meets criteria**, **Doesn't meet**, and **Add details**.

Missing information is not treated as a successful match. Checks describe the sample criteria; they do not predict an award or guarantee selection.

## Features

| Area              | What you can do                                                     |
| ----------------- | ------------------------------------------------------------------- |
| Discovery         | Search scholarship names, providers, and tags; filter by category   |
| Sorting           | Order by recommendation, closing date, or highest amount            |
| Student profile   | Enter study level, marks, income, state, and optional gender        |
| Eligibility       | Review individual criteria and filter to confirmed matches          |
| Shortlist         | Bookmark opportunities and revisit Saved scholarships               |
| Applications      | Track Preparing, Submitted, Awarded, or Not selected                |
| Documents         | Maintain a shared readiness checklist across plans                  |
| Notes             | Record next steps for each application                              |
| Export            | Download application names, amounts, deadlines, and statuses as CSV |
| Persistence       | Keep progress across refreshes using localStorage                   |
| Responsive layout | Use the workspace on desktop and smaller screens                    |

## Tech stack

- **React 19:** components, state, and interactive views.
- **Vite 6:** development server and production builds.
- **CSS:** responsive layouts and a navy/coral visual theme.
- **Lucide React:** interface icons.
- **localStorage:** browser-based persistence.
- **Prettier:** consistent source formatting.

No API keys, environment variables, backend, or database are required.

## Run locally

Use **Node.js 22.12+** and npm.

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite. The default port is usually `5173`; if occupied, Vite can choose another port.

To choose a specific port:

```sh
npm run dev -- --port 5180
```

### Production build

```sh
npm run build
npm run preview
```

The build writes static files to `dist/`. The preview command serves that build locally.

### Code formatting

```sh
npm run format
npm run format:check
```

## Project structure

| Path                                 | Purpose                                                       |
| ------------------------------------ | ------------------------------------------------------------- |
| `src/main.jsx`                       | Mounts React and imports styles                               |
| `src/App.jsx`                        | Shared state, active view, filtering, and application actions |
| `src/components/Navigation.jsx`      | Main navigation and profile entry                             |
| `src/components/Topbar.jsx`          | Current page, demo label, and help entry                      |
| `src/components/PageHeading.jsx`     | Page title and description                                    |
| `src/components/JourneyBoard.jsx`    | Dynamic next action, journey steps, and counts                |
| `src/components/WorkspaceDialog.jsx` | Profile form, scholarship details, help, and confirmations    |
| `src/components/Footer.jsx`          | Shared footer                                                 |
| `src/pages/DiscoverPage.jsx`         | Discovery and saved-scholarship views                         |
| `src/pages/OverviewPage.jsx`         | Overview and preparation summary                              |
| `src/pages/ApplicationsPage.jsx`     | Application plans, status, notes, and export                  |
| `src/pages/DocumentsPage.jsx`        | Document readiness checklist                                  |
| `src/data/scholarships.js`           | Sample opportunities and document names                       |
| `src/hooks/useSaved.js`              | Reads and saves browser state                                 |
| `src/utils/eligibility.js`           | Compares profiles with scholarship criteria                   |
| `src/utils/format.js`                | Formats Indian rupee amounts                                  |
| `src/styles/base.css`                | Shared controls, forms, cards, dialogs, and responsive rules  |
| `src/styles/journey.css`             | Field-guide layout and navy/coral theme                       |

## How the app works

1. `App.jsx` loads saved browser data through `useSaved`.
2. The profile and scholarship records go to `evaluate()` for eligibility checks.
3. Search, category, eligibility filters, and sorting determine visible opportunities.
4. Starting an application creates a local record with a scholarship ID, status, and notes.
5. Document readiness is shared across plans. Notes and statuses belong to individual plans.
6. State changes update the interface and are saved by the storage hook.

Navigation changes the active React view; the app does not use separate URL routes.

### Browser storage

| Key                    | Data                                   |
| ---------------------- | -------------------------------------- |
| `grantly-profile`      | Student profile                        |
| `grantly-saved`        | Bookmarked scholarship IDs             |
| `grantly-applications` | Application plans, statuses, and notes |
| `grantly-documents`    | Document checklist values              |

Storage belongs to the current browser origin. Changing the hostname or port creates a separate storage context. For example, `localhost:5173` and `127.0.0.1:5180` do not share progress. Clearing site data removes saved records.

## Demo walkthrough

Use sample information when demonstrating the app.

1. Open **My student profile**. Choose Undergraduate, enter income `250000`, and marks `82`.
2. Open **Future Forward Scholarship** to show individual eligibility checks.
3. Bookmark it, then open **Saved scholarships**.
4. Select **Start application** to create a tracking entry.
5. Check two documents, add a note, and change the status to Submitted.
6. Refresh the same URL to demonstrate persistence.
7. Export the application list as CSV.
8. Lower the academic percentage below the scholarship requirement to show a failed criterion.

Submitted is a manual tracking label. It does not send anything to a provider.

## Deployment

Deploy as a static Vite site using a host such as Vercel or Netlify.

| Setting               | Value           |
| --------------------- | --------------- |
| Framework             | Vite            |
| Install command       | `npm install`   |
| Build command         | `npm run build` |
| Output directory      | `dist`          |
| Environment variables | None            |

Keep `package-lock.json` in source control. `node_modules` and the generated `dist` directory are excluded by `.gitignore`.

## Current scope

- Scholarships are static examples, not a live funding feed.
- Eligibility uses explicit rules, not AI.
- No authentication, cloud synchronization, or multi-user accounts are implemented.
- Documents are tracked with checkboxes; files are not uploaded.
- Applications are personal plans, not provider submissions.
- Reminder content is illustrative; no email or push delivery is scheduled.
- Browser data is not encrypted account storage. Use sample details for demonstrations.

## Possible next steps

Verified scholarship data, official application links, backend authentication, cross-device storage, and configurable deadline reminders could extend the prototype into a service for real opportunities.
