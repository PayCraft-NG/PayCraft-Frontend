import { fundWallet } from "@/actions/wallet";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { verifyTransfer } from "@/queries/wallet";

export const useFundWallet = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: fundWallet,
		onSuccess: async (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Transfer Successfull",
					description: res.statusMessage,
				});

				if (res.data.referenceNumber) {
					try {
						await verifyTransfer(res.data.referenceNumber);
					} catch (error) {
						console.error("Error verifying transfer:", error);
						toast({
							title: "Verification Failed",
							description:
								"Failed to verify the transfer. Please check your transaction history.",
							variant: "destructive",
						});
					}
				}
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["wallet"] });
		},
		retry: 0,
	});
};
