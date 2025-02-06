import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-red-100">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-red-600">
          Oops! Something went wrong.
        </h1>
        <p className="text-xl text-gray-700">
          We&apos;re sorry, but we encountered an error. Please try again later.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate("/")} // Navigate to the home page or any desired route
            className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
