import Link from "next/link";
import { routes } from "@/config/routes";
import { headerNavItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import DarkMode from "@/components/shared/dark-mode";
import SearchInput from "../inventory/search-input";
import { Badge } from "@/components/ui/badge";
import SignOutButton from "./sign-out-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { KeySquare } from "lucide-react";

const NavbarMain = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="bg-background fixed top-0 right-0 flex h-16 w-full items-center justify-between border-b px-2 py-2">
      <div className="container mx-auto flex w-full items-center justify-between gap-1 sm:gap-2">
        {/* //INFO: MENU & LOGO  & NAV LINKS*/}
        <div className="flex flex-row items-center gap-8">
          <div className="flex flex-shrink-0 items-center gap-2 p-1">
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

        {/* //INFO: SEARCH BAR  */}
        <div className="mx-auto hidden max-w-[720px] flex-1 justify-center p-1 md:flex">
          <SearchInput
            className="mx-auto w-full max-w-[600px] rounded-full pr-12 pl-8 shadow-none"
            placeholder="Search for products"
          />
        </div>

        {/* //INFO: BUTTONS & AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />
          <Badge variant="secondary">ADMIN</Badge>
          {session ? (
            <SignOutButton size="sm" className="w-28" />
          ) : (
            <Button asChild variant="default" size="sm">
              <Link href={routes.login} className="flex-center">
                <KeySquare className="size-3.5" />
                <nav>Login</nav>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
export default NavbarMain;
