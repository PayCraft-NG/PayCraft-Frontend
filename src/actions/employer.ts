import { CompanyFormValues } from "@/components/forms/CompanyForm";
import { EmployerFormValues } from "@/components/forms/EmployerForm";
import { UpdateEmployerForm } from "@/components/forms/UpdateProfile";
import { UpdatePasswordForm } from "@/components/modals/ChangePassword";
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

export async function updateEmployer(
	payload: UpdateEmployerForm,
	token: string
) {
	try {
		const res = await apiClient.put<IResponse<Employer>>(
			"/employer/update",
			payload,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function updatePassword(
	payload: UpdatePasswordForm,
	token: string
) {
	try {
		const res = await apiClient.patch<IResponse<Employer>>(
			"/employer/update/password",
			payload,
			{ headers: { Authorization: `Bearer ${token}` } }
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
