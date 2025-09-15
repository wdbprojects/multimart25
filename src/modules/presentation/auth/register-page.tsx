import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { routes } from "@/config/routes";
import RegisterForm from "@/modules/components/auth/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <Card className="gap-2">
      <CardHeader className="">
        <CardTitle className="text-foreground text-center text-xl font-semibold">
          Create your new user
        </CardTitle>
        <CardDescription className="mt-0 text-center">
          Register with your credentials
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-card text-muted-foreground relative z-10 px-2 text-xs">
            Use a valid email and password
          </span>
        </div>
        {/* //INFO: SIGN IN WITH EMAIL & PASSWORD */}
        <RegisterForm />
        <p className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <Button variant="link" className="px-1 text-sm font-semibold" asChild>
            <Link href={routes.login}>Login</Link>
          </Button>
        </p>
        {/* //INFO: SIGN IN WITH GOOGLE */}
      </CardContent>
    </Card>
  );
};
export default RegisterPage;
