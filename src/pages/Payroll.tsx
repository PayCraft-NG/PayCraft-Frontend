import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const Payroll = () => {
	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-7xl gap-2">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-semibold">Payroll Management</h1>
					<Button>
						<Plus className="mr-2 h-4 w-4" /> Create Payroll
					</Button>
				</div>
			</div>
			<div className="mx-auto grid w-full max-w-7xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
				<nav className="grid gap-4 text-sm text-muted-foreground">
					<Link
						to="#"
						className="font-semibold text-primary"
					>
						View Payrolls
					</Link>
					<Link to="#">Payroll History</Link>
					<Link to="#">Employee Management</Link>
					<Link to="#">Tax Settings</Link>
					<Link to="#">Reports</Link>
					<Link to="#">Integrations</Link>
				</nav>
				<Outlet />
			</div>
		</main>
	);
};

export default Payroll;
