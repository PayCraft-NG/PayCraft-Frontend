import { PasswordRegex, PhoneRegex } from "@/constants/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useCreateEmployer } from "@/hooks/useCreateEmployer";
import { useNavigate } from "react-router-dom";

const schema = z.object({
	firstName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	lastName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	emailAddress: z.string().email({ message: "Invalid email address" }),
	phoneNumber: z.string().regex(PhoneRegex, { message: "Invalid Number" }),
	streetAddress: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	jobTitle: z.string().min(3, { message: "Minimum of 3 characters required" }),
	bvn: z
		.string()
		.length(11, { message: "BVN must be exactly 11 digits" })
		.regex(/^\d+$/, { message: "BVN must contain only digits" }),
	password: z
		.string()
		.min(8, { message: "Minimum of 8 characters" })
		.regex(PasswordRegex, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
		}),
});

export type EmployerFormValues = z.infer<typeof schema>;

interface Props {
	currentPage: number;
	setPage: (page: number) => void;
}

const EmployerForm = ({ currentPage, setPage }: Props) => {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors, isValid },
	} = useForm<EmployerFormValues>({
		mode: "onChange",
		resolver: zodResolver(schema),
	});

	const nextPage = async () => {
		const isPageValid = await trigger(
			["firstName", "lastName", "emailAddress", "password"],
			{ shouldFocus: true }
		);

		console.log(errors);

		if (!isPageValid) return;

		setPage(1);
	};

	const navigate = useNavigate();

	const { mutate, isPending } = useCreateEmployer();

	const onSubmit = (data: EmployerFormValues) => {
		console.log(data);
		mutate(data, {
			onSuccess: (res) => navigate(`/company/create/${res.data.employerId}`),
		});
	};

	const renderInput = (
		name: keyof EmployerFormValues,
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
			className="max-w-[967px] mx-auto"
		>
			{currentPage === 0 && (
				<motion.div
					key="form1"
					className="grid gap-x-8 gap-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1, ease: "linear" }}
				>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
						{renderInput("firstName", "Firstname", "text", "John")}
						{renderInput("lastName", "Lastname", "text", "Doe")}
					</div>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
						{renderInput("emailAddress", "Email", "email", "user@example.com")}
						{renderInput(
							"password",
							"Password",
							"password",
							"Enter your Password"
						)}
					</div>
					<Button
						type="button"
						onClick={nextPage}
						className="w-full max-w-[100px] sm:max-w-[150px] lg:max-w-[200px] text-base ml-auto"
					>
						Next
					</Button>
				</motion.div>
			)}
			{currentPage === 1 && (
				<motion.div
					key="form2"
					className="grid gap-x-8 gap-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.1, ease: "linear" }}
				>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
						{renderInput(
							"jobTitle",
							"Job Title",
							"text",
							"Enter your Job Title"
						)}
						{renderInput("bvn", "BVN", "text", "Enter your BVN")}
					</div>
					<div className="grid sm:grid-cols-2 gap-x-6 md:gap-x-10 gap-y-4">
						{renderInput("phoneNumber", "Phone", "tel", "234")}
						{renderInput(
							"streetAddress",
							"Street Address",
							"text",
							"Enter your street address"
						)}
					</div>
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
							{isPending ? <LoaderCircle className="animate-spin" /> : "Next"}
						</Button>
					</div>
				</motion.div>
			)}
		</form>
	);
};

export default EmployerForm;
