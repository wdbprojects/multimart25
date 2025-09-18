"use server";

import { LoginPrevState } from "@/config/types";
import { auth } from "@/lib/auth";
import { loginSchema } from "@/schemas/auth-schemas";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import z from "zod";

export const loginAction = async (
  prevState: LoginPrevState,
  formData: FormData,
): Promise<{
  success: boolean;
  message?: string;
  data?: z.infer<typeof loginSchema>;
  errors?: {
    errors: string[];
    properties?: Record<string, { errors: string[] }>;
  };
}> => {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const validatedFields = loginSchema.safeParse({
      email: email,
      password: password,
    });
    if (!validatedFields.success) {
      return {
        success: false,
        message: "SERVER: Validation errors found",
        errors: z.treeifyError(validatedFields.error),
      };
    }

    /* //INFO: Calling the Better Auth method */
    await auth.api.signInEmail({
      headers: await headers(),
      body: {
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      },
    });

    return {
      success: true,
      message: `FROM SERVER: User ${email} logged in successfully`,
    };
  } catch (err) {
    if (err instanceof APIError) {
      return { success: false, errors: { errors: [err.message] } };
    }
    return {
      success: false,
      errors: { errors: ["SERVER -> catch: Internal server error"] },
    };
  }
};
