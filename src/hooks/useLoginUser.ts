/* eslint-disable @typescript-eslint/no-unused-vars */
import { loginUser } from "@/actions/auth";
import { API_STATUS_CODES, AUTH_STATUS_CODES } from "@/constants/statusCodes";
import { convertToSeconds } from "@/lib/utils";
import { useAuthActions } from "@/store/auth";
import { IResponse } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useToast } from "./use-toast";

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
					title: "Login Successful",
					description: res.statusMessage,
				});
				setAccessToken(res.data.accessToken);
				setCookie("refresh_token", res.data.refreshToken, {
					maxAge: convertToSeconds(res.data.refreshTokenValidityTime),
					path: "/",
					sameSite: "strict",
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
		onError: (error) => {
			const { data: response } = error.response as AxiosResponse<
				IResponse<{ employerId: string }>
			>;
			if (error.code === API_STATUS_CODES.STATUS_400)
				navigate(`/company/create/${response.data.employerId}`);
		},
	});
};
