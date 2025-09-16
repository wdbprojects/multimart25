"use server";

import { RegisterPrevState } from "@/config/types";
import { auth, ErrorCode } from "@/lib/auth";
import { registerSchema } from "@/schemas/auth-schemas";
import { APIError } from "better-auth/api";
import z from "zod";

export const registerAction = async (
  prevState: RegisterPrevState,
  formData: FormData,
): Promise<{
  success: boolean;
  message?: string;
  data?: z.infer<typeof registerSchema>;
  errors?: {
    errors: string[];
    properties?: Record<string, { errors: string[] }>;
  };
}> => {
  const name = String(formData.get("name") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  try {
    const validatedFields = registerSchema.safeParse({
      name: name,
      email: email,
      password: password,
    });
    if (!validatedFields.success) {
      return {
        success: false,
        message: "SERVER (try): Validation errors found",
        errors: z.treeifyError(validatedFields.error),
      };
    }

    /* //INFO: Calling the Better Auth method */
    await auth.api.signUpEmail({
      body: {
        name: validatedFields.data.name,
        email: validatedFields.data.email,
        password: validatedFields.data.password,
      },
    });

    return {
      success: true,
      message: `SERVER: User ${name} created successfully`,
    };
  } catch (err) {
    if (err instanceof APIError) {
      const errCode = err.body ? (err.body.code as ErrorCode) : "UNKNOWN";
      switch (errCode) {
        case "USER_ALREADY_EXISTS":
          return {
            success: false,
            errors: { errors: ["Custom error: User already exists!!"] },
          };
        default:
          return {
            success: false,
            errors: { errors: [err.message] },
          };
      }
    }
    return { success: false, errors: { errors: ["Internal server error"] } };
  }
};
