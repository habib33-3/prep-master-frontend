import { Outlet } from "react-router";

import Navbar from "@/components/shared/Navbar/Navbar";

const RootLayout = () => (
  <div>
    <Navbar />
    <Outlet />
  </div>
);

export default RootLayout;
