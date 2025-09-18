import NavbarDashboard from "@/modules/components/shared/navbar-dashboard";
import DashboardSidebar from "../../sidebar/dashboard-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "@/config/routes";

const ProductsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect(routes.login);

  if (session.user.role === "ADMIN") {
    return (
      <div className="h-full w-full px-2 py-1">
        <NavbarDashboard />
        <div className="flex overflow-y-auto">
          <DashboardSidebar />
          <div className="flex w-full flex-col justify-between pt-[4rem] pb-[0rem]">
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-purple-700">
                Products Dashboard
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    redirect(routes.home);
  }
};
export default ProductsPage;
