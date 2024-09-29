import { UpdatePasswordForm } from "@/components/forms/ChangePasswordForm";
import { CompanyFormValues } from "@/components/forms/CompanyForm";
import { CreateEmployeeForm } from "@/components/forms/CreateEmployeeForm";
import { EmployerFormValues } from "@/components/forms/EmployerForm";
import { PayrollForm } from "@/components/forms/UpdatePayrollForm";
import { UpdateEmployerForm } from "@/components/forms/UpdateProfile";
import apiClient from "@/lib/axios";
import { IResponse } from "@/types/auth";
import { Company, Employee, Employer, Payroll } from "@/types/employer";
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

export async function updateEmployer(payload: UpdateEmployerForm) {
	try {
		const res = await apiClient.put<IResponse<Employer>>(
			"/employer/update",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function updatePassword(payload: UpdatePasswordForm) {
	try {
		const res = await apiClient.patch<IResponse<Employer>>(
			"/employer/update/password",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function createEmployee(payload: CreateEmployeeForm) {
	try {
		const res = await apiClient.post<IResponse<Employee>>(
			"/employee/create",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function updateEmployee(employeeId: string, payload: Employee) {
	try {
		const res = await apiClient.put<IResponse<Employee>>(
			`/employee/${employeeId}`,
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function removeEmployee(employeeId: string) {
	try {
		const res = await apiClient.delete<IResponse<Employee>>(
			`/employee/${employeeId}`
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function createPayroll(payload: PayrollForm) {
	try {
		const res = await apiClient.post<IResponse<Payroll>>(
			"/payroll/create",
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function updatePayroll(payrollId: string, payload: PayrollForm) {
	try {
		const res = await apiClient.put<IResponse<Employee>>(
			`/payroll/update/${payrollId}`,
			payload
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function removePayroll(payrollId: string) {
	try {
		const res = await apiClient.delete<IResponse<Payroll>>(
			`/payroll/delete/${payrollId}`
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function runPayroll(payrollId: string) {
	try {
		const res = await apiClient.post<IResponse<Payroll>>(
			`/payroll/run/${payrollId}`
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function addPayrollEmployee(
	payrollId: string,
	employeeId: string
) {
	try {
		const res = await apiClient.post<IResponse<Payroll>>(
			`/payroll/add-employee/${payrollId}`,
			null,
			{ params: { employeeId } }
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}

export async function removePayrollEmployee(
	payrollId: string,
	employeeId: string
) {
	try {
		const res = await apiClient.post<IResponse<Payroll>>(
			`/payroll/remove-employee/${payrollId}`,
			null,
			{ params: { employeeId } }
		);
		return res.data;
	} catch (error) {
		throw error as AxiosError;
	}
}
