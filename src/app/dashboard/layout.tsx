import { LayoutProps } from "@/config/types";
import DashboardLayout from "@/modules/layouts/dashboard-layout";

const DashboardLayoutMain = ({ children }: LayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};
export default DashboardLayoutMain;
