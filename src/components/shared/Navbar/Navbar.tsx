import { useAuth } from "@/providers/AuthProvider";
import { Link } from "react-router";

import useLogOut from "@/hooks/auth/useLogOut";

import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user } = useAuth();
  const { logOut } = useLogOut();

  return (
    <header className="bg-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="bg-gradient-to-r from-primary/80 via-primary to-primary/60 bg-clip-text text-2xl font-semibold text-transparent"
        >
          PrepMaster
        </Link>

        {/* Desktop View: Navigation Links */}
        <div className="hidden space-x-6 lg:flex">
          {!user ? (
            <>
              <Link to="/login">
                <Button variant="default">Login</Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </>
          ) : (
            <Button
              variant="destructive"
              onClick={logOut}
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden">
          {!user ? (
            <Link to="/login">
              <Button className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                Login
              </Button>
            </Link>
          ) : (
            <Button
              className="rounded-full bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              onClick={logOut}
            >
              Logout
            </Button>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            className="text-white focus:outline-none"
            aria-label="Open navigation menu"
          >
            <span className="">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
