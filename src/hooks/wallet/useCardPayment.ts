import { fundViaCard } from "@/actions/wallet";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";

export const useCardPayment = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: fundViaCard,
		onSuccess: async (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Payment Successfull",
					description: res.statusMessage,
				});
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["wallet"] });
		},
		retry: 0,
	});
};
