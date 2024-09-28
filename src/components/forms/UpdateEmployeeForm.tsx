import { CurrencyOptions } from "@/constants/data";
import { BankAccountRegex, PhoneRegex } from "@/constants/regex";
import { useEmployee } from "@/hooks/employee/useEmployee";
import { useUpdateEmployee } from "@/hooks/employee/useUpdateEmployee";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employer";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { createRenderInput } from "./CreateRenderInput";
import { useRemoveEmployee } from "@/hooks/employee/useRemoveEmployee";

export const EmployeeSchema = z.object({
	firstName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	lastName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	emailAddress: z.string().email({ message: "Invalid email address" }),
	dateOfBirth: z.coerce
		.date()
		.min(new Date("1900-01-01"), { message: "Date must be after 1900-01-01" })
		.max(new Date(), { message: "Date cannot be in the future" }),
	streetAddress: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	phoneNumber: z
		.string()
		.min(1, { message: "Required" })
		.regex(PhoneRegex, { message: "Invalid phone number" }),
	jobTitle: z.string().min(3, { message: "Minimum of 3 characters required" }),
	department: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	bankName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	accountNumber: z
		.string()
		.length(10, { message: "Account number must be exactly 10 digits" })
		.regex(BankAccountRegex, { message: "BVN must be exactly 10 digits" }),
	salaryAmount: z.coerce
		.number()
		.positive({ message: "Salary amount must be a positive number" }),
	salaryCurrency: z
		.string()
		.min(3, { message: "Salary currency must be a valid currency code" }),
});

const UpdateEmployeeForm = () => {
	const { employeeId } = useParams();
	const [isEditing, setIsEditing] = useState(false);
	const { data: employeeDetails, isPending: employeeLoading } =
		useEmployee(employeeId);

	const { mutate: updateEmployee, isPending } = useUpdateEmployee(employeeId);

	const { mutate: removeEmployee, isPending: isDeleting } = useRemoveEmployee();

	const {
		register,
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<Employee>({
		mode: "onChange",
		resolver: zodResolver(EmployeeSchema),
		values: employeeDetails,
	});

	const renderInput = createRenderInput<Employee>(
		Input,
		register,
		errors,
		isEditing
	);

	const handleEdit = () => {
		setIsEditing(!isEditing);
		reset();
	};

	const handleDelete = () => removeEmployee(employeeId!);

	const onSubmit = (data: Employee) => {
		console.log(data);
		updateEmployee(data, {
			onSuccess: () => setIsEditing(false),
		});
	};

	return (
		<div className="mx-auto w-full max-w-6xl">
			<Card className="w-full">
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-2xl font-bold">Employee Details</CardTitle>
					<Button
						variant="destructive"
						size="sm"
						onClick={handleDelete}
						disabled={isDeleting}
					>
						<Trash2 className="mr-2 h-4 w-4" />
						Delete Employee
					</Button>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="grid gap-x-8 max-w-[967px] mx-auto"
					>
						<div className="grid gap-4 py-4">
							<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
								{renderInput({
									name: "firstName",
									label: "First Name",
									type: "text",
								})}
								{renderInput({
									name: "lastName",
									label: "Last Name",
									type: "text",
								})}
							</div>

							<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
								{renderInput({
									name: "emailAddress",
									label: "Email",
									type: "email",
								})}
								<div className="grid">
									<Label
										className="text-sm font-normal"
										htmlFor="dateOfBirth"
									>
										Date of Birth
									</Label>
									<Controller
										name="dateOfBirth"
										control={control}
										render={({ field }) => (
											<Popover>
												<PopoverTrigger
													disabled={!isEditing}
													asChild
												>
													<Button
														variant={"outline"}
														className={cn(
															"text-left font-normal my-1 text-sm",
															!field.value && "text-muted-foreground"
														)}
													>
														{field.value ? (
															format(field.value, "PPP")
														) : (
															<span>Pick a date</span>
														)}
														<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={field.value}
														onSelect={field.onChange}
														disabled={(date) =>
															date > new Date() || date < new Date("1900-01-01")
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										)}
									/>
									<p className="text-red-500 font-medium text-xs text-wrap">
										{errors.dateOfBirth?.message}
									</p>
								</div>
							</div>

							<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
								{renderInput({
									name: "streetAddress",
									label: "Address",
									type: "text",
								})}
								{renderInput({
									name: "phoneNumber",
									label: "Phone",
									type: "tel",
								})}
							</div>

							<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
								{renderInput({
									name: "jobTitle",
									label: "Job Title",
									type: "text",
								})}
								{renderInput({
									name: "department",
									label: "Department",
									type: "text",
								})}
							</div>

							<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
								{renderInput({
									name: "bankName",
									label: "Bank Name",
									type: "text",
								})}
								{renderInput({
									name: "accountNumber",
									label: "Account Number",
									type: "text",
								})}
							</div>

							<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
								{renderInput({
									name: "salaryAmount",
									label: "Salary Amount",
									type: "number",
								})}
								<div>
									<Label
										className="text-sm font-normal"
										htmlFor="companyCurrency"
									>
										Company Currency
									</Label>
									<Controller
										name="salaryCurrency"
										control={control}
										disabled={!isEditing}
										render={({ field }) => (
											<Select
												{...field}
												onValueChange={field.onChange}
											>
												<SelectTrigger className="my-1 text-sm">
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{CurrencyOptions.map((option) => (
														<SelectItem
															value={option}
															className="capitalize"
														>
															{option}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										)}
									/>
								</div>
							</div>
						</div>

						<div className="flex justify-end space-x-4">
							<Button
								type="button"
								disabled={employeeLoading}
								onClick={() => handleEdit()}
							>
								{isEditing ? "Cancel" : "Edit"}
							</Button>
							{isEditing && (
								<Button
									type="submit"
									disabled={isPending}
									className="bg-primary text-primary-foreground"
								>
									Save Changes
								</Button>
							)}
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
};

export default UpdateEmployeeForm;
