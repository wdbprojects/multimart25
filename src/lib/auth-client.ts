import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";
import { ac, roles } from "@/lib/permissions";

export const { signIn, signUp, signOut, useSession } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac: ac, roles: roles }),
  ],
});
