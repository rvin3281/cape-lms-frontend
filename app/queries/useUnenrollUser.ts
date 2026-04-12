/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CAPE_USER } from "@/lib/constant/api-url";
import { TUnenrollUserSchema } from "@/lib/validation/zodValidationSchema";
import axiosInstance from "@/utils/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const unenrollUser = async (payload: TUnenrollUserSchema) => {
  const res = await axiosInstance.delete(`${CAPE_USER}/programs/unenroll`, {
    data: payload,
  });

  return res.data;
};

type UseUnenrollUserOptions = {
  onSuccessClose?: () => void;
  onErrorState?: (message: string) => void;
  onSuccessWithResponse?: (response: any) => void;
};

export const useUnenrollUser = ({
  onSuccessClose,
  onErrorState,
  onSuccessWithResponse,
}: UseUnenrollUserOptions = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unenrollUser,
    onSuccess: async (response, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["program-onboarding"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["cape-user"],
        }),
        queryClient.invalidateQueries({
          queryKey: ["cape-user-programs", variables.userId],
        }),
      ]);

      toast.success(
        "Learner has been unenrolled from the selected program(s).",
      );

      onSuccessWithResponse?.(response);
      onSuccessClose?.();
    },
    onError: (_error: unknown) => {
      const message =
        "We couldn’t unenroll the learner at the moment. Please try again.";

      toast.error(message);
      onErrorState?.(message);
    },
  });
};
