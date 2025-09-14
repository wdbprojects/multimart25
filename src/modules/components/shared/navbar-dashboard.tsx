import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { routes } from "@/config/routes";
import { headerNavItems } from "@/lib/data";
import Link from "next/link";

const NavbarDashboard = () => {
  return (
    <header className="bg-background fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b px-2 py-2">
      <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
        {/* //INFO: MENU & LOGO  & NAV LINKS*/}
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-shrink-0 items-center gap-2 p-1">
            <SidebarTrigger />
            <Link
              href={routes.home}
              className="flex cursor-pointer flex-row items-center gap-0"
            >
              <h6 className="text-primary text-xl font-bold tracking-tight">
                Multi
              </h6>
              <h6 className="text-foreground text-xl font-bold tracking-tight">
                Mart
              </h6>
            </Link>
          </div>
          <nav className="hidden flex-row items-center justify-center gap-1 md:flex md:flex-1">
            {headerNavItems.map((link) => {
              const { id, name, url } = link;
              return (
                <Button asChild variant="ghost" key={id} size="sm">
                  <Link href={url}>{name}</Link>
                </Button>
              );
            })}
          </nav>
        </div>

        {/* //INFO: BUTTONS & AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />
          <Button asChild variant="default" size="sm">
            <Link href={routes.login}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};
export default NavbarDashboard;
