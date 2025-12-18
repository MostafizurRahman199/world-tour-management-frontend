import type { TRole } from "@/types";

export const ROLE: { [key in TRole]: TRole } = {
  SUPER_ADMIN: "SUPER_ADMIN",
  USER: "USER",
  ADMIN: "ADMIN",
  GUIDE: "GUIDE",
};
