"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { LayoutProps } from "@/config/types";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

const Providers = ({ children }: LayoutProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} color="#6d28d9" />
      {children}
      <Toaster richColors closeButton position="bottom-right" expand={true} />
    </ThemeProvider>
  );
};
export default Providers;
