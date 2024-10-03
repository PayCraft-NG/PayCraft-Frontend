import { getEmployee } from "@/queries/employer";
import { useQuery } from "@tanstack/react-query";

export const useEmployee = (employeeId?: string) => {
	return useQuery({
		queryKey: ["employees", { employeeId }],
		queryFn: () => getEmployee(employeeId!),
		enabled: !!employeeId,
	});
};
