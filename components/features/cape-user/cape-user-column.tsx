"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Badge } from "@/components/ui/badge";
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

/* eslint-disable @typescript-eslint/no-explicit-any */
type CapeUserColumnsProps = {
  pageIndex: number;
  pageSize: number;
  onUpdate: (capeUser: any) => void;
  onDelete: (capeUser: any) => void;
  onUnenroll: (capeUser: any) => void;
};

export const getCapeUserColumns = ({
  pageIndex,
  pageSize,
  onUpdate,
  onDelete,
  onUnenroll,
}: CapeUserColumnsProps): ColumnDef<any>[] => [
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
    accessorKey: "firstName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="First Name" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.firstName}</div>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Name" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.lastName}</div>
    ),
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Username" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.userName}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => (
      <div className="font-medium truncate">{row.original.email}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    size: 150,
    maxSize: 200,
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
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
    accessorKey: "userRoles",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Roles" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => {
      const roles = row.original.userRoles ?? [];
      const roleCodes = roles.map((x: any) => x.role?.roleCode);

      return (
        <div className="flex flex-col gap-2">
          {roleCodes.map((roleCode: string, id: number) =>
            roleCode === "HYBRID_LEARNER" ? (
              <Badge variant="default" key={id}>
                Hybrid Learner
              </Badge>
            ) : roleCode === "CLASSROOM_LEARNER" ? (
              <Badge variant="destructive" key={id}>
                Classroom Learner
              </Badge>
            ) : (
              <Badge variant="secondary" key={id}>
                {roleCode}
              </Badge>
            ),
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "cfCompany",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company / Organization" />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => {
      const company = row.original?.profile?.cfCompany;

      return (
        <div className="font-medium truncate">{company?.trim() || "N/A"}</div>
      );
    },
  },
  // {
  //   accessorKey: "cfCohort",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Cohort" />
  //   ),
  //   size: 200,
  //   maxSize: 250,
  //   cell: ({ row }) => (
  //     <div className="font-medium truncate">
  //       {row.original?.profile?.cfCohort || "N/A"}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "isFirstTimeLogin",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Account Activation Status"
      />
    ),
    size: 200,
    maxSize: 250,
    cell: ({ row }) => {
      const isFirstTimeLogin = Boolean(row.original.isFirstTimeLogin);

      return (
        <div className="font-medium truncate">
          {isFirstTimeLogin ? (
            <Badge variant="destructive">Not Activated</Badge>
          ) : (
            <Badge variant="default">Activated</Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    size: 100,
    minSize: 80,
    maxSize: 100,
    cell: ({ row }) => {
      const capeUser = row.original;

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

            <DropdownMenuItem onClick={() => onUpdate(capeUser)}>
              Update
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onUnenroll(capeUser)}>
              Unenroll
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => onDelete(capeUser)}
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
