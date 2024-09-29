import { getPayrollById } from "@/queries/employer";
import { useQuery } from "@tanstack/react-query";

export const usePayroll = (payrollId: string) => {
	return useQuery({
		queryKey: ["payrolls", payrollId],
		queryFn: () => getPayrollById(payrollId),
		enabled: !!payrollId,
	});
};
