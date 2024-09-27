import { Play, Edit, Eye } from "lucide-react";
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

const PayrollTable = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Existing Payrolls</CardTitle>
				<CardDescription>
					View and manage your automated and manual payrolls.
				</CardDescription>
			</CardHeader>
			<CardContent>
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
									<TableHead>Payroll Name</TableHead>
									<TableHead>Frequency</TableHead>
									<TableHead>Next Run Date</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>Monthly Salary</TableCell>
									<TableCell>Monthly</TableCell>
									<TableCell>2023-07-31</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												size="sm"
												variant="outline"
											>
												<Play className="mr-2 h-4 w-4" />
												Run
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Edit className="mr-2 h-4 w-4" />
												Edit
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Eye className="mr-2 h-4 w-4" />
												View
											</Button>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Bi-Weekly Wages</TableCell>
									<TableCell>Bi-Weekly</TableCell>
									<TableCell>2023-07-15</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												size="sm"
												variant="outline"
											>
												<Play className="mr-2 h-4 w-4" />
												Run
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Edit className="mr-2 h-4 w-4" />
												Edit
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Eye className="mr-2 h-4 w-4" />
												View
											</Button>
										</div>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
					<TabsContent value="manual">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Payroll Name</TableHead>
									<TableHead>Created Date</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								<TableRow>
									<TableCell>Q2 Bonus</TableCell>
									<TableCell>2023-06-15</TableCell>
									<TableCell>Draft</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												size="sm"
												variant="outline"
											>
												<Play className="mr-2 h-4 w-4" />
												Run
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Edit className="mr-2 h-4 w-4" />
												Edit
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Eye className="mr-2 h-4 w-4" />
												View
											</Button>
										</div>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Contractor Payments</TableCell>
									<TableCell>2023-07-01</TableCell>
									<TableCell>Pending Approval</TableCell>
									<TableCell>
										<div className="flex space-x-2">
											<Button
												size="sm"
												variant="outline"
											>
												<Play className="mr-2 h-4 w-4" />
												Run
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Edit className="mr-2 h-4 w-4" />
												Edit
											</Button>
											<Button
												size="sm"
												variant="outline"
											>
												<Eye className="mr-2 h-4 w-4" />
												View
											</Button>
										</div>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TabsContent>
				</Tabs>
			</CardContent>
		</Card>
	);
};

export default PayrollTable;
