import { createPayroll } from "@/actions/employer";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useToast } from "../use-toast";

export const useCreatePayroll = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPayroll,
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Payroll Created",
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
