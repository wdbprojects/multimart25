import { LayoutProps } from "@/config/types";
import AuthLayout from "@/modules/layouts/auth-layout";

const AuthLayoutMain = ({ children }: LayoutProps) => {
  return <AuthLayout>{children}</AuthLayout>;
};
export default AuthLayoutMain;
