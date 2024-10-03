import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Payroll = () => {
	const { pathname } = useLocation();
	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-7xl gap-2">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-semibold">Payroll Management</h1>
					{pathname === "/dashboard/payroll" ? (
						<Button
							asChild
							className="max-w-[180px]"
						>
							<Link to="/dashboard/payroll/create">
								<Plus className="mr-2 h-4 w-4" /> Create Payroll
							</Link>
						</Button>
					) : (
						<Link
							to="/dashboard/payroll"
							className="flex items-center text-sm text-muted-foreground"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Payroll Table
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</main>
	);
};

export default Payroll;
