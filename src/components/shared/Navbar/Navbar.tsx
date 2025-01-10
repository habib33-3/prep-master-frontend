import { Link } from "react-router";

// React Router
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="bg-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="bg-gradient-to-r from-primary/80 via-primary to-primary/60 bg-clip-text text-2xl font-semibold text-transparent">
          PrepMaster
        </h1>

        {/* Mobile View: Button */}
        <div className="lg:hidden">
          <Button className="rounded-full bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
            <Link to="/login">Login</Link>
          </Button>
        </div>

        {/* Desktop View: Navigation Links */}
        <div className="hidden space-x-6 lg:flex">
          <Button variant={"default"}>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant={"secondary"}>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button className="text-white focus:outline-none">
            <span className="">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
