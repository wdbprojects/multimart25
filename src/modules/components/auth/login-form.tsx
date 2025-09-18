"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
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
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { loginAction } from "@/actions/login-action";

const LoginForm = () => {
  const [formState, formAction, isPending] = useActionState(loginAction, {
    success: false,
    message: undefined,
    errors: { errors: [], properties: {} },
  });
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
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

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    /* //INFO: Calling the Server Action */
    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (
      formState?.success === true &&
      formState?.message !== undefined &&
      formRef.current
    ) {
      toast.success(formState?.message);
      reset();
      blurActive();
      router.push(routes.home);
    }

    if (
      formState?.success === false &&
      formState?.message !== undefined &&
      formRef.current
    ) {
      toast.error(formState?.message);
      const properties = formState?.errors?.properties;
      if (properties) {
        for (const [key, value] of Object.entries(properties)) {
          const messages = Array.isArray(value?.errors)
            ? value.errors.join(". ")
            : String(value);
          toast.error(`Field "${key}": ${messages}`);
        }
      }
    }

    if (
      formState?.success === false &&
      formState?.errors?.errors !== undefined &&
      formState?.errors?.errors.length > 0
    ) {
      toast.error(`SERVER: ${formState?.errors?.errors[0]}`);
    }
  }, [formState, reset, router]);

  return (
    <div className="grid gap-2">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4" ref={formRef}>
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
                      disabled={isPending}
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
                      disabled={isPending}
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
              disabled={isPending}
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
              disabled={isPending}
            >
              {isPending ? (
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
