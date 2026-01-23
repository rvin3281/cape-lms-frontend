"use client";
import { useLogout } from "@/app/queries/useLogOut";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { clearAuth } from "@/lib/redux/feature/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Navbar() {
  const logOutQuery = useLogout();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);

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

  const initials = user?.email?.slice(0, 2)?.toUpperCase() ?? "NA";

  return (
    <nav className="py-4 px-6 flex items-center justify-end">
      {/* <SidebarTrigger /> */}

      <div className="flex items-center gap-4">
        {/* PROFILE */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="h-[1.2rem] w-[1.2rem] mr-2" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logoutBtn} variant="destructive">
              <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}

export default Navbar;
