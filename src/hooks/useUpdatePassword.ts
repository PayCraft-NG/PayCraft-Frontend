import { updatePassword } from "@/actions/employer";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useUpdatePassword = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updatePassword,
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
