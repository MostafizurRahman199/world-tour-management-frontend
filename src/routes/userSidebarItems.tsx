// src/routes/adminSidebarItems.tsx

import Bookings from "@/pages/User/Bookings";


export const userSidebarItems = [
  {
    title: "History",
    url: "#",
    items: [
      {
        title: "My Bookings",
        url: "/user/bookings",
        component: Bookings, // Directly passing the component
      },
    ],
  },
];
