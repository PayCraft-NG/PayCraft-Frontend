import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Employees = () => {
	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-semibold">Employee Management</h1>
					<Button asChild>
						<Link to="/dashboard/employee/create">
							<Plus className="mr-2 h-4 w-4" /> Create Employee
						</Link>
					</Button>
				</div>
			</div>
			<div className="mx-auto grid w-full max-w-6xl items-start gap-6 lg:grid-cols-[180px_1fr]">
				<nav className="grid gap-4 text-sm text-muted-foreground">
					<Link
						to="#"
						className="font-semibold text-primary"
					>
						My Employees
					</Link>
					<Link to="/dashboard/employee/create">Create Employee</Link>
					<Link to="#">View Employee</Link>
				</nav>
				<Outlet />
			</div>
		</main>
	);
};

export default Employees;
