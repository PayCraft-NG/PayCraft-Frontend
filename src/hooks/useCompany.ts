import { getCompany } from "@/queries/company";
import { useQuery } from "@tanstack/react-query";

export const useCompany = () => {
	return useQuery({
		queryKey: ["company"],
		queryFn: getCompany,
	});
};
