import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-purple-700">
        Welcome love and money!!
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui architecto
        omnis magni. Necessitatibus provident ex corrupti est voluptatem? Enim
        commodi mollitia esse explicabo quia id rem animi, tempora dignissimos
        quis eaque hic eius odio labore perspiciatis itaque laborum nihil
        tenetur.
      </p>
      <Button size="lg" asChild>
        <Link href={routes.dashboard}>Go to Dashboard</Link>
      </Button>
    </div>
  );
};
export default HomePage;
