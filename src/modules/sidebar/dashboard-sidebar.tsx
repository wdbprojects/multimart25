"use client";

import { Sidebar } from "@/components/ui/sidebar";

const DashboardSidebar = () => {
  return (
    <Sidebar
      className="z-40 rounded border-none pt-18"
      variant="floating"
      collapsible="offcanvas"
    >
      <div className="p-4">
        <h2>Welcome Love and Abundance</h2>
      </div>
    </Sidebar>
  );
};

export default DashboardSidebar;
