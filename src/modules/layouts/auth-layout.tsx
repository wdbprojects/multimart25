import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { LayoutProps } from "@/config/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const AuthLayout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="absolute top-0 left-[50%] container mx-auto flex w-full -translate-x-1/2 items-center justify-between px-4 py-4">
          <div className="w-full flex-1">
            <Button variant="outline" size="sm" asChild>
              <Link
                href={routes.home}
                className="flex items-center justify-center gap-1"
              >
                <ArrowLeft className="size-3.5" />
                <span>Home</span>
              </Link>
            </Button>
          </div>
          <div className="flex w-full flex-1 justify-center">
            <Link href={routes.home} className="flex items-center">
              <h6 className="text-primary mb-0 text-2xl font-semibold tracking-tight">
                Multi
              </h6>
              <h6 className="text-foreground mb-0 text-2xl font-semibold tracking-tight">
                Mart
              </h6>
            </Link>
          </div>
          <div className="flex w-full flex-1 justify-end">
            <DarkMode />
          </div>
        </div>
        {children}
        <div className="text-muted-foreground text-center text-xs text-balance">
          By clicking continue, you agree to our{" "}
          <span className="hover:text-primary cursor-pointer underline-offset-4 transition-all hover:underline">
            <Link href="#">Terms of service</Link>
          </span>{" "}
          and{" "}
          <span className="hover:text-primary cursor-pointer underline-offset-4 transition-all hover:underline">
            <Link href="#">Privacy Policy</Link>
          </span>
          .
        </div>
      </div>
    </div>
  );
};
export default AuthLayout;
