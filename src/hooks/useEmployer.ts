import { getEmployer } from "@/queries/employer";
import { useQuery } from "@tanstack/react-query";

export const useEmployer = () => {
	return useQuery({
		queryKey: ["employer"],
		queryFn: getEmployer,
	});
};
