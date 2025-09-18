"use client";

import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { routes } from "@/config/routes";
import { Button } from "@/components/ui/button";

const GetStartedButton = () => {
  const { data: session, isPending } = useSession();

  const href = session ? routes.products : routes.register;

  return (
    <Button
      asChild
      variant="secondary"
      size="lg"
      disabled={isPending}
      className="flex-1"
    >
      <Link href={href}>Get Started</Link>
    </Button>
  );
};
export default GetStartedButton;
