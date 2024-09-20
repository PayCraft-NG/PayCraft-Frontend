import { LoginFormData } from "@/components/forms/LoginForm";
import { SignUpFormValues } from "@/components/forms/SignUpForm";
import apiClient from "@/lib/axios";
import { IResponse, LoginResponse, SignUpResponse } from "@/types/auth";
import { AxiosError } from "axios";

export async function loginUser(payload: LoginFormData) {
	try {
		const res = await apiClient.post<IResponse<LoginResponse>>(
			"/auth/login",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function onBoardUser(payload: SignUpFormValues) {
	try {
		const res = await apiClient.post<IResponse<SignUpResponse>>(
			"/auth/onboard",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
