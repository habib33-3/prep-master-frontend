import { createBrowserRouter } from "react-router";

import ErrorPage from "@/shared/Error/ErrorPage";

import Home from "@/pages/HomePage/HomePage";
import NotFoundPage from "@/pages/NotFound/NotFoundPage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import UpdateExercise from "@/pages/UpdateExercise/UpdateExercise";

import RootLayout from "@/layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "exercise/:id",
        element: <UpdateExercise />,
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
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
