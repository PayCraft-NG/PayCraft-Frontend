import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Employer, Payroll } from "@/types/employer";
import { AxiosError } from "axios";

export async function getEmployer() {
	try {
		const res = await apiClient.get<IResponse<Employer>>("/employer/details");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getPayrollById(payrollId: string) {
	try {
		const res = await apiClient.get<IResponse<Payroll>>(
			`/payroll/${payrollId}`
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
