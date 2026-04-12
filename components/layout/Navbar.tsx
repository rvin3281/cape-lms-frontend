"use client";
import { selectAuthUser } from "@/lib/redux/feature/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
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
import { useAppLogout } from "@/hooks/useAppLogout";
import AppProcessingOverlay from "../loading/AppProcessingOverlay";

function Navbar() {
  const { logout, isLoggingOut } = useAppLogout();
  const user = useAppSelector(selectAuthUser);

  const initials = user?.email?.slice(0, 2)?.toUpperCase() ?? "NA";

  return (
    <>
      <AppProcessingOverlay
        open={isLoggingOut}
        title="Signing you out"
        description="Please wait while we end your session securely..."
      />

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
              <DropdownMenuItem onClick={logout} variant="destructive">
                <LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
