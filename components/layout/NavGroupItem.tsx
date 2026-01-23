"use client";
import { useEffect, useState } from "react";
import { isExactActive, isSectionActive, NavItem } from "./NavMain";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";

function NavGroupItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const hasChildren = (item.items?.length ?? 0) > 0;
  if (!hasChildren) return null;

  const isAnyChildActive = item.items!.some((sub) =>
    isExactActive(pathname, sub.url),
  );

  const active = isSectionActive(pathname, item.url) || isAnyChildActive;

  const [open, setOpen] = useState(active);

  useEffect(() => {
    setOpen(active);
  }, [active]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton className="[&>svg]:size-5!" tooltip={item.title}>
            {item.icon && <item.icon className="shrink-0" />}
            <span className="text-[16px] font-medium text-black">
              {item.title}
            </span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub className="mt-2 space-y-1">
            {item.items!.map((subItem) => {
              const subActive = isExactActive(pathname, subItem.url);

              return (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton
                    asChild
                    className="h-auto items-start justify-start whitespace-normal break-words px-0 py-0"
                  >
                    <Link
                      href={subItem.url}
                      className={[
                        "block w-full",
                        "pl-4 py-2",
                        "text-[14.5px] leading-snug text-left",
                        "transition-colors whitespace-normal break-words rounded-lg",
                        subActive
                          ? "bg-slate-900 text-white hover:bg-slate-100 hover:text-black"
                          : "text-slate-900 hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {subItem.title}
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              );
            })}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default NavGroupItem;
