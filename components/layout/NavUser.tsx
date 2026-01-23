"use client";

import { useLogout } from "@/app/queries/useLogOut";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { clearAuth } from "@/lib/redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { formatUserName } from "@/utils/formatUserName";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";

function NavUser() {
  const { isMobile, open } = useSidebar();

  const user = useAppSelector(selectAuthUser);
  const logOutQuery = useLogout();
  const dispatch = useAppDispatch();

  const initials = user?.email?.slice(0, 2)?.toUpperCase() ?? "NA";

  const logoutBtn = () => {
    logOutQuery.mutate(undefined, {
      onSuccess: () => {
        dispatch(clearAuth());
      },
      onError: () => {
        // optional: still clear locally if you want immediate UI update
        dispatch(clearAuth());
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar
                className={`${!open ? "h-8 w-8" : "h-10 w-10"} rounded-3xl`}
              >
                {/* <AvatarImage src={user?.avatar} alt={user?.name} /> */}
                <AvatarFallback
                  className={`rounded-3xl ${
                    !open ? "text-[14px]" : "text-[16px]"
                  }  bg-primary text-white`}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${formatUserName(
                  user?.name,
                )}`}</span>
                <span className="truncate text-xs">{user?.roleName}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-10 w-10 rounded-3xl">
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  <AvatarFallback className="rounded-3xl text-[16px] bg-primary text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{`${formatUserName(
                    user?.name,
                  )}`}</span>
                  <span className="truncate text-xs">{user?.roleName}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck />
                Account
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem onClick={logoutBtn}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
export default NavUser;
