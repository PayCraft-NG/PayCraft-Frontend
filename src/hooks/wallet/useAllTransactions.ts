import { getAllTransactions } from "@/queries/wallet";
import { useQuery } from "@tanstack/react-query";

export const useAllTransactions = () => {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: getAllTransactions,
	});
};
