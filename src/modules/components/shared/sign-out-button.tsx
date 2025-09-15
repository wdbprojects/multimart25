"use client";

import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const SignOutButton = ({
  size = "sm",
  className,
}: {
  size?: "sm" | "default" | "lg" | "icon" | null | undefined;
  className?: string;
}) => {
  const [signOutPending, signOutStartTransition] = useTransition();
  const router = useRouter();

  const handleSignOut = () => {
    signOutStartTransition(async () => {
      await signOut({
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            router.push(routes.login);
            router.refresh();
            toast.warning("You signed out successfully");
          },
        },
      });
    });
  };

  return (
    <Button
      size={size}
      variant="outline"
      disabled={signOutPending}
      className={cn(className)}
      onClick={handleSignOut}
    >
      {signOutPending ? (
        <div className="just-center flex items-center gap-2">
          <Loader2 className="size-3.5 animate-spin" />
          <span>Loading...</span>
        </div>
      ) : (
        <div className="just-center flex items-center gap-2">
          <LogOut className="size-3.5" />
          <span>Log out</span>
        </div>
      )}
    </Button>
  );
};
export default SignOutButton;
