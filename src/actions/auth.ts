import { LoginFormData } from "@/components/forms/LoginForm";
import apiClient from "@/lib/axios";
import { IResponse, LoginResponse } from "@/types/auth";
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

export async function refreshToken(payload: { refreshToken: string }) {
	try {
		const res = await apiClient.post<IResponse<LoginResponse>>(
			"/auth/refresh-token",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
