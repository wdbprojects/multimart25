import { LayoutProps } from "@/config/types";
import NavbarMain from "@/modules/components/shared/navbar-main";

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen w-full">
      <NavbarMain />
      <div className="block !h-screen pt-[4rem]">
        <main className="container mx-auto flex overflow-y-auto px-2 md:px-4">
          {children}
        </main>
      </div>
    </div>
  );
};
export default HomeLayout;
