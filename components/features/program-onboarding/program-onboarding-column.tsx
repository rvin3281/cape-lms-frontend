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

type ProgramOnboardingColumnsProps = {
  pageIndex: number;
  pageSize: number;
  onUpdate: (programOnboarding: any) => void;
  onDelete: (programOnboarding: any) => void;
};

export const getProgramOnboardingColumns = ({
  pageIndex,
  pageSize,
  onUpdate,
  onDelete,
}: ProgramOnboardingColumnsProps): ColumnDef<any>[] => [
  {
    id: "index",

    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No." />
    ),
    size: 60,
    minSize: 60,
    maxSize: 80,
    cell: ({ row }) => {
      return <div>{pageIndex * pageSize + row.index + 1}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "programName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Name" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.programName}</div>
    ),
  },
  {
    accessorKey: "programDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Date" />
    ),
    size: 100,
    maxSize: 150,
    cell: ({ row }) => {
      const date = new Date(row.original.programDate);
      return (
        <div className="font-medium truncate">
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
    accessorKey: "programCohort",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Cohort" />
    ),
    size: 100,
    maxSize: 150,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.programCohort}</div>
    ),
  },
  {
    accessorKey: "totalEnrollments",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Learner Enrollments"
      />
    ),
    size: 120,
    maxSize: 170,
    cell: ({ row }) => (
      <div className="font-medium truncate">
        {row.original.totalEnrollments}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalFacilitators",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Facilitators" />
    ),
    size: 80,
    maxSize: 130,
    cell: ({ row }) => (
      <div className="font-medium truncate">
        {row.original.totalFacilitators}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "viewDetails",

  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="View Details" />
  //   ),
  //   size: 120,
  //   minSize: 80,
  //   maxSize: 80,
  //   cell: ({ row }) => {
  //     const programOnboarding = row.original;

  //     return (
  //       <Link
  //         href={`/admin/program-onboarding/${programOnboarding.programName}`}
  //       >
  //         <span className="font-medium font-semibold leading-5 whitespace-normal break-words">
  //           View Details
  //         </span>
  //       </Link>
  //     );
  //   },
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "actions",
    header: "Action",
    size: 50,
    minSize: 60,
    maxSize: 60,
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
