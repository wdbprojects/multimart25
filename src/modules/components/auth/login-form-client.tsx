"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { loginSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeySquare, ListRestart, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";

const LoginForm = () => {
  const [isLoggingPending, startLoginTransition] = useTransition();
  const router = useRouter();
  const blurActive = () => {
    return (document.activeElement as HTMLElement | null)?.blur();
  };

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startLoginTransition(async () => {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onRequest: () => {},
          onResponse: () => {},
          onSuccess: () => {
            blurActive();
            toast.success(`User logged in successfully`);
            router.push(routes.home);
            reset();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    });
  };

  return (
    <div className="grid gap-2">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem className="gap-2">
                  <FormLabel
                    className={cn("data-[error=true]:text-foreground")}
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter a valid email"
                      autoComplete="off"
                      className="text-xs"
                      {...field}
                      disabled={isLoggingPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs italic" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="gap-1">
                  <FormLabel
                    className={cn("data-[error=true]:text-foreground")}
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="text-xs"
                      {...field}
                      disabled={isLoggingPending}
                    />
                  </FormControl>
                  <FormMessage className="text-xs italic" />
                </FormItem>
              );
            }}
          />
          <div className="mt-8 flex flex-row items-center justify-between gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="flex w-full flex-1 items-center justify-center"
              type="button"
              disabled={isLoggingPending}
              onClick={() => {
                reset();
              }}
            >
              <ListRestart className="size-3.5" />
              <span>Reset</span>
            </Button>
            <Button
              size="sm"
              variant="default"
              className="w-full flex-1"
              type="submit"
              disabled={isLoggingPending}
            >
              {isLoggingPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <KeySquare className="size-3.5" />
                  <span>Log in</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default LoginForm;
