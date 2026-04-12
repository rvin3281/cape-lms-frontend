/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useDeleteLearnworldsProgram } from "@/app/queries/useDeleteLearnworldsProgram";
import { useGetAllLearnworldsProgram } from "@/app/queries/useGetAllLearnworldsProgram";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { getLearnworldsProgramColumns } from "./learnworlds-program-column";
import { DataTable } from "@/components/data-table/data-table";
import UpdateLearnworldsProgram from "@/components/drawer/UpdateLearnworldsProgram";
import DeleteDialog from "@/components/alert/DeleteDialog";

export default function LearnworldsProgramTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLearnworldsProgram, setSelectedLearnworldsProgram] =
    useState<any>(null);
  const [showError, setShowError] = useState(false);

  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);

  const page = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;
  const search = "";

  const { data, isPending, isError, error } = useGetAllLearnworldsProgram({
    page,
    pageSize,
    search,
  });

  const deleteLearnworldsProgamApi = useDeleteLearnworldsProgram();

  const handleOpenDeleteDialog = (learnworldsProgram: any) => {
    setSelectedLearnworldsProgram(learnworldsProgram);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedLearnworldsProgram(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedLearnworldsProgram?.productId) {
      handleCloseDeleteDialog();
      return;
    }

    deleteLearnworldsProgamApi.mutate(selectedLearnworldsProgram.productId, {
      onSuccess: (data) => {
        toast.success(
          data?.message || "LearnWorlds program deleted successfully.",
        );
        handleCloseDeleteDialog();
      },
      onError: (error: any) => {
        toast.error(
          error?.response?.data?.message ||
            "Unable to delete LearnWorlds program.",
        );
      },
    });
  };

  const handleOpenUpdateDrawer = useCallback((learnworldsProgram: any) => {
    setSelectedLearnworldsProgram(learnworldsProgram);
    setUpdateDrawerOpen(true);
  }, []);

  const handleCloseUpdateDrawer = useCallback((open: boolean) => {
    setUpdateDrawerOpen(open);
    if (!open) {
      setTimeout(() => {
        setSelectedLearnworldsProgram(null);
      }, 300);
    }
  }, []);

  const columns = useMemo(
    () =>
      getLearnworldsProgramColumns({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        onUpdate: handleOpenUpdateDrawer,
        onDelete: handleOpenDeleteDialog,
      }),
    [handleOpenUpdateDrawer, pagination.pageIndex, pagination.pageSize],
  );

  if (isPending) {
    return (
      <div className="p-4 text-sm">Loading Program Onboarding Data...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load program onboarding.{" "}
        {error instanceof Error ? error.message : ""}
      </div>
    );
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={data?.data ?? []}
        totalRows={data?.meta.total ?? 0}
        pageCount={data?.meta.totalPages ?? 0}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
      />

      <UpdateLearnworldsProgram
        open={updateDrawerOpen}
        onOpenChange={handleCloseUpdateDrawer}
        learnworldsProgram={selectedLearnworldsProgram}
        showError={showError}
        setShowError={setShowError}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!deleteLearnworldsProgamApi.isPending) {
            setDeleteDialogOpen(open);
            if (!open) setSelectedLearnworldsProgram(null);
          }
        }}
        title="Delete Program?"
        description={
          selectedLearnworldsProgram
            ? `Are you sure you want to delete ${selectedLearnworldsProgram.productTitle}? This action cannot be undone.`
            : "Are you sure you want to delete this Program?"
        }
        onConfirm={handleConfirmDelete}
        isLoading={deleteLearnworldsProgamApi.isPending}
      />
    </>
  );
}
