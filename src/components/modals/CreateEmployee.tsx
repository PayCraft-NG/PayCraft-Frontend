import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CreateEmployeeForm from "../forms/CreateEmployeeForm";

const CreateEmployee = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" /> Create Employee
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Employee</DialogTitle>
					<DialogDescription>
						Enter the details of the new employee here. Click save when you're
						done.
					</DialogDescription>
				</DialogHeader>
				<CreateEmployeeForm />
			</DialogContent>
		</Dialog>
	);
};

export default CreateEmployee;
