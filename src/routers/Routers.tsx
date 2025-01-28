import { createBrowserRouter } from "react-router";

import Home from "@/pages/HomePage/HomePage";
import SignInPage from "@/pages/SignInPage/SignInPage";
import SignUpPage from "@/pages/SignUpPage/SignUpPage";
import UpdateExercise from "@/pages/UpdateExercise/UpdateExercise";

import RootLayout from "@/layout/RootLayout";
import { getSingleExercise } from "@/services/api/exercise";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
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
]);

export default router;
