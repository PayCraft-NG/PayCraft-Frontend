import { updatePayroll } from "@/actions/employer";
import { PayrollForm } from "@/components/forms/UpdatePayrollForm";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "../use-toast";

export const useUpdatePayroll = (payrollId: string) => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newPayroll: PayrollForm) => {
			if (!payrollId) throw new AxiosError("Payroll Not Found");
			return await updatePayroll(payrollId, newPayroll);
		},
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Payroll Updated",
					description: res.statusMessage,
				});
				navigate("/dashboard/payroll");
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["payrolls"] });
			queryClient.invalidateQueries({ queryKey: ["payrolls", payrollId] });
		},
	});
};
