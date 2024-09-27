import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Company } from "@/types/employer";
import { AxiosError } from "axios";

export async function getCompany() {
	try {
		const res = await apiClient.get<IResponse<Company>>("/company/details");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
