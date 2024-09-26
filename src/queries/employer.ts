import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Employer } from "@/types/employer";
import { AxiosError } from "axios";

export async function getEmployer(token: string) {
	try {
		const res = await apiClient.get<IResponse<Employer>>("/employer/details", {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
