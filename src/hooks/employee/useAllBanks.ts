import { getAllBanks } from "@/queries/employer";
import { useQuery } from "@tanstack/react-query";

export const useAllBanks = () => {
	return useQuery({
		queryKey: ["banks"],
		queryFn: getAllBanks,
	});
};
