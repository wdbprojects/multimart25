import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { nextCookies } from "better-auth/next-js";
// import { createAuthMiddleware } from "better-auth/api";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: ["USER", "ADMIN", "SELLER"],
        input: false,
      },
    },
  },
  session: {
    expiresIn: 604800, // 30 days
    updateAge: 86400, // 1 day
  },
  plugins: [nextCookies()],
  /* // INFO: NOT WORKING YET */
  /* hooks: {
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path.startsWith("/sign-in") || ctx.path.startsWith("/login")) {
        const newSession = ctx.context.newSession;
        if (newSession) {

          return { ...ctx, body: { ...ctx, name: newSession.user.name } };
        }
      }
    }),
  }, */
});

export type ErrorCode = keyof typeof auth.$ERROR_CODES | "UNKNOWN";
