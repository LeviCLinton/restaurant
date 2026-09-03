import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Topbar } from "@/components/dashboard/Topbar";
import { MobileTabBar } from "@/components/dashboard/MobileTabBar";

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-paper-100/40">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 px-4 py-5 pb-24 sm:px-6 sm:py-6 md:pb-6">
          <Outlet />
        </main>
      </div>
      <MobileTabBar />
    </div>
  );
}
