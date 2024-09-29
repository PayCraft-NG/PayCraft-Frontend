import { getPayrollEmployees } from "@/queries/company";
import { useQuery } from "@tanstack/react-query";

export const usePayrollEmployees = (payrollId: string) => {
	return useQuery({
		queryKey: ["employees", { payrollId }],
		queryFn: () => getPayrollEmployees(payrollId),
		enabled: !!payrollId,
	});
};
