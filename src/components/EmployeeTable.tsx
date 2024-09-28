import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";

const employees = [
	{
		id: 1,
		firstName: "John",
		lastName: "Doe",
		emailAddress: "john.doe@aalto.com",
		jobTitle: "Software Engineer",
		department: "Engineering",
	},
	{
		id: 2,
		firstName: "Jane",
		lastName: "Smith",
		emailAddress: "jane.smith@aalto.com",
		jobTitle: "Product Manager",
		department: "Product",
	},
];

const EmployeeTable = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Employee List</CardTitle>
				<CardDescription>
					View and manage all employees in the system.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Job Title</TableHead>
							<TableHead>Department</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{employees.map((employee) => (
							<TableRow key={employee.id}>
								<TableCell>
									{employee.firstName} {employee.lastName}
								</TableCell>
								<TableCell>{employee.emailAddress}</TableCell>
								<TableCell>{employee.jobTitle}</TableCell>
								<TableCell>{employee.department}</TableCell>
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
											<Edit className="mr-2 h-4 w-4" />
											Edit
										</Button>
										<Button
											size="sm"
											variant="outline"
										>
											<Trash2 className="mr-2 h-4 w-4" />
											Delete
										</Button>
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default EmployeeTable;
