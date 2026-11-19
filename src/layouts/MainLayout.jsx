import { Outlet } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import BottomBar from "../components/layout/BottomBar";
import ScrollManager from "../components/layout/ScrollManager";

// Persistent shell: stays mounted across route changes; only <Outlet /> swaps.
export default function MainLayout() {
  return (
    <div className="min-h-screen bg-page text-ink">
      <ScrollManager />
      <SideBar />
      <div className="flex min-h-screen flex-col transition-[margin] duration-200 md:ml-[var(--sidebar-w)]">
        <Outlet />
        <BottomBar />
      </div>
    </div>
  );
}
