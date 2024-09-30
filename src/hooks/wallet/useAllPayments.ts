import { getAllPayments } from "@/queries/wallet";
import { useQuery } from "@tanstack/react-query";

export const useAllPayments = () => {
	return useQuery({
		queryKey: ["payments"],
		queryFn: getAllPayments,
	});
};
