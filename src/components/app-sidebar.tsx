import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import MainIcon from "@/assets/icons/Navbar/MainIcon";
import { Link, useLocation } from "react-router-dom";
import { getRoleWiseSidebarItems } from "@/utils/getRoleWiseSidebarItems";
import { ROLE } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";

// Sample data

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {data: userInfo} = useUserInfoQuery(undefined);
  const currentRole = userInfo?.data?.data?.role ;
  // Use location hook to get current pathname
  const location = useLocation();

  const data = {
    navMain: getRoleWiseSidebarItems(currentRole),
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <MainIcon />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  // Dynamically determine if the current route matches the item's URL
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link to={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
