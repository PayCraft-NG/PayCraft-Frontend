import { Button } from "@/components/ui/button";
import { getAllBanks } from "@/queries/employer";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus } from "lucide-react";
import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Employees = () => {
	const { pathname } = useLocation();
	const queryClient = useQueryClient();

	useEffect(() => {
		const prefetchTodos = async () =>
			await queryClient.prefetchQuery({
				queryKey: ["banks"],
				queryFn: getAllBanks,
			});

		prefetchTodos();
	}, []);

	return (
		<main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
			<div className="mx-auto grid w-full max-w-6xl gap-2">
				<div className="flex flex-col gap-6 md:flex-row justify-between md:items-center">
					<h1 className="text-3xl font-semibold">Employee Management</h1>
					{pathname === "/dashboard/employee" ? (
						<Button
							asChild
							className="max-w-[180px]"
						>
							<Link to="/dashboard/employee/create">
								<Plus className="mr-2 h-4 w-4" /> Create Employee
							</Link>
						</Button>
					) : (
						<Link
							to="/dashboard/employee"
							className="flex items-center text-sm text-muted-foreground"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Back to Employee Table
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</main>
	);
};

export default Employees;
