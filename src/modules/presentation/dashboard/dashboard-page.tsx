import NavbarDashboard from "@/modules/components/shared/navbar-dashboard";
import DashboardSidebar from "../../sidebar/dashboard-sidebar";

const DashboardPage = () => {
  return (
    <div className="h-full w-full">
      <NavbarDashboard />
      <div className="flex overflow-y-auto">
        <DashboardSidebar />
        <div className="flex w-full flex-col justify-between pt-[4rem] pb-[0rem]">
          <div className="flex-1">
            <h2 className="font-primary text-2xl font-semibold">
              Dashboard content goes here
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
