/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

type FacilitatorColumnsProps = {
  pageIndex: number;
  pageSize: number;
  onDelete: (facilitator: any) => void;
  onUpdate: (facilitator: any) => void;
};

export const getFacilitatorColumns = ({
  pageIndex,
  pageSize,
  onDelete,
  onUpdate,
}: FacilitatorColumnsProps): ColumnDef<any>[] => [
  {
    id: "index",
    header: "No.",
    size: 50,
    maxSize: 50,
    cell: ({ row }) => {
      return <div>{pageIndex * pageSize + row.index + 1}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "facilitatorName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Facilitator Name" />
    ),
    size: 100,
    maxSize: 150,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.facilitatorName}</div>
    ),
  },
  {
    id: "actions",
    header: "Action",
    size: 50,
    maxSize: 100,
    cell: ({ row }) => {
      const facilitator = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open action menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onUpdate(facilitator)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(facilitator)}
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
