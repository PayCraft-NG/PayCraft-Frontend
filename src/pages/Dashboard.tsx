import WalletDetails from "@/components/dashboard/WalletDetails";
import PaymentsTable from "@/components/PaymentsTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEmployees } from "@/hooks/employee/useEmployees";
import { useEmployer } from "@/hooks/useEmployer";
import { useAllPayments } from "@/hooks/wallet/useAllPayments";
import { useWallet } from "@/hooks/wallet/useWallet";
import { Users, Wallet } from "lucide-react";

const Dashboard = () => {
	const { data: employer, isPending } = useEmployer();
	const { data: wallet } = useWallet();
	const { data: paymentsData, isPending: paymentsLoading } = useAllPayments();
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
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">USSD Code</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">*384*87819#</div>
						<p className="text-xs text-muted-foreground">Quick access code</p>
					</CardContent>
				</Card>
				<WalletDetails wallet={wallet} />
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							Total Transactions
						</CardTitle>
						<Wallet className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{wallet ? (
							<span className="text-2xl font-bold">
								{paymentsData?.payments.length}
							</span>
						) : (
							<Skeleton className="h-10 w-[60%] rounded-sm" />
						)}
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
						<CardTitle className="text-sm font-medium">
							Number of Employees
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						{employees ? (
							<span className="text-2xl font-bold">{employees?.length}</span>
						) : (
							<Skeleton className="h-10 w-[60%] rounded-sm" />
						)}
					</CardContent>
				</Card>
			</div>
			<PaymentsTable
				paymentsData={paymentsData}
				isPending={paymentsLoading}
			/>
		</main>
	);
};

export default Dashboard;
