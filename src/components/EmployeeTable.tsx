import { useEmployees } from "@/hooks/employee/useEmployees";
import { Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

const EmployeeTable = () => {
	const { data: employees, isPending } = useEmployees();

	if (isPending) {
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
				<CardTitle>Employee List</CardTitle>
				<CardDescription>
					View and manage all employees in the system.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{employees && employees.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead>Email</TableHead>
								<TableHead>Job Title</TableHead>
								<TableHead>Department</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{employees?.map((employee) => (
								<TableRow key={employee.employeeId}>
									<TableCell>
										{employee.firstName} {employee.lastName}
									</TableCell>
									<TableCell>{employee.emailAddress}</TableCell>
									<TableCell>{employee.jobTitle}</TableCell>
									<TableCell>{employee.department}</TableCell>
									<TableCell>
										<Button
											size="sm"
											variant="outline"
											asChild
										>
											<Link to={`/dashboard/employee/${employee.employeeId}`}>
												<Eye className="mr-2 h-4 w-4" />
												View
											</Link>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
						No Employees Found
					</h1>
				)}
			</CardContent>
		</Card>
	);
};

export default EmployeeTable;
