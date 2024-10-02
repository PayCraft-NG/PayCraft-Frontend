import { createEmployer } from "@/actions/employer";
import { AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";

export const useCreateEmployer = () => {
	const [, setEmployerId] = useLocalStorage<string | null>("employerId", null);
	const { toast } = useToast();

	const navigate = useNavigate();

	return useMutation({
		mutationFn: createEmployer,
		onSuccess: (res) => {
			if (res.statusCode === AUTH_STATUS_CODES.ONBOARD_SUCCESS) {
				toast({
					title: "Profile Created",
					description: res.statusMessage,
				});
				setEmployerId(res.data.employerId);
				navigate("/company/create");
			}
		},
	});
};
