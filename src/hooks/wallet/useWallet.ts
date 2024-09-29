import { getWalletDetails } from "@/queries/wallet";
import { useQuery } from "@tanstack/react-query";

export const useWallet = () => {
	return useQuery({
		queryKey: ["wallet"],
		queryFn: getWalletDetails,
	});
};
