import { passwordRegex, phoneRegex } from "@/constants/regex";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { AnimatePresence, motion } from "framer-motion";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useOnBoardUser } from "@/hooks/useOnBoardUser";

const schema = z.object({
	firstName: z.string().min(1, { message: "Required" }),
	lastName: z.string().min(1, { message: "Required" }),
	emailAddress: z.string().email({ message: "Invalid email address" }),
	phoneNumber: z.string().regex(phoneRegex, { message: "Invalid Number" }),
	personalAddress: z.string().min(1, { message: "Required" }),
	jobTitle: z.string().min(1, { message: "Required" }),
	bvn: z
		.string()
		.length(11, { message: "BVN must be exactly 11 digits" })
		.regex(/^\d+$/, { message: "BVN must contain only digits" }),
	password: z
		.string()
		.min(8, { message: "Minimum of 8 characters" })
		.regex(passwordRegex, {
			message:
				"Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
		}),
});

export type SignUpFormValues = z.infer<typeof schema>;

interface Props {
	currentPage: number;
	setPage: (page: number) => void;
}

const SignUpForm = ({ currentPage, setPage }: Props) => {
	const {
		register,
		handleSubmit,
		getFieldState,
		formState: { errors, isValid, touchedFields },
	} = useForm<SignUpFormValues>({
		mode: "all",
		resolver: zodResolver(schema),
	});

	const checkIfFieldsAreValid = (fields: (keyof SignUpFormValues)[]) => {
		return fields.every((field) => {
			const { error, isTouched } = getFieldState(field);
			return isTouched && !error;
		});
	};

	const { mutate, isPending } = useOnBoardUser();

	const onSubmit = (data: SignUpFormValues) => {
		console.log(data);
		mutate(data);
	};

	const renderInput = (
		name: keyof SignUpFormValues,
		label: string,
		type: string,
		placeholder: string
	) => (
		<div>
			<Label
				className="text-sm"
				htmlFor={name}
			>
				{label}
			</Label>
			<Input
				{...register(name)}
				id={name}
				type={type}
				placeholder={placeholder}
				className="my-1"
				required
			/>
			{errors[name] && (
				<p className="text-red-500 font-medium text-xs">
					{errors[name]?.message}
				</p>
			)}
		</div>
	);

	return (
		<form
			className="mt-3"
			onSubmit={handleSubmit(onSubmit)}
		>
			<AnimatePresence mode="popLayout">
				{currentPage === 1 && (
					<motion.div
						key="page1"
						className="grid gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1, ease: "linear" }}
					>
						<div className="grid grid-cols-2 gap-x-6 md:gap-x-8">
							{renderInput("firstName", "Firstname", "text", "John")}
							{renderInput("lastName", "Lastname", "text", "Doe")}
						</div>
						<div className="grid grid-cols-2 gap-x-6 md:gap-x-8">
							{renderInput(
								"emailAddress",
								"Email",
								"email",
								"user@example.com"
							)}
							{renderInput("phoneNumber", "Phone", "tel", "234")}
						</div>
						{renderInput(
							"password",
							"Password",
							"password",
							"Enter your Password"
						)}
						<Button
							type="button"
							onClick={() => setPage(2)}
							disabled={
								!(Object.entries(touchedFields).length === 0) &&
								!checkIfFieldsAreValid([
									"firstName",
									"lastName",
									"emailAddress",
									"phoneNumber",
									"password",
								])
							}
							className="w-full"
						>
							Next
						</Button>
					</motion.div>
				)}
				{currentPage === 2 && (
					<motion.div
						key="page2"
						className="grid gap-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.1, ease: "linear" }}
					>
						<div className="grid grid-cols-2 gap-x-6 md:gap-x-8">
							{renderInput(
								"jobTitle",
								"Job Title",
								"text",
								"Enter your Job Title"
							)}
							{renderInput("bvn", "BVN", "text", "Enter your company address")}
						</div>

						{renderInput(
							"personalAddress",
							"Personal Address",
							"text",
							"Enter your company address"
						)}

						<Button
							type="submit"
							disabled={!isValid}
							className="w-full"
						>
							{isPending ? (
								<LoaderCircle className="animate-spin" />
							) : (
								"Sign Up"
							)}
						</Button>
					</motion.div>
				)}
			</AnimatePresence>
		</form>
	);
};

export default SignUpForm;
