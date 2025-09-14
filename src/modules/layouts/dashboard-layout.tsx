import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProps } from "@/config/types";

const DashboardLayout = ({ children }: LayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
export default DashboardLayout;
