import { useCreateCompany } from "@/hooks/useCreateCompany";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { CountryOptions, CurrencyOptions, SizeOptions } from "@/constants/data";

const companySchema = z.object({
	companyName: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	companySize: z.enum(["SMALL", "MEDIUM", "LARGE", "ENTERPRISE"]),
	companyEmailAddress: z
		.string()
		.email({ message: "Company email address format is invalid" }),
	companyPhoneNumber: z.string().regex(/^[0-9]{13}$/, {
		message: "Company phone number must be 13 digits",
	}),
	companyStreetAddress: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	companyCountry: z.string().min(1, { message: "Required" }),
	companyCurrency: z.enum(["NGN", "USD"]),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

interface Props {
	employerId: string;
	currentPage: number;
	setPage: (page: number) => void;
}

const CompanyForm = ({ employerId, currentPage, setPage }: Props) => {
	const { mutate: createCompany } = useCreateCompany(employerId);

	const {
		register,
		control,
		handleSubmit,
		trigger,
		formState: { errors, isValid },
	} = useForm<CompanyFormValues>({
		mode: "onChange",
		resolver: zodResolver(companySchema),
		defaultValues: {
			companySize: SizeOptions[0],
			companyCountry: CountryOptions[0],
			companyCurrency: CurrencyOptions[0],
		},
	});

	const onSubmit = (data: CompanyFormValues) => {
		console.log(data);
		createCompany(data);
	};

	const nextPage = async () => {
		const isPageValid = await trigger(
			[
				"companyName",
				"companyEmailAddress",
				"companyPhoneNumber",
				"companyCountry",
			],
			{ shouldFocus: true }
		);

		if (!isPageValid) return;

		setPage(1);
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
			className="grid gap-x-8 max-w-[967px] mx-auto"
		>
			{currentPage === 0 && (
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
							"email",
							"user@example.com"
						)}
					</div>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-4">
						{renderInput(
							"companyPhoneNumber",
							"Company Phone Number",
							"tel",
							"Enter your Company Phone Number"
						)}
						<div>
							<Label
								className="text-base"
								htmlFor="companyCountry"
							>
								Company Country
							</Label>
							<Controller
								name="companyCountry"
								control={control}
								render={({ field }) => (
									<Select
										{...field}
										onValueChange={field.onChange}
										defaultValue={CountryOptions[0]}
									>
										<SelectTrigger className="my-2 h-11">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{CountryOptions.map((option) => (
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
					<div className="flex justify-between w-full">
						<Button
							type="button"
							onClick={nextPage}
							className="w-full max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] text-base ml-auto"
						>
							Next
						</Button>
					</div>
				</motion.div>
			)}
			{currentPage === 1 && (
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
									<Select
										{...field}
										onValueChange={field.onChange}
										defaultValue={SizeOptions[0]}
									>
										<SelectTrigger className="my-2 h-11">
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											{SizeOptions.map((option) => (
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
									<Select
										{...field}
										onValueChange={field.onChange}
										defaultValue={"NGN"}
									>
										<SelectTrigger className="my-2 h-11">
											<SelectValue placeholder="Select your company currency" />
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
					{renderInput(
						"companyStreetAddress",
						"Company Address",
						"text",
						"Enter your company address"
					)}
					<div className="flex justify-between w-full">
						<Button
							type="button"
							onClick={() => setPage(0)}
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
