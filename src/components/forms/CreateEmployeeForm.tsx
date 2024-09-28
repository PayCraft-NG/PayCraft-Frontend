import { CurrencyOptions } from "@/constants/data";
import { BankAccountRegex, PhoneRegex } from "@/constants/regex";
import { useCreateEmployee } from "@/hooks/employee/useCreateEmployee";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowLeft, CalendarIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
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

const schema = z.object({
	firstName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	lastName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	emailAddress: z.string().email({ message: "Invalid email address" }),
	dateOfBirth: z
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
	bvn: z
		.string()
		.length(11, { message: "BVN must be exactly 11 digits" })
		.regex(/^\d+$/, { message: "BVN must contain only digits" }),
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

export type CreateEmployeeForm = z.infer<typeof schema>;

const CreateEmployeeForm = () => {
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<CreateEmployeeForm>({
		mode: "onChange",
		resolver: zodResolver(schema),
		defaultValues: {
			salaryCurrency: CurrencyOptions[0],
		},
	});

	const renderInput = createRenderInput<CreateEmployeeForm>(
		Input,
		register,
		errors
	);

	const { mutate: createEmployee, isPending } = useCreateEmployee();

	const onSubmit = (data: CreateEmployeeForm) => {
		createEmployee(data);
		console.log(data);
		reset();
	};

	return (
		<Card>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg">Create New Employee</CardTitle>
					<Link
						to="/dashboard/employee"
						className="flex items-center text-sm text-muted-foreground"
					>
						<ArrowLeft className="mr-2 h-4 w-4" />
						Back to Employee Table
					</Link>
				</div>
				<CardDescription>
					Enter the details of the new employee here.
				</CardDescription>
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
								placeholder: "John",
							})}
							{renderInput({
								name: "lastName",
								label: "Last Name",
								type: "text",
								placeholder: "Doe",
							})}
						</div>

						<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
							{renderInput({
								name: "emailAddress",
								label: "Email",
								type: "email",
								placeholder: "user@example.com",
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
											<PopoverTrigger asChild>
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
								placeholder: "Enter your home address",
							})}
							{renderInput({
								name: "phoneNumber",
								label: "Phone",
								type: "tel",
								placeholder: "Enter your phone number",
							})}
						</div>

						<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
							{renderInput({
								name: "jobTitle",
								label: "Job Title",
								type: "text",
								placeholder: "Enter your job title",
							})}
							{renderInput({
								name: "department",
								label: "Department",
								type: "text",
								placeholder: "Enter your department",
							})}
						</div>

						<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
							{renderInput({
								name: "bvn",
								label: "BVN",
								type: "text",
								placeholder: "Enter your BVN",
							})}
							{renderInput({
								name: "bankName",
								label: "Bank Name",
								type: "text",
								placeholder: "Enter your bank name",
							})}
						</div>

						<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
							{renderInput({
								name: "accountNumber",
								label: "Account Number",
								type: "text",
								placeholder: "Enter your account number",
							})}
							{renderInput({
								name: "salaryAmount",
								label: "Salary Amount",
								type: "number",
								placeholder: "Enter your salary amount",
							})}
						</div>

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
								render={({ field }) => (
									<Select
										{...field}
										onValueChange={field.onChange}
									>
										<SelectTrigger className="my-1 text-sm">
											<SelectValue placeholder="Select your salary currency" />
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

					<CardFooter className="flex justify-end space-x-2 mt-6 px-0">
						<Button
							disabled={isPending}
							type="submit"
						>
							Create
						</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Card>
	);
};

export default CreateEmployeeForm;
