import z from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.email({ message: "A valid email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "A valid email is required" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(8, { message: "Password should be at least 8 characters" }),
});
