import { convertToReadableDate, formatNumber } from "@/lib/utils";
import { PaymentsResponse } from "@/types/wallet";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

interface Props {
	paymentsData?: PaymentsResponse;
	isPending: boolean;
}

const PaymentsTable = ({ paymentsData, isPending }: Props) => {
	if (isPending) {
		return (
			<div className="flex flex-col items-center justify-center pt-20">
				<Loader2 className="size-14 lg:size-16 animate-spin text-primary" />
				<h1 className="mt-4 text-lg lg:text-xl font-semibold text-foreground">
					Getting All Payments
				</h1>
			</div>
		);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-xl">Most Recent Payments</CardTitle>
			</CardHeader>
			<CardContent>
				{paymentsData && paymentsData.payments.length > 0 ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Payroll Name</TableHead>
								<TableHead>Employee Name</TableHead>
								<TableHead>Transaction Date</TableHead>
								<TableHead>Transaction Type</TableHead>
								<TableHead>Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{paymentsData.payments?.map((payement) => (
								<TableRow key={payement.referenceNumber}>
									<TableCell>{payement.payrollName}</TableCell>
									<TableCell>{payement.employeeName}</TableCell>
									<TableCell>
										{convertToReadableDate(payement.transactionDateTime)}
									</TableCell>
									<TableCell>{payement.transactionType}</TableCell>
									<TableCell>{`${payement.currency}${formatNumber(
										payement.amount
									)}`}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<h1 className="text-base font-medium text-foreground">
						No Payments Found
					</h1>
				)}
			</CardContent>
		</Card>
	);
};

export default PaymentsTable;
