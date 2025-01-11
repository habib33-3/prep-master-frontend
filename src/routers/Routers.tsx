import RootLayout from "@/layout/RootLayout";
import { createBrowserRouter } from "react-router";

import Home from "@/pages/HomePage/HomePage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

export default router;
