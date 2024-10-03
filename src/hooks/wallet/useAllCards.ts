import { getAllCards } from "@/queries/wallet";
import { useQuery } from "@tanstack/react-query";

export const useAllCards = () => {
	return useQuery({
		queryKey: ["cards"],
		queryFn: getAllCards,
	});
};
