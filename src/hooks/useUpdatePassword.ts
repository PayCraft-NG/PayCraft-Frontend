import { updatePassword } from "@/actions/employer";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useUpdatePassword = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updatePassword,
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Password Updated",
					description: res.statusMessage,
				});
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["employer"] });
		},
	});
};
