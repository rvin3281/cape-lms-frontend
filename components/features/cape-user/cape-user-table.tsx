/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetAllCapeUser } from "@/app/queries/useGetAllCapeUserData";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { getCapeUserColumns } from "./cape-user-column";
import { DataTable } from "@/components/data-table/data-table";
import UpdateCapeUser from "@/components/drawer/UpdateCapeUser";
import { useDeleteCapeUserById } from "@/app/queries/useDeleteCapeUserById";
import { toast } from "sonner";
import DeleteDialog from "@/components/alert/DeleteDialog";
import UnenrollUser from "@/components/drawer/UnenrollUser";

export default function CapeUserTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCapeUser, setSelectedCapeUser] = useState<any>(null);
  const [updateDrawerOpen, setUpdateDrawerOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const [unenrollDrawerOpen, setUnenrollDrawerOpen] = useState(false);

  const page = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;
  const search = "";

  const { data, isPending, isError, error } = useGetAllCapeUser({
    page,
    pageSize,
    search,
  });

  const deleteCapeUserApi = useDeleteCapeUserById();

  const handleOpenUnenrollDrawer = useCallback((capeUser: any) => {
    setSelectedCapeUser(capeUser);
    setUnenrollDrawerOpen(true);
  }, []);

  const handleCloseUnenrollDrawer = useCallback((open: boolean) => {
    setUnenrollDrawerOpen(open);
    if (!open) {
      setTimeout(() => {
        setSelectedCapeUser(null);
      }, 300);
    }
  }, []);

  const handleOpenDeleteDialog = (capeUser: any) => {
    setSelectedCapeUser(capeUser);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCapeUser(null);
  };

  const handleOpenUpdateDrawer = useCallback((capeUser: any) => {
    setSelectedCapeUser(capeUser);
    setUpdateDrawerOpen(true);
  }, []);

  const handleCloseUpdateDrawer = useCallback((open: boolean) => {
    setUpdateDrawerOpen(open);
    if (!open) {
      setTimeout(() => {
        setSelectedCapeUser(null);
      }, 300);
    }
  }, []);

  const handleConfirmDelete = async () => {
    if (!selectedCapeUser?.userId) {
      handleCloseDeleteDialog();
      return;
    }

    deleteCapeUserApi.mutate(selectedCapeUser.userId, {
      onSuccess: () => {
        handleCloseDeleteDialog();
        setSelectedCapeUser(null);
        setShowError(false);
        toast.success(`CAPE Learner deleted successfully.`);
      },
      onError: (error: any) => {
        setShowError(true);
        toast.error(
          `Unable to delete CAPE Learner. Please try again or contact support if the issue persists.`,
        );
      },
      onSettled: () => {
        handleCloseDeleteDialog();
        setSelectedCapeUser(null);
      },
    });

    // try {
    //   await deleteFacilitatorMutation.mutateAsync(
    //     selectedFacilitator.facilitatorId,
    //   );
    // } finally {
    //   handleCloseDeleteDialog();
    // }
  };

  const columns = useMemo(
    () =>
      getCapeUserColumns({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        onUpdate: handleOpenUpdateDrawer,
        onDelete: handleOpenDeleteDialog,
        onUnenroll: handleOpenUnenrollDrawer,
      }),
    [
      pagination.pageIndex,
      pagination.pageSize,
      handleOpenUpdateDrawer,
      handleOpenUnenrollDrawer,
    ],
  );

  if (isPending) {
    return (
      <div className="p-4 text-sm">Loading Program Onboarding Data...</div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load learnworlds program.{" "}
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
          if (!deleteCapeUserApi.isPending) {
            setDeleteDialogOpen(open);
            if (!open) setSelectedCapeUser(null);
          }
        }}
        title={`Delete CAPE Learner ${selectedCapeUser?.userName ?? ""} ?`}
        description={
          selectedCapeUser
            ? `Are you sure you want to delete CAPE learner ${selectedCapeUser.userName}? This action cannot be undone.`
            : "Are you sure you want to delete this learner?"
        }
        onConfirm={handleConfirmDelete}
        isLoading={deleteCapeUserApi.isPending}
      />

      <UpdateCapeUser
        open={updateDrawerOpen}
        onOpenChange={handleCloseUpdateDrawer}
        capeUser={selectedCapeUser}
        showError={showError}
        setShowError={setShowError}
      />

      <UnenrollUser
        open={unenrollDrawerOpen}
        onOpenChange={handleCloseUnenrollDrawer}
        capeUser={selectedCapeUser}
        showError={showError}
        setShowError={setShowError}
      />

      {/* <DeleteDialog
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
      /> */}
    </>
  );
}
