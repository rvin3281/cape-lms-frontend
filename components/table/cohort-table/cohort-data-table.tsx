"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BundlesResponse } from "@/lib/interface/Ibundle.interface";
import { CohortRow } from "@/lib/types/table-row-types/cohort-row.types";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import React from "react";
import { getCohortColumns } from "./cohort-columns";
import CohortPagination from "./cohort-pagination";

interface CohortDataTableProps {
  data: CohortRow[];
  meta: BundlesResponse["meta"];
  initialPageSize: number;
  pageIndex: number;
  onPageIndexChange: (next: number) => void;
}

function CohortDataTable({
  data,
  meta,
  initialPageSize,
  pageIndex,
  onPageIndexChange,
}: CohortDataTableProps) {
  const columns = React.useMemo(
    () => getCohortColumns(pageIndex, initialPageSize),
    [pageIndex, initialPageSize]
  );

  //   Table State
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const pagination: PaginationState = { pageIndex, pageSize: initialPageSize };

  //   useReactTable
  const table = useReactTable({
    data,
    columns, // COLUMNS
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    // ✅ server-side pagination
    manualPagination: true,
    pageCount: meta.totalPages, // ✅ use meta, not rowCount guessing
    onPaginationChange: (updater) => {
      const next =
        typeof updater === "function" ? updater(pagination) : updater;

      // only pageIndex can change in your case
      onPageIndexChange(next.pageIndex);
    },

    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows.length;
  const totalFilteredRows = table.getFilteredRowModel().rows.length;

  return (
    <div className="space-y-3">
      {/* ✅ Top Toolbar */}
      <div className="flex flex-col gap-3 rounded-2xl border bg-white/70 p-3 shadow-sm backdrop-blur md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Input
              placeholder="Search cohorts..."
              value={globalFilter ?? ""}
              onChange={(event) => setGlobalFilter(event.target.value)}
              className="h-10 rounded-xl border-slate-200 bg-white pr-3 shadow-sm focus-visible:ring-2 focus-visible:ring-slate-300"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-10 rounded-xl border-slate-200 bg-white shadow-sm hover:bg-slate-50"
              >
                Columns
                <ChevronDown className="ml-2 h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="rounded-xl border-slate-200 shadow-lg"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* ✅ Table Card */}
      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="border-b border-slate-200"
                >
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="h-12 whitespace-nowrap px-4 text-xs font-semibold uppercase tracking-wide text-slate-600"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                    data-state={row.getIsSelected() && "selected"}
                    className={[
                      "border-b border-slate-100",
                      "transition-colors hover:bg-slate-50/70",
                      row.getIsSelected() ? "bg-slate-50" : "",
                    ].join(" ")}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-4 py-3 align-middle text-sm text-slate-800"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-32 text-center"
                  >
                    <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-2 py-6 text-slate-600">
                      <div className="text-base font-semibold text-slate-800">
                        No results found
                      </div>
                      <div className="text-sm text-slate-500">
                        Try adjusting your search keyword or column visibility.
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Bottom Bar */}
        <div className="flex flex-col gap-6 border-t bg-white px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-800">{selectedRows}</span>{" "}
            selected <span className="text-slate-400">·</span>{" "}
            <span className="font-medium text-slate-800">
              {totalFilteredRows}
            </span>{" "}
            rows on this page
          </div>

          <CohortPagination
            pageIndex={table.getState().pagination.pageIndex}
            pageSize={table.getState().pagination.pageSize}
            pageCount={table.getPageCount()}
            canPrevious={table.getCanPreviousPage()}
            canNext={table.getCanNextPage()}
            goToPage={(idx) => table.setPageIndex(idx)}
            prev={() => table.previousPage()}
            next={() => table.nextPage()}
          />
        </div>
      </div>
    </div>
  );
}

export default CohortDataTable;
