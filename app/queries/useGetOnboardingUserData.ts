import { GET_USER_ONBOARDING_DATA } from "@/lib/constant/api-url";
import axiosInstance from "@/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

const getUserOnboardingData = async (email: string) => {
  const res = await axiosInstance.get(
    `${GET_USER_ONBOARDING_DATA}/?email=${email}`,
  );
  return res.data;
};

export const useGetOnboardingUserData = (email?: string | null) => {
  return useQuery({
    queryKey: ["user", "onboarding", email],
    queryFn: () => getUserOnboardingData(email!),
    enabled: !!email, // 🔑 prevent API call until email exists
  });
};
