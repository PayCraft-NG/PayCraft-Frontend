import { removeEmployee } from "@/actions/employer";
import { API_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../use-toast";
import { useNavigate } from "react-router-dom";
import { Employee } from "@/types/employer";

export const useRemoveEmployee = () => {
	const { toast } = useToast();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: removeEmployee,
		onSuccess: (res) => {
			if (res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS) {
				toast({
					description: "Employee Deleted",
				});
				navigate("/dashboard/employee");
			}
		},
		onMutate: (employeeId: string) => {
			const employees = queryClient.getQueryData<Employee[]>(["employees"]);
			const newEmployees = employees?.filter(
				(employee) => employee.employeeId !== employeeId
			);
			queryClient.setQueryData(["employees"], newEmployees);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ["employees"] });
		},
	});
};
