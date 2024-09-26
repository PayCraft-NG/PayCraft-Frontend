import { updatePassword } from "@/actions/employer";
import { UpdatePasswordForm } from "@/components/modals/ChangePassword";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useAuth } from "@/store/auth";

export const useUpdatePassword = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const accessToken = useAuth();

	return useMutation({
		mutationFn: async (newPassword: UpdatePasswordForm) => {
			return await updatePassword(newPassword, accessToken!);
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
