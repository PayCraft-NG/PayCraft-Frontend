import ChangePassword from "@/components/modals/ChangePassword";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { phoneRegex } from "@/constants/regex";
import { useEmployer } from "@/hooks/useEmployer";
import { useUpdateEmployer } from "@/hooks/useUpdateEmployer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	firstName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	lastName: z.string().min(3, { message: "Minimum of 3 characters required" }),
	emailAddress: z.string().email({ message: "Invalid email address" }),
	phoneNumber: z.string().regex(phoneRegex, { message: "Invalid Number" }),
	streetAddress: z
		.string()
		.min(3, { message: "Minimum of 3 characters required" }),
	jobTitle: z.string().min(3, { message: "Minimum of 3 characters required" }),
});

export type UpdateEmployerForm = z.infer<typeof schema>;

const UpdateProfile = () => {
	const [isEditing, setIsEditing] = useState(false);
	const { data: employerDetails, isPending: employerLoading } = useEmployer();
	const { mutate: updateEmployer, isPending } = useUpdateEmployer();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<UpdateEmployerForm>({
		mode: "onChange",
		resolver: zodResolver(schema),
		values: employerDetails,
	});

	const handleEdit = () => {
		setIsEditing(!isEditing);
		reset();
	};

	const onSubmit = (data: UpdateEmployerForm) => {
		updateEmployer(data, {
			onSuccess: () => setIsEditing(false),
		});
	};

	const renderInput = (
		name: keyof UpdateEmployerForm,
		label: string,
		type: string
	) => (
		<div>
			<Label
				className="text-sm md:text-base font-normal"
				htmlFor={name}
			>
				{label}
			</Label>
			<Input
				{...register(name)}
				id={name}
				type={type}
				disabled={!isEditing}
				className="my-1 text-sm"
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
			className="grid gap-6"
		>
			<Card>
				<CardHeader>
					<CardTitle>Personal Information</CardTitle>
					<CardDescription>Manage your personal information</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2 mb-5">
						{renderInput("firstName", "Firstname", "text")}
						{renderInput("lastName", "Lastname", "text")}
					</div>
					<ChangePassword disabled={employerLoading} />
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Contact Information</CardTitle>
					<CardDescription>Manage your contact details</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						{renderInput("emailAddress", "Email", "email")}
						{renderInput("phoneNumber", "Phone", "tel")}
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Additional Information</CardTitle>
					<CardDescription>Manage your additional details</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						{renderInput("streetAddress", "Street Address", "text")}
						{renderInput("jobTitle", "Job Title", "text")}
					</div>
				</CardContent>
			</Card>
			<div className="flex justify-end space-x-4">
				<Button
					type="button"
					disabled={employerLoading}
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
	);
};

export default UpdateProfile;
