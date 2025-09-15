import NavbarDashboard from "@/modules/components/shared/navbar-dashboard";
import DashboardSidebar from "../../sidebar/dashboard-sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // if (!session) redirect(routes.login);

  return (
    <div className="h-full w-full px-2 py-1">
      <NavbarDashboard />
      <div className="flex overflow-y-auto">
        <DashboardSidebar />
        <div className="flex w-full flex-col justify-between pt-[4rem] pb-[0rem]">
          <div className="flex-1">
            <h2 className="font-primary text-2xl font-semibold">
              Dashboard content goes here
            </h2>
            <div className="mt-8 block">
              <Card className="max-w-2xl">
                <CardHeader>
                  <CardTitle className="text-xl">Session Info</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="block w-full">
                    {session ? (
                      <pre className="text-wrap">
                        {JSON.stringify(session, null, 2)}
                      </pre>
                    ) : (
                      <h2 className="text-destructive text-xl font-medium">
                        Unauthorized
                      </h2>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
