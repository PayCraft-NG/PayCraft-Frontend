import {
	Loader2,
	MinusCircleIcon,
	PlusCircleIcon,
	SearchIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEmployees } from "@/hooks/employee/useEmployees";
import { useAddPayrollEmployee } from "@/hooks/payroll/useAddPayrollEmployee";
import { usePayrollEmployees } from "@/hooks/payroll/usePayrollEmployees";
import { useRemovePayrollEmployee } from "@/hooks/payroll/useRemovePayrollEmployee";
import { useParams } from "react-router-dom";

const PayrollEmployeeTable = () => {
	const { payrollId } = useParams();

	const { data: allEmployees, isPending: allEmployeesLoading } = useEmployees();
	const { data: payrollEmployees, isPending: payrollEmployeesLoading } =
		usePayrollEmployees(payrollId!);

	const { mutate: addEmployee, isPending } = useAddPayrollEmployee(payrollId!);
	const { mutate: removeEmployee, isPending: isDeleting } =
		useRemovePayrollEmployee(payrollId!);

	const [searchTerm, setSearchTerm] = useState("");

	const filteredEmployees = (allEmployees ?? []).filter(
		(employee) =>
			employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
			employee.lastName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (payrollEmployeesLoading || allEmployeesLoading) {
		return (
			<div className="flex flex-col items-center justify-center pt-20">
				<Loader2 className="size-14 lg:size-16 animate-spin text-primary" />
				<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
					Getting All Employees
				</h1>
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Payroll Employee Details</CardTitle>
				<CardDescription>
					View employee information for this payroll
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="mb-4">
					<Label
						htmlFor="search"
						className="sr-only"
					>
						Search employees
					</Label>
					<div className="relative">
						<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							id="search"
							placeholder="Search employees..."
							className="pl-10"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Job Title</TableHead>
							<TableHead>Dept.</TableHead>
							<TableHead>Salary</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredEmployees.map((employee) => (
							<TableRow key={employee.employeeId}>
								<TableCell>
									{employee.firstName + " " + employee.lastName}
								</TableCell>
								<TableCell>{employee.jobTitle}</TableCell>
								<TableCell>{employee.department}</TableCell>
								<TableCell>
									{employee.salaryCurrency +
										employee.salaryAmount.toLocaleString()}
								</TableCell>
								<TableCell>
									{payrollEmployees?.find(
										({ employeeId }) => employeeId === employee.employeeId
									) ? (
										<Button
											variant="destructive"
											size="sm"
											disabled={isDeleting}
											onClick={() => removeEmployee(employee.employeeId)}
										>
											<MinusCircleIcon className="mr-2 h-4 w-4" />
											Remove from Payroll
										</Button>
									) : (
										<Button
											variant="default"
											size="sm"
											disabled={isPending}
											onClick={() => addEmployee(employee.employeeId)}
										>
											<PlusCircleIcon className="mr-2 h-4 w-4" />
											Add to Payroll
										</Button>
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default PayrollEmployeeTable;
