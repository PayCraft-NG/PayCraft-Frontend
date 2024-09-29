import { createEmployer } from "@/actions/employer";
import { AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useCreateEmployer = () => {
	const { toast } = useToast();

	return useMutation({
		mutationFn: createEmployer,
		onSuccess: (res) => {
			if (res.statusCode === AUTH_STATUS_CODES.ONBOARD_SUCCESS) {
				toast({
					title: "Profile Created",
					description: res.statusMessage,
				});
			}
		},
	});
};
