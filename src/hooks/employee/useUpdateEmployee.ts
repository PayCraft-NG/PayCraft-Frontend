import { updateEmployee } from "@/actions/employer";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { AxiosError } from "axios";
import { Employee } from "@/types/employer";

export const useUpdateEmployee = (employeeId?: string) => {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (newEmployee: Employee) => {
			if (!employeeId) throw new AxiosError("Employee Not Found");
			return await updateEmployee(employeeId, newEmployee);
		},
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					title: "Employee Updated",
					description: res.statusMessage,
				});
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["employee", employeeId] });
		},
	});
};
