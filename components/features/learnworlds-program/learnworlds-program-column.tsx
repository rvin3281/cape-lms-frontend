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

type LearnworldsProgramColumnsProps = {
  pageIndex: number;
  pageSize: number;
  onUpdate: (programOnboarding: any) => void;
  onDelete: (programOnboarding: any) => void;
};

export const getLearnworldsProgramColumns = ({
  pageIndex,
  pageSize,
  onUpdate,
  onDelete,
}: LearnworldsProgramColumnsProps): ColumnDef<any>[] => [
  {
    id: "index",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    size: 70,
    minSize: 60,
    maxSize: 80,
    cell: ({ row }) => (
      <div className="text-sm text-muted-foreground">
        {pageIndex * pageSize + row.index + 1}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program ID" />
    ),
    size: 240,
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => (
      <div
        className="max-w-[260px] font-medium leading-5 whitespace-normal break-words"
        title={row.original.productId}
      >
        {row.original.productId || "-"}
      </div>
    ),
  },
  {
    accessorKey: "productTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Title" />
    ),
    size: 240,
    minSize: 200,
    maxSize: 300,
    cell: ({ row }) => (
      <div
        className="max-w-[260px] font-medium leading-5 whitespace-normal break-words"
        title={row.original.productTitle}
      >
        {row.original.productTitle || "-"}
      </div>
    ),
  },
  {
    accessorKey: "productDescription",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Description" />
    ),
    size: 380,
    minSize: 320,
    maxSize: 500,
    cell: ({ row }) => {
      const description = row.original.productDescription;

      return (
        <div
          className="max-w-[420px] text-sm leading-6 text-muted-foreground whitespace-normal break-words line-clamp-4"
          title={description || "-"}
        >
          {description || "-"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productUrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Public URL" />
    ),
    size: 320,
    minSize: 280,
    maxSize: 420,
    cell: ({ row }) => {
      const url = row.original.productUrl;

      return (
        <div
          className="max-w-[380px] text-sm leading-5 whitespace-normal break-all"
          title={url || "-"}
        >
          {url || "-"}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   accessorKey: "productType",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Program Type" />
  //   ),
  //   size: 140,
  //   minSize: 120,
  //   maxSize: 180,
  //   cell: ({ row }) => (
  //     <div className="px-2 py-1 text-xs font-medium uppercase tracking-wide">
  //       {row.original.productType || "-"}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "totalLearnersEnrollment",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Learner Enrollments"
      />
    ),
    size: 180,
    minSize: 160,
    maxSize: 220,
    cell: ({ row }) => (
      <div className="font-semibold text-center">
        {row.original.totalLearnersEnrollment ?? 0}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    size: 140,
    minSize: 120,
    maxSize: 160,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);

      return (
        <div className="text-sm font-medium">
          {date.toLocaleDateString("en-MY", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    size: 70,
    minSize: 60,
    maxSize: 80,
    cell: ({ row }) => {
      const programOnboarding = row.original;

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
            <DropdownMenuItem onClick={() => onUpdate(programOnboarding)}>
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(programOnboarding)}
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
