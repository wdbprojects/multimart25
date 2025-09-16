"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/schemas/auth-schemas";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { ListRestart, Loader2, UserRoundPlus } from "lucide-react";
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
import { registerAction } from "@/actions/register-action";
import { toast } from "sonner";
import { routes } from "@/config/routes";

const RegisterForm = () => {
  const [formState, formAction, isPending] = useActionState(registerAction, {
    success: false,
    message: undefined,
    errors: { errors: [], properties: {} },
  });

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
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

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    /* //INFO: Calling the Server Action */
    startTransition(() => {
      formAction(formData);
    });
    blurActive();
  });

  useEffect(() => {
    if (
      formState?.success === true &&
      formState?.message !== undefined &&
      formRef.current
    ) {
      toast.success(formState?.message);
      reset();
      router.push(routes.login);
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
        <form onSubmit={onSubmit} ref={formRef} className="space-y-4">
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
                      disabled={isPending}
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
                      disabled={isPending}
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
                      disabled={isPending}
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
