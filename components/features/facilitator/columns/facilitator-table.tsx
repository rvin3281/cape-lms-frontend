/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { DataTable } from "@/components/data-table/data-table";
import React, { useState } from "react";
import { getFacilitatorColumns } from "./facilitator-columns";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useGetAllFacilitator } from "@/app/queries/useGetAllFacilitator";
import DeleteDialog from "@/components/alert/DeleteDialog";
import { useDeleteFacilitatorById } from "@/app/queries/useDeleteFacilitatorById";
import UpdateFacilitatorDialog from "@/components/dialog/UpdateFacilitator";

export default function FacilitatorTable() {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFacilitator, setSelectedFacilitator] = useState<any>(null);

  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);

  const [showError, setShowError] = useState(false);

  const page = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;
  const search = "";

  const { data, isPending, isError, error } = useGetAllFacilitator({
    page,
    pageSize,
    search,
  });

  const deleteFacilitatorMutation = useDeleteFacilitatorById();

  const handleOpenDeleteDialog = (facilitator: any) => {
    setSelectedFacilitator(facilitator);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedFacilitator(null);
  };

  // API To delete facilitator
  const handleConfirmDelete = async () => {
    if (!selectedFacilitator?.facilitatorId) {
      handleCloseDeleteDialog();
      return;
    }

    try {
      await deleteFacilitatorMutation.mutateAsync(
        selectedFacilitator.facilitatorId,
      );
    } finally {
      handleCloseDeleteDialog();
    }
  };

  // Update Facilitator
  const handleOpenCloseUpdateDialog = (facilitator: any) => {
    setUpdateDialogOpen(true);
    setShowError(false);
    setSelectedFacilitator(facilitator);
  };

  const handleCloseUpdateDialog = () => {
    setUpdateDialogOpen(false);
    setShowError(false);
    setTimeout(() => {
      setSelectedFacilitator(null);
    }, 1000);
  };

  const columns = React.useMemo(
    () =>
      getFacilitatorColumns({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        onDelete: handleOpenDeleteDialog,
        onUpdate: handleOpenCloseUpdateDialog,
      }),
    [pagination.pageIndex, pagination.pageSize],
  );

  if (isPending) {
    return <div className="p-4 text-sm">Loading facilitators...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load facilitators.{" "}
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

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!deleteFacilitatorMutation.isPending) {
            setDeleteDialogOpen(open);
            if (!open) setSelectedFacilitator(null);
          }
        }}
        title="Delete facilitator?"
        description={
          selectedFacilitator
            ? `Are you sure you want to delete ${selectedFacilitator.facilitatorName}? This action cannot be undone.`
            : "Are you sure you want to delete this facilitator?"
        }
        onConfirm={handleConfirmDelete}
        isLoading={deleteFacilitatorMutation.isPending}
      />

      <UpdateFacilitatorDialog
        open={updateDialogOpen}
        onOpenChange={(open) => {
          if (!open) handleCloseUpdateDialog();
        }}
        facilitator={selectedFacilitator}
        title="Update Facilitator"
        description={
          selectedFacilitator
            ? `Are you sure you want to update ${selectedFacilitator.facilitatorName}.`
            : "Are you sure you want to update this facilitator?"
        }
        closeDialog={handleCloseUpdateDialog}
        showError={showError}
        setShowError={setShowError}
      />
    </>
  );
}
