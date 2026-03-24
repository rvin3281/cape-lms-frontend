import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from "lucide-react";

interface DataTableColumnHeaderProps<
  TData,
  TValue,
> extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "text-sm font-semibold text-slate-700 leading-5 whitespace-normal break-words",
          className,
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-full justify-start px-2 py-1 h-auto text-left hover:bg-transparent",
              "data-[state=open]:bg-accent",
            )}
          >
            <div className="flex w-full items-center justify-between gap-2">
              {/* ✅ TEXT FIX */}
              <span className="text-sm font-semibold text-slate-700 leading-5 whitespace-normal break-words">
                {title}
              </span>

              {/* ✅ ICON FIX */}
              <span className="shrink-0">
                {column.getIsSorted() === "desc" ? (
                  <ArrowDown className="h-4 w-4 text-slate-500" />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUp className="h-4 w-4 text-slate-500" />
                ) : (
                  <ChevronsUpDown className="h-4 w-4 text-slate-400" />
                )}
              </span>
            </div>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="mr-2 h-4 w-4" />
            Asc
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="mr-2 h-4 w-4" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
