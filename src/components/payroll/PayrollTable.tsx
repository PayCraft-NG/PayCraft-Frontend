import { useAllPayroll } from "@/hooks/payroll/useAllPayroll";
import cronstrue from "cronstrue";
import { Eye, Loader2, Play } from "lucide-react";
import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useRunPayroll } from "@/hooks/payroll/useRunPayroll";

const PayrollTable = () => {
	const { data: payrolls, isPending } = useAllPayroll();

	const autoPayrolls = payrolls?.filter((payroll) => payroll.automatic);
	const manualPayrolls = payrolls?.filter((payroll) => !payroll.automatic);

	const { mutate: runPayroll, isPending: isRunning } = useRunPayroll();

	if (isPending) {
		return (
			<div className="flex flex-col items-center justify-center pt-20">
				<Loader2 className="size-14 lg:size-16 animate-spin text-primary" />
				<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
					Getting All Payrolls
				</h1>
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Existing Payrolls</CardTitle>
				<CardDescription>
					View and manage your automated and manual payrolls.
				</CardDescription>
			</CardHeader>
			<CardContent>
				{payrolls && payrolls.length > 0 ? (
					<Tabs
						defaultValue="automated"
						className="w-full"
					>
						<TabsList>
							<TabsTrigger value="automated">Automated</TabsTrigger>
							<TabsTrigger value="manual">Manual</TabsTrigger>
						</TabsList>
						<TabsContent value="automated">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Frequency</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Last Run Date</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{autoPayrolls?.map((payroll) => (
										<TableRow key={payroll.payrollId}>
											<TableCell>{payroll.payrollName}</TableCell>
											<TableCell>
												{cronstrue.toString(payroll.cronExpression)}
											</TableCell>
											<TableCell>
												<Badge
													variant="default"
													className={cn(
														"capitalize",
														payrolls[0].paymentStatus.toLowerCase() ===
															"completed" && "bg-green-500",
														payrolls[0].paymentStatus.toLowerCase() ===
															"pending" && "bg-yellow-500",
														payrolls[0].paymentStatus.toLowerCase() ===
															"failed" && "bg-red-500"
													)}
												>
													{payroll.paymentStatus}
												</Badge>
											</TableCell>
											<TableCell>{payroll.lastRunDate}</TableCell>
											<TableCell>
												<Button
													size="sm"
													variant="outline"
													asChild
												>
													<Link to={`/dashboard/payroll/${payroll.payrollId}`}>
														<Eye className="mr-2 h-4 w-4" />
														View
													</Link>
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TabsContent>
						<TabsContent value="manual">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>S/N</TableHead>
										<TableHead>Frequency</TableHead>
										<TableHead>Status</TableHead>
										<TableHead>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{manualPayrolls?.map((payroll) => (
										<TableRow key={payroll.payrollId}>
											<TableCell>{payroll.payrollName}</TableCell>
											<TableCell>
												{cronstrue.toString(payroll.cronExpression)}
											</TableCell>
											<TableCell className="w-fit">
												<Badge
													variant="default"
													className={cn(
														"capitalize",
														payrolls[0].paymentStatus.toLowerCase() ===
															"completed" && "bg-green-500",
														payrolls[0].paymentStatus.toLowerCase() ===
															"pending" && "bg-yellow-500",
														payrolls[0].paymentStatus.toLowerCase() ===
															"failed" && "bg-red-500"
													)}
												>
													{payroll.paymentStatus}
												</Badge>
											</TableCell>
											<TableCell>
												<div className="flex space-x-2">
													<Button
														size="sm"
														variant="outline"
														disabled={isRunning}
														onClick={() => runPayroll(payroll.payrollId)}
													>
														<Play className="mr-2 h-4 w-4" />
														Run
													</Button>
													<Button
														size="sm"
														variant="outline"
														asChild
													>
														<Link
															to={`/dashboard/payroll/${payroll.payrollId}`}
														>
															<Eye className="mr-2 h-4 w-4" />
															View
														</Link>
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TabsContent>
					</Tabs>
				) : (
					<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
						No Payrolls Found
					</h1>
				)}
			</CardContent>
		</Card>
	);
};

export default PayrollTable;
