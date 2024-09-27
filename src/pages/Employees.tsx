import EmployeeTable from "@/components/EmployeeTable";
import CreateEmployee from "@/components/modals/CreateEmployee";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Employees = () => {
	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-7xl gap-2">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-semibold">Employee Management</h1>
					<CreateEmployee />
				</div>
			</div>
			<div className="mx-auto grid w-full max-w-7xl items-start gap-6">
				<Card>
					<CardHeader>
						<CardTitle>Employee List</CardTitle>
						<CardDescription>
							View and manage all employees in the system.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<EmployeeTable />
					</CardContent>
				</Card>
			</div>
		</main>
	);
};

export default Employees;
