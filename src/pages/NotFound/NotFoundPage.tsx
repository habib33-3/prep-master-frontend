import { useNavigate } from "react-router";

import { Button } from "@/ui/button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="mt-4 text-2xl text-gray-800">
        Oops! The page you are looking for doesn&apos;t exist.
      </p>
      <div className="mt-6 space-x-4">
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="rounded-lg bg-blue-500 px-8 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
        >
          Go to Home
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="rounded-lg border-2 border-gray-500 px-8 py-4 text-gray-800 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:shadow-md"
        >
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
