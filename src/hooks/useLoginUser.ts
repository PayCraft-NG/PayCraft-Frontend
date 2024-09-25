/* eslint-disable @typescript-eslint/no-unused-vars */
import { loginUser } from "@/actions/auth";
import { useAuthActions } from "@/store/auth";
import { useMutation } from "@tanstack/react-query";
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
			console.log(res);
			toast({
				description: res.statusMessage,
			});
			setAccessToken(res.data.accessToken);
			setCookie("refresh_token", res.data.refreshToken, {
				// maxAge: parseToSeconds(res.data.refreshTokenValidityTime),
				maxAge: 2 * 60 * 60, // 2 hours
				sameSite: true,
				secure: true,
			});
			navigate("/dashboard", {
				replace: true,
			});
		},
	});
};
