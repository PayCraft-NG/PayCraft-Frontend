import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

const companySchema = z.object({
	companyName: z.string().min(1, { message: "Required" }),
	companySize: z.enum(["SMALL", "MEDIUM", "LARGE", "ENTERPRISE"]),
	companyEmailAddress: z
		.string()
		.email({ message: "Company email address format is invalid" }),
	companyPhoneNumber: z.string().regex(/^[0-9]{13}$/, {
		message: "Company phone number must be 13 digits",
	}),
	companyStreetAddress: z.string().min(1, { message: "Required" }),
	companyCountry: z.string().min(1, { message: "Required" }),
	companyCurrency: z.enum(["NGN", "USD"]),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

const companySizeOptions = ["SMALL", "MEDIUM", "LARGE", "ENTERPRISE"];

interface Props {
	currentPage: number;
	setPage: (page: number) => void;
}

const CompanyForm = ({ currentPage, setPage }: Props) => {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<CompanyFormValues>({
		mode: "all",
		resolver: zodResolver(companySchema),
	});

	const onSubmit = (data: CompanyFormValues) => {
		console.log(data);
	};

	const renderInput = (
		name: keyof CompanyFormValues,
		label: string,
		type: string,
		placeholder: string
	) => (
		<div>
			<Label
				className="text-sm md:text-base"
				htmlFor={name}
			>
				{label}
			</Label>
			<Input
				{...register(name)}
				id={name}
				type={type}
				placeholder={placeholder}
				className="my-2 h-11"
				required
			/>
			{errors[name] && (
				<p className="text-red-500 font-medium text-xs text-wrap">
					{errors[name]?.message}
				</p>
			)}
		</div>
	);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="grid gap-x-8"
		>
			{currentPage === 2 && (
				<motion.div
					key="form3"
					className="grid gap-x-8 gap-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1, ease: "linear" }}
				>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
						{renderInput(
							"companyName",
							"Company Name",
							"text",
							"Enter your Company Name"
						)}
						{renderInput(
							"companyEmailAddress",
							"Company Email",
							"text",
							"Enter your company email"
						)}
					</div>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
						{renderInput(
							"companyPhoneNumber",
							"Company Phone Number",
							"text",
							"Enter your Company Phone Number"
						)}
						{renderInput(
							"companyCountry",
							"Company Country",
							"text",
							"Enter your company country"
						)}
					</div>
					<div className="flex justify-between w-full">
						<Button
							type="button"
							onClick={() => setPage(1)}
							className="w-full max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] text-base"
						>
							Prev
						</Button>
						<Button
							type="submit"
							disabled={!isValid}
							className="w-full max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] text-base"
						>
							Next
						</Button>
					</div>
				</motion.div>
			)}
			{currentPage === 3 && (
				<motion.div
					key="form4"
					className="grid gap-x-8 gap-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1, ease: "linear" }}
				>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
						<div>
							<Label
								className="text-base"
								htmlFor="companySize"
							>
								Company Size
							</Label>
							<Controller
								name="companySize"
								control={control}
								render={({ field }) => (
									<Select {...field}>
										<SelectTrigger className="my-2 h-11">
											<SelectValue placeholder="Select your company size" />
										</SelectTrigger>
										<SelectContent>
											{companySizeOptions.map((option) => (
												<SelectItem
													value={option}
													className="capitalize"
												>
													{option.toLowerCase()}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								)}
							/>
						</div>
						<div>
							<Label
								className="text-base"
								htmlFor=""
							>
								Company Currency
							</Label>
							<Controller
								name="companyCurrency"
								control={control}
								render={({ field }) => (
									<Select {...field}>
										<SelectTrigger className="my-2 h-11">
											<SelectValue placeholder="Select your company currency" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="USD">USD</SelectItem>
											<SelectItem value="NGN">NGN</SelectItem>
										</SelectContent>
									</Select>
								)}
							/>
						</div>
					</div>
					{renderInput(
						"companyStreetAddress",
						"Company Address",
						"text",
						"Enter your company address"
					)}
					<div className="flex justify-between w-full">
						<Button
							type="button"
							onClick={() => setPage(2)}
							className="w-full max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] text-base"
						>
							Prev
						</Button>
						<Button
							type="submit"
							disabled={!isValid}
							className="w-full max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] text-base"
						>
							Next
						</Button>
					</div>
				</motion.div>
			)}
		</form>
	);
};

export default CompanyForm;
