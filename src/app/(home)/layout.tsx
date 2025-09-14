import { LayoutProps } from "@/config/types";
import HomeLayout from "@/modules/layouts/home-layout";

const HomeLayoutMain = ({ children }: LayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};
export default HomeLayoutMain;
