import EmployeeTable from "@/components/EmployeeTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployees } from "@/hooks/employee/useEmployees";
import { useEmployer } from "@/hooks/useEmployer";
import { useAllTransactions } from "@/hooks/wallet/useAllTransactions";
import { useWallet } from "@/hooks/wallet/useWallet";

const Dashboard = () => {
	const { data: employer, isPending } = useEmployer();
	const { data: wallet } = useWallet();
	const { data: transactionsData } = useAllTransactions();
	const { data: employees } = useEmployees();

	return (
		<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 relative">
			<h1 className="font-semibold tracking-wide text-4xl flex items-center gap-x-1">
				<span>Good Morning, </span>
				{isPending ? (
					<Skeleton className="h-10 w-[200px] rounded-sm" />
				) : (
					<span>{employer?.firstName}</span>
				)}
			</h1>
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">USSD Code</CardTitle>
					</CardHeader>
					<CardContent>
						<span className="text-2xl lg:text-3xl font-bold text-wrap">
							*384*87819#
						</span>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Wallet Balance
						</CardTitle>
					</CardHeader>
					<CardContent>
						{wallet ? (
							<span className="text-2xl lg:text-3xl font-bold">
								{wallet?.currency + wallet?.balance}
							</span>
						) : (
							<Skeleton className="h-10 w-[60%] rounded-sm" />
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Transactions
						</CardTitle>
					</CardHeader>
					<CardContent>
						{transactionsData ? (
							<span className="text-2xl lg:text-3xl font-bold">
								{transactionsData?.transactions?.length}
							</span>
						) : (
							<Skeleton className="h-10 w-[40%] rounded-sm" />
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Total Employees
						</CardTitle>
					</CardHeader>
					<CardContent>
						{employees ? (
							<span className="text-2xl lg:text-3xl font-bold">
								{employees?.length}
							</span>
						) : (
							<Skeleton className="h-10 w-[60%] rounded-sm" />
						)}
					</CardContent>
				</Card>
			</div>
			<EmployeeTable />
		</main>
	);
};

export default Dashboard;
