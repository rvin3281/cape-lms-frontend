"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CohortRow } from "@/lib/types/table-row-types/cohort-row.types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

/**
 * ColumnDef concepts you MUST know (fast, but critical)
 * A. accessorKey vs id
 * - accessorKey: "title" means “read row.title”
 * - id: "select" is for display-only columns (checkbox/actions) that aren’t real data columns
 *
 * B. header and cell
 * - header renders column header UI (buttons for sorting, etc.)
 * - cell renders the actual value per row (formatting, badges, links)
 *
 * C. Feature toggles
 * - enableSorting, enableHiding, enableColumnFilter
 * - These map to shadcn table features (sorting, visibility menu, filters).
 */

function formatDateFromUnixSeconds(sec: number) {
  // simple + predictable for admin UI
  return new Date(sec * 1000).toLocaleDateString();
}

export function getCohortColumns(
  pageIndex: number,
  pageSize: number,
): ColumnDef<CohortRow>[] {
  return [
    //1st Column: Row Selection (display-only column)
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    // ✅ Real data columns
    // {
    //   accessorKey: "id",
    //   header: "Cohort ID",
    //   cell: ({ row }) => (
    //     <span className="font-mono text-xs text-muted-foreground">
    //       {row.getValue("id")}
    //     </span>
    //   ),
    // },
    {
      id: "no",
      header: "#",
      cell: ({ row }) => {
        const no = pageIndex * pageSize + row.index + 1;
        return (
          <span className="text-xs font-medium text-muted-foreground tabular-nums">
            {no}
          </span>
        );
      },
      enableSorting: false,
      // enableHiding: false,
      size: 60,
    },

    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const title = row.getValue<string>("title");
        return <span className="font-medium">{title}</span>;
      },
    },
    {
      accessorKey: "access",
      header: "Access",
      cell: ({ row }) => {
        const access = row.getValue<CohortRow["access"]>("access");
        return (
          <span
            className={[
              "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
              access === "public" ? "bg-green-50" : "bg-slate-50",
            ].join(" ")}
          >
            {access}
          </span>
        );
      },
    },
    {
      accessorKey: "totalCourse",
      header: "Total Course",
      cell: ({ row }) => {
        const courses = row.getValue<CohortRow["totalCourse"]>("totalCourse");
        return <span className="tex-center">{courses}</span>;
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="-ml-3"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue<number>("createdAt");
        return (
          <span className="text-sm">
            {formatDateFromUnixSeconds(createdAt)}
          </span>
        );
      },
      sortingFn: "alphanumeric", // fine for formatted display, but we sort on raw number anyway
    },
    // ✅ Row actions (display-only)
    {
      id: "actions",
      header: "Action",
      enableHiding: false,
      cell: ({ row }) => {
        // const router = useRouter();
        const cohort = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(cohort.id)}
              >
                Copy Cohort ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <a href={`/dashboard/insights/cohort/${cohort.id}`}>
                  View details
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
