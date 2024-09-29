/* eslint-disable @typescript-eslint/no-unused-vars */
import { loginUser } from "@/actions/auth";
import { useAuthActions } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { convertToSeconds } from "@/lib/utils";

export const useLoginUser = () => {
	const navigate = useNavigate();

	const { toast } = useToast();

	const [_, setCookie] = useCookies();
	const { setAccessToken } = useAuthActions();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (res) => {
			if (
				res.statusCode === API_STATUS_CODES.REQUEST_SUCCESS ||
				res.statusCode === AUTH_STATUS_CODES.LOGIN_SUCCESS
			) {
				toast({
					description: res.statusMessage,
				});
				setAccessToken(res.data.accessToken);
				setCookie("refresh_token", res.data.accessToken, {
					maxAge: convertToSeconds(res.data.refreshTokenValidityTime),
					path: "/",
					sameSite: true,
					secure: true,
				});
				navigate("/dashboard", {
					replace: true,
				});
			}

			if (res.statusCode === AUTH_STATUS_CODES.LOGIN_INVALID_CREDENTIALS) {
				toast({
					variant: "destructive",
					description: res.statusMessage,
				});
			}
		},
	});
};
