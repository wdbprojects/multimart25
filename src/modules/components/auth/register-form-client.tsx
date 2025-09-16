"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { registerSchema } from "@/schemas/auth-schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { signUp } from "@/lib/auth-client";
import { ListRestart, Loader2, UserRoundPlus } from "lucide-react";
import { routes } from "@/config/routes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RegisterForm = () => {
  const [isRegisterPending, startRegisterTransition] = useTransition();

  const router = useRouter();
  const blurActive = () => {
    return (document.activeElement as HTMLElement | null)?.blur();
  };

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { handleSubmit, control, reset } = form;

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    startRegisterTransition(async () => {
      await signUp.email(
        {
          name: values.name,
          email: values.email,
          password: values.password,
        },
        {
          onRequest: () => {},
          onResponse: () => {},
          onSuccess: () => {
            blurActive();
            router.push(routes.login);
            toast.success("Registered successfully, you can login now!");
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
            name="name"
            render={({ field }) => {
              return (
                <FormItem className="gap-1">
                  <FormLabel
                    className={cn("data-[error=true]:text-foreground")}
                  >
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      autoComplete="off"
                      className="text-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs italic" />
                </FormItem>
              );
            }}
          />
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
              disabled={isRegisterPending}
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
              disabled={isRegisterPending}
            >
              {isRegisterPending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <UserRoundPlus className="size-3.5" />
                  <span>Create user</span>
                </div>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
export default RegisterForm;
