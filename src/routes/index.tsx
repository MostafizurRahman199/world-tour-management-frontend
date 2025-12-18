// src/routes/index.tsx

import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/AboutPages/About";
import Login from "@/pages/Login/Login";
import Verify from "@/pages/OTP/Verify";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems"; // Import admin sidebar items
import { mapSidebarItemsToRoutes } from "@/utils/mapSidebarItemsToRoutes"; // Import utility function
import { userSidebarItems } from "./userSidebarItems";
import Analytics from "@/pages/Admin/Analytics";
import Bookings from "@/pages/User/Bookings";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized/Unauthorized";
import { ROLE } from "@/constants/role";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: Login,
    path: "login",
  },
  {
    Component: Register,
    path: "register",
  },
  {
    Component: Verify,
    path: "verify",
  },
  {
    Component: Unauthorized,
    path: "unauthorized",
  },
  {
    Component: withAuth(DashboardLayout, ROLE.SUPER_ADMIN),
    path: "/admin",
    children: [
      {
        index: true,
        Component: Analytics,
      },
      // Use the utility function to generate admin routes
      ...mapSidebarItemsToRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, ROLE.USER),
    path: "/user",
    children: [
      {
        index: true,
        Component: Bookings,
      },
      ...mapSidebarItemsToRoutes(userSidebarItems),
    ],
  },
]);
