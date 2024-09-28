import { getAllEmployees } from "@/queries/employer";
import { useQuery } from "@tanstack/react-query";

export const useEmployees = () => {
	return useQuery({
		queryKey: ["employees"],
		queryFn: getAllEmployees,
	});
};
