import LoginForm from "@/modules/components/auth/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";

const LoginPage = () => {
  return (
    <Card className="gap-2">
      <CardHeader className="">
        <CardTitle className="text-foreground text-center text-xl font-semibold">
          Login to your account
        </CardTitle>
        <CardDescription className="mt-0 text-center">
          You have different options for logging in
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2 text-xs">
            Log in with email and password
          </span>
        </div>
        {/* //INFO: SIGN IN WITH EMAIL & PASSWORD */}
        <LoginForm />
        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button variant="link" className="px-1 text-sm font-semibold" asChild>
            <Link href={routes.register}>Register</Link>
          </Button>
        </p>
        {/* //INFO: SIGN IN WITH GOOGLE */}
      </CardContent>
    </Card>
  );
};
export default LoginPage;
