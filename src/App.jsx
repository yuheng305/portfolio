import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import StudyLayout from "./layouts/StudyLayout";
import PageContent from "./components/layout/PageContent";
import About from "./pages/About";
import StudyProcess from "./pages/StudyProcess";
import Legal from "./pages/Legal";

import { PATHS, STUDY_PAGES } from "./routes";

// The map data is ~160 KB, so the Places page loads on demand.
const Places = lazy(() => import("./pages/Places"));
const ChannelStats = lazy(() => import("./pages/ChannelStats"));

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Navigate to={PATHS.about} replace />} />
          <Route
            path={PATHS.about}
            element={
              <PageContent>
                <About />
              </PageContent>
            }
          />
          <Route
            path={PATHS.places}
            element={
              <PageContent wide>
                <Suspense fallback={<p className="text-muted">Loading map…</p>}>
                  <Places />
                </Suspense>
              </PageContent>
            }
          />
          <Route
            path={PATHS.channel}
            element={
              <PageContent>
                <Suspense fallback={<p className="text-muted">Loading…</p>}>
                  <ChannelStats />
                </Suspense>
              </PageContent>
            }
          />
          {["privacy", "terms"].map((page) => (
            <Route
              key={page}
              path={`/${page}`}
              element={
                <PageContent>
                  <Legal page={page} />
                </PageContent>
              }
            />
          ))}
          <Route path={PATHS.study} element={<StudyLayout />}>
            <Route index element={<StudyProcess />} />
            {STUDY_PAGES.map((page) => (
              <Route key={page.slug} path={page.slug} element={page.element} />
            ))}
          </Route>
          <Route path="*" element={<Navigate to={PATHS.about} replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
