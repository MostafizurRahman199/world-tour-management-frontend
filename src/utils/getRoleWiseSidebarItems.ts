// src/utils/getRoleWiseSidebarItems.ts
import { ROLE } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getRoleWiseSidebarItems = (role: TRole) => {
  if (role === ROLE.SUPER_ADMIN) {
    return [...adminSidebarItems];
  } else if (role === ROLE.USER) {
    return userSidebarItems;
  } else if (role === ROLE.ADMIN) {
    return adminSidebarItems;
  } else {
    return [];
  }
};
