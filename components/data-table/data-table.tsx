import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "./data-table-pagination";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows: number;
  pageCount: number;
  pagination: PaginationState;
  onPaginationChange: React.Dispatch<React.SetStateAction<PaginationState>>;
  sorting: SortingState;
  onSortingChange: React.Dispatch<React.SetStateAction<SortingState>>;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRows,
  pageCount,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
    },
    onPaginationChange,
    onSortingChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
  });

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Table className="lg:w-full min-w-[900px] table-fixed">
          <TableHeader className="bg-slate-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-slate-200 hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    style={{ width: header.column.getSize() }}
                    key={header.id}
                    className="h-auto py-4 text-left align-middle"
                  >
                    <div className="min-h-[30px] flex items-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-slate-100 transition-colors hover:bg-slate-50/80"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      style={{ width: cell.column.getSize() }}
                      className=" py-2 align-middle"
                    >
                      <div className="">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center text-sm text-slate-500"
                >
                  No facilitators found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} totalRows={totalRows} />
    </div>
  );
}
