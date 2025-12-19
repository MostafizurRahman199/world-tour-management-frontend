// src/routes/adminSidebarItems.tsx
// import Analytics from "@/pages/Admin/Analytics";
// import AddTourType from "@/pages/Admin/AddTourType";
// import { AddTour } from "@/pages/Admin/AddTour";
import AddDivision from "@/pages/Admin/AddDivision";
import { lazy } from "react";
const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
const AddTourType = lazy(() => import("@/pages/Admin/AddTourType"));
const AddTour = lazy(() => import("@/pages/Admin/AddTour"));

export const adminSidebarItems = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics, // Directly passing the component
      },
    ],
  },
  {
    title: "Tour Management",
    url: "#",
    items: [
      {
        title: "Add Tour",
        url: "/admin/add-tour",
        component: AddTour, // Directly passing the component
      },
      {
        title:"Add Division",
        url:"/admin/add-division",
        component:AddDivision,
      },
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType, // Directly passing the component
      },
    ],
  },
];
