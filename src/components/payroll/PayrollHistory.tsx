import { Download, Eye } from "lucide-react";
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

const PayrollHistory = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Payroll History</CardTitle>
				<CardDescription>
					View past payroll runs and download reports.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Payroll Name</TableHead>
							<TableHead>Run Date</TableHead>
							<TableHead>Total Amount</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>June 2023 Monthly</TableCell>
							<TableCell>2023-06-30</TableCell>
							<TableCell>$145,000</TableCell>
							<TableCell>Completed</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button
										size="sm"
										variant="outline"
									>
										<Eye className="mr-2 h-4 w-4" />
										View
									</Button>
									<Button
										size="sm"
										variant="outline"
									>
										<Download className="mr-2 h-4 w-4" />
										Download CSV
									</Button>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>May 2023 Monthly</TableCell>
							<TableCell>2023-05-31</TableCell>
							<TableCell>$142,500</TableCell>
							<TableCell>Completed</TableCell>
							<TableCell>
								<div className="flex space-x-2">
									<Button
										size="sm"
										variant="outline"
									>
										<Eye className="mr-2 h-4 w-4" />
										View
									</Button>
									<Button
										size="sm"
										variant="outline"
									>
										<Download className="mr-2 h-4 w-4" />
										Download CSV
									</Button>
								</div>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default PayrollHistory;
