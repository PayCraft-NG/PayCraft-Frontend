import { removePayroll } from "@/actions/employer";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";

export const useRemovePayroll = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: removePayroll,
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Payroll Removed",
					description: res.statusMessage,
				});
				navigate("/dashboard/payroll");
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["payrolls"] });
		},
	});
};
