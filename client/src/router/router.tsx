import { CreatePost } from "@/pages/create-post";
import { RootLayout } from "@/layouts/root-layout";
import { Dashboard } from "@/pages/dashbord";
import { UserLoginForm } from "@/pages/login-form";
import { UsersignupForm } from "@/pages/signup-form";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/login", element: <UserLoginForm /> },
      { path: "/register", element: <UsersignupForm /> },
      { path: "/create", element: <CreatePost /> },
    ],
  },
]);
