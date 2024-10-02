import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Employee, Employer, Payroll } from "@/types/employer";
import { AxiosError } from "axios";

export async function getEmployer() {
	try {
		const res = await apiClient.get<IResponse<Employer>>("/employer/details");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getEmployee(employeeId: string) {
	try {
		const res = await apiClient.get<IResponse<Employee>>(
			`/employee/${employeeId}`
		);
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllEmployees() {
	try {
		const res = await apiClient.get<IResponse<Employee[]>>("/employee/all");
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

export async function getAllPayrolls() {
	try {
		const res = await apiClient.get<IResponse<Payroll[]>>("/payroll/all");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function getAllBanks() {
	try {
		const res = await apiClient.get<IResponse<string[]>>("/account/banks");
		return res.data.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
