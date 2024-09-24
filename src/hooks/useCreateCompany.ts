import { createCompany } from "@/actions/employer";
import { CompanyFormValues } from "@/components/forms/CompanyForm";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useNavigate } from "react-router-dom";

export const useCreateCompany = (employerId: string) => {
	const { toast } = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async (newCompany: CompanyFormValues) => {
			return await createCompany(employerId, newCompany);
		},
		onSuccess: (res) => {
			if (
				res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS ||
				res.statusCode === AUTH_STATUS_CODES.ONBOARD_SUCCESS
			) {
				toast({
					description: res.statusMessage,
				});
				navigate("/dashboard");
			}
		},
	});
};
