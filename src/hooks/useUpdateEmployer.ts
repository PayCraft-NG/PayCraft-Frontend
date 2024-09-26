import { updateEmployer } from "@/actions/employer";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useAuth } from "@/store/auth";
import { UpdateEmployerForm } from "@/components/forms/UpdateProfile";

export const useUpdateEmployer = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const accessToken = useAuth();

	return useMutation({
		mutationFn: async (employer: UpdateEmployerForm) => {
			return await updateEmployer(employer, accessToken!);
		},
		onSuccess: (res) => {
			if (
				res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS ||
				res.statusCode === AUTH_STATUS_CODES.ONBOARD_SUCCESS
			) {
				toast({
					description: res.statusMessage,
				});
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["employer"] });
		},
	});
};
