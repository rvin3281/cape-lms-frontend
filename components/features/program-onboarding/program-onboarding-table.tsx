/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllProgramOnboarding } from "@/app/queries/useGetAllProgramOnboarding";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { getProgramOnboardingColumns } from "./program-onboarding-column";
import { DataTable } from "@/components/data-table/data-table";
import DeleteDialog from "@/components/alert/DeleteDialog";
import { useDeleteProgramOnboarding } from "@/app/queries/useDeleteProgramOnboarding";
import { toast } from "sonner";
import UpdateClassroomProgram from "@/components/drawer/UpdateClassroomProgram";

export default function ProgramOnboardingTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProgramOnboarding, setSelectedProgramOnboarding] =
    useState<any>(null);
  const [showError, setShowError] = useState(false);

  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);

  const page = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;
  const search = "";

  const { data, isPending, isError, error } = useGetAllProgramOnboarding({
    page,
    pageSize,
    search,
  });

  console.log("DATA", data);

  const deleteProgramOnboardingApi = useDeleteProgramOnboarding();

  const handleOpenDeleteDialog = (programOnboarding: any) => {
    setSelectedProgramOnboarding(programOnboarding);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedProgramOnboarding(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedProgramOnboarding?.programId) {
      handleCloseDeleteDialog();
      return;
    }

    deleteProgramOnboardingApi.mutate(selectedProgramOnboarding.programId, {
      onSuccess: () => {
        toast.success("Facilitator deleted successfully.");
      },
      onError: () => {
        toast.error("Unable to delete facilitator.");
      },
    });
  };

  const handleOpenUpdateDrawer = useCallback((programOnboarding: any) => {
    setSelectedProgramOnboarding(programOnboarding);
    setUpdateDrawerOpen(true);
  }, []);

  const handleCloseUpdateDrawer = useCallback((open: boolean) => {
    setUpdateDrawerOpen(open);
    if (!open) {
      setTimeout(() => {
        setSelectedProgramOnboarding(null);
      }, 300);
    }
  }, []);

  const columns = useMemo(
    () =>
      getProgramOnboardingColumns({
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

      <UpdateClassroomProgram
        open={updateDrawerOpen}
        onOpenChange={handleCloseUpdateDrawer}
        classroomProgram={selectedProgramOnboarding}
        showError={showError}
        setShowError={setShowError}
      />

      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={(open) => {
          if (!deleteProgramOnboardingApi.isPending) {
            setDeleteDialogOpen(open);
            if (!open) setSelectedProgramOnboarding(null);
          }
        }}
        title="Delete Program?"
        description={
          selectedProgramOnboarding
            ? `Are you sure you want to delete ${selectedProgramOnboarding.programName}? This action cannot be undone.`
            : "Are you sure you want to delete this Program?"
        }
        onConfirm={handleConfirmDelete}
        isLoading={deleteProgramOnboardingApi.isPending}
      />
    </>
  );
}
