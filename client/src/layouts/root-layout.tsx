import { Footer } from "@/layouts/footer";
import { Header } from "@/layouts/header";
import { Outlet } from "react-router";

export const RootLayout = () => {
  return (
    <div className="root-layout min-h-screen flex flex-col bg-gray-10">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
