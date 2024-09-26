import { getEmployer } from "@/queries/employer";
import { useAuth } from "@/store/auth";
import { useQuery } from "@tanstack/react-query";

export const useEmployer = () => {
	const accessToken = useAuth();
	return useQuery({
		queryKey: ["employer"],
		queryFn: () => getEmployer(accessToken!),
	});
};
