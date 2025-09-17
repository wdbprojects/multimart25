import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import GetStartedButton from "@/modules/components/shared/get-started-button";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="w-full">
      <section className="relative w-full py-20">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <Badge variant="outline">The Future Of Shopping Online</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            Elevate your shopping experience
          </h1>
          <p className="text-muted-foreground max-w-[700px] md:text-xl">
            Discover a new way to shop: curated collections and effortless style
            await. Your perfect fit is just a click away.
          </p>
          <div className="mt-8 flex w-full max-w-[450px] flex-col justify-between gap-4 sm:flex-row">
            <Link
              href={routes.dashboard}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "flex-1",
              )}
            >
              Dashboard
            </Link>
            <GetStartedButton />
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
