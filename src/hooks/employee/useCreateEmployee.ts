import { createEmployee } from "@/actions/employer";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";

export const useCreateEmployee = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createEmployee,
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					description: res.statusMessage,
				});
				navigate("/dashboard/employee");
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
};
