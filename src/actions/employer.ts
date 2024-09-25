import { CompanyFormValues } from "@/components/forms/CompanyForm";
import { EmployerFormValues } from "@/components/forms/EmployerForm";
import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Company, Employer } from "@/types/employer";
import { AxiosError } from "axios";

export async function createEmployer(payload: EmployerFormValues) {
	try {
		const res = await apiClient.post<IResponse<Employer>>(
			"/employer/create",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function createCompany(
	employerId: string,
	payload: CompanyFormValues
) {
	try {
		const res = await apiClient.post<IResponse<Company>>(
			"/company/create",
			payload,
			{
				params: { employerId },
			}
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
