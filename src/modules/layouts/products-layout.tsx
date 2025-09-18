import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProps } from "@/config/types";

const ProductsLayout = ({ children }: LayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};
export default ProductsLayout;
