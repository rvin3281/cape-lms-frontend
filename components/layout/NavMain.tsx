"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType } from "react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import NavGroupItem from "./NavGroupItem";

export type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url?: string; // ✅ optional for parent groups
  icon?: ComponentType<{ className?: string }>;
  isActive?: boolean;
  items?: NavSubItem[]; // ✅ optional
};

export function isExactActive(pathname: string, url?: string) {
  if (!url) return false;
  return pathname === url;
}

export function isSectionActive(pathname: string, url?: string) {
  if (!url) return false;
  return pathname === url || pathname.startsWith(url + "/");
}

function NavMain({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeOnMobile = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <SidebarGroup>
      <SidebarMenu className="gap-3">
        {items.map((item) => {
          const hasChildren = (item.items?.length ?? 0) > 0;

          const isAnyChildActive = hasChildren
            ? item.items!.some((sub) => isExactActive(pathname, sub.url))
            : false;

          const active =
            isSectionActive(pathname, item.url) || isAnyChildActive;

          // ✅ normal link item (no children)
          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  className="[&>svg]:size-5!"
                  tooltip={item.title}
                >
                  <Link
                    href={item.url ?? "#"}
                    onClick={closeOnMobile}
                    className={[
                      "group/navitem flex h-10 items-center gap-2 rounded-xl transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300",
                      active
                        ? "bg-slate-900 text-white hover:bg-slate-100 hover:text-black"
                        : "text-slate-900 hover:bg-slate-100",
                    ].join(" ")}
                  >
                    {item.icon && (
                      <item.icon
                        className={[
                          "shrink-0 transition-colors",
                          active
                            ? "text-white group-hover/navitem:text-black"
                            : "text-slate-900",
                        ].join(" ")}
                      />
                    )}
                    <span
                      className={[
                        "text-[16px] font-medium transition-colors",
                        active
                          ? "text-white group-hover/navitem:text-black"
                          : "text-black",
                      ].join(" ")}
                    >
                      {item.title}
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // ✅ collapsible group (has children)
          // return (
          //   <Collapsible
          //     key={item.title}
          //     defaultOpen={active}
          //     className="group/collapsible"
          //   >
          //     <SidebarMenuItem>
          //       <CollapsibleTrigger asChild>
          //         <SidebarMenuButton
          //           className="[&>svg]:size-5!"
          //           tooltip={item.title}
          //         >
          //           {item.icon && <item.icon className="shrink-0" />}
          //           <span className="text-[16px] font-medium text-black">
          //             {item.title}
          //           </span>
          //           <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          //         </SidebarMenuButton>
          //       </CollapsibleTrigger>

          //       <CollapsibleContent>
          //         <SidebarMenuSub className="mt-2 space-y-1">
          //           {item.items!.map((subItem) => {
          //             const subActive = isExactActive(pathname, subItem.url);

          //             console.log("active", active);

          //             return (
          //               <SidebarMenuSubItem key={subItem.title}>
          //                 <SidebarMenuSubButton
          //                   asChild
          //                   className={[
          //                     "h-auto items-start justify-start",
          //                     "whitespace-normal break-words",
          //                     "px-0 py-0",
          //                   ].join(" ")}
          //                 >
          //                   <Link
          //                     href={subItem.url}
          //                     className={[
          //                       "block w-full",
          //                       "pl-4 py-1 py-2",
          //                       "md:text-[14.5px] leading-snug text-left",
          //                       "transition-colors",
          //                       subActive
          //                         ? "bg-slate-900 text-white hover:bg-slate-100 hover:text-black"
          //                         : "text-slate-900 hover:bg-slate-100",
          //                       "whitespace-normal break-words",
          //                     ].join(" ")}
          //                   >
          //                     {subItem.title}
          //                   </Link>
          //                 </SidebarMenuSubButton>
          //               </SidebarMenuSubItem>
          //             );
          //           })}
          //         </SidebarMenuSub>
          //       </CollapsibleContent>
          //     </SidebarMenuItem>
          //   </Collapsible>
          // );
          return (
            <NavGroupItem
              onNavigate={closeOnMobile}
              key={item.title}
              item={item}
              pathname={pathname}
            />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export default NavMain;
