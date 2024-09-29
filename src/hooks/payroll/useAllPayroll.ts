import { getAllPayrolls } from "@/queries/employer";
import { useQuery } from "@tanstack/react-query";

export const useAllPayroll = () => {
	return useQuery({
		queryKey: ["payrolls"],
		queryFn: getAllPayrolls,
	});
};
