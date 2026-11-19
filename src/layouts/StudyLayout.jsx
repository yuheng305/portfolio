import { Outlet } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import PageContent from "../components/layout/PageContent";

// Study-process pages: tab bar on top, page content below.
export default function StudyLayout() {
  return (
    <>
      <TopBar />
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
}
